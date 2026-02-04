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
  const [isPressed, setIsPressed] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { id: 'menu', icon: 'fa-bars', label: 'Menu' },
    { id: 'kamera', icon: 'fa-camera', label: 'Kamera' },
    { id: 'notifikasi-bibit', icon: 'fa-seedling', label: 'Notif Bibit' },
    { id: 'profil', icon: 'fa-user', label: 'Profil', isAuthTrigger: true }
  ];

  const handleNavClick = (item: any) => {
    setIsPressed(item.id);
    setTimeout(() => setIsPressed(null), 200);

    if (item.isAuthTrigger) {
      if (isAuthenticated) {
        setActiveTab('profil');
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
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2 pointer-events-none"
      style={{ 
        paddingBottom: 'env(safe-area-inset-bottom, 16px)',
        paddingLeft: 'env(safe-area-inset-left, 16px)',
        paddingRight: 'env(safe-area-inset-right, 16px)'
      }}
    >
      {/* Floating Pill-Shaped Container */}
      <div 
        className="max-w-md mx-auto relative overflow-hidden
          bg-white/80 dark:bg-slate-900/80
          backdrop-blur-2xl
          rounded-full
          shadow-[0_8px_32px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.08),0_0_0_1px_rgba(255,255,255,0.3)]
          dark:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_4px_16px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.1)]
          border border-white/40 dark:border-white/10
          pointer-events-auto
          flex items-end justify-between px-2 py-2"
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent dark:from-white/5 pointer-events-none" />
        
        {/* Development indicator */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-emerald-500 text-white text-[8px] font-bold uppercase tracking-widest rounded-full shadow-lg z-20">
          Dev Active
        </div>

        {navItems.map((item) => {
          const isCurrent = activeTab === item.id || (item.isAuthTrigger && activeTab === 'profil');
          const isLocked = !isAuthenticated && !item.isAuthTrigger;
          const isRoleLocked = item.isAdminOnly && userRole === 'guest';
          const isAnimating = isPressed === item.id;
          
          return (
            <button 
              key={item.id}
              onClick={() => handleNavClick(item)}
              onTouchStart={() => setIsPressed(item.id)}
              className={`
                relative flex flex-col items-center justify-center
                w-14 h-12 rounded-full
                transition-all duration-300 ease-out
                ${isAnimating ? 'scale-90' : 'scale-100'}
                ${isLocked || isRoleLocked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                ${isCurrent ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400'}
              `}
              disabled={isLocked || isRoleLocked}
              aria-label={item.label}
              aria-current={isCurrent ? 'page' : undefined}
            >
              {/* Active state glow effect */}
              {isCurrent && (
                <>
                  {/* Outer glow */}
                  <div className="absolute inset-0 rounded-full bg-emerald-400/20 dark:bg-emerald-400/15 blur-xl animate-pulse" />
                  {/* Inner glow */}
                  <div className="absolute inset-0 rounded-full bg-emerald-400/10 dark:bg-emerald-400/8 blur-md" />
                </>
              )}
              
              {/* Tap ripple effect */}
              {isAnimating && (
                <div className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping" />
              )}

              {/* Icon container */}
              <div className="relative z-10">
                <i 
                  className={`fas ${item.icon} text-lg transition-all duration-300
                    ${isCurrent 
                      ? 'scale-110 drop-shadow-[0_2px_8px_rgba(16,185,129,0.5)]' 
                      : isAnimating 
                        ? 'scale-105' 
                        : 'group-hover:scale-105'
                    }
                  `}
                />
                
                {/* Lock indicator */}
                {(isLocked || isRoleLocked) && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                    <i className="fas fa-lock text-[6px] text-slate-500 dark:text-slate-400" />
                  </div>
                )}
              </div>

              {/* Label */}
              <span 
                className={`
                  text-[9px] font-medium tracking-wide
                  transition-all duration-300
                  ${isCurrent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}
                `}
              >
                {item.label}
              </span>

              {/* Active indicator dot */}
              {isCurrent && (
                <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
