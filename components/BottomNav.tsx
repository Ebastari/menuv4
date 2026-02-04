
import React from 'react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAuthenticated: boolean;
  userRole: 'admin' | 'guest' | 'none';
  onRequestLogin: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ 
  activeTab, 
  setActiveTab, 
  isAuthenticated, 
  userRole,
  onRequestLogin 
}) => {

  const navItems = [
    { id: 'home', icon: 'fa-house', label: 'Home' },
    { id: 'peta', icon: 'fa-map-location-dot', label: 'Maps', external: 'https://ebastari.github.io/Realisasi-pekerjaan/Realisasi2025.html', isAdminOnly: true },
    { id: 'montana', icon: 'fa-camera', label: 'Capture', external: 'https://kameracerdas2.vercel.app/', isAdminOnly: true },
    { id: 'notif', icon: 'fa-bell', label: 'Alerts', external: 'https://ebastari.github.io/notifikasi/notif.html', isAdminOnly: true },
    { id: 'profile', icon: isAuthenticated ? 'fa-user-gear' : 'fa-door-open', label: isAuthenticated ? 'Settings' : 'Login', isAuthTrigger: true }
  ];

  const handleNavClick = (item: any) => {
    if (item.isAuthTrigger) {
      if (isAuthenticated) {
        setActiveTab('profile');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        onRequestLogin();
      }
      return;
    }

    if (!isAuthenticated) {
      onRequestLogin();
      return;
    }

    if (item.isAdminOnly && userRole !== 'admin') {
      alert("Akses Administrator diperlukan.");
      return;
    }

    if (item.external) {
      window.open(item.external, '_blank', 'noopener,noreferrer');
    } else {
      setActiveTab(item.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 pointer-events-none pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
      <div className="max-w-[540px] mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl rounded-[38px] border border-white/40 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.3)] flex justify-around p-1.5 pointer-events-auto ring-1 ring-black/5 dark:ring-white/5 relative">
        
        {/* Development Mode Indicator */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-emerald-600 text-white text-[7px] font-black uppercase tracking-[0.3em] rounded-full shadow-lg border border-white/20 whitespace-nowrap">
          Dev Active
        </div>

        {navItems.map((item) => {
          const isCurrent = activeTab === item.id || (item.isAuthTrigger && activeTab === 'profile');
          const isLocked = !isAuthenticated && !item.isAuthTrigger;
          const isRoleLocked = item.isAdminOnly && userRole === 'guest';
          
          return (
            <button 
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`flex flex-col items-center justify-center py-4 px-1 rounded-[28px] transition-all duration-300 relative flex-1 group active:scale-90 ${isCurrent ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white'} ${(isLocked || isRoleLocked) ? 'opacity-30' : 'opacity-100'}`}
            >
              {isCurrent && (
                <div className="absolute inset-1 bg-emerald-500/10 dark:bg-emerald-400/20 rounded-[24px] transition-all animate-pulse-gentle"></div>
              )}
              
              <div className="relative mb-1">
                <i className={`fas ${item.icon} text-[18px] transition-all duration-300 relative z-10 ${isCurrent ? 'scale-110 -translate-y-1 drop-shadow-[0_4px_10px_rgba(16,185,129,0.3)]' : 'group-hover:scale-110 group-hover:-translate-y-0.5'}`}></i>
                {(isLocked || isRoleLocked) && (
                  <div className="absolute -top-1.5 -right-2 w-3.5 h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900 shadow-sm">
                    <i className="fas fa-lock text-[6px] text-slate-400"></i>
                  </div>
                )}
              </div>

              <span className={`text-[8px] font-black uppercase tracking-tight relative z-10 transition-all duration-300 ${isCurrent ? 'opacity-100 scale-100' : 'opacity-0 scale-90 -translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0'}`}>
                  {item.label}
              </span>

              {isCurrent && (
                <div className="absolute bottom-1 w-1 h-1 bg-emerald-500 rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
