
import React from 'react';

interface DeveloperInfoProps {
  onClose: () => void;
}

export const DeveloperInfo: React.FC<DeveloperInfoProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-y-auto bg-slate-950/80 backdrop-blur-3xl">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-2xl border border-white/50 dark:border-slate-800 max-h-[90vh] overflow-y-auto no-scrollbar">
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 z-10">
          <i className="fas fa-times"></i>
        </button>

        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-slate-900 dark:bg-emerald-600 rounded-full flex items-center justify-center text-white text-3xl mx-auto shadow-2xl shadow-emerald-600/20">
              <i className="fas fa-microchip"></i>
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase">Technical Specification</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">PT Montana Wana Teknologi Core Engine</p>
          </div>

          {/* Company Tech Info */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[32px] p-6 border border-slate-100 dark:border-slate-700">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">Digital Environment Architecture</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>My Montana AI</strong> adalah ekosistem digital yang dirancang untuk menjawab tantangan monitoring reklamasi tambang di Indonesia. Sistem ini telah melalui tahap pengujian dan implementasi intensif di <strong>PT Energi Batubara Lestari (Hasnur Group)</strong>.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-3">
              Fokus utama arsitektur kami adalah menghadirkan transparansi data lingkungan menggunakan <strong>Field-First Architecture</strong>, memastikan setiap koordinat dan citra yang dikirimkan memiliki integritas tinggi untuk keperluan audit dan kepatuhan lingkungan.
            </p>
          </div>

          {/* Focus Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-800">
              <h3 className="text-lg font-black text-emerald-700 dark:text-emerald-400 mb-4 flex items-center gap-2">
                <i className="fas fa-target"></i> Bidang Keahlian
              </h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li>• Sistem Knowledge Management Revegetasi</li>
                <li>• Analitik Stok Bibit Nursery (AI Dashboard)</li>
                <li>• Integrasi GIS & Cloud Data Sync</li>
                <li>• Monitoring Karbon & Biomassa Digital</li>
                <li>• PWA & Mobile System Integration</li>
                <li>• Security Authentication (Biometric & GPS)</li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
              <h3 className="text-lg font-black text-blue-700 dark:text-blue-400 mb-4 flex items-center gap-2">
                <i className="fas fa-code-branch"></i> Framework Tech
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">Montana Core</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">React, Tailwind CSS, Google Apps Script Engine</p>
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">Security Layer</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">SHA-256 Auth, Geofencing, Biometric Sync</p>
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">Geospatial</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Leaflet, Open-Meteo API, ArcGIS REST Service</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Copyright inside Modal */}
          <div className="text-center pt-8 border-t border-slate-100 dark:border-slate-800 opacity-40">
            <p className="text-[10px] font-black uppercase tracking-widest">Hak Cipta Oleh PT Montana Wana Teknologi © 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};
