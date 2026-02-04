
import React from 'react';

const LOGO_URL = "https://i.ibb.co.com/29Gzw6k/montana-AI.jpg";

interface AboutSectionProps {
  onOpenDeveloper: () => void;
  onOpenMontanaProfile: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenDeveloper, onOpenMontanaProfile }) => {
  return (
    <div className="animate-fadeIn space-y-6 sm:space-y-10 pb-12 sm:pb-20">
      {/* Authoritative Definition Section */}
      <div className="bg-emerald-600 dark:bg-emerald-600 rounded-xl sm:rounded-[32px] p-4 sm:p-8 text-white shadow-xl relative overflow-hidden group">
        <div className="absolute -right-10 -bottom-10 sm:-right-20 sm:-bottom-20 w-32 h-32 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-xl sm:blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-base sm:text-xl font-black uppercase tracking-widest mb-2 sm:mb-4">Apa itu My Montana AI?</h2>
          <p className="text-xs sm:text-sm leading-relaxed font-medium opacity-90">
            <strong>My Montana AI</strong> adalah System Knowledge terintegrasi untuk manajemen revegetasi dan monitoring lingkungan.
          </p>
        </div>
      </div>

      {/* Company Focus Section */}
      <div className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-[32px] p-4 sm:p-8 shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
        <div className="absolute -right-5 -top-5 sm:-right-10 sm:-top-10 w-20 h-20 sm:w-40 sm:h-40 bg-emerald-500/10 rounded-full blur-xl sm:blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
        <div className="flex flex-col items-center text-center relative z-10">
          <div className="relative mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-28 sm:h-28 rounded-2xl sm:rounded-[40px] bg-slate-900 dark:bg-emerald-600 flex items-center justify-center text-2xl sm:text-4xl shadow-xl transition-transform hover:scale-110">
               <i className="fas fa-building"></i>
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 sm:w-10 sm:h-10 bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-lg border border-slate-100 dark:border-slate-700">
               <img src={LOGO_URL} alt="Montana" className="w-full h-full object-contain" />
            </div>
          </div>
          <h2 className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase">PT Montana Wana Teknologi</h2>
          <p className="text-[9px] sm:text-[10px] font-black text-emerald-600 uppercase tracking-[0.15em] sm:tracking-[0.2em] mt-1 mb-4 sm:mb-6">Teknologi Digital & Jasa Kehutanan</p>
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 w-full">
            <button 
              onClick={onOpenMontanaProfile}
              className="flex-1 sm:flex-none px-4 sm:px-6 py-3 sm:py-4 bg-slate-900 dark:bg-emerald-600 text-white rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all min-w-[44px] min-h-[44px]"
            >
              <i className="fas fa-id-card"></i> Profile
            </button>
            <button 
              onClick={onOpenDeveloper}
              className="flex-1 sm:flex-none px-4 sm:px-6 py-3 sm:py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all min-w-[44px] min-h-[44px]"
            >
              <i className="fas fa-microchip"></i> Tech Specs
            </button>
          </div>
        </div>
      </div>

      <section className="px-2 sm:px-2 space-y-4 sm:space-y-6">
        <blockquote className="border-l-2 sm:border-l-4 border-emerald-500 pl-3 sm:pl-6 py-2">
          <p className="text-xs sm:text-lg font-medium italic text-slate-600 dark:text-slate-300 leading-relaxed">
            "Platform ini merupakan hasil kolaborasi strategis dengan <strong>PT Energi Batubara Lestari (Hasnur Group)</strong> untuk menjembatani operasional lapangan dengan dokumentasi transparan dan analitik berbasis AI."
          </p>
        </blockquote>
      </section>

      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 sm:p-8 rounded-xl sm:rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-inner">
        <h4 className="text-[9px] sm:text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4 sm:mb-6">Strategic Partnership</h4>
        <div className="space-y-3 sm:space-y-4">
           <a 
            href="https://hasnurgroup.com/page/our-business/energy" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-between p-3 sm:p-5 bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-colors group min-h-[44px]"
           >
             <div className="flex items-center gap-2 sm:gap-4 min-w-0">
               <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 dark:bg-slate-800 rounded-lg sm:rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-emerald-500 flex-shrink-0">
                 <i className="fas fa-bolt-lightning"></i>
               </div>
               <div className="min-w-0">
                 <p className="text-[10px] sm:text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight truncate">PT Energi Batubara Lestari</p>
                 <p className="text-[7px] sm:text-[8px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">Hasnur Group - Energy Sector</p>
               </div>
             </div>
             <i className="fas fa-arrow-up-right-from-square text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 group-hover:text-emerald-500 flex-shrink-0 ml-2"></i>
           </a>
        </div>
      </div>

      <div className="text-center py-8 sm:py-10 opacity-40">
         <img src={LOGO_URL} alt="Montana Logo" className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-4 sm:mb-6 opacity-30 grayscale" />
         <p className="text-[9px] sm:text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-2">"Urip kudu urup."</p>
         <p className="text-[7px] sm:text-[8px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Hak Cipta © 2026 PT Montana Wana Teknologi</p>
      </div>
    </div>
  );
};
