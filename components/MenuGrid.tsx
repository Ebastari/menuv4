
import React from 'react';
import { MENU_ITEMS } from '../constants';
import { MenuItem } from '../types';

interface MenuGridProps {
  role: 'admin' | 'guest' | 'none';
  onOpenDashboardAI: () => void;
  onRequestLogin: () => void;
}

const GUEST_ALLOWED_IDS = [
  'carbon', 
  'height', 
  'weather', 
  'download-1', 
  'download-2', 
  'report-seed', 
  'docs-rr', 
  'notif-bibit', 
  'about-app'
];

export const MenuGrid: React.FC<MenuGridProps> = ({ role, onOpenDashboardAI, onRequestLogin }) => {
  
  const hasAccess = (itemId: string) => {
    if (role === 'admin') return true;
    if (role === 'guest' && GUEST_ALLOWED_IDS.includes(itemId)) return true;
    return false;
  };

  const handleMenuClick = (e: React.MouseEvent, item: MenuItem) => {
    const canAccessItem = hasAccess(item.id);

    if (role === 'none') {
      e.preventDefault();
      onRequestLogin();
      return;
    }

    if (role === 'guest' && !canAccessItem) {
      e.preventDefault();
      alert("Fitur ini memerlukan hak akses Administrator.");
      return;
    }

    if (item.id === 'db-bibit-ai' && role === 'admin') {
      e.preventDefault();
      onOpenDashboardAI();
      return;
    }
  };

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-5 relative z-[50]">
      {MENU_ITEMS.map((item) => {
        const canAccess = hasAccess(item.id);
        const locked = role === 'none' || !canAccess;

        return (
          <a 
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => handleMenuClick(e, item)}
            className={`group relative flex flex-col items-center justify-center p-5 py-8 bg-white dark:bg-slate-900 rounded-[36px] border border-slate-100 dark:border-white/5 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 active:scale-95 overflow-hidden ${locked ? 'opacity-50 grayscale-[0.8]' : 'opacity-100 cursor-pointer'}`}
          >
            {/* Badge Indicator */}
            {item.badge && !locked && (
              <span className="absolute top-4 right-4 px-2 py-0.5 text-white text-[7px] font-black uppercase rounded-full shadow-md z-10 tracking-[0.2em] bg-emerald-600 ring-2 ring-white dark:ring-slate-900">
                {item.badge}
              </span>
            )}

            {/* Lock Overlay */}
            {locked && (
               <div className="absolute top-4 right-4 w-5 h-5 bg-slate-900 dark:bg-slate-800 rounded-lg flex items-center justify-center z-10 shadow-sm">
                  <i className="fas fa-lock text-[7px] text-white"></i>
               </div>
            )}
            
            {/* Icon Container */}
            <div className={`w-14 h-14 mb-4 rounded-[22px] flex items-center justify-center text-xl transition-all duration-500 relative ${locked ? 'bg-slate-50 dark:bg-slate-950 text-slate-300' : 'bg-slate-50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:bg-emerald-500/10 group-hover:scale-110 shadow-sm border border-black/[0.02] dark:border-white/[0.02]'}`}>
              <i className={`fas ${item.icon} drop-shadow-sm`}></i>
              {!locked && (
                <div className="absolute inset-0 bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-40 transition-opacity"></div>
              )}
            </div>

            {/* Title Label */}
            <span className={`text-[10px] font-black text-center leading-tight px-1 uppercase tracking-tight transition-colors ${locked ? 'text-slate-400 dark:text-slate-600' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
              {item.title}
            </span>
            
            {/* Subtle Reflection Effect */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 dark:from-white/5 to-transparent pointer-events-none"></div>
          </a>
        );
      })}
    </div>
  );
};
