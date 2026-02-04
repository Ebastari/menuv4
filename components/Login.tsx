
import React, { useState, useRef, useEffect } from 'react';
import { TermsContent } from './TermsContent';

const GOOGLE_CLIENT_ID = "357045986446-03056acv0ggnrhv7irv1dtk3b0fn5vmf.apps.googleusercontent.com";

export async function secureHash(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

interface LoginProps {
  onVerified: (userData: { name: string; photo: string; telepon: string; email: string; jabatan: string; facePhoto?: string; gpsLat?: number; gpsLon?: number; gpsAcc?: number }, role: 'admin' | 'guest') => void;
  onClose: () => void;
}

export const Login: React.FC<LoginProps> = ({ onVerified, onClose }) => {
  const [mode, setMode] = useState<'select' | 'auth' | 'form'>('select');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'guest' | null>(null);
  
  const [authData, setAuthData] = useState({ username: '', password: '' });
  const [authError, setAuthError] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const [formData, setFormData] = useState({ 
    nama: '', 
    telepon: '', 
    email: '' 
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  
  const [gps, setGps] = useState<{ lat: number | null; lon: number | null; acc: number | null; status: 'idle' | 'searching' | 'locked' | 'error' | 'denied'; msg: string; signalStrength: number | null }>({ 
    lat: null, lon: null, acc: null, status: 'idle', msg: '', signalStrength: null
  });
  
  const [faceChecked, setFaceChecked] = useState(false);
  const [facePhoto, setFacePhoto] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const termsScrollRef = useRef<HTMLDivElement>(null);
  const googleButtonRef = useRef<HTMLDivElement>(null);

  const handleGoogleResponse = (response: any) => {
    const payload = parseJwt(response.credential);
    if (payload) {
      setFormData({
        nama: payload.name || '',
        email: payload.email || '',
        telepon: ''
      });
      setSelectedRole('guest'); // Internally guest, but visually just a "Login"
      setMode('form');
    }
  };

  useEffect(() => {
    const google = (window as any).google;
    if (mode === 'select' && google) {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse
      });
      if (googleButtonRef.current) {
        google.accounts.id.renderButton(googleButtonRef.current, {
          theme: "outline",
          size: "large",
          width: 280,
          shape: "pill",
          text: "signin_with"
        });
      }
    }
  }, [mode]);

  const handleTermsScroll = () => {
    if (termsScrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = termsScrollRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 30) {
        setScrolledToBottom(true);
      }
    }
  };

  // Auto-request GPS when form mode is active
  useEffect(() => {
    if (mode === 'form' && agreedToTerms && gps.status === 'idle') {
      // Small delay to ensure smooth UI
      const timer = setTimeout(() => {
        requestGPS();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [mode, agreedToTerms]);

  const requestGPS = () => {
    setGps(prev => ({ ...prev, status: 'searching', msg: '🛰️ MENCARI SINYAL...', signalStrength: 0 }));
    
    // Calculate signal strength based on accuracy
    const calculateSignalStrength = (accuracy: number) => {
      if (accuracy <= 5) return 100;
      if (accuracy <= 10) return 80;
      if (accuracy <= 20) return 60;
      if (accuracy <= 50) return 40;
      return 20;
    };
    
    // First try to get cached position for immediate response
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGps({ 
          lat: pos.coords.latitude, lon: pos.coords.longitude, acc: Math.round(pos.coords.accuracy),
          status: 'locked', msg: `📍 LOKASI TERKUNCI`,
          signalStrength: calculateSignalStrength(pos.coords.accuracy)
        });
      },
      (err) => {
        // If cached fails, start watching for more accurate position
        setGps(prev => ({ ...prev, status: 'searching', msg: '🛰️ MENGHUBUNGI SATELIT...', signalStrength: 10 }));
        const watchId = navigator.geolocation.watchPosition(
          (pos) => {
            setGps({ 
              lat: pos.coords.latitude, lon: pos.coords.longitude, acc: Math.round(pos.coords.accuracy),
              status: 'locked', msg: `📍 LOKASI TERKUNCI`,
              signalStrength: calculateSignalStrength(pos.coords.accuracy)
            });
            navigator.geolocation.clearWatch(watchId);
          },
          (err) => {
            // Fallback to any available position
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                setGps({ 
                  lat: pos.coords.latitude, lon: pos.coords.longitude, acc: Math.round(pos.coords.accuracy),
                  status: 'locked', msg: `📍 LOKASI TERKUNCI`,
                  signalStrength: calculateSignalStrength(pos.coords.accuracy)
                });
              },
              () => setGps(prev => ({ ...prev, status: 'error', msg: '⚠️ LOKASI TIDAK TERSEDIA', signalStrength: null })),
              { maximumAge: 60000, timeout: 5000 }
            );
            navigator.geolocation.clearWatch(watchId);
          },
          { enableHighAccuracy: true, timeout: 15000 }
        );
      },
      { maximumAge: 30000, timeout: 5000 }
    );
  };

  const requestQuickGPS = () => {
    // Quick fallback with any available position (lower accuracy but faster)
    setGps(prev => ({ ...prev, status: 'searching', msg: '⚡ LOKASI CEPAT...', signalStrength: 0 }));
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGps({ 
          lat: pos.coords.latitude, lon: pos.coords.longitude, acc: Math.round(pos.coords.accuracy),
          status: 'locked', msg: `⚡ LOKASI CEPAT (Akurasi: ${Math.round(pos.coords.accuracy)}m)`,
          signalStrength: Math.round(Math.max(20, 100 - pos.coords.accuracy * 2))
        });
      },
      () => setGps(prev => ({ ...prev, status: 'error', msg: '❌ GAGAL, COBA LAGI', signalStrength: null })),
      { maximumAge: 300000, timeout: 3000 }
    );
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSyncing(true);
    const inputUser = authData.username.trim().toLowerCase();
    const inputPass = authData.password.trim();

    if (inputUser === 'admin' && inputPass === 'kalimantan selatan') {
      setSelectedRole('admin');
      setMode('form');
    } else {
      setAuthError(true);
      setTimeout(() => setAuthError(false), 2000);
    }
    setIsSyncing(false);
  };

  const handleFaceChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        streamRef.current = stream;
        setFaceChecked(true);
        // Wait for render then attach stream
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }, 100);
      } catch (err) { 
        console.error("Camera error:", err);
        alert("Izin kamera diperlukan. Silakan izinkan akses kamera di browser.");
        setFaceChecked(false);
      }
    } else {
      setFaceChecked(false);
      setFacePhoto(null);
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    }
  };

  const captureFacePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const photoData = canvas.toDataURL('image/jpeg', 0.8);
        setFacePhoto(photoData);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // GPS dan Face verification wajib diisi
    if (!agreedToTerms || !faceChecked || gps.status !== 'locked') {
      alert("Pastikan semua langkah (Terms, GPS, Kamera) sudah hijau.");
      return;
    }
    
    // Capture face photo
    captureFacePhoto();
    
    setIsSyncing(true);
    setLoginSuccess(true);
    
    setTimeout(() => {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      onVerified({ 
        name: formData.nama || (selectedRole === 'admin' ? 'Admin Montana' : 'User Terverifikasi'), 
        photo: "https://ui-avatars.com/api/?name=" + (formData.nama || 'User'),
        telepon: formData.telepon, email: formData.email,
        jabatan: selectedRole === 'admin' ? 'Internal Administrator' : 'Portal Member',
        facePhoto: facePhoto || undefined,
        gpsLat: gps.lat || undefined,
        gpsLon: gps.lon || undefined,
        gpsAcc: gps.acc || undefined
      }, selectedRole!);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
      <div className={`relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl sm:rounded-[48px] p-4 sm:p-8 shadow-2xl border border-white/50 dark:border-slate-800 transition-transform duration-500 will-change-transform ${loginSuccess ? 'scale-95 opacity-0 pointer-events-none' : 'opacity-100'}`}>
        
        {mode === 'select' && (
          <div className="space-y-4 sm:space-y-8 text-center animate-fadeIn">
            <div className="mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 dark:bg-slate-800 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 p-3 sm:p-4">
                <img src="https://i.ibb.co.com/29Gzw6k/montana-AI.jpg" alt="Montana Logo" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Montana ID Login</h2>
              <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">Akses Sistem Monitoring</p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <button 
                onClick={() => setMode('auth')} 
                className="w-full p-4 sm:p-6 bg-slate-900 dark:bg-emerald-600 text-white rounded-xl sm:rounded-[28px] text-center active:scale-95 transition-all shadow-xl shadow-emerald-500/10 border border-white/10 group min-h-[60px] sm:min-h-[80px]"
              >
                <div className="flex flex-col items-center">
                  <i className="fas fa-user-shield text-xl sm:text-2xl mb-1 sm:mb-2 text-emerald-400 group-hover:scale-110 transition-transform"></i>
                  <h4 className="font-black text-sm sm:text-base uppercase">Administrator Login</h4>
                  <p className="text-[7px] sm:text-[8px] opacity-60 uppercase font-bold tracking-widest mt-0.5 sm:mt-1">Internal Control Access</p>
                </div>
              </button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-800"></div></div>
                <div className="relative flex justify-center text-[7px] sm:text-[8px] font-black uppercase tracking-widest"><span className="bg-white dark:bg-slate-900 px-3 sm:px-4 text-slate-500 dark:text-slate-400">Verifikasi Google</span></div>
              </div>

              <div className="flex justify-center" ref={googleButtonRef}></div>
            </div>

            <button onClick={onClose} className="w-full py-2 text-[8px] sm:text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest hover:text-emerald-500 min-h-[44px]">Lanjutkan Sebagai Tamu</button>
          </div>
        )}

        {mode === 'auth' && (
          <form onSubmit={handleAuthSubmit} className="space-y-4 sm:space-y-6 animate-fadeIn">
             <div className="text-center">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white uppercase">Autentikasi Admin</h2>
                <p className="text-[8px] sm:text-[9px] font-bold text-emerald-500 uppercase tracking-widest mt-1.5 sm:mt-2 animate-pulse">Security Protocol Alpha</p>
             </div>
             
             <div className="space-y-2.5 sm:space-y-3">
                <input 
                  type="text" placeholder="ID PENGGUNA" required value={authData.username} onChange={e => setAuthData({...authData, username: e.target.value})} 
                  className="w-full p-3.5 sm:p-5 bg-slate-50 dark:bg-slate-800 rounded-xl sm:rounded-2xl text-[10px] sm:text-[11px] font-black uppercase tracking-widest outline-none dark:text-white border border-slate-100 dark:border-slate-700 focus:border-emerald-500 min-h-[52px]" 
                />
                <input 
                  type="password" placeholder="KATA SANDI" required value={authData.password} onChange={e => setAuthData({...authData, password: e.target.value})} 
                  className="w-full p-3.5 sm:p-5 bg-slate-50 dark:bg-slate-800 rounded-xl sm:rounded-2xl text-[10px] sm:text-[11px] font-black uppercase tracking-widest outline-none dark:text-white border border-slate-100 dark:border-slate-700 focus:border-emerald-500 min-h-[52px]" 
                />
             </div>

             {authError && <p className="text-[8px] sm:text-[9px] text-rose-500 font-bold uppercase text-center animate-shake">ID atau Sandi tidak sesuai.</p>}

             <button type="submit" className="w-full py-3.5 sm:py-5 bg-slate-950 dark:bg-emerald-600 text-white rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-[11px] uppercase tracking-widest active:scale-95 transition-all shadow-xl min-h-[52px]">
               KONFIRMASI IDENTITAS
             </button>
             <button type="button" onClick={() => setMode('select')} className="w-full py-2 text-slate-500 dark:text-slate-400 font-bold text-[8px] sm:text-[9px] uppercase tracking-widest text-center min-h-[44px]">Kembali</button>
          </form>
        )}

        {mode === 'form' && (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 max-h-[75vh] overflow-y-auto no-scrollbar animate-fadeIn">
            <div className="text-center">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white uppercase">Validasi Profil</h2>
                <p className="text-[8px] sm:text-[9px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Langkah Terakhir Verifikasi</p>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
                <input type="text" placeholder="NAMA LENGKAP" required value={formData.nama} onChange={e => setFormData({ ...formData, nama: e.target.value })} className="w-full p-3.5 sm:p-5 bg-slate-50 dark:bg-slate-800 rounded-xl sm:rounded-2xl text-[10px] sm:text-[11px] font-black uppercase outline-none dark:text-white border border-slate-100 dark:border-slate-700 min-h-[52px]" />
                <input type="tel" placeholder="NO. WHATSAPP" required value={formData.telepon} onChange={e => setFormData({ ...formData, telepon: e.target.value })} className="w-full p-3.5 sm:p-5 bg-slate-50 dark:bg-slate-800 rounded-xl sm:rounded-2xl text-[10px] sm:text-[11px] font-black uppercase outline-none dark:text-white border border-slate-100 dark:border-slate-700 min-h-[52px]" />
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl sm:rounded-3xl p-3 sm:p-5 space-y-3">
               <h4 className="text-[8px] sm:text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center">1. Pakta Integritas Data</h4>
               <div ref={termsScrollRef} onScroll={handleTermsScroll} className="h-20 sm:h-24 overflow-y-auto px-3 sm:px-4 bg-white dark:bg-slate-900 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] no-scrollbar">
                  <TermsContent />
               </div>
               <label className={`flex items-center gap-2.5 sm:gap-3 cursor-pointer p-2.5 sm:p-3 bg-white dark:bg-slate-900 rounded-lg sm:rounded-xl border transition-opacity min-h-[44px] ${!scrolledToBottom ? 'opacity-30' : 'opacity-100'}`}>
                  <input type="checkbox" disabled={!scrolledToBottom} checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="w-5 h-5 rounded text-emerald-600 flex-shrink-0" />
                  <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest">{scrolledToBottom ? 'SAYA SETUJU' : 'SCROLL KE BAWAH'}</span>
               </label>
            </div>

            <div className={!agreedToTerms ? 'opacity-30 pointer-events-none' : ''}>
               <div className="bg-slate-900 dark:bg-slate-800 rounded-xl sm:rounded-3xl p-3 sm:p-5">
                  <h4 className="text-[8px] sm:text-[9px] font-black text-emerald-400 uppercase tracking-widest text-center mb-3 sm:mb-4">2. Geofencing System</h4>
                  
                  {/* GPS Status Bar */}
                  {gps.status === 'searching' && (
                    <div className="mb-2.5 sm:mb-3">
                      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 animate-pulse" style={{ width: '60%' }}></div>
                      </div>
                      <p className="text-[7px] sm:text-[8px] text-center text-emerald-400 mt-1 animate-pulse">{gps.msg}</p>
                    </div>
                  )}
                  
                  <button type="button" onClick={requestGPS} className={`w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center gap-1 ${gps.status === 'locked' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-emerald-600 text-white shadow-xl shadow-emerald-500/20'} min-h-[60px]`}>
                    <i className={`fas ${gps.status === 'locked' ? 'fa-check-circle' : 'fa-location-crosshairs'} text-base sm:text-lg`}></i>
                    <span className="text-[9px] sm:text-[10px] font-black uppercase">
                      {gps.status === 'locked' ? 'GPS TERKUNCI' : 'KUNCI LOKASI'}
                    </span>
                    {gps.status === 'locked' && gps.lat && gps.lon && (
                      <span className="text-[7px] sm:text-[8px] font-mono opacity-75">
                        {gps.lat.toFixed(6)}, {gps.lon.toFixed(6)}
                      </span>
                    )}
                    {gps.status === 'locked' && gps.acc && (
                      <span className="text-[6px] sm:text-[7px] font-bold opacity-60">
                        Akurasi: ±{gps.acc}m
                      </span>
                    )}
                  </button>
                  
                  {/* Quick option if GPS takes too long */}
                  {gps.status === 'searching' && (
                    <button type="button" onClick={requestQuickGPS} className="w-full mt-2 py-2 bg-slate-700/50 text-slate-400 rounded-lg sm:rounded-xl text-[7px] sm:text-[8px] font-bold uppercase tracking-wider hover:bg-slate-700 hover:text-white transition-colors min-h-[44px]">
                      ⚡ Gunakan Lokasi Terakhir (Lebih Cepat)
                    </button>
                  )}
                  
                  {/* Error with retry */}
                  {gps.status === 'error' && (
                    <div className="mt-2.5 sm:mt-3 p-2.5 sm:p-3 bg-rose-500/20 rounded-lg sm:rounded-xl text-center">
                      <p className="text-[7px] sm:text-[8px] text-rose-400 font-bold uppercase mb-1.5 sm:mb-2">{gps.msg}</p>
                      <button type="button" onClick={requestGPS} className="px-3.5 sm:px-4 py-2 bg-rose-600 text-white rounded-lg text-[7px] sm:text-[8px] font-bold uppercase min-h-[44px]">
                        COBA LAGI
                      </button>
                    </div>
                  )}
                  
                  {/* Signal indicator when locked */}
                  {gps.status === 'locked' && gps.signalStrength && (
                    <div className="mt-2.5 sm:mt-3 flex items-center justify-center gap-1.5 sm:gap-2">
                      <span className="text-[6px] sm:text-[7px] text-slate-500 uppercase">Sinyal:</span>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((i) => (
                          <div key={i} className={`w-1.5 h-2.5 sm:h-3 rounded-sm ${i <= Math.ceil(gps.signalStrength / 20) ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                        ))}
                      </div>
                      <span className="text-[6px] sm:text-[7px] text-emerald-500 font-bold">{gps.signalStrength}%</span>
                    </div>
                  )}
               </div>
            </div>

            <div className={gps.status !== 'locked' ? 'opacity-30 pointer-events-none' : ''}>
              <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl sm:rounded-3xl p-3 sm:p-5">
                <h4 className="text-[8px] sm:text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center mb-3 sm:mb-4">3. Biometrik Wajah</h4>
                <label className="flex items-center gap-2.5 sm:gap-3 cursor-pointer mb-3 sm:mb-4 p-2.5 sm:p-3 bg-white dark:bg-slate-900 rounded-lg sm:rounded-xl border min-h-[44px]">
                   <input type="checkbox" checked={faceChecked} onChange={handleFaceChange} className="w-5 h-5 rounded text-emerald-600 flex-shrink-0" />
                   <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest">AKTIFKAN SCANNER</span>
                </label>
                {faceChecked && (
                  <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-video bg-black shadow-inner ring-2 sm:ring-4 ring-emerald-500/20">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
                    <canvas ref={canvasRef} className="hidden" />
                    <div className="absolute inset-0 border-2 border-emerald-500/30 animate-pulse"></div>
                    {facePhoto && (
                      <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 bg-emerald-500 text-white text-[7px] sm:text-[8px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
                        <i className="fas fa-check-circle mr-1"></i> TERVERIFIKASI
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <button type="submit" disabled={!faceChecked || isSyncing || gps.status !== 'locked'} className="w-full py-3.5 sm:py-5 bg-emerald-600 disabled:bg-slate-200 text-white rounded-xl sm:rounded-[28px] font-black text-[10px] sm:text-[12px] uppercase tracking-widest shadow-xl shadow-emerald-500/30 active:scale-95 transition-all min-h-[52px]">
              SELESAIKAN VERIFIKASI
            </button>
            <button type="button" onClick={() => setMode('select')} className="w-full py-2 text-slate-500 dark:text-slate-400 font-bold text-[8px] sm:text-[9px] uppercase tracking-widest text-center min-h-[44px]">Batal</button>
          </form>
        )}
      </div>
    </div>
  );
};
