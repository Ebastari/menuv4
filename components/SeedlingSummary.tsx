
import React, { useState, useEffect, useMemo } from 'react';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby09rbjwN2EcVRwhsNBx8AREI7k41LY1LrZ-W4U36HmzMB5BePD9h8wBSVPJwa_Ycduvw/exec?sheet=Bibit";
const CACHE_KEY = "montana_seedling_cache";

interface BibitRow {
  tanggal: Date;
  bibit: string;
  masuk: number;
  keluar: number;
  mati: number;
}

export const SeedlingSummary: React.FC = () => {
  const [rawData, setRawData] = useState<BibitRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  // Load from cache on mount
  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        const normalized = parsed.map((r: any) => ({
          ...r,
          tanggal: new Date(r.tanggal)
        }));
        setRawData(normalized);
        setLoading(false);
      } catch (e) {
        console.error("Cache corrupted");
      }
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch(SCRIPT_URL);
      const json = await res.json();
      const rows = Array.isArray(json) ? json : (json.Bibit || []);
      
      const normalized = rows.map((r: any) => ({
        tanggal: new Date(r.Tanggal || r.tanggal),
        bibit: (r.Bibit || r.jenis || '').toString().trim(),
        masuk: parseInt(r.Masuk || 0),
        keluar: parseInt(r.Keluar || 0),
        mati: parseInt(r.Mati || 0)
      })).filter((r: any) => !isNaN(r.tanggal.getTime()));

      setRawData(normalized);
      localStorage.setItem(CACHE_KEY, JSON.stringify(normalized));
    } catch (err) {
      console.error("Sync error:", err);
    } finally {
      setLoading(false);
      setIsSyncing(false);
    }
  };

  const resume = useMemo(() => {
    const today = new Date().toLocaleDateString('id-ID');
    let totalIn = 0, totalOut = 0, totalDead = 0, todayOut = 0;
    
    // Last 7 days trend for mini chart
    const trendMap: Record<string, {in: number, out: number}> = {};
    
    rawData.forEach(r => {
      totalIn += r.masuk;
      totalOut += r.keluar;
      totalDead += r.mati;
      
      const dateStr = r.tanggal.toLocaleDateString('id-ID');
      if (dateStr === today) todayOut += r.keluar;

      // Group for chart (last 7 entries usually represent recent days)
      const shortDate = r.tanggal.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
      if (!trendMap[shortDate]) trendMap[shortDate] = { in: 0, out: 0 };
      trendMap[shortDate].in += r.masuk;
      trendMap[shortDate].out += r.keluar;
    });

    const trendData = Object.entries(trendMap).slice(-7).map(([label, val]) => ({ label, ...val }));

    return { totalIn, totalOut, totalDead, todayOut, trendData };
  }, [rawData]);

  if (loading) return (
    <div className="w-full h-48 bg-white/50 dark:bg-slate-900/50 rounded-[44px] animate-pulse flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800">
      <i className="fas fa-sync fa-spin text-emerald-500 mb-4"></i>
      <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Initializing Local Cache...</p>
    </div>
  );

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Header with Sync Status */}
      <div className="flex items-end justify-between px-2">
        <div>
          <h3 className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.4em] mb-2 leading-none">Smart Resume</h3>
          <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">Dashboard Performa Bibit</p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[8px] font-black uppercase tracking-widest transition-all ${isSyncing ? 'bg-amber-500/10 border-amber-500/20 text-amber-600' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600'}`}>
           <i className={`fas ${isSyncing ? 'fa-sync fa-spin' : 'fa-check-circle'}`}></i>
           {isSyncing ? 'Syncing Server...' : 'Data Synced'}
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Today Focus */}
        <div className="bg-slate-900 dark:bg-emerald-600 rounded-[44px] p-8 text-white shadow-2xl shadow-emerald-900/20 relative overflow-hidden group col-span-1 md:col-span-1">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
          <div className="relative z-10">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Keluar Hari Ini</p>
            <h4 className="text-5xl font-black tracking-tighter tabular-nums mb-1">{resume.todayOut.toLocaleString()}</h4>
            <p className="text-[8px] font-bold uppercase tracking-widest opacity-40">Realisasi Harian</p>
            <div className="mt-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <i className="fas fa-truck-ramp-box text-xs"></i>
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest">Siap Tanam</span>
            </div>
          </div>
        </div>

        {/* Total In */}
        <div className="bg-white dark:bg-slate-900 rounded-[44px] p-8 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
           <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
                 <i className="fas fa-box-open text-sm"></i>
              </div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Masuk</p>
              <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums">+{resume.totalIn.toLocaleString()}</h4>
           </div>
           <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800">
              <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Inventory Log</span>
           </div>
        </div>

        {/* Total Out */}
        <div className="bg-white dark:bg-slate-900 rounded-[44px] p-8 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
           <div>
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center mb-4">
                 <i className="fas fa-dolly text-sm"></i>
              </div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Keluar</p>
              <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums">-{resume.totalOut.toLocaleString()}</h4>
           </div>
           <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800">
              <span className="text-[8px] font-black text-orange-500 uppercase tracking-widest">Planting Realization</span>
           </div>
        </div>

        {/* Total Dead */}
        <div className="bg-white dark:bg-slate-900 rounded-[44px] p-8 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
           <div>
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center mb-4">
                 <i className="fas fa-skull text-sm"></i>
              </div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Mati</p>
              <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums">-{resume.totalDead.toLocaleString()}</h4>
           </div>
           <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800">
              <span className="text-[8px] font-black text-rose-500 uppercase tracking-widest">Loss Management</span>
           </div>
        </div>
      </div>

      {/* Mini Trend Visualization */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl rounded-[44px] p-10 border border-slate-100 dark:border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h4 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest leading-none mb-1">Visualisasi Tren 7 Periode</h4>
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em]">Perbandingan Masuk vs Keluar</p>
          </div>
          <div className="flex gap-4">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">In</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Out</span>
             </div>
          </div>
        </div>

        {/* SVG Chart */}
        <div className="h-48 w-full flex items-end gap-2 md:gap-4 px-2">
           {resume.trendData.map((d, i) => {
             const max = Math.max(...resume.trendData.map(x => Math.max(x.in, x.out)), 1);
             const inHeight = (d.in / max) * 100;
             const outHeight = (d.out / max) * 100;
             
             return (
               <div key={i} className="flex-1 flex flex-col items-center gap-3 h-full group">
                 <div className="flex-1 w-full flex items-end justify-center gap-1 relative">
                    {/* Bar In */}
                    <div 
                      className="w-[35%] bg-emerald-500/20 group-hover:bg-emerald-500 rounded-t-lg transition-all duration-500 relative"
                      style={{ height: `${Math.max(5, inHeight)}%` }}
                    >
                       <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-emerald-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded shadow-lg z-20">
                         {d.in}
                       </div>
                    </div>
                    {/* Bar Out */}
                    <div 
                      className="w-[35%] bg-orange-500/20 group-hover:bg-orange-500 rounded-t-lg transition-all duration-500 relative"
                      style={{ height: `${Math.max(5, outHeight)}%` }}
                    >
                       <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-orange-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded shadow-lg z-20">
                         {d.out}
                       </div>
                    </div>
                 </div>
                 <span className="text-[8px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-tighter truncate w-full text-center">
                   {d.label}
                 </span>
               </div>
             );
           })}
        </div>

        {/* Global Stock Net */}
        <div className="mt-12 p-6 bg-slate-50 dark:bg-white/5 rounded-[32px] border border-black/5 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-lg">
                 <i className="fas fa-warehouse"></i>
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Inventory Net</p>
                 <p className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">
                   {(resume.totalIn - resume.totalOut - resume.totalDead).toLocaleString()} <span className="text-[10px] opacity-40 ml-1">POHON</span>
                 </p>
              </div>
           </div>
           <button 
             onClick={() => fetchData()}
             className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-emerald-500 transition-colors"
             title="Force Refresh Sync"
           >
              <i className={`fas fa-redo-alt text-xs ${isSyncing ? 'fa-spin' : ''}`}></i>
           </button>
        </div>
      </div>

      <p className="text-center text-[8px] font-black text-slate-400 uppercase tracking-[0.5em] opacity-40">
        Professional Stock Management Engine • V4.5
      </p>
    </div>
  );
};
