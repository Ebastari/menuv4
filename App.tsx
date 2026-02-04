
import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { GrowthCard } from './components/GrowthCard';
import { MenuGrid } from './components/MenuGrid';
import { BottomNav } from './components/BottomNav';
import { WeatherOverlay } from './components/WeatherOverlay';
import { Login } from './components/Login';
import { TopNavbar } from './components/TopNavbar';
import { BibitNotificationToast } from './components/BibitNotificationToast';
import { UserProfile, WeatherCondition } from './types';

// Lazy load heavy components for better performance
const ProfileEdit = lazy(() => import('./components/ProfileEdit').then(module => ({ default: module.ProfileEdit })));
const AboutSection = lazy(() => import('./components/AboutSection').then(module => ({ default: module.AboutSection })));
const DashboardBibitAI = lazy(() => import('./components/DashboardBibitAI').then(module => ({ default: module.DashboardBibitAI })));
const RosterWidget = lazy(() => import('./components/RosterWidget').then(module => ({ default: module.RosterWidget })));
const SeedlingSummary = lazy(() => import('./components/SeedlingSummary').then(module => ({ default: module.SeedlingSummary })));
const HelpCenter = lazy(() => import('./components/HelpCenter').then(module => ({ default: module.HelpCenter })));
const LayananPengaduan = lazy(() => import('./components/LayananPengaduan').then(module => ({ default: module.LayananPengaduan })));
const FloatingStockBubble = lazy(() => import('./components/FloatingStockBubble').then(module => ({ default: module.FloatingStockBubble })));
const UserProfileView = lazy(() => import('./components/UserProfileView').then(module => ({ default: module.UserProfileView })));
const SubscribeWidget = lazy(() => import('./components/SubscribeWidget').then(module => ({ default: module.SubscribeWidget })));
const GlobalFooter = lazy(() => import('./components/GlobalFooter').then(module => ({ default: module.GlobalFooter })));
const MontanaProfile = lazy(() => import('./components/MontanaProfile').then(module => ({ default: module.MontanaProfile })));
const Forecast7Days = lazy(() => import('./components/Forecast7Days').then(module => ({ default: module.Forecast7Days })));
const SystemHistory = lazy(() => import('./components/SystemHistory').then(module => ({ default: module.SystemHistory })));
const PartnerSection = lazy(() => import('./components/PartnerSection').then(module => ({ default: module.PartnerSection })));
const GamePromotionSection = lazy(() => import('./components/GamePromotionSection').then(module => ({ default: module.GamePromotionSection })));
const PlayStoreSection = lazy(() => import('./components/PlayStoreSection').then(module => ({ default: module.PlayStoreSection })));
const DeveloperInfo = lazy(() => import('./components/DeveloperInfo').then(module => ({ default: module.DeveloperInfo })));

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby09rbjwN2EcVRwhsNBx8AREI7k41LY1LrZ-W4U36HmzMB5BePD9h8wBSVPJwa_Ycduvw/exec?sheet=Bibit";
const LOGO_URL = "https://i.ibb.co.com/29Gzw6k/montana-AI.jpg";
const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

