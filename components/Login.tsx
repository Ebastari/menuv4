
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
  onVerified: (userData: { name: string; photo: string; telepon: string; email: string; jabatan: string }, role: 'admin' | 'guest') => void;
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
  
  const [gps, setGps] = useState<{ lat: number | null; lon: number | null; acc: number | null; status: 'idle' | 'searching' | 'locked' | 'error' | 'denied'; msg: string }>({ 
    lat: null, lon: null, acc: null, status: 'idle', msg: ''
  });
  
  const [faceChecked, setFaceChecked] = useState(false);
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
          width: 320,
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

  const requestGPS = () => {
    setGps(prev => ({ ...prev, status: 'searching', msg: '🛰️ MENGHUBUNGI SATELIT...' }));
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGps({ 
          lat: pos.coords.latitude, lon: pos.coords.longitude, acc: Math.round(pos.coords.accuracy),
          status: 'locked', msg: `📍 LOKASI TERKUNCI`
        });
      },
      (err) => setGps(prev => ({ ...prev, status: 'error', msg: 'SINYAL GPS LEMAH' })),
      { enableHighAccuracy: true, timeout: 10000 }
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
        if (videoRef.current) videoRef.current.srcObject = stream;
        setFaceChecked(true);
      } catch (err) { alert("Izin kamera diperlukan."); }
    } else {
      setFaceChecked(false);
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Kebutuhan GPS dinonaktifkan sementara (gps.status !== 'locked' dihapus dari validasi utama)
    if (!agreedToTerms || !faceChecked) {
      alert("Pastikan semua langkah (Terms, Kamera) sudah hijau.");
      return;
    }
    setIsSyncing(true);
    setLoginSuccess(true);
    
    setTimeout(() => {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      onVerified({ 
        name: formData.nama || (selectedRole === 'admin' ? 'Admin Montana' : 'User Terverifikasi'), 
        photo: "https://ui-avatars.com/api/?name=" + (formData.nama || 'User'),
        telepon: formData.telepon, email: formData.email,
        jabatan: selectedRole === 'admin' ? 'Internal Administrator' : 'Portal Member'
      }, selectedRole!);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className={`relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-[48px] p-8 shadow-2xl border border-white/50 dark:border-slate-800 transition-all duration-500 ${loginSuccess ? 'scale-95 opacity-0 pointer-events-none' : 'opacity-100'}`}>
        
        {mode === 'select' && (
          <div className="space-y-8 text-center animate-fadeIn">
            <div className="mb-6">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 p-4">
                <img src="https://i.ibb.co.com/29Gzw6k/montana-AI.jpg" alt="Montana Logo" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Montana ID Login</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Akses Sistem Monitoring Terpusat</p>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => setMode('auth')} 
                className="w-full p-6 bg-slate-900 dark:bg-emerald-600 text-white rounded-[28px] text-center active:scale-95 transition-all shadow-xl shadow-emerald-500/10 border border-white/10 group"
              >
                <div className="flex flex-col items-center">
                  <i className="fas fa-user-shield text-2xl mb-2 text-emerald-400 group-hover:scale-110 transition-transform"></i>
                  <h4 className="font-black text-base uppercase">Administrator Login</h4>
                  <p className="text-[8px] opacity-60 uppercase font-bold tracking-widest mt-1">Internal Control Access</p>
                </div>
              </button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-800"></div></div>
                <div className="relative flex justify-center text-[8px] font-black uppercase tracking-widest"><span className="bg-white dark:bg-slate-900 px-4 text-slate-400">Verifikasi Google</span></div>
              </div>

              <div className="flex justify-center" ref={googleButtonRef}></div>
            </div>

            <button onClick={onClose} className="w-full py-2 text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-500">Lanjutkan Sebagai Tamu</button>
          </div>
        )}

        {mode === 'auth' && (
          <form onSubmit={handleAuthSubmit} className="space-y-6 animate-fadeIn">
             <div className="text-center">
                <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase">Autentikasi Admin</h2>
                <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest mt-2 animate-pulse">Security Protocol Alpha</p>
             </div>
             
             <div className="space-y-3">
                <input 
                  type="text" placeholder="ID PENGGUNA" required value={authData.username} onChange={e => setAuthData({...authData, username: e.target.value})} 
                  className="w-full p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-[11px] font-black uppercase tracking-widest outline-none dark:text-white border border-slate-100 dark:border-slate-700 focus:border-emerald-500" 
                />
                <input 
                  type="password" placeholder="KATA SANDI" required value={authData.password} onChange={e => setAuthData({...authData, password: e.target.value})} 
                  className="w-full p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-[11px] font-black uppercase tracking-widest outline-none dark:text-white border border-slate-100 dark:border-slate-700 focus:border-emerald-500" 
                />
             </div>

             {authError && <p className="text-[9px] text-rose-500 font-bold uppercase text-center animate-shake">ID atau Sandi tidak sesuai.</p>}

             <button type="submit" className="w-full py-5 bg-slate-950 dark:bg-emerald-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest active:scale-95 transition-all shadow-2xl">
               KONFIRMASI IDENTITAS
             </button>
             <button type="button" onClick={() => setMode('select')} className="w-full py-2 text-slate-400 font-bold text-[9px] uppercase tracking-widest text-center">Kembali</button>
          </form>
        )}

        {mode === 'form' && (
          <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar animate-fadeIn">
            <div className="text-center">
                <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase">Validasi Profil</h2>
                <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Langkah Terakhir Verifikasi</p>
            </div>

            <div className="space-y-3">
                <input type="text" placeholder="NAMA LENGKAP" required value={formData.nama} onChange={e => setFormData({ ...formData, nama: e.target.value })} className="w-full p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-[11px] font-black uppercase outline-none dark:text-white border border-slate-100 dark:border-slate-700" />
                <input type="tel" placeholder="NO. WHATSAPP AKTIF" required value={formData.telepon} onChange={e => setFormData({ ...formData, telepon: e.target.value })} className="w-full p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-[11px] font-black uppercase outline-none dark:text-white border border-slate-100 dark:border-slate-700" />
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-3xl p-5 space-y-4">
               <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">1. Pakta Integritas Data</h4>
               <div ref={termsScrollRef} onScroll={handleTermsScroll} className="h-24 overflow-y-auto px-4 bg-white dark:bg-slate-900 rounded-xl text-[10px] no-scrollbar">
                  <TermsContent />
               </div>
               <label className={`flex items-center gap-3 cursor-pointer p-3 bg-white dark:bg-slate-900 rounded-xl border transition-opacity ${!scrolledToBottom ? 'opacity-30' : 'opacity-100'}`}>
                  <input type="checkbox" disabled={!scrolledToBottom} checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="w-5 h-5 rounded text-emerald-600" />
                  <span className="text-[9px] font-black uppercase tracking-widest">{scrolledToBottom ? 'SAYA SETUJU' : 'SCROLL KE BAWAH'}</span>
               </label>
            </div>

            <div className={!agreedToTerms ? 'opacity-30 pointer-events-none' : ''}>
               <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-5">
                  <h4 className="text-[9px] font-black text-emerald-400 uppercase tracking-widest text-center mb-4">2. Geofencing System</h4>
                  <button type="button" onClick={requestGPS} className={`w-full py-5 rounded-2xl flex flex-col items-center justify-center gap-1 ${gps.status === 'locked' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-emerald-600 text-white shadow-xl shadow-emerald-500/20'}`}>
                    <i className="fas fa-location-crosshairs text-lg"></i>
                    <span className="text-[10px] font-black uppercase">
                      {gps.status === 'locked' ? 'GPS TERKUNCI' : 'KUNCI LOKASI'}
                    </span>
                  </button>
               </div>
            </div>

            <div className={/* gps.status !== 'locked' ? 'opacity-30 pointer-events-none' : */ ''}>
              <div className="bg-slate-50 dark:bg-slate-800/40 rounded-3xl p-5">
                <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center mb-4">3. Biometrik Wajah</h4>
                <label className="flex items-center gap-3 cursor-pointer mb-4 p-3 bg-white dark:bg-slate-900 rounded-xl border">
                   <input type="checkbox" checked={faceChecked} onChange={handleFaceChange} className="w-5 h-5 rounded text-emerald-600" />
                   <span className="text-[9px] font-black uppercase tracking-widest">AKTIFKAN SCANNER</span>
                </label>
                {faceChecked && (
                  <div className="relative rounded-2xl overflow-hidden aspect-video bg-black shadow-inner ring-4 ring-emerald-500/20">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
                    <div className="absolute inset-0 border-2 border-emerald-500/30 animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>

            <button type="submit" disabled={!faceChecked || isSyncing /* || gps.status !== 'locked' */} className="w-full py-5 bg-emerald-600 disabled:bg-slate-200 text-white rounded-[28px] font-black text-[12px] uppercase tracking-widest shadow-2xl shadow-emerald-500/30 active:scale-95 transition-all">
              SELESAIKAN VERIFIKASI
            </button>
            <button type="button" onClick={() => setMode('select')} className="w-full py-2 text-slate-400 font-bold text-[9px] uppercase tracking-widest text-center">Batal</button>
          </form>
        )}
      </div>
    </div>
  );
};
