
import React, { useState, useRef } from 'react';
import { UserProfile } from '../types';
import { secureHash } from './Login';

interface ProfileEditProps {
  user: UserProfile;
  onSave: (updatedUser: Partial<UserProfile>) => void;
  onClose: () => void;
}

export const ProfileEdit: React.FC<ProfileEditProps> = ({ user, onSave, onClose }) => {
  const [showSecurityFields, setShowSecurityFields] = useState(false);
  const [securityVerified, setSecurityVerified] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user.name,
    jabatan: user.jabatan || 'Anggota Lapangan',
    telepon: user.telepon || '',
    email: user.email || '',
    photo: user.photo,
    // Verifikasi kredensial lama
    oldAuthUser: '',
    oldAuthPass: '',
    // Kredensial baru
    newAuthUser: '',
    newAuthPass: ''
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerifySecurity = async () => {
    // Verifikasi menggunakan hash SHA-256
    const inputUserHash = await secureHash(formData.oldAuthUser);
    const inputPassHash = await secureHash(formData.oldAuthPass);

    const storedUserHash = localStorage.getItem('montana_auth_user_hash') || "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";
    const storedPassHash = localStorage.getItem('montana_auth_pass_hash') || "80562e67df0443909789781896174a7b97e937d10526e828a2a893114f4e1509";

    if (inputUserHash === storedUserHash && inputPassHash === storedPassHash) {
      setSecurityVerified(true);
      setFormData(prev => ({ 
        ...prev, 
        newAuthUser: formData.oldAuthUser, 
        newAuthPass: formData.oldAuthPass 
      }));
    } else {
      alert("Kredensial lama tidak sesuai. Verifikasi gagal.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Jika security pernah dibuka dan diverifikasi, simpan kredensial baru dalam bentuk HASH
    if (securityVerified && formData.newAuthUser && formData.newAuthPass) {
      const newUserHash = await secureHash(formData.newAuthUser);
      const newPassHash = await secureHash(formData.newAuthPass);
      localStorage.setItem('montana_auth_user_hash', newUserHash);
      localStorage.setItem('montana_auth_pass_hash', newPassHash);
    }
    
    onSave({
      name: formData.name,
      jabatan: formData.jabatan,
      telepon: formData.telepon,
      email: formData.email,
      photo: formData.photo
    });
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center px-4 pb-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[40px] p-8 shadow-2xl animate-drift-puff border-t dark:border-slate-800 max-h-[90vh] overflow-y-auto no-scrollbar">
        <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-8"></div>
        
        <div className="flex flex-col items-center mb-8">
          <div className="relative group cursor-pointer" onClick={handlePhotoClick}>
            <img 
              src={formData.photo || 'https://ui-avatars.com/api/?name=User&background=cbd5e1&color=fff'} 
              className="w-24 h-24 rounded-[32px] object-cover shadow-2xl border-4 border-white dark:border-slate-800 group-hover:opacity-80 transition-all" 
              alt="Profile"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <i className="fas fa-camera text-white text-xl"></i>
            </div>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          </div>
          <p className="mt-3 text-[10px] font-black text-emerald-600 uppercase tracking-widest">Klik Foto untuk Ganti</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 pb-20">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Profil Anggota</h4>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Nama Lengkap</label>
              <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-all outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Jabatan / Peran</label>
              <input type="text" value={formData.jabatan} onChange={e => setFormData({ ...formData, jabatan: e.target.value })} className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-all outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">WhatsApp</label>
                <input type="tel" value={formData.telepon} onChange={e => setFormData({ ...formData, telepon: e.target.value })} className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-all outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Email</label>
                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-all outline-none" />
              </div>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-slate-800" />

          {/* Akses Login Sistem Section */}
          <div className="space-y-4">
            {!showSecurityFields ? (
              <button 
                type="button" 
                onClick={() => setShowSecurityFields(true)}
                className="w-full py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:bg-slate-100"
              >
                <i className="fas fa-key-skeleton"></i> Ubah Kredensial Keamanan
              </button>
            ) : !securityVerified ? (
              <div className="p-6 bg-amber-50/30 dark:bg-amber-900/5 rounded-[32px] border border-amber-100 dark:border-amber-800/30 space-y-4">
                 <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest px-1">Verifikasi Admin Diperlukan</h4>
                 <div className="space-y-3">
                   <input type="text" placeholder="ID SAAT INI" value={formData.oldAuthUser} onChange={e => setFormData({...formData, oldAuthUser: e.target.value})} className="w-full p-4 bg-white dark:bg-slate-800 border border-amber-100 dark:border-amber-700 rounded-2xl text-xs font-bold outline-none" />
                   <input type="password" placeholder="SANDI SAAT INI" value={formData.oldAuthPass} onChange={e => setFormData({...formData, oldAuthPass: e.target.value})} className="w-full p-4 bg-white dark:bg-slate-800 border border-amber-100 dark:border-amber-700 rounded-2xl text-xs font-bold outline-none" />
                 </div>
                 <div className="flex gap-2">
                   <button type="button" onClick={() => setShowSecurityFields(false)} className="flex-1 py-3 text-[9px] font-black uppercase text-slate-400">Batal</button>
                   <button type="button" onClick={handleVerifySecurity} className="flex-[2] py-3 bg-amber-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest">Verifikasi</button>
                 </div>
              </div>
            ) : (
              <div className="p-6 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-[32px] border border-emerald-100 dark:border-emerald-800/30 space-y-4 animate-fadeIn">
                <h4 className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest px-1 flex items-center gap-2">
                  <i className="fas fa-shield-check"></i> Kredensial Baru Disetujui
                </h4>
                <div className="space-y-3">
                   <div className="space-y-1">
                     <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Username Baru</label>
                     <input type="text" value={formData.newAuthUser} onChange={e => setFormData({...formData, newAuthUser: e.target.value})} className="w-full p-4 bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-700 rounded-2xl text-xs font-black outline-none" />
                   </div>
                   <div className="space-y-1">
                     <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Password Baru</label>
                     <input type="text" value={formData.newAuthPass} onChange={e => setFormData({...formData, newAuthPass: e.target.value})} className="w-full p-4 bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-700 rounded-2xl text-xs font-black outline-none" />
                   </div>
                </div>
                <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest text-center mt-2">Data akan diperbarui saat tombol simpan diklik</p>
              </div>
            )}
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white dark:from-slate-900 dark:via-slate-900 to-transparent flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">Batal</button>
            <button type="submit" className="flex-[2] py-4 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-600/20 active:scale-95 transition-all">Simpan Perubahan</button>
          </div>
        </form>
      </div>
    </div>
  );
};
