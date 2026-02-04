
import React from 'react';

export const PlayStoreSection: React.FC = () => {
  const playStoreLink = "https://play.google.com/store/apps/details?id=com.laksa.mymontanaai";
  const webLink = "https://montana-tech.info/";

  return (
    <section className="px-6 py-12 max-w-[1440px] mx-auto animate-fadeIn">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-emerald-900/40 dark:to-slate-950 rounded-[48px] p-10 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden group">
        
        {/* Decorative Background Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px]"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-3 bg-emerald-500/20 border border-emerald-500/30 px-4 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Mobile App Available</p>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight uppercase">
              Tersedia di <br />
              <span className="text-emerald-500">Google Play Store</span>
            </h2>
            
            <p className="text-sm md:text-base font-medium text-slate-400 leading-relaxed max-w-xl">
              Dapatkan pengalaman monitoring nursery dan reklamasi yang lebih stabil, cepat, dan terintegrasi penuh dengan fitur hardware smartphone Anda. Unduh Montana AI Pro sekarang.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <div className="flex items-center gap-3 text-white/40">
                <i className="fas fa-check-circle text-emerald-500"></i>
                <span className="text-[10px] font-black uppercase tracking-widest">Ringan & Cepat</span>
              </div>
              <div className="flex items-center gap-3 text-white/40">
                <i className="fas fa-check-circle text-emerald-500"></i>
                <span className="text-[10px] font-black uppercase tracking-widest">Notifikasi Real-time</span>
              </div>
            </div>
          </div>

          {/* Action Buttons & Badges */}
          <div className="flex flex-col items-center gap-6 bg-white/5 backdrop-blur-xl p-10 rounded-[40px] border border-white/10 shadow-2xl">
            <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em] mb-2">Unduh Segera</p>
            
            <a 
              href={playStoreLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group/badge transition-transform hover:scale-105 active:scale-95"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Get it on Google Play" 
                className="h-20 md:h-24 drop-shadow-2xl"
              />
            </a>

            <div className="w-full h-[1px] bg-white/10 my-2"></div>

            <div className="text-center space-y-4">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                Atau akses melalui browser Anda:
              </p>
              <a 
                href={webLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/10 text-[11px] font-black uppercase tracking-widest transition-all"
              >
                <i className="fas fa-globe"></i>
                Versi Web : Montana-Tech.info
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>
      </div>
    </section>
  );
};
