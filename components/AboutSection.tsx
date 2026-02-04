
import React from 'react';

const LOGO_URL = "https://i.ibb.co.com/29Gzw6k/montana-AI.jpg";

interface AboutSectionProps {
  onOpenDeveloper: () => void;
  onOpenMontanaProfile: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenDeveloper, onOpenMontanaProfile }) => {
  return (
    <div className="animate-fadeIn space-y-10 pb-20">
      {/* Authoritative Definition Section */}
      <div className="bg-emerald-600 dark:bg-emerald-600 rounded-[32px] p-8 text-white shadow-xl relative overflow-hidden group">
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-xl font-black uppercase tracking-widest mb-4">Apa itu My Montana AI?</h2>
          <p className="text-sm leading-relaxed font-medium opacity-90">
            <strong>My Montana AI</strong> adalah System Knowledge terintegrasi yang dirancang untuk manajemen revegetasi dan monitoring lingkungan. Platform ini dikembangkan oleh <strong>PT Montana Wana Teknologi</strong> dan menggabungkan dokumentasi lapangan presisi tinggi (Montana Camera V2), analitik stok bibit real-time (Dashboard Bibit AI), manajemen tenaga kerja (Roster), dan perhitungan serapan karbon berbasis data geospasial.
          </p>
        </div>
      </div>

      {/* Company Focus Section */}
      <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
        <div className="flex flex-col items-center text-center relative z-10">
          <div className="relative mb-6">
            <div className="w-28 h-28 rounded-[40px] bg-slate-900 dark:bg-emerald-600 flex items-center justify-center text-white text-4xl shadow-2xl transition-transform hover:scale-110">
               <i className="fas fa-building"></i>
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white dark:bg-slate-800 rounded-2xl p-2 shadow-lg border border-slate-100 dark:border-slate-700">
               <img src={LOGO_URL} alt="Montana" className="w-full h-full object-contain" />
            </div>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase">PT Montana Wana Teknologi</h2>
          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mt-1 mb-6">Teknologi Digital & Jasa Kehutanan</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={onOpenMontanaProfile}
              className="px-6 py-4 bg-slate-900 dark:bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl active:scale-95 transition-all"
            >
              <i className="fas fa-id-card"></i> Company Profile
            </button>
            <button 
              onClick={onOpenDeveloper}
              className="px-6 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm active:scale-95 transition-all"
            >
              <i className="fas fa-microchip"></i> Tech Specs
            </button>
          </div>
        </div>
      </div>

      <section className="px-2 space-y-6">
        <blockquote className="border-l-4 border-emerald-500 pl-6 py-2">
          <p className="text-lg font-medium italic text-slate-600 dark:text-slate-300 leading-relaxed">
            “Platform ini merupakan hasil kolaborasi strategis dengan <strong>PT Energi Batubara Lestari (Hasnur Group)</strong> untuk menjembatani operasional lapangan dengan dokumentasi transparan, verifikasi GPS presisi tinggi, dan analitik berbasis AI.”
          </p>
        </blockquote>
      </section>

      <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-inner">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Strategic Partnership Portfolio</h4>
        <div className="space-y-4">
           <a 
            href="https://hasnurgroup.com/page/our-business/energy" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-between p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-colors group"
           >
             <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-emerald-500">
                 <i className="fas fa-bolt-lightning"></i>
               </div>
               <div>
                 <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight">PT Energi Batubara Lestari</p>
                 <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Hasnur Group - Energy Sector</p>
               </div>
             </div>
             <i className="fas fa-arrow-up-right-from-square text-[10px] text-slate-300 group-hover:text-emerald-500"></i>
           </a>
        </div>
      </div>

      <div className="text-center py-10 opacity-40">
         <img src={LOGO_URL} alt="Montana Logo" className="w-10 h-10 mx-auto mb-6 opacity-30 grayscale" />
         <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-2">“Urip kudu urup.”</p>
         <p className="text-[8px] font-bold uppercase tracking-widest">Hak Cipta PT Montana Wana Teknologi © 2026</p>
      </div>
    </div>
  );
};
