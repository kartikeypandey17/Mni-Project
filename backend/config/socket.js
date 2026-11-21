import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

let io = null;

/**
 * Initialize Socket.IO Server with CORS and Authentication
 */
export const initSocket = (httpServer) => {
  const allowedOrigins = [
    process.env.CLIENT_URL || 'http://localhost:5173',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000'
  ];

  io = new Server(httpServer, {
    cors: {
      origin: allowedOrigins,
      methods: ['GET', 'POST', 'PATCH'],
      credentials: true
    },
    pingTimeout: 30000,
    pingInterval: 15000
  });

  // Optional JWT Authentication for Socket Connections
  io.use(async (socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token ||
        socket.handshake.headers?.authorization?.replace('Bearer ', '');

      if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dronehub_jwt_super_secret_key_2026');
          const user = await User.findById(decoded.id).select('-password');
          if (user && user.isActive) {
            socket.user = user;
          }
        } catch (tokenErr) {
          // Allow connection as guest if token invalid, but mark unauthenticated
          socket.user = null;
        }
      }
      next();
    } catch (err) {
      next();
    }
  });

  io.on('connection', (socket) => {
    const userRole = socket.user?.role || 'guest';
    const userId = socket.user?._id?.toString() || 'anonymous';

    // Room: Join Drone Telemetry Stream Room
    socket.on('join_drone', (droneId) => {
      if (droneId) {
        const room = `drone:${droneId}`;
        socket.join(room);
      }
    });

    socket.on('leave_drone', (droneId) => {
      if (droneId) {
        const room = `drone:${droneId}`;
        socket.leave(room);
      }
    });

    // Room: Join Shop Owner Fleet Room
    socket.on('join_shop', (shopId) => {
      if (shopId) {
        const room = `shop:${shopId}`;
        socket.join(room);
      }
    });

    // Room: Join Super Admin Room (Restricted to Admins)
    socket.on('join_admin', () => {
      if (userRole === 'admin' || userRole === 'super-admin') {
        socket.join('admin:all');
      }
    });

    // Client-initiated command simulation
    socket.on('send_drone_command', ({ droneId, command, params }) => {
      // Broadcast acknowledgment that command is received in SIMULATED TELEMETRY MODE
      const payload = {
        droneId,
        command,
        params,
        timestamp: new Date().toISOString(),
        mode: 'simulated',
        isSimulated: true,
        message: `[SIMULATED TELEMETRY MODE] Command '${command}' received for drone #${droneId}. Note: No physical drone hardware is connected; command simulated in virtual flight environment.`
      };
      io.to(`drone:${droneId}`).emit('drone_command_ack', payload);
    });

    socket.on('disconnect', () => {
      // Clean disconnect
    });
  });

  console.log('⚡ Socket.IO real-time telemetry engine initialized');
  return io;
};

/**
 * Access the active Socket.IO instance anywhere across controllers & services
 */
export const getIO = () => {
  if (!io) {
    console.warn('⚠️  Socket.IO has not been initialized yet.');
  }
  return io;
};

export default { initSocket, getIO };

