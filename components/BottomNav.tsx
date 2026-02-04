
import React, { useState, useEffect } from 'react';

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
  const [isMobile, setIsMobile] = useState(true);
  const [touchFeedback, setTouchFeedback] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { id: 'home', icon: 'fa-house', label: 'Home' },
    { id: 'peta', icon: 'fa-map-location-dot', label: 'Maps', external: 'https://ebastari.github.io/Realisasi-pekerjaan/Realisasi2025.html', isAdminOnly: true },
    { id: 'montana', icon: 'fa-camera', label: 'Capture', external: 'https://kameracerdas2.vercel.app/', isAdminOnly: true },
    { id: 'notif', icon: 'fa-bell', label: 'Alerts', external: 'https://ebastari.github.io/notifikasi/notif.html', isAdminOnly: true },
    { id: 'profile', icon: isAuthenticated ? 'fa-user-gear' : 'fa-door-open', label: isAuthenticated ? 'Settings' : 'Login', isAuthTrigger: true }
  ];

  const handleNavClick = (item: any) => {
    // Touch feedback animation
    setTouchFeedback(item.id);
    setTimeout(() => setTouchFeedback(null), 300);

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

  if (!isMobile) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-[100] 
        pb-[calc(0.75rem+env(safe-area-inset-bottom,20px))] 
        pt-2 px-2 sm:px-4
        bg-gradient-to-t from-white/90 via-white/80 to-transparent 
        dark:from-slate-900/90 dark:via-slate-900/80 dark:to-transparent
        pointer-events-none"
    >
      <div 
        className="max-w-[480px] mx-auto 
          bg-white/90 dark:bg-slate-900/90 
          backdrop-blur-xl 
          rounded-2xl sm:rounded-[28px] 
          border border-white/30 dark:border-white/10 
          shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)]
          flex justify-around p-1.5 
          pointer-events-auto 
          ring-1 ring-black/5 dark:ring-white/10
          relative overflow-hidden"
      >
        {/* Development Mode Indicator */}
        <div className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 px-2.5 sm:px-3 py-0.5 bg-emerald-600 text-white text-[6px] sm:text-[7px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] rounded-full shadow-lg border border-white/20 whitespace-nowrap z-20">
          Dev Active
        </div>

        {navItems.map((item) => {
          const isCurrent = activeTab === item.id || (item.isAuthTrigger && activeTab === 'profile');
          const isLocked = !isAuthenticated && !item.isAuthTrigger;
          const isRoleLocked = item.isAdminOnly && userRole === 'guest';
          const showTouchFeedback = touchFeedback === item.id;
          
          return (
            <button 
              key={item.id}
              onClick={() => handleNavClick(item)}
              onTouchStart={() => setTouchFeedback(item.id)}
              className={`
                flex flex-col items-center justify-center 
                py-3.5 px-0.5 sm:py-4 sm:px-1 
                rounded-xl sm:rounded-2xl 
                transition-all duration-200 
                relative flex-1 group
                min-h-[48px] sm:min-h-[52px]
                min-w-[48px] sm:min-w-[52px]
                touch-manipulation
                ${isCurrent ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}
                ${(isLocked || isRoleLocked) ? 'opacity-35 cursor-not-allowed' : 'opacity-100 cursor-pointer'}
                ${showTouchFeedback ? 'scale-95' : 'scale-100'}
              `}
              aria-label={item.label}
              aria-current={isCurrent ? 'page' : undefined}
              disabled={isLocked || isRoleLocked}
            >
              {/* Touch ripple effect */}
              {showTouchFeedback && !isLocked && !isRoleLocked && (
                <div className="absolute inset-0 bg-emerald-500/20 rounded-xl animate-pulse" />
              )}

              {/* Active state background */}
              {isCurrent && (
                <div className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-400/15 rounded-xl transition-all animate-pulse-gentle" />
              )}
              
              <div className="relative mb-0.5">
                <i 
                  className={`fas ${item.icon} 
                    text-[20px] sm:text-[18px] 
                    transition-all duration-200 
                    relative z-10 
                    ${isCurrent ? 'scale-110 -translate-y-1 drop-shadow-[0_4px_12px_rgba(16,185,129,0.4)]' : 'group-hover:scale-105 group-hover:-translate-y-0.5'}
                    ${showTouchFeedback ? 'scale-105' : ''}
                  `}
                ></i>
                {(isLocked || isRoleLocked) && (
                  <div className="absolute -top-1.5 -right-2 w-4 h-4 sm:w-3.5 sm:h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900 shadow-sm z-20">
                    <i className="fas fa-lock text-[5px] sm:text-[6px] text-slate-400"></i>
                  </div>
                )}
              </div>

              <span 
                className={`
                  text-[8px] sm:text-[7px] 
                  font-bold uppercase tracking-wider 
                  relative z-10 
                  transition-all duration-200 
                  ${isCurrent ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 -translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0'}
                `}
              >
                  {item.label}
              </span>

              {/* Active indicator dot */}
              {isCurrent && (
                <div className="absolute bottom-1 w-1 h-1 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
