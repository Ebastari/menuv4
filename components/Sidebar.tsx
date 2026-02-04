import React, { useState } from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAuthenticated: boolean;
  userRole: 'admin' | 'guest' | 'none';
  onRequestLogin: () => void;
  userName?: string;
  userPhoto?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isAuthenticated, 
  userRole,
  onRequestLogin,
  userName,
  userPhoto
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', icon: 'fa-house', label: 'Home' },
    { id: 'peta', icon: 'fa-map-location-dot', label: 'Map', external: 'https://ebastari.github.io/Realisasi-pekerjaan/Realisasi2025.html', isAdminOnly: true },
    { id: 'montana', icon: 'fa-camera', label: 'Camera', external: 'https://kameracerdas2.vercel.app/', isAdminOnly: true },
    { id: 'notif', icon: 'fa-bell', label: 'Notifications', external: 'https://ebastari.github.io/notifikasi/notif.html', isAdminOnly: true },
    { id: 'profile', icon: 'fa-user', label: 'Profile', isAuthTrigger: true },
    { id: 'login', icon: 'fa-sign-in-alt', label: 'Login', isLoginTrigger: true }
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

    if (item.isLoginTrigger) {
      onRequestLogin();
      return;
    }

    if (!isAuthenticated) {
      onRequestLogin();
      return;
    }

    if (item.isAdminOnly && userRole !== 'admin') {
      alert("Administrator access required.");
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
    <>
      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Desktop/Tablet Sidebar - Fixed on left side */}
      <div className={`
        fixed top-0 left-0 h-full z-40 
        bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl 
        shadow-xl lg:shadow-2xl 
        transform transition-transform duration-300 ease-out
        w-72
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <i className="fas fa-leaf text-emerald-500 text-xl" />
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-sm">Montana AI</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Pro</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
          >
            <i className="fas fa-times" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center overflow-hidden">
              {userPhoto ? (
                <img src={userPhoto} alt={userName} className="w-full h-full object-cover" />
              ) : (
                <i className="fas fa-user text-emerald-500" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-900 dark:text-white truncate text-sm">{userName || 'Guest'}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{userRole}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isCurrent = activeTab === item.id || (item.isAuthTrigger && activeTab === 'profile');
            const isLocked = !isAuthenticated && !item.isAuthTrigger && !item.isLoginTrigger;
            const isRoleLocked = item.isAdminOnly && userRole === 'guest';
            const showLogin = item.isLoginTrigger && !isAuthenticated;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                disabled={isLocked || isRoleLocked}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isLocked || isRoleLocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100 dark:hover:bg-slate-800'} ${isCurrent ? 'bg-emerald-50 dark:bg-emerald-900/20' : ''}`}
              >
                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center
                  ${isCurrent ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}
                `}>
                  <i className={`fas ${item.icon}`} />
                </div>
                
                <span className={`flex-1 text-left font-medium ${isCurrent ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>{item.label}</span>
                
                <span className="flex items-center gap-2">
                  {isLocked && <i className="fas fa-lock text-slate-400 text-xs" />}
                  {showLogin && <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-full">Required</span>}
                  {isCurrent && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500 dark:text-slate-400">Montana AI Pro</p>
            <p className="text-xs text-slate-400 dark:text-slate-500">v1.0.0</p>
          </div>
        </div>
      </div>

      {/* Toggle Button - Fixed on left side */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-24 left-4 z-50 w-10 h-10 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:shadow-xl transition-all duration-300`}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-lg`} />
      </button>
    </>
  );
};

export default Sidebar;
