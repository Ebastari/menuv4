
import React, { useEffect, useState } from 'react';

interface BibitUpdate {
  bibit: string;
  masuk: number;
  keluar: number;
  mati: number;
  tanggal: string;
}

interface BibitNotificationToastProps {
  data: BibitUpdate | null;
  onClose: () => void;
}

const FORM_BIBIT_URL = "https://www.appsheet.com/start/91bfe218-36d0-4f6e-ac9e-ca32b4ddb0c7?platform=desktop#appName=RimbaRaya-863683625-25-05-22&vss=H4sIAAAAAAAAA6WOMQ7CMBAE_7K1X-ASRIEQNCAaTOHEZ8kisaPYASLLf-cSQNQR5c1pdjfj7uhxTLq-QV7y79rRCImscBo7UpAK6-BTHxoFoXDQ7RuuXOWSQkG5iq-cKELmBa78o1fAGfLJWU+9FDRpHPCR-D0pDGYBRaAdkq4amneyUAozG-ohkjnziKXlces3z057sw-G86xuIpUXf0AzE1YBAAA=&view=Bibit";

export const BibitNotificationToast: React.FC<BibitNotificationToastProps> = ({ data, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [data]);

  const handleOpenForm = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(FORM_BIBIT_URL, '_blank', 'noopener,noreferrer');
    setIsVisible(false);
    setTimeout(onClose, 700);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    setTimeout(onClose, 700);
  };

  if (!data) return null;

  return (
    <div 
      className={`fixed bottom-36 left-6 z-[100] max-w-[300px] transition-all duration-700 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}`}
    >
      <div 
        onClick={handleOpenForm}
        className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-[32px] p-5 shadow-[0_25px_60px_rgba(0,0,0,0.3)] border border-white/50 dark:border-white/10 flex flex-col gap-4 relative group cursor-pointer hover:ring-2 hover:ring-emerald-500/50 transition-all active:scale-95"
      >
        
        {/* Dismiss Button */}
        <button 
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 w-8 h-8 bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-rose-500 rounded-full flex items-center justify-center shadow-lg transition-colors border border-white dark:border-slate-700 z-20"
        >
          <i className="fas fa-times text-[10px]"></i>
        </button>

        <div className="flex items-center gap-4">
          {/* Icon Section */}
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 group-hover:rotate-12 transition-transform duration-500">
              <i className="fas fa-clipboard-list text-xl"></i>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></div>
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0">
            <h4 className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em] mb-1 leading-none">Input Data Bibit</h4>
            <p className="text-[11px] font-black text-slate-900 dark:text-white truncate uppercase tracking-tight mb-1">Klik Untuk Isi Form</p>
            <div className="flex gap-2">
              <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase">Shortcut AppSheet</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full py-3 bg-emerald-600 group-hover:bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all">
          <i className="fas fa-external-link-alt text-[8px]"></i>
          Buka Form Bibit
        </div>

        {/* Mini Preview of Latest data for context */}
        <div className="px-3 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 flex justify-between items-center">
            <span className="text-[8px] font-black text-slate-400 uppercase">Last: {data.bibit}</span>
            <span className="text-[8px] font-black text-emerald-500">+{data.masuk}</span>
        </div>

        {/* Decorative background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-[32px] pointer-events-none"></div>
      </div>
    </div>
  );
};
