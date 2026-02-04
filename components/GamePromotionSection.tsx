
import React from 'react';

export const GamePromotionSection: React.FC = () => {
  // 6 Foto asli dari aset yang diunggah
  const photos = [
    {
      src: "1.jpg.jpeg",
      label: "Simulation Core"
    },
    {
      src: "2.jpg.jpeg",
      label: "Strategic Planning"
    },
    {
      src: "3.jpg.jpeg",
      label: "Ecosystem Analysis"
    },
    {
      src: "4.jpg.jpeg",
      label: "Target Mapping"
    },
    {
      src: "5.jpg.jpeg",
      label: "Growth Engine"
    },
    {
      src: "6.jpg.jpeg",
      label: "Final Objective"
    }
  ];

  const handlePlayGame = () => {
    window.open('https://pokemonkey1.vercel.app/', '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="px-6 py-16 max-w-[1440px] mx-auto animate-fadeIn">
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[56px] p-8 md:p-16 border border-white/40 dark:border-white/10 shadow-[0_32px_120px_rgba(0,0,0,0.1)] relative overflow-hidden group/card">
        
        {/* Dekorasi Latar Belakang - Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover/card:bg-emerald-500/20 transition-colors duration-1000"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Header Section */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-3 bg-slate-900 dark:bg-emerald-600 text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4 shadow-2xl shadow-emerald-500/20">
              <i className="fas fa-gamepad animate-bounce"></i>
              Interactive Simulation
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">
              Game <span className="text-emerald-600">Pokemonkey</span> <br className="hidden md:block" />
              <span className="opacity-80">Planing Target 2026 Reklamasi</span>
            </h2>
            <div className="flex items-center justify-center gap-4">
               <div className="h-[1px] w-12 bg-slate-200 dark:bg-slate-700"></div>
               <p className="text-lg md:text-2xl font-medium italic text-slate-500 dark:text-slate-400">
                “Pekerjaan serasa bermain tapi hasil bukan main-main”
               </p>
               <div className="h-[1px] w-12 bg-slate-200 dark:bg-slate-700"></div>
            </div>
          </div>

          {/* 6 Photo Grid - Menggunakan Aset Lokal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mb-16">
            {photos.map((item, idx) => (
              <div 
                key={idx} 
                className="aspect-video rounded-[32px] overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl group relative cursor-pointer transform hover:-translate-y-2 transition-all duration-500"
              >
                <img 
                  src={item.src} 
                  alt={item.label} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop`; // Fallback jika path lokal bermasalah
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-1">Aset Digital {idx + 1}</span>
                  <h4 className="text-white font-black text-lg uppercase tracking-tight">{item.label}</h4>
                </div>
                {/* Overlay Subtle Glow */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[32px]"></div>
              </div>
            ))}
          </div>

          {/* Call to Action Button */}
          <div className="relative group/btn">
            <div className="absolute -inset-4 bg-emerald-500/30 rounded-[40px] blur-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
            <button 
              onClick={handlePlayGame}
              className="relative flex items-center gap-6 px-16 py-8 bg-slate-900 dark:bg-emerald-600 text-white rounded-[32px] font-black text-sm md:text-base uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></div>
              <i className="fas fa-play-circle text-3xl group-hover:rotate-12 transition-transform"></i>
              <span>Mulai Simulasi Sekarang</span>
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all">
            <i className="fab fa-unity text-2xl"></i>
            <i className="fas fa-vr-cardboard text-2xl"></i>
            <i className="fas fa-microchip text-2xl"></i>
          </div>

          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.5em] mt-10">
            Professional Reclamation Simulation Engine
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};
