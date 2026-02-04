import React, { useEffect, useRef, useState } from 'react';
import { TermsContent } from './TermsContent';

// Prefer setting this in your env (Vite: VITE_GOOGLE_CLIENT_ID)
const GOOGLE_CLIENT_ID = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID || "357045986446-03056acv0ggnrhv7irv1dtk3b0fn5vmf.apps.googleusercontent.com";

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
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

interface LoginProps {
  onVerified: (
    userData: {
      name: string;
      photo: string;
      telepon: string;
      email: string;
      jabatan: string;
      facePhoto?: string;
      gpsLat?: number;
      gpsLon?: number;
      gpsAcc?: number;
    },
    role: 'admin' | 'guest'
  ) => void;
  onClose: () => void;
}

export const Login: React.FC<LoginProps> = ({ onVerified, onClose }) => {
  const [mode, setMode] = useState<'select' | 'auth' | 'form'>('select');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'guest' | null>(null);

  const [authData, setAuthData] = useState({ username: '', password: '' });
  const [authError, setAuthError] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const [formData, setFormData] = useState({ nama: '', telepon: '', email: '' });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  const [gps, setGps] = useState<{
    lat: number | null;
    lon: number | null;
    acc: number | null;
    status: 'idle' | 'searching' | 'locked' | 'error' | 'denied';
    msg: string;
    signalStrength: number | null;
  }>({ lat: null, lon: null, acc: null, status: 'idle', msg: '', signalStrength: null });

  const [faceChecked, setFaceChecked] = useState(false);
  const [facePhoto, setFacePhoto] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const termsScrollRef = useRef<HTMLDivElement | null>(null);
  const googleButtonRef = useRef<HTMLDivElement | null>(null);

  // Stepper inside form: 1 = Data, 2 = Terms, 3 = GPS, 4 = Camera, 5 = Review/Submit
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    // Reset step when entering form
    if (mode === 'form') setStep(1);
  }, [mode]);

  const handleGoogleResponse = (response: any) => {
    const payload = parseJwt(response?.credential);
    if (payload) {
      setFormData((f) => ({ ...f, nama: payload.name || '', email: payload.email || '' }));
      setSelectedRole('guest');
      setMode('form');
    }
  };

  useEffect(() => {
    const google = (window as any).google;
    if (mode === 'select' && google && google.accounts && google.accounts.id) {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });
      if (googleButtonRef.current) {
        google.accounts.id.renderButton(googleButtonRef.current, {
          theme: 'outline',
          size: 'large',
          width: 320,
          shape: 'pill',
          text: 'signin_with',
        });
      }
    }
  }, [mode]);

  const handleTermsScroll = () => {
    if (termsScrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = termsScrollRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        setScrolledToBottom(true);
      }
    }
  };

  useEffect(() => {
    // try auto-request GPS when user agrees and enters GPS step
    if (mode === 'form' && step === 3 && agreedToTerms && gps.status === 'idle') {
      const timer = setTimeout(() => requestGPS(), 400);
      return () => clearTimeout(timer);
    }
  }, [mode, step, agreedToTerms]);

  // calculate signal helper
  const calculateSignalStrength = (accuracy: number) => {
    if (accuracy <= 5) return 100;
    if (accuracy <= 10) return 80;
    if (accuracy <= 20) return 60;
    if (accuracy <= 50) return 40;
    return 20;
  };

  const requestGPS = () => {
    setGps((prev) => ({ ...prev, status: 'searching', msg: 'MENCARI SINYAL...', signalStrength: 0 }));

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGps({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          acc: Math.round(pos.coords.accuracy),
          status: 'locked',
          msg: 'LOKASI TERKUNCI',
          signalStrength: calculateSignalStrength(pos.coords.accuracy),
        });
      },
      (err) => {
        // try watchPosition as fallback
        setGps((prev) => ({ ...prev, status: 'searching', msg: 'MENGHUBUNGI SATELIT...', signalStrength: 10 }));
        const watchId = navigator.geolocation.watchPosition(
          (pos) => {
            setGps({
              lat: pos.coords.latitude,
              lon: pos.coords.longitude,
              acc: Math.round(pos.coords.accuracy),
              status: 'locked',
              msg: 'LOKASI TERKUNCI',
              signalStrength: calculateSignalStrength(pos.coords.accuracy),
            });
            navigator.geolocation.clearWatch(watchId);
          },
          (err2) => {
            // final fallback try once more then set error
            navigator.geolocation.getCurrentPosition(
              (pos2) => {
                setGps({
                  lat: pos2.coords.latitude,
                  lon: pos2.coords.longitude,
                  acc: Math.round(pos2.coords.accuracy),
                  status: 'locked',
                  msg: 'LOKASI TERKUNCI',
                  signalStrength: calculateSignalStrength(pos2.coords.accuracy),
                });
              },
              () => setGps((p) => ({ ...p, status: 'error', msg: 'LOKASI TIDAK TERSEDIA', signalStrength: null })),
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
    setGps((prev) => ({ ...prev, status: 'searching', msg: 'LOKASI CEPAT...', signalStrength: 0 }));
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGps({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          acc: Math.round(pos.coords.accuracy),
          status: 'locked',
          msg: 'LOKASI CEPAT (Akurasi: ' + Math.round(pos.coords.accuracy) + 'm)',
          signalStrength: Math.round(Math.max(20, 100 - pos.coords.accuracy * 2)),
        });
      },
      () => setGps((p) => ({ ...p, status: 'error', msg: 'GAGAL, COBA LAGI', signalStrength: null })),
      { maximumAge: 300000, timeout: 3000 }
    );
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSyncing(true);
    const inputUser = authData.username.trim().toLowerCase();
    const inputPass = authData.password.trim();

    // NOTE: replace with a real API call for production
    if (inputUser === 'admin' && inputPass === 'kalimantan selatan') {
      setSelectedRole('admin');
      setMode('form');
    } else {
      setAuthError(true);
      setTimeout(() => setAuthError(false), 2500);
    }
    setIsSyncing(false);
  };

  const handleFaceChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        streamRef.current = stream;
        setFaceChecked(true);
        // attach stream
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error('Camera error:', err);
        alert('Izin kamera diperlukan. Silakan izinkan akses kamera di browser.');
        setFaceChecked(false);
      }
    } else {
      setFaceChecked(false);
      setFacePhoto(null);
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  // Capture function returns photo data synchronously (or null)
  const captureFacePhotoSync = (): string | null => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current as HTMLCanvasElement;
      const video = videoRef.current as HTMLVideoElement;
      // make sure video has size
      const w = video.videoWidth || 640;
      const h = video.videoHeight || 480;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      // mirror back to normal orientation (video is mirrored via scaleX earlier)
      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(video, -w, 0, w, h);
      ctx.restore();
      const photoData = canvas.toDataURL('image/jpeg', 0.85);
      setFacePhoto(photoData);
      return photoData;
    }
    return null;
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  useEffect(() => {
    // cleanup camera stream when unmounting
    return () => {
      stopCamera();
    };
  }, []);

  // Step navigation validations
  const canGoNext = (currentStep: number) => {
    if (currentStep === 1) return formData.nama.trim() !== '' && formData.telepon.trim() !== '';
    if (currentStep === 2) return scrolledToBottom && agreedToTerms;
    if (currentStep === 3) return gps.status === 'locked';
    if (currentStep === 4) return faceChecked; // allow capture on submit if not yet captured
    return true;
  };

  const handleNext = () => {
    if (!canGoNext(step)) return;
    // auto actions when moving to specific steps
    if (step === 2) {
      // user agreed to terms already? nothing
    }
    if (step === 3) {
      // try to lock GPS
      if (gps.status !== 'locked') requestGPS();
    }
    setStep((s) => Math.min(5, s + 1));
  };

  const handleBack = () => {
    if (step === 1) {
      // go back to select
      setMode('select');
    } else {
      setStep((s) => Math.max(1, s - 1));
    }
  };

  const finalizeSubmit = async () => {
    // ensure we have photo
    let photo = facePhoto;
    if (!photo) {
      photo = captureFacePhotoSync();
    }

    if (!agreedToTerms || !faceChecked || gps.status !== 'locked') {
      alert('Pastikan Terms, GPS, dan Kamera sudah selesai.');
      return;
    }

    setIsSyncing(true);
    setLoginSuccess(true);

    // stop camera quickly
    stopCamera();

    // simulate small delay for UX
    setTimeout(() => {
      setIsSyncing(false);
      onVerified(
        {
          name: formData.nama || (selectedRole === 'admin' ? 'Admin Montana' : 'User Terverifikasi'),
          photo: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(formData.nama || 'User'),
          telepon: formData.telepon,
          email: formData.email,
          jabatan: selectedRole === 'admin' ? 'Internal Administrator' : 'Portal Member',
          facePhoto: photo || undefined,
          gpsLat: gps.lat || undefined,
          gpsLon: gps.lon || undefined,
          gpsAcc: gps.acc || undefined,
        },
        (selectedRole as 'admin' | 'guest') || 'guest'
      );
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-[500] flex flex-col bg-gradient-to-br from-slate-200 via-slate-400 to-blue-900">
      <div className={`relative w-full h-full max-w-none bg-[#0F172A]/90 backdrop-blur-xl shadow-2xl border border-white/10 overflow-hidden transition-all duration-300 ${loginSuccess ? 'scale-95 opacity-80' : 'opacity-100'}`}>
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-6 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden shadow-2xl">
            <span className="text-4xl font-black text-white tracking-tighter">M</span>
          </div>
          <h2 className="text-lg font-black text-white uppercase tracking-tight">Montana ID Login</h2>
          <p className="text-xs font-bold text-emerald-100 uppercase tracking-widest mt-1">Akses Sistem Monitoring</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-md mx-auto">
          {mode === 'select' && (
            <div className="space-y-4">

              {/* Full Intro Section */}
              <div className="w-full p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
                <h3 className="text-center text-base font-black text-blue-400 uppercase">Montana AI Pro</h3>
                <p className="text-xs text-slate-300 text-center leading-relaxed mt-2">
                  Platform cerdas untuk dokumentasi, monitoring, dan validasi
                  reklamasi lahan berbasis GPS, biometrik, dan AI.
                  Dirancang untuk memastikan setiap aktivitas lapangan
                  tercatat secara akurat, transparan, dan berkelanjutan.
                </p>
              </div>

              <div className="flex justify-center py-2">
                <div ref={googleButtonRef} className="google-login-btn"></div>
              </div>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white dark:bg-slate-900 px-3 text-xs font-bold text-slate-500 uppercase tracking-widest">atau</span>
                </div>
              </div>

              <button
                onClick={() => setMode('auth')}
                className="w-full p-4 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-emerald-600 dark:to-emerald-500 text-white rounded-xl text-center transition-all shadow-lg"
              >
                <div className="flex flex-col items-center">
                  <i className="fas fa-user-shield text-xl mb-1 text-emerald-400"></i>
                  <h4 className="font-black text-base uppercase">Administrator Login</h4>
                </div>
              </button>

              <button onClick={onClose} className="w-full py-3 text-sm font-bold text-slate-500 hover:text-emerald-500 uppercase tracking-wider transition-colors">
                Lanjutkan Sebagai Tamu
              </button>
            </div>
          )}

                    {mode === 'auth' && (
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div className="text-center">
                <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase">Autentikasi Admin</h2>
              </div>

              <div className="space-y-3">
                <input type="text" placeholder="ID PENGGUNA" required value={authData.username} onChange={(e) => setAuthData({ ...authData, username: e.target.value })} className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none border-2 border-slate-200" />
                <input type="password" placeholder="KATA SANDI" required value={authData.password} onChange={(e) => setAuthData({ ...authData, password: e.target.value })} className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none border-2 border-slate-200" />
              </div>

              {authError && <p className="text-sm text-rose-500 font-bold uppercase text-center">ID atau Sandi tidak sesuai.</p>}

              <div className="space-y-2">
                <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition">KONFIRMASI</button>
                <button type="button" onClick={() => setMode('select')} className="w-full py-2 text-slate-500">Kembali</button>
              </div>
                    {/* Tombol Masuk sebagai Tamu */}
        <a
          href="https://montana-tech.info/"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full mt-4 text-center py-2 rounded-xl bg-slate-800/80 text-slate-200 hover:bg-slate-700 transition"
        >
          Masuk sebagai Tamu
        </a>

      </form>
          )}

                    {mode === 'form' && (
            <div className="space-y-4">
              {/* Step header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white uppercase">Validasi Profil</h3>
                  <p className="text-xs text-slate-500">Langkah {step} dari 5</p>
                </div>
                <div className="text-xs text-slate-400">{selectedRole?.toUpperCase() || 'GUEST'}</div>
              </div>

              {/* Step content */}
              {step === 1 && (
                <div className="space-y-3">
                  <input type="text" placeholder="NAMA LENGKAP" required value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} className="w-full p-3 bg-slate-800 text-slate-100 rounded-xl" />
                  <input type="tel" placeholder="NO. WHATSAPP" required value={formData.telepon} onChange={(e) => setFormData({ ...formData, telepon: e.target.value })} className="w-full p-3 bg-slate-800 text-slate-100 rounded-xl" />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase text-center">1. Pakta Integritas Data</h4>
                  <div ref={termsScrollRef} onScroll={handleTermsScroll} className="h-36 overflow-y-auto px-3 py-2 bg-slate-800 rounded-lg text-sm leading-relaxed">
                    <TermsContent />
                  </div>
                  <label className={`flex items-center gap-3 cursor-pointer p-3 bg-slate-800 rounded-lg border-2 ${!scrolledToBottom ? 'opacity-50' : ''}`}>
                    <input type="checkbox" disabled={!scrolledToBottom} checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="w-5 h-5 rounded" />
                    <span className="text-sm font-bold uppercase">{scrolledToBottom ? 'SAYA SETUJU' : 'SCROLL KE BAWAH DAHULU'}</span>
                  </label>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase text-center">2. Geofencing System</h4>
                  {gps.status === 'searching' && (
                    <div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 animate-pulse" style={{ width: '60%' }}></div>
                      </div>
                      <p className="text-sm text-center mt-2">{gps.msg}</p>
                    </div>
                  )}

                  <button type="button" onClick={requestGPS} className={`w-full py-3 rounded-xl ${gps.status === 'locked' ? 'bg-emerald-100 text-blue-400' : 'bg-blue-600 text-white'}`}>
                    {gps.status === 'locked' ? 'GPS TERKUNCI' : 'KUNCI LOKASI SEKARANG'}
                  </button>

                  {gps.status === 'locked' && gps.lat && gps.lon && (
                    <div className="text-xs font-mono text-center">
                      {gps.lat.toFixed(6)}, {gps.lon.toFixed(6)} • Akurasi: ±{gps.acc}m
                    </div>
                  )}

                  {gps.status !== 'locked' && (
                    <button type="button" onClick={requestQuickGPS} className="w-full py-2 text-sm">⚡ Gunakan Lokasi Terakhir (Cepat)</button>
                  )}
                </div>
              )}

              {step === 4 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase text-center">3. Biometrik Wajah</h4>
                  <label className="flex items-center gap-3 cursor-pointer p-3 bg-slate-800 rounded-lg border-2">
                    <input type="checkbox" checked={faceChecked} onChange={handleFaceChange} className="w-5 h-5 rounded" />
                    <span className="text-sm font-bold uppercase">AKTIFKAN SCANNER</span>
                  </label>

                  {faceChecked && (
                    <div className="relative rounded-xl overflow-hidden aspect-video bg-black shadow-inner">
                      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform scale-x-[-1]" />
                      <canvas ref={canvasRef} className="hidden" />
                      <div className="absolute inset-0 border-4 border-blue-500/30"></div>
                      {facePhoto && (
                        <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">TERVERIFIKASI</div>
                      )}
                      <div className="p-2 flex gap-2">
                        <button type="button" onClick={() => captureFacePhotoSync()} className="mt-2 py-2 px-3 bg-blue-600 text-white rounded">Ambil Foto</button>
                        <button type="button" onClick={() => { setFacePhoto(null); }} className="mt-2 py-2 px-3 bg-slate-200 rounded">Ulangi</button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 5 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase text-center">Review & Submit</h4>
                  <div className="bg-slate-800 text-slate-200 rounded-lg p-3 text-sm">
                    <p><strong>Nama:</strong> {formData.nama}</p>
                    <p><strong>WA:</strong> {formData.telepon}</p>
                    <p><strong>Email:</strong> {formData.email || '-'}</p>
                    <p><strong>GPS:</strong> {gps.lat ? `${gps.lat.toFixed(4)}, ${gps.lon?.toFixed(4)} (±${gps.acc}m)` : 'Belum'}</p>
                    <p><strong>Foto Wajah:</strong> {facePhoto ? 'Tersedia' : 'Belum'}</p>
                  </div>
                </div>
              )}

              {/* Step controls */}
              <div className="flex gap-2">
                <button type="button" onClick={handleBack} className="flex-1 py-3 border border-slate-400/40 text-slate-200 rounded-full hover:bg-white/5 transition">{step === 1 ? 'Batal' : 'Kembali'}</button>
                {step < 5 ? (
                  <button type="button" onClick={handleNext} disabled={!canGoNext(step)} className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition">Berikutnya</button>
                ) : (
                  <button type="button" onClick={finalizeSubmit} disabled={!agreedToTerms || !faceChecked || gps.status !== 'locked'} className="flex-1 py-3 bg-blue-600 text-white rounded">
                    {isSyncing ? 'MEMPROSES...' : 'SELESAIKAN VERIFIKASI'}
                  </button>
                )}
              </div>

              <div className="text-center text-xs text-slate-400 mt-2"><em>Tip: setiap langkah dibuat agar muat di layar — tidak perlu scroll panjang.</em></div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};
