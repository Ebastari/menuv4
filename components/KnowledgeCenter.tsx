
import React from 'react';

export const KnowledgeCenter: React.FC = () => {
  return (
    <section className="px-6 py-24 max-w-[1440px] mx-auto space-y-32 animate-fadeIn">
      
      {/* HEADER: NARASI UTAMA */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-[56px] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
        <div className="relative bg-white dark:bg-slate-900 rounded-[56px] p-12 md:p-20 border border-white/50 dark:border-slate-800 shadow-2xl text-center">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.4em]">Strategic Corporate Narrative</p>
            </div>
            
            <h2 className="text-3xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-[0.95]">
              Narasi Sistem Montana AI <br /> <span className="text-emerald-600">Smart Land Reclamation</span>
            </h2>
            
            <p className="text-lg md:text-2xl font-medium text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Montana AI merupakan platform digital cerdas yang dirancang untuk mendukung kegiatan reklamasi lahan, pengelolaan nursery, serta pemantauan pertumbuhan tanaman secara terintegrasi dan berbasis data real-time.
            </p>

            <div className="pt-8 flex flex-col items-center gap-4 text-slate-400 dark:text-slate-500">
               <p className="text-[10px] font-black uppercase tracking-widest max-w-2xl mx-auto italic">
                 Sistem ini hadir sebagai solusi atas tantangan utama dalam kegiatan revegetasi dan reklamasi, seperti akurasi data lapangan serta keterbatasan monitoring berkelanjutan.
               </p>
            </div>
          </div>
        </div>
      </div>

      {/* GRID FITUR: MANAJEMEN & MONITORING */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Manajemen Bibit */}
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[44px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 group">
          <div className="w-14 h-14 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center text-xl mb-8 group-hover:rotate-6 transition-transform">
            <i className="fas fa-seedling"></i>
          </div>
          <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4 leading-tight">Manajemen Bibit Terpadu</h4>
          <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
            Sistem yang terhubung langsung dengan Google Sheets dan AppSheet, memastikan seluruh data stok, distribusi, dan penanaman bibit tercatat secara otomatis dan akurat.
          </p>
        </div>

        {/* Pemantauan Kamera & Sensor */}
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[44px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 group">
          <div className="w-14 h-14 bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center text-xl mb-8 group-hover:rotate-6 transition-transform">
            <i className="fas fa-camera"></i>
          </div>
          <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4 leading-tight">Pemantauan Berbasis Kamera & Sensor</h4>
          <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
            Integrasi kamera Montana V2 dan sensor tinggi memungkinkan dokumentasi digital titik tanam lengkap dengan koordinat GPS, foto kondisi, serta data pertumbuhan berkala.
          </p>
        </div>

        {/* Analisis AI */}
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[44px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 group">
          <div className="w-14 h-14 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center text-xl mb-8 group-hover:rotate-6 transition-transform">
            <i className="fas fa-microchip"></i>
          </div>
          <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4 leading-tight">Analisis Kesehatan Berbasis AI</h4>
          <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
            Teknologi computer vision mendeteksi gejala penyakit, kekurangan nutrisi, maupun stres lingkungan sejak dini untuk memberikan rekomendasi perawatan yang tepat.
          </p>
        </div>

        {/* Chatbot AI */}
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[44px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 group">
          <div className="w-14 h-14 bg-purple-500/10 text-purple-600 rounded-2xl flex items-center justify-center text-xl mb-8 group-hover:rotate-6 transition-transform">
            <i className="fas fa-robot"></i>
          </div>
          <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4 leading-tight">Pelaporan Digital & Chatbot AI</h4>
          <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
            Memungkinkan akses laporan operasional kapan saja melalui chatbot mobile, meningkatkan kecepatan informasi dan efektivitas koordinasi tim lapangan.
          </p>
        </div>

        {/* GIS & Geospasial */}
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[44px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 group">
          <div className="w-14 h-14 bg-sky-500/10 text-sky-600 rounded-2xl flex items-center justify-center text-xl mb-8 group-hover:rotate-6 transition-transform">
            <i className="fas fa-map-location-dot"></i>
          </div>
          <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4 leading-tight">Integrasi GIS & Data Cuaca</h4>
          <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
            Terhubung dengan Google Earth dan ArcGIS untuk pemantauan lokasi secara spasial, analisis lingkungan, serta perencanaan kegiatan tanam yang presisi.
          </p>
        </div>

        {/* Logbook Digital */}
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[44px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 group">
          <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-2xl flex items-center justify-center text-xl mb-8 group-hover:rotate-6 transition-transform">
            <i className="fas fa-book"></i>
          </div>
          <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4 leading-tight">Logbook & Manajemen Dokumen</h4>
          <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
            Penyediaan logbook digital untuk pencatatan penggunaan bibit, pestisida, dan pupuk yang aman dan mudah diakses untuk keperluan audit berkelanjutan.
          </p>
        </div>
      </div>

      {/* DAMPAK & KEUNGGULAN STRATEGIS */}
      <div className="bg-slate-900 dark:bg-emerald-950/20 rounded-[56px] p-12 md:p-20 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/10 to-transparent opacity-50"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h3 className="text-[11px] font-black text-emerald-400 uppercase tracking-[0.4em]">Impact & Advantage</h3>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
              Dampak Strategis <br /> <span className="text-emerald-500">Operasional Montana AI.</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
              {[
                "Meningkatkan Keberhasilan Reklamasi",
                "Menurunkan Biaya Operasional",
                "Mempercepat Pengambilan Keputusan",
                "Meningkatkan Transparansi Perusahaan",
                "Mendukung Good Mining Practice",
                "Memperkuat ESG dan Kepatuhan"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] shrink-0">
                    <i className="fas fa-check"></i>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-tight opacity-90">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-10 bg-white/5 rounded-[44px] border border-white/10 backdrop-blur-xl space-y-8">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-xl">
                  <i className="fas fa-trophy"></i>
                </div>
                <div>
                   <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none mb-1">Human Development</h4>
                   <p className="text-xl font-black text-white uppercase tracking-tight">Sistem Pengembangan Pengguna</p>
                </div>
             </div>
             <p className="text-sm font-medium text-slate-300 leading-relaxed italic">
               "Montana AI menerapkan sistem level pengguna mulai dari <strong>Semai, Pancang, Tiang, Pohon, hingga Rimba</strong> untuk mendorong kompetensi, tanggung jawab, serta partisipasi aktif tim."
             </p>
             <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Growth Engine V4.5</p>
                <img src="https://i.ibb.co.com/29Gzw6k/montana-AI.jpg" alt="Montana Logo" className="w-8 h-8 opacity-40 grayscale" />
             </div>
          </div>
        </div>
      </div>

      {/* TECHNICAL KNOWLEDGE GRAPH (AIO OPTIMIZED) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-100 dark:border-slate-800 pt-20">
        <div className="md:col-span-1 space-y-6">
           <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] leading-none">Knowledge Graph Index</h4>
           <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Indeks Pencarian Teknis</h3>
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
             Daftar kata kunci dan frasa teknis untuk mempermudah pemahaman mesin AI dalam mengkategorikan sistem Montana AI.
           </p>
        </div>
        <div className="md:col-span-2 flex flex-wrap gap-3 content-start">
           {[
             "Monitoring Revegetasi Tambang", "Sistem Manajemen Nursery AI", "Analisis Kesehatan Tanaman HSV", 
             "Monitoring Karbon Reklamasi GIS", "PT Montana Wana Teknologi", "ESG Compliance Dashboard", 
             "Smart Land Reclamation", "Hasnur Group Energy Ecosystem", "Validasi Dokumentasi Geotagging", 
             "Knowledge Management System Lingkungan", "Audit Reklamasi Pascatambang Digital", "Infrastruktur Karbon Biru"
           ].map(tag => (
             <span key={tag} className="px-5 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-tight hover:border-emerald-500/40 hover:text-emerald-500 transition-all cursor-default shadow-sm">
               {tag}
             </span>
           ))}
        </div>
      </div>

      {/* FOOTER BRANDING (DIKEMBANGKAN SECARA MANDIRI - SESUAI SCREENSHOT) */}
      <div className="text-center space-y-6 pt-12 pb-10">
         <div className="flex items-center justify-center gap-6 opacity-40">
            <div className="h-[1px] w-24 bg-slate-300 dark:bg-slate-700"></div>
            <p className="text-[12px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.8em]">Urip Kudu Urup</p>
            <div className="h-[1px] w-24 bg-slate-300 dark:bg-slate-700"></div>
         </div>
         <div className="space-y-1 opacity-50">
           <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
             DIKEMBANGKAN SECARA MANDIRI OLEH TIM ENGINEERING
           </p>
           <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
             PT MONTANA WANA TEKNOLOGI © 2026
           </p>
         </div>
      </div>

    </section>
  );
};
