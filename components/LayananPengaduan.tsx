
import React, { useState } from 'react';

export interface FeatureDetail {
  id: string;
  title: string;
  highlight: string;
  longNarrative: string;
  icon: string;
  category: string;
  image: string;
}

export const MONTANA_FEATURES: FeatureDetail[] = [
  {
    id: 'camera-v2',
    title: 'Montana Camera V2',
    highlight: 'Dokumentasi visual presisi tinggi dengan validasi metadata GPS & Timestamp permanen.',
    category: 'Monitoring',
    icon: 'fa-camera-retro',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200',
    longNarrative: `Melalui integrasi kamera Montana V2 dan sensor tinggi tanaman, Montana AI mampu melakukan pemantauan visual dan kuantitatif terhadap pertumbuhan tanaman di lapangan secara objektif.

Setiap titik tanam dapat terdokumentasi secara digital, lengkap dengan koordinat GPS yang terkunci (akurasi <10m), foto kondisi tanaman dalam resolusi tinggi, serta label metadata permanen yang mencakup tanggal dan jam pengambilan data. 

Teknologi ini menghilangkan celah manipulasi data (fraud documentation) yang sering terjadi pada pelaporan manual. Dengan Montana Camera V2, setiap progres pertumbuhan pohon dapat dilacak secara temporal (waktu) dan spasial (lokasi), memudahkan perusahaan dalam melakukan evaluasi, audit reklamasi, serta memberikan bukti transparansi yang tak terbantahkan kepada regulator dan pemangku kepentingan.

Sistem ini juga dilengkapi dengan analisis warna dasar untuk mendeteksi indeks hijau daun secara cepat, memberikan indikasi awal kesehatan vegetasi sebelum dilakukan inspeksi mendalam oleh ahli botani.`
  },
  {
    id: 'ai-dashboard',
    title: 'Dashboard Bibit AI',
    highlight: 'Sentralisasi data stok nursery terpadu yang terhubung dengan algoritma analitik real-time.',
    category: 'Analytics',
    icon: 'fa-chart-pie',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200',
    longNarrative: `Montana AI menyediakan sistem manajemen bibit yang terhubung langsung dengan Google Sheets dan AppSheet melalui middleware cerdas, sehingga seluruh data stok, distribusi, dan penanaman bibit dapat tercatat secara otomatis dan akurat.

Sistem ini meminimalkan kesalahan pencatatan manual (human error) serta memastikan ketersediaan data yang valid untuk pengambilan keputusan strategis. Dashboard ini menyajikan resume harian mengenai jumlah bibit masuk, bibit keluar untuk penanaman, hingga tingkat mortalitas di nursery. 

Dengan visualisasi tren 7 hari dan akumulasi stok net, manajemen dapat merencanakan pengadaan bibit atau pemindahan bibit ke area reklamasi dengan presisi tinggi berdasarkan target tahunan yang telah ditetapkan. Dashboard ini bukan sekadar tabel data, melainkan instrumen "Supply Chain Management" khusus untuk ekosistem hijau perusahaan.`
  },
  {
    id: 'roster',
    title: 'Roster Tim Revegetasi',
    highlight: 'Orkestrasi sumber daya manusia lapangan untuk memastikan keberlanjutan operasional.',
    category: 'Management',
    icon: 'fa-users-cog',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200',
    longNarrative: `Keberhasilan reklamasi sangat bergantung pada disiplin dan koordinasi tim lapangan. Fitur Roster Tim di Montana AI mengelola jadwal kehadiran, pembagian shift kerja (Shift Siang, Tahura-DAS, OFF), hingga penempatan personil di titik-titik krusial penanaman.

Sistem ini memastikan tidak ada kekosongan pengawasan di lapangan dan memudahkan komunikasi antar regu. Data roster ini juga terintegrasi dengan laporan produktivitas individu, di mana setiap kontribusi tim dalam penanaman terekam dalam logbook digital. 

Melalui manajemen SDM yang transparan, perusahaan dapat melakukan audit internal terhadap performa tim revegetasi serta menjamin kesejahteraan personil melalui pengaturan beban kerja yang adil dan terukur.`
  },
  {
    id: 'growth',
    title: 'Growth System',
    highlight: 'Mekanisme gamifikasi produktivitas untuk meningkatkan keterlibatan pengguna.',
    category: 'Engagement',
    icon: 'fa-tree',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200',
    longNarrative: `Montana AI menerapkan sistem level pengguna yang unik, mulai dari Semai, Pancang, Tiang, Pohon, hingga Rimba. Sistem ini bukan sekadar label, melainkan representasi dari akumulasi kontribusi dan waktu aktif pengguna dalam mendukung keberhasilan reklamasi.

Setiap aktivitas positif, mulai dari pengisian logbook hingga pengambilan data kamera yang valid, dikonversi menjadi poin pertumbuhan ekosistem virtual. Pendekatan gamifikasi ini terbukti meningkatkan partisipasi aktif karyawan dan membangun rasa kepemilikan (sense of ownership) terhadap program lingkungan perusahaan.

Dengan naiknya level pengguna, sistem akan membuka akses ke fitur-fitur yang lebih lanjut, mendorong setiap personil untuk terus meningkatkan kompetensi dan tanggung jawab mereka dalam menjaga ekosistem.`
  },
  {
    id: 'security',
    title: 'Montana ID Sync',
    highlight: 'Protokol keamanan berlapis dengan validasi biometrik wajah dan geofencing.',
    category: 'Security',
    icon: 'fa-shield-halved',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200',
    longNarrative: `Integritas data adalah fondasi utama Montana AI. Fitur Montana ID Sync menerapkan protokol keamanan login multi-faktor yang mewajibkan verifikasi biometrik wajah secara real-time dan penguncian koordinat GPS saat proses autentikasi berlangsung.

Hal ini memastikan bahwa data yang dikirimkan ke server benar-benar berasal dari personil yang sah dan sedang berada di lokasi site yang ditentukan (Geofencing). Keamanan ini melindungi aset data sensitif perusahaan dari akses pihak yang tidak berwenang dan menjamin akurasi laporan lapangan. 

Setiap sesi login dicatat dalam audit trail sistem, memberikan lapisan perlindungan ekstra terhadap potensi penyalahgunaan identitas digital dalam operasional reklamasi.`
  },
  {
    id: 'carbon',
    title: 'Analisis Karbon',
    highlight: 'Perhitungan estimasi serapan karbon untuk mendukung laporan keberlanjutan (ESG).',
    category: 'Environment',
    icon: 'fa-leaf',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200',
    longNarrative: `Di era ekonomi hijau, kemampuan memantau serapan karbon adalah nilai strategis yang sangat tinggi. Modul Analisis Karbon Montana AI menghitung estimasi biomassa dan serapan karbon (CO2 sequestration) berdasarkan data pertumbuhan vegetasi yang terkumpul dari lapangan.

Melalui integrasi data jenis pohon, diameter batang, dan luas polygon reklamasi, sistem memberikan angka estimasi kontribusi perusahaan dalam mitigasi perubahan iklim. Data ini sangat krusial bagi penyusunan Laporan Keberlanjutan (ESG Report) dan memperkuat posisi perusahaan dalam indeks keberlanjutan internasional. 

Montana AI membantu perusahaan bertransformasi dari sekadar "penanam pohon" menjadi "penghasil data lingkungan" yang dapat dipertanggungjawabkan di tingkat global.`
  },
  {
    id: 'gis-maps',
    title: 'Integrasi GIS & Maps',
    highlight: 'Visualisasi spasial titik tanam dan polygon reklamasi secara interaktif.',
    category: 'Geospatial',
    icon: 'fa-map-location-dot',
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200',
    longNarrative: `Montana AI terhubung dengan sistem peta digital seperti Google Earth dan ArcGIS, serta data prakiraan cuaca lokal. Integrasi ini memungkinkan pemantauan lokasi reklamasi secara spasial, di mana setiap bibit yang ditanam dapat dilihat posisinya dalam peta interaktif.

Pengguna dapat memantau progres reklamasi per-polygon area, melihat sebaran jenis bibit, hingga menganalisis kondisi topografi lahan melalui data GIS. Fitur ini sangat membantu dalam perencanaan kegiatan tanam yang lebih presisi dan efisien, menghindari tumpang tindih area penanaman, serta memudahkan navigasi tim lapangan menuju titik-titik perawatan tanaman yang membutuhkan perhatian khusus.`
  },
  {
    id: 'offline-sync',
    title: 'Offline Syncing',
    highlight: 'Ketahanan data pada area tanpa sinyal (Blind Spot) dengan sinkronisasi otomatis.',
    category: 'System',
    icon: 'fa-cloud-arrow-up',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200',
    longNarrative: `Lahan tambang dan area reklamasi seringkali berada di titik-titik dengan jangkauan sinyal telekomunikasi yang terbatas. Montana AI dirancang dengan teknologi "Offline First" yang memungkinkan pengambilan data tetap berlangsung meski perangkat tidak memiliki koneksi internet.

Seluruh data foto, koordinat, dan laporan disimpan secara aman dalam database lokal perangkat (IndexedDB). Saat perangkat kembali mendapatkan sinyal internet yang stabil, sistem akan melakukan sinkronisasi otomatis (Syncing) ke server pusat tanpa perlu intervensi pengguna. 

Hal ini menjamin kelancaran operasional di lapangan tanpa hambatan infrastruktur jaringan, memastikan tidak ada satu pun progres penanaman yang luput dari pendataan digital.`
  }
];

