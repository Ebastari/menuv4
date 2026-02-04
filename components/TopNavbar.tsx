
import React, { useState, useEffect } from 'react';
import { UserProfile, WeatherCondition } from '../types';

const LOGO_URL = "https://i.ibb.co.com/29Gzw6k/montana-AI.jpg";

interface TopNavbarProps {
  user: UserProfile;
  isAuthenticated: boolean;
  currentTime: string;
  weatherCondition: WeatherCondition;
  temp: number;
  humidity: number;
  precipitation: number;
  windspeed: number;
  windDirection: string;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onProfileClick: () => void;
}

interface NavBoxProps {
  children: React.ReactNode;
  className?: string;
}

const NavBox: React.FC<NavBoxProps> = ({ children, className = "" }) => (
  <div className={`bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-xl sm:rounded-[24px] p-2 sm:p-3 shadow-sm flex items-center gap-2 sm:gap-3 transition-colors duration-300 hover:bg-white/60 dark:hover:bg-slate-900/60 ${className}`}>
    {children}
  </div>
);

export const TopNavbar: React.FC<TopNavbarProps> = ({
  user,
  isAuthenticated,
  currentTime,
  weatherCondition,
  temp,
  humidity,
  precipitation,
  windspeed,
  windDirection,
  isDarkMode,
  toggleDarkMode,
  onProfileClick
}) => {
  const [coords, setCoords] = useState<{ lat: string; lon: string }>({ lat: "...", lon: "..." });
  const [satellites, setSatellites] = useState(0);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [gpsStatus, setGpsStatus] = useState<'searching' | 'locked' | 'error'>('searching');

  const startGpsWatch = () => {
    if (navigator.geolocation) {
      setGpsStatus('searching');
      return navigator.geolocation.watchPosition((pos) => {
        const acc = pos.coords.accuracy;
        setAccuracy(acc);
        setCoords({
          lat: pos.coords.latitude.toFixed(6),
          lon: pos.coords.longitude.toFixed(6)
        });
        
        // UPDATED: Now locking instantly for everyone as soon as coordinates are available
        setGpsStatus('locked');
        
        const getSimSats = (a: number) => {
          if (a < 10) return 24;
          if (a < 30) return 18;
          if (a < 60) return 12;
          return 4;
        };
        
        setSatellites(getSimSats(acc) + Math.floor(Math.random() * 3));

      }, (err) => {
        console.warn("GPS Error:", err);
        setGpsStatus('error');
        setSatellites(0);
      }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 });
    }
    return null;
  };

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const watchId = startGpsWatch();

    return () => {
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getWeatherLabel = (condition: WeatherCondition) => {
    switch (condition) {
      case 'clear': return 'CERAH';
      case 'rain': return 'HUJAN';
      case 'cloudy': return 'BERAWAN';
      case 'storm': return 'BADAI';
      default: return 'SCANNING';
    }
  };

  const getSignalStrength = () => {
    if (!accuracy) return 0;
    if (accuracy < 15) return 4;
    if (accuracy < 35) return 3;
    if (accuracy < 60) return 2;
    return 1;
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-[100] bg-white/70 dark:bg-slate-950/70 backdrop-blur-3xl border-b border-white/20 dark:border-slate-900/50 py-2 px-2 sm:py-3 sm:px-4 md:px-8">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-2">
        
        {/* Top Row: Profile & Time */}
        <div className="flex items-center justify-between gap-2">
          <div 
            className="flex items-center gap-2 py-1.5 px-3 rounded-xl sm:rounded-[18px] bg-slate-900 dark:bg-emerald-600 text-white cursor-pointer hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-transform duration-300 shadow-lg ring-1 ring-white/10 min-h-[44px]"
            onClick={onProfileClick}
          >
            <div className="relative group flex-shrink-0">
              <img 
                src={isAuthenticated ? user.photo : LOGO_URL} 
                className="w-8 h-8 rounded-lg sm:rounded-[12px] object-cover border-2 border-white/20 bg-white transition-transform group-hover:rotate-6 shadow-md"
                alt="Profile"
              />
              <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-900 ${isAuthenticated ? 'bg-emerald-400' : 'bg-slate-400'} shadow-sm`}></div>
            </div>
            <div className="flex flex-col hidden xs:flex min-w-0">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-tight leading-none truncate">
                {isAuthenticated ? user.name : 'MONTANA'}
              </span>
              <span className="text-[7px] sm:[7.5px] font-black opacity-60 uppercase tracking-[0.15em] truncate">
                {isAuthenticated ? user.jabatan : 'ACCESS'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-xl p-2 shadow-sm ring-1 ring-black/5 dark:ring-white/5 min-h-[44px]">
             <div className="flex flex-col items-end mr-1.5">
                <span className="text-xs sm:text-[14px] font-black text-slate-900 dark:text-white tabular-nums tracking-tighter leading-none">
                  {currentTime}
                </span>
                <span className="text-[5px] sm:text-[7px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mt-0.5 hidden xs:block">WITA</span>
             </div>
             <button onClick={toggleDarkMode} className="w-8 h-8 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 flex items-center justify-center text-slate-600 dark:text-slate-400 active:scale-90 transition-transform duration-300 hover:bg-white dark:hover:bg-slate-700 shadow-sm border border-black/5 dark:border-white/5">
                <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-xs`}></i>
             </button>
          </div>
        </div>

        {/* Bottom Row: GPS & Weather */}
        <div className="grid grid-cols-2 gap-2">
          {/* GPS Box */}
          <NavBox className="justify-between overflow-hidden relative group border-emerald-500/10 dark:border-emerald-500/5 py-2">
            <div className="absolute inset-0 bg-emerald-500/[0.02] animate-pulse pointer-events-none"></div>
            <div className="flex items-center gap-2 relative z-10 min-w-0">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="flex items-end gap-[1px] h-2.5 mb-0.5">
                  {[1,2,3,4].map(bar => {
                    const height = bar * 25;
                    return (
                    <div 
                      key={bar} 
                      className={`w-1 rounded-t-[1.5px] transition-colors duration-700 ${bar <= getSignalStrength() ? (gpsStatus === 'locked' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-400 animate-pulse') : 'bg-slate-200 dark:bg-slate-800'}`}
                      style={{ height: `${height}%` }}
                    />
                    );
                  })}
                </div>
                <span className={`text-[4px] sm:text-[6.5px] font-black uppercase tracking-widest ${gpsStatus === 'locked' ? 'text-emerald-600' : (gpsStatus === 'error' ? 'text-rose-500' : 'text-amber-500 animate-pulse')}`}>
                  {gpsStatus}
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-[7px] sm:text-[10px] font-black text-slate-900 dark:text-white font-mono tracking-tighter bg-black/5 dark:bg-white/5 px-1 py-0.5 rounded truncate max-w-[70px]">{coords.lat}</span>
                  <span className="text-[7px] sm:text-[10px] font-black text-slate-900 dark:text-white font-mono tracking-tighter bg-black/5 dark:bg-white/5 px-1 py-0.5 rounded truncate max-w-[70px]">{coords.lon}</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                   <span className="text-[5px] sm:text-[7.5px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-0.5">
                     <i className="fas fa-satellite text-[4px] sm:text-[8px]"></i> {satellites}
                   </span>
                   {accuracy && (
                     <span className={`text-[5px] sm:text-[7.5px] font-black uppercase tracking-widest flex items-center gap-0.5 ${accuracy < 50 ? 'text-emerald-500' : 'text-amber-500'}`}>
                       <i className="fas fa-crosshairs text-[4px] sm:text-[8px]"></i> ±{accuracy.toFixed(0)}m
                     </span>
                   )}
                </div>
              </div>
            </div>
            <button 
              onClick={() => startGpsWatch()}
              className={`w-2 h-2 rounded-full shadow-[0_0_10px] transition-colors duration-500 flex-shrink-0 ${gpsStatus === 'locked' ? 'bg-emerald-500 shadow-emerald-500/50' : (gpsStatus === 'error' ? 'bg-rose-500 shadow-rose-500/50' : 'bg-amber-400 shadow-amber-400/50 animate-ping')}`}
              title="Refresh GPS"
            ></button>
          </NavBox>

          {/* Weather Box */}
          <NavBox className="justify-between group border-blue-500/10 dark:border-blue-500/5 py-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-[14px] bg-white dark:bg-slate-800 flex items-center justify-center text-lg sm:text-xl text-emerald-600 dark:text-emerald-400 relative overflow-hidden shadow-sm border border-black/5 dark:border-white/5 transition-transform group-hover:rotate-6 flex-shrink-0">
                <i className={`fas ${weatherCondition === 'clear' ? 'fa-sun' : weatherCondition === 'rain' ? 'fa-cloud-showers-heavy' : weatherCondition === 'storm' ? 'fa-bolt' : 'fa-cloud'} relative z-10`}></i>
                {weatherCondition === 'rain' && <div className="absolute inset-0 bg-blue-400/10 animate-pulse"></div>}
              </div>
              <div className="flex flex-col min-w-0 flex-shrink">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-[14px] font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">{temp}°</span>
                  <span className="text-[5px] sm:text-[8px] font-black px-1.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded uppercase tracking-widest border border-emerald-500/20">
                    {getWeatherLabel(weatherCondition)}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-[5px] sm:text-[7.5px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  <span className="flex items-center gap-0.5"><i className="fas fa-tint text-[4px] sm:text-[8px] text-blue-400"></i> {humidity}%</span>
                  <span className={`flex items-center gap-0.5 ${precipitation > 0 ? 'text-blue-500' : ''}`}>
                    <i className="fas fa-cloud-rain text-[4px] sm:text-[8px]"></i> {precipitation.toFixed(1)}
                  </span>
                  <span className="flex items-center gap-0.5"><i className="fas fa-wind text-[4px] sm:text-[8px] text-slate-400"></i> {windspeed}k</span>
                </div>
              </div>
            </div>
            <div className={`w-2 h-2 rounded-full transition-colors duration-500 flex-shrink-0 ${isOnline ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-rose-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`}></div>
          </NavBox>
        </div>

      </div>
    </header>
  );
};
