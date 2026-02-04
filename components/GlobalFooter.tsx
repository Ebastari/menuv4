
import React from 'react';

const LOGO_URL = "https://i.ibb.co.com/29Gzw6k/montana-AI.jpg";

interface GlobalFooterProps {
  onOpenMontanaProfile?: () => void;
}

export const GlobalFooter: React.FC<GlobalFooterProps> = ({ onOpenMontanaProfile }) => {
  return (
    <footer className="w-full pt-20 pb-12 px-6 flex flex-col items-center text-center opacity-60 select-none">
      <div className="mb-6 relative group">
        <img 
          src={LOGO_URL} 
          alt="Montana Logo" 
          className="w-10 h-10 mx-auto opacity-50 group-hover:opacity-100 transition-opacity duration-1000 grayscale hover:grayscale-0" 
        />
        <div className="absolute inset-0 bg-emerald-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      
      <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.5em] mb-4">
        “Urip kudu urup.”
      </p>
      
      <div className="flex flex-col gap-3 pointer-events-auto">
        <div className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest flex flex-wrap justify-center gap-x-2 gap-y-1">
          <a 
            href="https://hasnurgroup.com/page/our-business/energy" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-900 dark:text-white hover:text-emerald-500 underline underline-offset-4 decoration-slate-200 dark:decoration-slate-800 transition-colors"
          >
            PT Energi Batubara Lestari
          </a>
          <span>berkerjasama dengan</span>
          <button 
            onClick={onOpenMontanaProfile}
            className="text-slate-900 dark:text-white hover:text-emerald-500 underline underline-offset-4 decoration-slate-200 dark:decoration-slate-800 transition-colors uppercase font-black"
          >
            PT Montana Wana Teknologi
          </button>
        </div>
        
        <p className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mt-2">
           Hak Cipta © 2026 PT Montana Wana Teknologi
        </p>
        <p className="text-[7px] font-bold text-slate-300 dark:text-slate-800 uppercase tracking-[0.2em]">
          Integrated Environment Management System • Version 4.5.0
        </p>
      </div>
    </footer>
  );
};
