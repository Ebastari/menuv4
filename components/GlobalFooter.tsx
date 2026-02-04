
import React from 'react';

const LOGO_URL = "https://i.ibb.co.com/29Gzw6k/montana-AI.jpg";

interface GlobalFooterProps {
  onOpenMontanaProfile?: () => void;
}

export const GlobalFooter: React.FC<GlobalFooterProps> = ({ onOpenMontanaProfile }) => {
  return (
    <footer className="w-full pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12 px-4 sm:px-6 flex flex-col items-center text-center opacity-60 select-none">
      <div className="mb-4 sm:mb-6 relative group">
        <img 
          src={LOGO_URL} 
          alt="Montana Logo" 
          className="w-8 h-8 sm:w-10 sm:h-10 mx-auto opacity-50 group-hover:opacity-100 transition-opacity duration-1000 grayscale hover:grayscale-0" 
        />
        <div className="absolute inset-0 bg-emerald-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      
      <p className="text-[9px] sm:text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-[0.3em] sm:tracking-[0.5em] mb-3 sm:mb-4">
        "Urip kudu urup."
      </p>
      
      <div className="flex flex-col gap-2 sm:gap-3 pointer-events-auto w-full max-w-md">
        <div className="text-[9px] sm:text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider flex flex-wrap justify-center gap-x-1.5 gap-y-1 items-center px-2">
          <a 
            href="https://hasnurgroup.com/page/our-business/energy" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-900 dark:text-white hover:text-emerald-500 underline underline-offset-2 sm:underline-offset-4 decoration-slate-200 dark:decoration-slate-800 transition-colors px-1.5 py-2 -mx-1.5 min-h-[44px] flex items-center"
          >
            PT Energi Batubara Lestari
          </a>
          <span className="py-2 text-slate-500 dark:text-slate-400 whitespace-nowrap">berkerjasama dengan</span>
          <button 
            onClick={onOpenMontanaProfile}
            className="text-slate-900 dark:text-white hover:text-emerald-500 underline underline-offset-2 sm:underline-offset-4 decoration-slate-200 dark:decoration-slate-800 transition-colors uppercase font-black px-1.5 py-2 -mx-1.5 min-h-[44px] flex items-center"
          >
            PT Montana Wana Teknologi
          </button>
        </div>
        
        <p className="text-[8px] sm:text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-2">
           Hak Cipta © 2026 PT Montana Wana Teknologi
        </p>
        <p className="text-[6px] sm:text-[7px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.1em] sm:tracking-[0.2em]">
          Integrated Environment Management System v4.5.0
        </p>
      </div>
    </footer>
  );
};