const AdminFeatureLock: React.FC<{ children: React.ReactNode; role: string; title?: string }> = ({ children, role, title = "Akses Terbatas" }) => {
  if (role === 'admin') return <>{children}</>;
  
  return (
    <div className="relative group overflow-hidden rounded-2xl sm:rounded-[44px]">
      <div className="absolute inset-0 z-20 bg-slate-50/60 dark:bg-slate-950/60 backdrop-blur-[12px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 transition-transform duration-500 p-6">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-2xl mb-4 ring-4 sm:ring-8 ring-emerald-500/10">
          <i className="fas fa-lock text-emerald-600 dark:text-emerald-400 text-lg sm:text-xl"></i>
        </div>
        <h3 className="text-xs sm:text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-widest sm:tracking-[0.3em] mb-2">{title}</h3>
        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center">Hanya tersedia untuk Administrator. <br className="sm:hidden" /> Silakan login untuk melihat data ini.</p>
      </div>
      <div className="opacity-30 grayscale blur-[8px] pointer-events-none scale-[0.98]">
        {children}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [isOAuthAuthenticated, setIsOAuthAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'guest' | 'none'>('none');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showDashboardAI, setShowDashboardAI] = useState(false);
  const [showDeveloperInfo, setShowDeveloperInfo] = useState(false);
  const [showMontanaProfile, setShowMontanaProfile] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [activeSeconds, setActiveSeconds] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [weatherCondition, setWeatherCondition] = useState<WeatherCondition>('clear');
  const [weatherDetails, setWeatherDetails] = useState({ 
    temp: 0, windspeed: 0, humidity: 0, rain: 0, windDirection: 'N'
  });
  const [allBibitData, setAllBibitData] = useState<any[]>([]);
  const [latestUpdate, setLatestUpdate] = useState<any>(null);
  const [showDailyToast, setShowDailyToast] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('montana_dark_mode');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [user, setUser] = useState<UserProfile>({
    name: 'Tamu Montana', 
    photo: LOGO_URL,
    jabatan: 'Public Access', 
    telepon: '', 
    email: '', 
    activeSeconds: 0, 
    lastSeen: new Date().toISOString()
  });

  // Memoize todaySummary to prevent unnecessary recalculations
  const todaySummary = useMemo(() => {
    if (!allBibitData.length) return null;
    const todayStr = new Date().toLocaleDateString('id-ID'); 
    const todayEntries = allBibitData.filter(item => {
      const itemDate = new Date(item.tanggal).toLocaleDateString('id-ID');
      return itemDate === todayStr;
    });
    if (todayEntries.length === 0) return allBibitData[allBibitData.length - 1];
    return {
      bibit: todayEntries[todayEntries.length - 1].bibit,
      masuk: todayEntries.reduce((acc, curr) => acc + curr.masuk, 0),
      keluar: todayEntries.reduce((acc, curr) => acc + curr.keluar, 0),
      mati: todayEntries.reduce((acc, curr) => acc + curr.mati, 0),
      tanggal: todayEntries[todayEntries.length - 1].tanggal,
      isAggregated: true
    };
  }, [allBibitData]);

  // Memoize weather condition for consistent renders
  const weatherCode = useMemo(() => {
    if (!weatherCondition) return 'cloudy';
    return weatherCondition;
  }, [weatherCondition]);

  const fetchWeather = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=-3.33&longitude=115.79&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m`,
        { 
          cache: 'force-cache',
          signal: controller.signal
        }
      );
      clearTimeout(timeoutId);
      
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      
      const data = await response.json();
      if (data.current) {
        const cur = data.current;
        setWeatherDetails(prev => ({
          temp: Math.round(cur.temperature_2m), 
          windspeed: Math.round(cur.wind_speed_10m),
          humidity: cur.relative_humidity_2m, 
          rain: cur.precipitation, 
          windDirection: DIRECTIONS[Math.round(cur.wind_direction_10m / 45) % 8]
        }));
        
        const code = cur.weather_code;
        if ([0, 1].includes(code)) setWeatherCondition('clear');
        else if ([2, 3, 45, 48].includes(code)) setWeatherCondition('cloudy');
        else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) setWeatherCondition('rain');
        else if ([95, 96, 99].includes(code)) setWeatherCondition('storm');
        else setWeatherCondition('cloudy');
      }
    } catch (err) { 
      console.warn("Weather fetch error, using fallback:", err); 
    }
  };

  const fetchLatestNotif = async () => {
    try {
      const res = await fetch(SCRIPT_URL);
      const json = await res.json();
      let rows = Array.isArray(json) ? json : (json.Bibit || json.bibit || []);
      const normalized = rows.map((r: any) => ({
        tanggal: String(r.Tanggal || r.tanggal || ''), bibit: (r.Bibit || r.bibit || '').toString().trim(),
        masuk: parseInt(r.Masuk || r.masuk || 0), keluar: parseInt(r.Keluar || r.keluar || 0),
        mati: parseInt(r.Mati || r.mati || 0), tujuan: r["Tujuan Bibit"] || r.Tujuan || r.tujuan || 'Nursery'
      }));
      setAllBibitData(normalized);
      if (normalized.length > 0) {
        setLatestUpdate(normalized[normalized.length - 1]);
        setShowDailyToast(true);
      }
    } catch (err) { console.error("Data error:", err); }
  };

  useEffect(() => {
    fetchWeather();
    const weatherInterval = setInterval(fetchWeather, 300000); // Update every 5 minutes
    const timer = setTimeout(() => setLoading(false), 500); // Faster loading
    
    // Preload critical images
    const preloadImage = new Image();
    preloadImage.src = LOGO_URL;
    
    return () => {
      clearTimeout(timer);
      clearInterval(weatherInterval);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSeconds(prev => prev + 1);
      setCurrentTime(new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Makassar', hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('montana_dark_mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const handleLoginSuccess = (userData: any, role: 'admin' | 'guest') => {
    setUser(p => ({...p, ...userData})); 
    setUserRole(role); 
    setIsAuthenticated(true); 
    setShowLoginModal(false); 
    if (role === 'admin') fetchLatestNotif();
  };

  const handleOAuthSuccess = (googleData: { name: string; photo: string; email: string }) => {
    setUser(p => ({
      ...p,
      name: googleData.name,
      photo: googleData.photo,
      email: googleData.email
    }));
    setIsOAuthAuthenticated(true);
    if (userRole === 'none') setUserRole('guest');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsOAuthAuthenticated(false);
    setUserRole('none');
    setUser({
      name: 'Tamu Montana', photo: LOGO_URL, jabatan: 'Public Access', telepon: '', email: '', activeSeconds: 0, lastSeen: new Date().toISOString()
    });
    setActiveTab('home');
    setShowLoginModal(true);
  };

  if (loading) return (
    <div className="fixed inset-0 bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center z-[1000] animate-fadeIn p-4">
      <div className="w-20 h-20 sm:w-24 sm:h-24 relative mb-4 sm:mb-6">
        <img src={LOGO_URL} className="w-full h-full object-contain animate-float" alt="Loading" />
        <div className="absolute inset-0 bg-emerald-500/20 blur-xl animate-pulse rounded-full"></div>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-xs sm:text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-widest sm:tracking-[0.5em] mb-3">Montana AI Pro</h2>
        <div className="w-32 sm:w-48 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 animate-[shimmer_2s_infinite] w-full"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-28 sm:pb-32 md:pb-40 transition-opacity duration-500 ease-out will-change-transform dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative">
      <WeatherOverlay condition={weatherCode} />
      
      <TopNavbar 
          user={user} isAuthenticated={isAuthenticated} currentTime={currentTime} weatherCondition={weatherCode}
          temp={weatherDetails.temp} humidity={weatherDetails.humidity} precipitation={weatherDetails.rain}
          windspeed={weatherDetails.windspeed} windDirection={weatherDetails.windDirection}
          isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onProfileClick={() => setActiveTab('profile')}
      />

      <div className={`transition-opacity duration-500 ${weatherCode === 'rain' || weatherCode === 'storm' ? 'bg-slate-900/10' : ''}`}>
        <main className="pt-48 sm:pt-56 lg:pt-64 px-3 sm:px-4 space-y-8 sm:space-y-12 lg:space-y-16 max-w-[1440px] mx-auto relative z-10">
            {activeTab === 'home' && (
            <div className="space-y-8 sm:space-y-12">
                <Suspense fallback={<LoadingSkeleton />}><Forecast7Days /></Suspense>
                
                <AdminFeatureLock role={userRole} title="Data Roster Admin">
                  <Suspense fallback={<LoadingSkeleton />}><RosterWidget /></Suspense>
                </AdminFeatureLock>

                <AdminFeatureLock role={userRole} title="Data Ringkasan Bibit">
                  <Suspense fallback={<LoadingSkeleton />}><SeedlingSummary /></Suspense>
                </AdminFeatureLock>
                
                <div className="glass-card rounded-2xl sm:rounded-[52px] border-none shadow-none">
                  <GrowthCard currentSeconds={activeSeconds} />
                </div>
                
                <Suspense fallback={<LoadingSkeleton />}><SubscribeWidget /></Suspense>

                <Suspense fallback={<LoadingSkeleton />}><SystemHistory /></Suspense>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
                  <div className="lg:col-span-8 space-y-8 sm:space-y-12">
                    <Suspense fallback={<LoadingSkeleton />}><LayananPengaduan /></Suspense>
                    <Suspense fallback={<LoadingSkeleton />}><HelpCenter /></Suspense>
                  </div>
                  <div className="lg:col-span-4">
                    <MenuGrid 
                      role={userRole} 
                      onOpenDashboardAI={() => setShowDashboardAI(true)} 
                      onRequestLogin={() => setShowLoginModal(true)} 
                    />
                  </div>
                </div>
            </div>
            )}
            {activeTab === 'profile' && (
            <div className="space-y-8 sm:space-y-12">
                <Suspense fallback={<LoadingSkeleton />}>
                  <UserProfileView 
                    user={user} 
                    isOAuthAuthenticated={isOAuthAuthenticated}
                    onOAuthSuccess={handleOAuthSuccess}
                    onEdit={() => setShowProfileEdit(true)} 
                    onLogout={handleLogout} 
                  />
                </Suspense>
                <Suspense fallback={<LoadingSkeleton />}>
                  <AboutSection onOpenMontanaProfile={() => setShowMontanaProfile(true)} onOpenDeveloper={() => setShowDeveloperInfo(true)} />
                </Suspense>
            </div>
            )}
        </main>
        
        <div className="mt-8 sm:mt-12 md:mt-16 space-y-8 sm:space-y-12 lg:space-y-16 relative z-10">
            <Suspense fallback={<LoadingSkeleton />}><GamePromotionSection /></Suspense>
            <Suspense fallback={<LoadingSkeleton />}><PlayStoreSection /></Suspense>
            <Suspense fallback={<LoadingSkeleton />}><PartnerSection /></Suspense>
            <Suspense fallback={<LoadingSkeleton />}><GlobalFooter onOpenMontanaProfile={() => setShowMontanaProfile(true)} /></Suspense>
        </div>
      </div>

      {userRole === 'admin' && <Suspense fallback={null}><FloatingStockBubble data={todaySummary} /></Suspense>}
      {userRole === 'admin' && <BibitNotificationToast data={showDailyToast ? latestUpdate : null} onClose={() => { setShowDailyToast(false); }} />}
      
      <BottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isAuthenticated={isAuthenticated} 
        userRole={userRole} 
        onRequestLogin={() => setShowLoginModal(true)} 
      />

      {showLoginModal && <Login onVerified={handleLoginSuccess} onClose={() => setShowLoginModal(false)} />}
      {showProfileEdit && <Suspense fallback={null}><ProfileEdit user={user} onSave={(updated) => { setUser({...user, ...updated}); setShowProfileEdit(false); }} onClose={() => setShowProfileEdit(false)} /></Suspense>}
      {showDashboardAI && <Suspense fallback={null}><DashboardBibitAI onClose={() => setShowDashboardAI(false)} /></Suspense>}
      {showDeveloperInfo && <Suspense fallback={null}><DeveloperInfo onClose={() => setShowDeveloperInfo(false)} /></Suspense>}
      {showMontanaProfile && <Suspense fallback={null}><MontanaProfile onClose={() => setShowMontanaProfile(false)} /></Suspense>}
    </div>
  );
};

export default App;

// Loading skeleton for lazy loaded components
const LoadingSkeleton: React.FC = () => (
  <div className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-2xl sm:rounded-3xl h-32 sm:h-48 w-full flex items-center justify-center">
    <div className="flex flex-col items-center">
      <i className="fas fa-circle-notch fa-spin text-emerald-500 text-xl sm:text-2xl mb-2"></i>
      <span className="text-[10px] sm:text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Memuat...</span>
    </div>
  </div>
);
