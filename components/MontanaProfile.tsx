
import React from 'react';

interface MontanaProfileProps {
  onClose: () => void;
}

export const MontanaProfile: React.FC<MontanaProfileProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[400] bg-slate-50 dark:bg-slate-950 flex flex-col animate-fadeIn overflow-hidden">
      {/* Header */}
      <header className="px-6 py-6 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center sticky top-0 z-50">
        <button 
          onClick={onClose}
          className="px-6 py-3 bg-slate-900 dark:bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
        >
          <i className="fas fa-arrow-left mr-2"></i> Kembali
        </button>
        <div className="text-right">
          <h2 className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-tight">Company Profile</h2>
          <p className="text-[8px] font-bold text-emerald-600 uppercase tracking-widest">PT Montana Wana Teknologi</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12 no-scrollbar">
        <div className="max-w-4xl mx-auto space-y-12 pb-24">
          
          <section className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">
              COMPANY PROFILE <br />
              <span className="text-emerald-600">PT MONTANA WANA TEKNOLOGI</span>
            </h1>
            <div className="h-2 w-24 bg-emerald-500 rounded-full"></div>
            
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800">
               <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase mb-4 tracking-tight">1. Profil Umum Perusahaan</h3>
               <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
                PT Montana Wana Teknologi adalah Perseroan Perorangan yang bergerak di bidang teknologi digital, pengembangan aplikasi, konsultasi manajemen, serta jasa penunjang kehutanan. Perusahaan ini didirikan untuk menjawab kebutuhan transformasi digital, khususnya pada sektor kehutanan, lingkungan, dan manajemen berbasis teknologi informasi, dengan pendekatan profesional, adaptif, dan berorientasi solusi.
               </p>
               <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-medium mt-4">
                Dengan mengintegrasikan teknologi aplikasi, sistem informasi, dan platform digital, PT Montana Wana Teknologi berkomitmen mendukung efisiensi operasional, transparansi data, serta pengambilan keputusan yang akurat bagi mitra usaha dan pemangku kepentingan.
               </p>
            </div>
          </section>

          <section className="bg-white dark:bg-slate-900 p-8 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">2. Identitas Perusahaan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Nama Perseroan</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">PT Montana Wana Teknologi</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Bentuk Usaha</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Perseroan Perorangan</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Modal Usaha</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Rp1.000.000,00</p>
                </div>
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Alamat Kantor</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                  Jalan Perambaian III Gg. Kestela 1 RT 030 RW 007 <br/>
                  Kelurahan Sungai Ulin, Kecamatan Banjarbaru Utara <br/>
                  Kota Banjarbaru, Kalimantan Selatan
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[52px] shadow-sm border border-slate-100 dark:border-slate-800 space-y-8">
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">3. Bidang Kegiatan Usaha</h3>
            <div className="space-y-6">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">PT Montana Wana Teknologi menjalankan kegiatan usaha sesuai klasifikasi KBLI sebagai berikut:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { code: '02409', label: 'Jasa Penunjang Kehutanan Lainnya' },
                  { code: '62012', label: 'Aktivitas Pengembangan Aplikasi E-Commerce' },
                  { code: '62019', label: 'Aktivitas Pemrograman Komputer Lainnya' },
                  { code: '63122', label: 'Portal Web dan/atau Platform Digital Komersial' },
                  { code: '70209', label: 'Aktivitas Konsultasi Manajemen Lainnya' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-white/5">
                     <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center text-xs font-black shrink-0">{item.code}</div>
                     <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-emerald-600 text-white p-12 rounded-[52px] shadow-2xl relative overflow-hidden">
             <div className="relative z-10 space-y-10">
                <div className="space-y-4">
                   <h3 className="text-2xl font-black uppercase tracking-tight">4. Visi dan Misi</h3>
                   <p className="text-lg italic font-medium opacity-90 leading-relaxed">
                    Visi: “Menjadi perusahaan teknologi yang inovatif, terpercaya, dan berkelanjutan dalam mendukung transformasi digital sektor kehutanan, lingkungan, dan bisnis di Indonesia.”
                   </p>
                </div>
                <div className="space-y-6">
                   <h4 className="text-xl font-black uppercase tracking-tight">Misi</h4>
                   <ul className="space-y-4">
                     {[
                       'Mengembangkan solusi teknologi yang aplikatif dan berdampak nyata',
                       'Mendukung efisiensi, transparansi, dan akurasi pengelolaan data',
                       'Memberikan layanan konsultasi dan pengembangan sistem yang profesional',
                       'Mendorong pemanfaatan teknologi digital untuk pembangunan berkelanjutan'
                     ].map((item, i) => (
                       <li key={i} className="flex items-start gap-4">
                         <i className="fas fa-check-circle mt-1"></i>
                         <p className="text-sm font-medium opacity-90">{item}</p>
                       </li>
                     ))}
                   </ul>
                </div>
             </div>
          </section>

          <section className="bg-white dark:bg-slate-900 p-8 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800">
             <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase mb-8 tracking-tight">5. Data Pendiri / Pemilik Usaha</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Nama Lengkap</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Agung Laksono</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tempat, Tanggal Lahir</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">30 Agustus 1998</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Alamat</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                      Dusun Gunungtelu, RT 02 RW 02, Karang Pucung, <br/> Kabupaten Cilacap, Jawa Tengah
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">NIK</p>
                    <p className="text-sm font-mono font-bold text-slate-900 dark:text-white">3302233008980003</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">NPWP</p>
                    <p className="text-sm font-mono font-bold text-slate-900 dark:text-white">61.086.952.1-711.000</p>
                  </div>
                  <div className="pt-4">
                    <a 
                      href="https://drive.google.com/file/d/1QdhCyBUteqUm-frkEpBlmtHj7T_Wkdjh/view?usp=sharing" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                    >
                      <i className="fas fa-file-signature"></i> Lihat Dokumen Legalitas
                    </a>
                  </div>
                </div>
             </div>
          </section>

          <section className="bg-slate-100 dark:bg-slate-800/40 p-8 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-700">
             <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">6. Pernyataan Tanggung Jawab</h3>
             <p className="text-[11px] font-medium leading-relaxed text-slate-600 dark:text-slate-400">
              Pendiri menyatakan bahwa seluruh data Perseroan telah diisi dengan benar dan bersedia menaati seluruh ketentuan hukum yang berlaku terkait Perseroan Perorangan serta peraturan perundang-undangan lainnya. <br/>
              Pernyataan pendirian ini telah disetujui secara elektronik oleh Pemohon.
             </p>
          </section>

        </div>
      </div>
    </div>
  );
};
