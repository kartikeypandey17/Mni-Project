import { io } from 'socket.io-client';
import authService from './authService';

let socket = null;

/**
 * Socket.IO Client Service for DRONEHUB
 * Connects to the backend WebSocket engine and provides event subscription helpers.
 */
class SocketService {
  connect() {
    if (socket && socket.connected) {
      return socket;
    }

    const token = authService.getToken();
    const serverUrl =
      import.meta.env.VITE_API_URL?.replace('/api', '') ||
      'http://localhost:5000';

    socket = io(serverUrl, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      autoConnect: true
    });

    socket.on('connect', () => {
      console.log('⚡ Connected to DRONEHUB Real-Time Socket.IO Server:', socket.id);
    });

    socket.on('connect_error', (err) => {
      console.warn('Socket connection warning (fallback to HTTP polling active):', err.message);
    });

    return socket;
  }

  getSocket() {
    if (!socket) {
      return this.connect();
    }
    return socket;
  }

  joinDroneRoom(droneId) {
    if (socket && droneId) {
      socket.emit('join_drone', droneId);
    }
  }

  leaveDroneRoom(droneId) {
    if (socket && droneId) {
      socket.emit('leave_drone', droneId);
    }
  }

  joinShopRoom(shopId) {
    if (socket && shopId) {
      socket.emit('join_shop', shopId);
    }
  }

  joinAdminRoom() {
    if (socket) {
      socket.emit('join_admin');
    }
  }

  onTelemetryUpdate(callback) {
    const s = this.getSocket();
    s.on('telemetry_update', callback);
    return () => s.off('telemetry_update', callback);
  }

  onAlert(callback) {
    const s = this.getSocket();
    s.on('new_alert', callback);
    s.on('alert_trigger', callback);
    return () => {
      s.off('new_alert', callback);
      s.off('alert_trigger', callback);
    };
  }

  onCommandAck(callback) {
    const s = this.getSocket();
    s.on('drone_command_ack', callback);
    return () => s.off('drone_command_ack', callback);
  }

  sendDroneCommand(droneId, command, params = {}) {
    const s = this.getSocket();
    s.emit('send_drone_command', { droneId, command, params });
  }

  disconnect() {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  }
}

export const socketService = new SocketService();
export default socketService;

