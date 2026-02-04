
import React, { useState, useMemo, useEffect } from 'react';
import { ROSTER_TEAM, ROSTER_START_DATE, ShiftType } from '../data/rosterData';

export const RosterWidget: React.FC = () => {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'today' | 'full'>('today');
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Logika mendapatkan index shift berdasarkan tanggal
  const rosterIndex = useMemo(() => {
    // Untuk keperluan demo/testing, jika tahun sekarang bukan 2026, kita simulasikan sebagai 27 Jan 2026
    const targetDate = currentDate.getFullYear() === 2026 ? currentDate : new Date(2026, 0, 27);
    
    const diffTime = targetDate.getTime() - ROSTER_START_DATE.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Pastikan index berada dalam rentang 0-30
    if (diffDays < 0) return 0;
    if (diffDays > 30) return 30;
    return diffDays;
  }, [currentDate]);

  const displayedDateLabel = useMemo(() => {
    const targetDate = currentDate.getFullYear() === 2026 ? currentDate : new Date(2026, 0, 27);
    return targetDate.toLocaleDateString('id-ID', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  }, [currentDate]);

  const teamWithCurrentShift = useMemo(() => {
    return ROSTER_TEAM.map(person => ({
      ...person,
      currentShift: person.shifts[rosterIndex]
    }));
  }, [rosterIndex]);

  const stats = useMemo(() => {
    return {
      d: teamWithCurrentShift.filter(p => p.currentShift === 'D').length,
      thr: teamWithCurrentShift.filter(p => p.currentShift === 'THR').length,
      off: teamWithCurrentShift.filter(p => p.currentShift === 'OFF').length,
      total: teamWithCurrentShift.length
    };
  }, [teamWithCurrentShift]);

  const filteredTeam = teamWithCurrentShift.filter(p => 
    p.nama.toLowerCase().includes(search.toLowerCase()) || 
    p.jabatan.toLowerCase().includes(search.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  const getShiftLabel = (shift: ShiftType) => {
    switch (shift) {
      case 'D': return 'Shift Siang';
      case 'THR': return 'Tahura-DAS';
      case 'OFF': return 'Libur (OFF)';
      default: return shift;
    }
  };

  const getShiftColorClass = (shift: ShiftType) => {
    switch (shift) {
      case 'D': return 'bg-emerald-500 text-white shadow-emerald-500/20';
      case 'THR': return 'bg-orange-500 text-white shadow-orange-500/20';
      case 'OFF': return 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-600';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  return (
    <div className="space-y-6 animate-drift-puff">
      {/* Header & Search */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight uppercase leading-none">
              Status Tim <span className="text-emerald-600 dark:text-emerald-400">Revegetasi</span>
            </h1>
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] mt-2">{displayedDateLabel}</p>
          </div>
          <div className="relative">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 text-[11px]"></i>
            <input 
              type="text" 
              placeholder="Cari personil..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 pr-5 py-3 bg-white/60 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl text-[11px] font-black uppercase tracking-widest focus:ring-2 focus:ring-emerald-500 outline-none w-full md:w-64 transition-all dark:text-slate-100 dark:placeholder:text-slate-700 shadow-sm"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 p-5 rounded-[28px] backdrop-blur-md shadow-sm">
            <p className="text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1 leading-none">Shift Siang</p>
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tighter tabular-nums">{stats.d}</h2>
          </div>
          <div className="bg-orange-500/10 dark:bg-orange-500/20 border border-orange-500/20 p-5 rounded-[28px] backdrop-blur-md shadow-sm">
            <p className="text-orange-600 dark:text-orange-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1 leading-none">Tahura-DAS</p>
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tighter tabular-nums">{stats.thr}</h2>
          </div>
          <div className="bg-slate-500/10 dark:bg-slate-500/20 border border-slate-500/20 p-5 rounded-[28px] backdrop-blur-md shadow-sm">
            <p className="text-slate-500 dark:text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1 leading-none">Total Crew</p>
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tighter tabular-nums">{stats.total}</h2>
          </div>
          <div className="bg-rose-500/10 dark:bg-rose-500/20 border border-rose-500/20 p-5 rounded-[28px] backdrop-blur-md shadow-sm">
            <p className="text-rose-600 dark:text-rose-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1 leading-none">Libur (OFF)</p>
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tighter tabular-nums">{stats.off}</h2>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-slate-200 dark:border-slate-800/60 px-2">
        <button 
          onClick={() => setView('today')} 
          className={`pb-4 text-[11px] font-black uppercase tracking-[0.3em] transition-all relative ${view === 'today' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-600 hover:text-slate-800'}`}
        >
          Hari Ini
          {view === 'today' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600 dark:bg-emerald-400 rounded-full animate-fadeIn"></div>}
        </button>
        <button 
          onClick={() => setView('full')} 
          className={`pb-4 text-[11px] font-black uppercase tracking-[0.3em] transition-all relative ${view === 'full' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-600 hover:text-slate-800'}`}
        >
          Seluruh Jadwal (30 Hari)
          {view === 'full' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600 dark:bg-emerald-400 rounded-full animate-fadeIn"></div>}
        </button>
      </div>

      {/* Content Area */}
      {view === 'today' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filteredTeam.map(p => (
            <div 
              key={p.id}
              onClick={() => setSelectedMemberId(selectedMemberId === p.id ? null : p.id)}
              className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl p-5 rounded-[32px] border border-slate-100 dark:border-slate-800/80 shadow-xl shadow-slate-200/20 dark:shadow-none flex items-center gap-5 group cursor-pointer hover:-translate-y-1.5 transition-all"
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-[24px] flex items-center justify-center text-white font-black text-sm shadow-xl" style={{ backgroundColor: p.color }}>
                  {getInitials(p.nama)}
                </div>
                <div className={`absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full border-[3px] border-white dark:border-slate-900 shadow-md ${p.currentShift === 'D' ? 'bg-emerald-500' : (p.currentShift === 'THR' ? 'bg-orange-500' : 'bg-slate-300')}`}></div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-black text-slate-900 dark:text-slate-100 text-[14px] truncate uppercase tracking-tight">{p.nama}</h4>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1 truncate">{p.jabatan}</p>
                <div className="mt-3">
                   <span className={`inline-block px-3 py-1 rounded-xl text-[8px] font-black uppercase tracking-[0.15em] shadow-sm ${getShiftColorClass(p.currentShift)}`}>
                      {getShiftLabel(p.currentShift)}
                   </span>
                </div>
              </div>
              <div className="text-slate-200 dark:text-slate-800 group-hover:text-emerald-500 transition-colors">
                <i className={`fas ${selectedMemberId === p.id ? 'fa-chevron-down' : 'fa-chevron-right'} text-sm`}></i>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[36px] border border-slate-100 dark:border-slate-800 shadow-2xl no-scrollbar p-1">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="p-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest sticky left-0 bg-white/95 dark:bg-slate-900/95 z-10">Anggota Tim</th>
                {Array.from({ length: 31 }).map((_, i) => {
                  const date = new Date(ROSTER_START_DATE);
                  date.setDate(date.getDate() + i);
                  const isToday = rosterIndex === i;
                  return (
                    <th key={i} className={`p-4 text-[9px] font-black uppercase tracking-widest text-center min-w-[60px] ${isToday ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/5' : 'text-slate-400 dark:text-slate-500'}`}>
                      {date.getDate()} {date.toLocaleDateString('id-ID', { month: 'short' })}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {filteredTeam.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                  <td className="p-5 sticky left-0 bg-white/95 dark:bg-slate-900/95 z-10 border-r border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-black text-white shadow-lg group-hover:rotate-6 transition-transform" style={{ backgroundColor: p.color }}>
                        {getInitials(p.nama)}
                      </div>
                      <div className="min-w-0 max-w-[120px]">
                        <p className="text-[11px] font-black text-slate-900 dark:text-slate-100 uppercase truncate">{p.nama}</p>
                        <p className="text-[7px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest truncate">{p.jabatan}</p>
                      </div>
                    </div>
                  </td>
                  {p.shifts.map((s, i) => (
                    <td key={i} className={`p-4 text-center text-[10px] font-black uppercase tracking-tighter tabular-nums ${rosterIndex === i ? 'bg-emerald-500/5' : ''}`}>
                      <span className={`inline-block w-8 h-6 flex items-center justify-center rounded-lg ${s === 'D' ? 'text-emerald-600 bg-emerald-500/10' : (s === 'THR' ? 'text-orange-600 bg-orange-500/10' : 'text-slate-300')}`}>
                        {s}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
