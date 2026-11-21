import React from 'react'
import { AlertTriangle, ShieldAlert, Navigation, X } from 'lucide-react'
import alertService from '../../services/alertService'

function GeofenceAlertModal({ isOpen, onClose, telemetry, onRTH }) {
  if (!isOpen) return null

  const handleTriggerRTH = async () => {
    try {
      if (telemetry?.droneId || telemetry?.id) {
        await alertService.createAlert({
          droneId: telemetry?.droneId || telemetry?.id,
          alertType: 'geofence',
          message: `Geofence boundary breach acknowledged. Simulated RTH requested for ${telemetry?.droneName || 'Drone'}.`,
          severity: 'high',
          location: {
            latitude: telemetry?.lat || telemetry?.latitude || 12.9716,
            longitude: telemetry?.lng || telemetry?.longitude || 77.5946,
            altitude: telemetry?.altitude || 45
          }
        });
      }
    } catch (e) {
      // Handled
    }
    if (onRTH) onRTH();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 max-w-lg w-full border-2 border-rose-500 shadow-2xl space-y-4 relative overflow-hidden">
        
        {/* Top Warning Strip */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-rose-500 animate-pulse" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4">
          <div className="p-3.5 bg-rose-100 rounded-2xl shrink-0">
            <ShieldAlert className="w-8 h-8 text-rose-600 animate-bounce" />
          </div>
          <div>
            <div className="inline-block bg-rose-100 text-rose-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
              Safety Perimeter Warning
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Geofence Flight Boundary Alert
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated Air Traffic Telemetry Safety Service
            </p>
          </div>
        </div>

        <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 space-y-2 text-xs text-rose-900">
          <div className="font-bold flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Target Drone: {telemetry?.droneName} ({telemetry?.bookingId})</span>
          </div>
          <p className="leading-relaxed">
            The drone telemetry system detected the aircraft reaching or exceeding the maximum pre-approved flight safety radius of <strong>{telemetry?.geofenceRadiusMeters} meters</strong> from origin base.
          </p>
          <div className="font-mono text-[11px] bg-white/80 p-2 rounded-xl border border-rose-200">
            GPS Location: {telemetry?.lat}° N, {telemetry?.lng}° E • Battery: {telemetry?.battery}%
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Dismiss & Keep Manual Flight
          </button>

          <button
            onClick={handleTriggerRTH}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-black text-white bg-rose-600 hover:bg-rose-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            <span>Trigger Simulated Return-To-Home</span>
          </button>
        </div>

      </div>
    </div>
  )
}

export default GeofenceAlertModal
