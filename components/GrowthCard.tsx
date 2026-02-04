
import React, { useMemo } from 'react';
import { GrowthLevel } from '../types';
import { LEVEL_THRESHOLDS } from '../constants';

interface GrowthCardProps {
  currentSeconds: number;
}

export const GrowthCard: React.FC<GrowthCardProps> = ({ currentSeconds }) => {
  const formattedTime = useMemo(() => {
    const days = Math.floor(currentSeconds / 86400);
    const hours = Math.floor((currentSeconds % 86400) / 3600);
    const minutes = Math.floor((currentSeconds % 3600) / 60);
    const seconds = currentSeconds % 60;
    return `${days}h ${hours}j ${minutes}m ${seconds}d`;
  }, [currentSeconds]);

  const growthData = useMemo(() => {
    const rimbaThreshold = LEVEL_THRESHOLDS[GrowthLevel.RIMBA];
    const totalProgress = Math.min(100, Math.round((currentSeconds / rimbaThreshold) * 100));

    let currentLevel = GrowthLevel.SEMAI;
    if (currentSeconds >= LEVEL_THRESHOLDS[GrowthLevel.RIMBA]) currentLevel = GrowthLevel.RIMBA;
    else if (currentSeconds >= LEVEL_THRESHOLDS[GrowthLevel.POHON]) currentLevel = GrowthLevel.POHON;
    else if (currentSeconds >= LEVEL_THRESHOLDS[GrowthLevel.TIANG]) currentLevel = GrowthLevel.TIANG;
    else if (currentSeconds >= LEVEL_THRESHOLDS[GrowthLevel.PANCANG]) currentLevel = GrowthLevel.PANCANG;

    return { currentLevel, totalProgress };
  }, [currentSeconds]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[52px] p-10 shadow-2xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-white/5 transition-transform duration-300 group relative overflow-hidden">
      {/* Dynamic Glow Decor */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[80px] group-hover:opacity-100 group-hover:scale-125 transition-opacity duration-1000 will-change-transform"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-12">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-emerald-600 rounded-[30px] flex items-center justify-center text-white text-4xl shadow-2xl shadow-emerald-500/30 group-hover:rotate-12 transition-transform duration-700 ring-4 ring-emerald-500/10">
              <i className="fas fa-seedling"></i>
            </div>
            <div>
              <h3 className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.5em] mb-3 leading-none opacity-80">Ecosystem Status</h3>
              <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{growthData.currentLevel}</p>
            </div>
          </div>
          <div className="text-right bg-slate-50 dark:bg-white/5 px-6 py-4 rounded-[28px] border border-black/[0.03] dark:border-white/5">
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tighter leading-none tabular-nums drop-shadow-sm">{formattedTime}</p>
            <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2 leading-none">Active Runtime</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="relative pt-6">
            <div className="relative h-4 w-full bg-slate-100 dark:bg-slate-800/60 rounded-full overflow-hidden shadow-inner ring-1 ring-black/5 dark:ring-white/5">
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 rounded-full transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                style={{ width: `${growthData.totalProgress}%` }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
            <div 
              className="absolute top-1.5 w-7 h-7 rounded-full bg-white dark:bg-slate-950 shadow-2xl border-[4px] border-emerald-500 transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-20 flex items-center justify-center"
              style={{ left: `calc(${growthData.totalProgress}% - 14px)` }}
            >
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest px-2">
            {[GrowthLevel.SEMAI, GrowthLevel.PANCANG, GrowthLevel.TIANG, GrowthLevel.POHON, GrowthLevel.RIMBA].map(level => (
               <span key={level} className={`transition-transform duration-700 ${growthData.currentLevel === level ? 'text-emerald-600 dark:text-emerald-400 scale-110 drop-shadow-sm' : 'text-slate-300 dark:text-slate-600'}`}>
                 {level}
               </span>
            ))}
          </div>

          <div className="bg-slate-50/80 dark:bg-white/5 rounded-[40px] p-8 flex justify-between items-center group-hover:bg-emerald-50/60 dark:group-hover:bg-white/[0.07] transition-colors duration-500 border border-black/5 dark:border-white/5">
            <div>
              <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-2 leading-none">Global Progress</p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums">{growthData.totalProgress}%</p>
                <span className="text-emerald-500 text-xs font-black animate-bounce"><i className="fas fa-arrow-trend-up"></i></span>
              </div>
            </div>
            <div className="text-right space-y-3">
               <div className="inline-flex items-center gap-2.5 bg-emerald-500 text-white px-5 py-2 rounded-full shadow-xl shadow-emerald-500/20 ring-4 ring-emerald-500/5">
                 <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                 <p className="text-[9px] font-black uppercase tracking-widest">Target 30 Hari</p>
               </div>
               <p className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Environmentally Certified Engine</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