export const LayananPengaduan: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureDetail | null>(null);

  const handleCloseDetail = () => {
    setSelectedFeature(null);
    window.scrollTo({ top: document.getElementById('narasi-section')?.offsetTop || 0, behavior: 'smooth' });
  };

  return (
    <div id="narasi-section" className="space-y-16 animate-fadeIn min-h-[600px] relative">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div className="flex flex-col">
          <h3 className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.4em] mb-4 leading-none">System Intelligence</h3>
          <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none uppercase">
            Narasi Sistem <span className="text-emerald-600">Montana AI</span>
          </p>
        </div>
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest max-w-sm text-right">
          Pilih fitur untuk mempelajari arsitektur pengetahuan dan dampak operasional yang dihasilkan.
        </p>
      </div>

      {!selectedFeature ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
          {MONTANA_FEATURES.map((f) => (
            <button 
              key={f.id} 
              onClick={() => setSelectedFeature(f)}
              className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[40px] border border-white/50 dark:border-slate-800 hover:border-emerald-500/40 transition-all duration-500 group relative overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 flex flex-col items-center text-center"
            >
              {/* Category Badge */}
              <div className="absolute top-6 right-6 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-[8px] font-black text-slate-400 uppercase tracking-widest rounded-full transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                {f.category}
              </div>

              {/* Icon Section */}
              <div className="w-20 h-20 shrink-0 rounded-[28px] bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-3xl text-slate-400 group-hover:text-emerald-500 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 shadow-inner border border-slate-50 dark:border-slate-700 transition-all duration-500 group-hover:scale-110 mb-6">
                <i className={`fas ${f.icon} drop-shadow-sm`}></i>
              </div>

              <div className="space-y-3">
                <h4 className="text-[14px] font-black text-slate-900 dark:text-white uppercase tracking-tight leading-tight transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  {f.title}
                </h4>
                <p className="text-[10px] leading-relaxed font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest line-clamp-3">
                  {f.highlight}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50 dark:border-slate-800 w-full flex items-center justify-center gap-2 text-emerald-500 text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                Pelajari Detail <i className="fas fa-arrow-right"></i>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-transparent to-emerald-500/0 group-hover:from-emerald-500/[0.03] group-hover:to-emerald-500/[0.01] pointer-events-none transition-all duration-700"></div>
            </button>
          ))}
        </div>
      ) : (
        /* DETAIL NARRATIVE VIEW */
        <div className="bg-white dark:bg-slate-900 rounded-[56px] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden animate-drift-puff">
          <div className="relative h-[300px] md:h-[450px]">
            <img 
              src={selectedFeature.image} 
              alt={selectedFeature.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
            
            <button 
              onClick={handleCloseDetail}
              className="absolute top-8 left-8 flex items-center gap-3 px-6 py-3 bg-white/20 hover:bg-white/40 backdrop-blur-xl border border-white/30 text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all active:scale-90"
            >
              <i className="fas fa-arrow-left"></i> Kembali ke Daftar
            </button>

            <div className="absolute bottom-12 left-12 right-12 space-y-4">
               <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-2xl shadow-xl">
                    <i className={`fas ${selectedFeature.icon}`}></i>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] mb-1">{selectedFeature.category} Specialist</h3>
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">{selectedFeature.title}</h2>
                  </div>
               </div>
            </div>
          </div>

          <div className="p-12 md:p-20 bg-white dark:bg-slate-900">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="h-0.5 flex-1 bg-slate-100 dark:bg-slate-800"></div>
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] shrink-0">Deep Narrative Architecture</span>
                  <div className="h-0.5 flex-1 bg-slate-100 dark:bg-slate-800"></div>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  {selectedFeature.longNarrative.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-lg md:text-2xl font-medium text-slate-600 dark:text-slate-300 leading-relaxed text-justify mb-10 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div className="pt-12 border-t border-slate-50 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex flex-col gap-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Asset ID</p>
                  <p className="text-xs font-mono font-bold text-slate-900 dark:text-white">SYS_MOD_{selectedFeature.id.toUpperCase()}_v4.5</p>
                </div>
                
                <button 
                  onClick={handleCloseDetail}
                  className="px-12 py-5 bg-slate-900 dark:bg-emerald-600 text-white rounded-3xl text-[12px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/20 active:scale-95 transition-all"
                >
                  Selesai Membaca
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtle Support Indicator */}
      {!selectedFeature && (
        <div className="bg-slate-900 dark:bg-emerald-600/10 p-8 rounded-[44px] border border-emerald-500/20 flex items-center justify-between shadow-2xl transition-all hover:shadow-emerald-500/20 hover:scale-[1.01] group mx-2">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xl animate-pulse shadow-lg shadow-emerald-500/30 group-hover:rotate-12 transition-transform duration-500">
              <i className="fas fa-headset"></i>
            </div>
            <div>
              <p className="text-[12px] font-black text-white uppercase tracking-widest">Butuh Pendalaman Teknis?</p>
              <p className="text-[10px] font-bold text-slate-400 dark:text-emerald-400/60 uppercase tracking-widest mt-1">Gunakan Chatbox AI di bawah untuk mendapatkan rincian spesifik modul.</p>
            </div>
          </div>
          <i className="fas fa-arrow-right text-emerald-500 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-2 mr-4"></i>
        </div>
      )}
    </div>
  );
};
