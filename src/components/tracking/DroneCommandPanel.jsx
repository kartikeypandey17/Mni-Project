import React, { useState } from 'react'
import { Navigation, Pause, ArrowDownCircle, Camera, ShieldAlert, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react'

function DroneCommandPanel({ telemetry, onRTH, onHold, onLand, onSnapshot, isRefreshing, onRefresh }) {
  const [showConfirmLandModal, setShowConfirmLandModal] = useState(false)

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <span>Remote Command Console</span>
            <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300">
              Virtual Link • Simulated Mode
            </span>
          </h3>
          <p className="text-xs text-slate-500">
            Development command test console. Physical drone hardware is not bound; commands execute inside simulated flight environment.
          </p>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-2">
          {telemetry.statusType === 'rth' && (
            <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>🚀 [Simulated] Return to Home</span>
            </span>
          )}

          {telemetry.statusType === 'landing' && (
            <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 text-xs font-bold px-3 py-1.5 rounded-full border border-purple-200">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
              <span>🛬 [Simulated] Emergency Landing</span>
            </span>
          )}

          {telemetry.statusType === 'standby' && (
            <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-full border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-slate-500" />
              <span>⏸️ [Simulated] Position Hold</span>
            </span>
          )}

          {telemetry.statusType === 'active' && (
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>🟢 [Simulated] Active Stream</span>
            </span>
          )}

          {telemetry.statusType === 'alert' && (
            <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 text-xs font-bold px-3 py-1.5 rounded-full border border-rose-200">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-bounce" />
              <span>⚠️ Low Battery Alert</span>
            </span>
          )}

          <button
            onClick={onRefresh}
            className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            title="Force Sync Telemetry Feed"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
        </div>
      </div>

      {/* COMMAND ACTION BUTTONS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        
        {/* RTH Button */}
        <button
          onClick={onRTH}
          className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm group cursor-pointer border border-slate-800"
        >
          <Navigation className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform mb-1" />
          <span className="text-xs font-extrabold">Simulate RTH</span>
          <span className="text-[10px] text-slate-400 font-medium">Virtual Waypoint</span>
        </button>

        {/* Hover / Hold Button */}
        <button
          onClick={onHold}
          className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm group cursor-pointer border border-slate-800"
        >
          <Pause className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform mb-1" />
          <span className="text-xs font-extrabold">Simulate Hold</span>
          <span className="text-[10px] text-slate-400 font-medium">Pause Virtual Path</span>
        </button>

        {/* FPV Photo Capture */}
        <button
          onClick={onSnapshot}
          className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm group cursor-pointer border border-slate-800"
        >
          <Camera className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform mb-1" />
          <span className="text-xs font-extrabold">Virtual Snapshot</span>
          <span className="text-[10px] text-slate-400 font-medium">Capture Simulation Frame</span>
        </button>

        {/* Emergency Land Button */}
        <button
          onClick={() => setShowConfirmLandModal(true)}
          className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 transition-all border border-rose-200 shadow-2xs group cursor-pointer"
        >
          <ArrowDownCircle className="w-5 h-5 text-rose-600 group-hover:scale-110 transition-transform mb-1" />
          <span className="text-xs font-extrabold">Simulate Land</span>
          <span className="text-[10px] text-rose-500 font-medium">Virtual Descent</span>
        </button>

      </div>

      {/* CONFIRM LAND MODAL */}
      {showConfirmLandModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-3 bg-rose-100 rounded-2xl">
                <AlertTriangle className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h4 className="text-lg font-black text-slate-900">Simulate Controlled Landing</h4>
                <p className="text-xs text-slate-500">Virtual Flight Simulator Environment</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Execute a simulated landing for <strong>{telemetry.droneName}</strong> at virtual coordinates ({telemetry.lat}° N, {telemetry.lng}° E)?
            </p>
            <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 font-medium">
              ℹ️ Simulated Telemetry Mode: No physical drone hardware motors are engaged.
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirmLandModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirmLandModal(false)
                  onLand()
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors cursor-pointer shadow-md"
              >
                Execute Simulated Landing
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default DroneCommandPanel
