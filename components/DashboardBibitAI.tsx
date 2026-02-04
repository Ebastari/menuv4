import React from 'react';

interface DashboardBibitAIProps {
  onClose: () => void;
}

export const DashboardBibitAI: React.FC<DashboardBibitAIProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[200] bg-white dark:bg-slate-950 flex flex-col animate-fadeIn overflow-hidden">
      {/* Header dengan Tombol Kembali */}
      <header className="flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 z-50">
        <button 
          onClick={onClose}
          className="flex items-center gap-3 px-5 py-2.5 bg-slate-900 dark:bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-emerald-900/10 hover:shadow-emerald-900/20"
        >
          <i className="fas fa-arrow-left"></i>
          <span>Kembali ke Beranda</span>
        </button>
        
        <div className="text-right">
          <h2 className="text-[12px] font-black uppercase tracking-tighter text-slate-900 dark:text-white leading-none">Montana AI Dashboard</h2>
          <p className="text-[8px] font-bold text-emerald-600 uppercase tracking-widest mt-1">Smart Analytics V4.5</p>
        </div>
      </header>

      {/* Konten Utama: Iframe Dashboard Eksternal */}
      <div className="flex-1 w-full bg-slate-100 dark:bg-slate-900 relative">
        <iframe 
          src="https://ebastari.github.io/dasboard-AI/testdas45.html" 
          className="w-full h-full border-none"
          title="Montana AI External Dashboard"
          loading="lazy"
          allow="geolocation; camera; microphone"
        ></iframe>
      </div>

      {/* Footer Status Bar */}
      <footer className="px-6 py-2 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 flex justify-between items-center">
        <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Internal Node Connection Active</span>
        <div className="flex gap-2">
          <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
          <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse delay-75"></div>
          <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse delay-150"></div>
        </div>
      </footer>
    </div>
  );
};