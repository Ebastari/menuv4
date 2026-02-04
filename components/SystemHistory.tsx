
import React, { useState } from 'react';

const SUMMARY_CARDS = [
  {
    id: 'verif',
    title: 'Standarisasi Verifikasi',
    icon: 'fa-shield-check',
    desc: 'Menghilangkan fraud metadata dan duplikasi data lapangan dengan geotagging tervalidasi.'
  },
  {
    id: 'mon',
    title: 'Monitoring Real-Time',
    icon: 'fa-clock-rotate-left',
    desc: 'Transisi dari inspeksi reaktif ke dashboard perkembangan tanaman yang terpantau instan.'
  },
  {
    id: 'frag',
    title: 'Fragmentasi Data',
    icon: 'fa-sitemap',
    desc: 'Konsolidasi data dari berbagai sumber ke dalam satu Single Source of Truth yang terintegrasi.'
  }
];

export const SystemHistory: React.FC = () => {
  const [isNarrativeVisible, setIsNarrativeVisible] = useState(false);

  const toggleNarrative = () => {
    setIsNarrativeVisible(!isNarrativeVisible);
    if (!isNarrativeVisible) {
      setTimeout(() => {
        document.getElementById('archive-start')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <section className="space-y-12 py-10">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div className="flex flex-col">
          <h3 className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.4em] mb-4 leading-none">Archival Intelligence</h3>
          <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none uppercase">
            Evolusi & <span className="text-emerald-600">History Sistem</span>
          </p>
        </div>
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest max-w-sm text-right">
          Memahami perjalanan transformasi dari proses konvensional menuju kedaulatan data berbasis AI.
        </p>
      </div>

      {!isNarrativeVisible ? (
        <div className="space-y-12 animate-fadeIn">
          {/* SUMMARY GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUMMARY_CARDS.map((card) => (
              <div key={card.id} className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl text-slate-400 group-hover:text-emerald-500 transition-colors mb-6 shadow-inner">
                  <i className={`fas ${card.icon}`}></i>
                </div>
                <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-3">{card.title}</h4>
                <p className="text-[12px] leading-relaxed font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* OPEN ARCHIVE TRIGGER */}
          <div className="relative group cursor-pointer" onClick={toggleNarrative}>
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-[44px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-slate-900 dark:bg-slate-800 rounded-[44px] p-12 text-center overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
               <div className="relative z-10 space-y-6">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                    <i className="fas fa-scroll text-3xl text-emerald-400"></i>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Buka Arsip Sejarah Digital</h3>
                  <p className="text-sm text-slate-400 max-w-2xl mx-auto font-medium">
                    Klik untuk mengeksplorasi narasi mendalam mengenai latar belakang, dampak masalah, dan analisis QCDSM yang melandasi pengembangan Montana AI Pro.
                  </p>
                  <div className="pt-4">
                    <span className="inline-block px-12 py-4 bg-emerald-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-xl group-hover:scale-105 transition-transform">
                      Baca Selengkapnya
                    </span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      ) : (
        /* DEEP NARRATIVE ARCHIVE VIEW */
        <div id="archive-start" className="bg-white dark:bg-slate-900 rounded-[60px] border border-slate-100 dark:border-slate-800 shadow-2xl animate-drift-puff overflow-hidden">
          {/* ARCHIVE COVER */}
          <div className="relative h-[400px]">
             <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000" className="w-full h-full object-cover" alt="History" />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
             <div className="absolute top-10 left-10">
                <button onClick={toggleNarrative} className="px-6 py-3 bg-white/10 hover:bg-white/30 backdrop-blur-xl border border-white/20 text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all">
                  <i className="fas fa-arrow-left mr-2"></i> Tutup Arsip
                </button>
             </div>
             <div className="absolute bottom-12 left-12 right-12">
                <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-4">Arsip Evolusi <br/> Montana AI Pro</h2>
                <div className="flex gap-6">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest border border-emerald-500/30 px-4 py-1.5 rounded-full">v4.5 Official Log</span>
                  <span className="text-[10px] font-black text-white/50 uppercase tracking-widest border border-white/10 px-4 py-1.5 rounded-full">Knowledge Management System</span>
                </div>
             </div>
          </div>

          <div className="p-12 md:p-24 space-y-20 max-w-5xl mx-auto">
             {/* 1.1 IDENTIFIKASI MASALAH */}
             <section className="space-y-12">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">1.1 Identifikasi Masalah Utama</h3>
                </div>

                <div className="space-y-16">
                  {/* Problem A */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-black text-emerald-600 uppercase tracking-tight flex items-center gap-3">
                      <span className="text-slate-300">A.</span> Tidak Adanya Sistem Standar untuk Verifikasi Data Lapangan
                    </h4>
                    <p className="text-lg md:text-xl font-medium text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                      Bukti lapangan seperti foto penanaman, titik koordinat, ID tanaman, serta tinggi tanaman sering dikirim melalui WhatsApp atau dicatat secara manual tanpa geotag yang tervalidasi. Banyak foto lapangan tidak memiliki metadata lengkap (koordinat, waktu, akurasi GPS), sehingga kebenaran datanya sulit dipastikan. Tanpa verifikasi otomatis, data rawan duplikasi, kesalahan lokasi, dan tidak dapat dijadikan bukti kuat pada audit PROPER, inspeksi, maupun penilaian keberhasilan revegetasi.
                    </p>
                  </div>

                  {/* Problem B */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-black text-emerald-600 uppercase tracking-tight flex items-center gap-3">
                      <span className="text-slate-300">B.</span> Kesulitan Memantau Progres Revegetasi Secara Real-Time
                    </h4>
                    <p className="text-lg md:text-xl font-medium text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                      Pertumbuhan tanaman (tinggi, diameter, dan survival rate) masih dicatat secara manual dan tidak terintegrasi dalam sistem terpusat, sehingga tidak tersedia dashboard perkembangan yang real-time. Monitoring lapangan memerlukan kunjungan fisik berulang, yang memakan waktu serta menyulitkan deteksi dini terhadap kendala seperti kematian tanaman, serangan hama, kekeringan, atau stagnasi pertumbuhan. Tanpa sistem digital seperti Montana AI, progres pertumbuhan sulit dibandingkan antar periode, dan tidak tersedia peringatan otomatis untuk lokasi yang mengalami penurunan kondisi.
                    </p>
                  </div>

                  {/* Problem C */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-black text-emerald-600 uppercase tracking-tight flex items-center gap-3">
                      <span className="text-slate-300">C.</span> Fragmentasi Data antar Departemen
                    </h4>
                    <p className="text-lg md:text-xl font-medium text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                      Data nursery, penanaman, pemeliharaan, dan foto lapangan tersebar di berbagai sumber seperti spreadsheet manual, pesan WhatsApp, folder Google Drive, hingga dokumen fisik. Ketidakseragaman format data menghambat proses penggabungan untuk evaluasi, rekonsiliasi, dan penyusunan laporan bulanan maupun tahunan. Ketiadaan database terpusat menyebabkan proses audit internal atau eksternal memerlukan waktu lama karena data harus dicari ulang dan diverifikasi secara manual.
                    </p>
                  </div>

                  {/* Problem D */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-black text-emerald-600 uppercase tracking-tight flex items-center gap-3">
                      <span className="text-slate-300">D.</span> Ketergantungan pada Dokumentasi Manual yang Tidak Terstandarisasi
                    </h4>
                    <p className="text-lg md:text-xl font-medium text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                      Petugas lapangan mengambil foto dengan sudut, jarak, dan kualitas yang berbeda-beda, sehingga menyulitkan konsistensi dokumentasi untuk analisis lanjutan. Sebagian foto tidak menampilkan objek utama (tanaman), tidak menampilkan papan ID, atau tidak sesuai dengan standar verifikasi lokasi. Tanpa sistem seperti Montana Camera AI (kamera otomatis dengan template dokumentasi), kualitas foto tidak dapat distandarkan, sehingga verifikasi data menjadi sulit dan mengurangi kredibilitas laporan.
                    </p>
                  </div>

                  {/* Problem E */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-black text-emerald-600 uppercase tracking-tight flex items-center gap-3">
                      <span className="text-slate-300">E.</span> Kurangnya Pemanfaatan Teknologi Artificial Intelligence
                    </h4>
                    <p className="text-lg md:text-xl font-medium text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                      Pengukuran tinggi tanaman masih dilakukan secara manual menggunakan meteran, sehingga rentan kesalahan, lambat, dan tidak efisien untuk ribuan tanaman. Belum tersedia sistem otomatis untuk mengenali jenis tanaman, membaca ID papan, memverifikasi koordinat, atau mendeteksi duplikasi titik penanaman. Tanpa AI seperti Montana AI, proses identifikasi dan verifikasi data memerlukan banyak tenaga, rawan manipulasi, dan tidak mampu mengakomodasi skala monitoring yang besar (hingga puluhan ribu titik).
                    </p>
                  </div>
                </div>
             </section>

             {/* 1.2 DAMPAK MASALAH */}
             <section className="space-y-12 bg-slate-50 dark:bg-white/5 p-12 rounded-[56px] border border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">1.2 Analisis Dampak Masalah</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <h5 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Dampak Lingkungan</h5>
                    <ul className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed list-disc pl-4 space-y-2">
                      <li>Ketidaktepatan data revegetasi dapat menyebabkan kegagalan pemulihan vegetasi lahan bekas tambang.</li>
                      <li>Ketidakakuratan pelaporan mengakibatkan keterlambatan intervensi pada lokasi bermasalah.</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h5 className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Dampak Ekonomi</h5>
                    <ul className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed list-disc pl-4 space-y-2">
                      <li>Monitoring manual dan proses verifikasi tidak efisien meningkatkan biaya operasional tenaga kerja dan audit.</li>
                      <li>Ketidaktepatan data dapat menyebabkan pemborosan bibit, pupuk, dan biaya pemeliharaan.</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h5 className="text-[10px] font-black text-purple-600 uppercase tracking-widest">Dampak Sosial & Reputasi</h5>
                    <ul className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed list-disc pl-4 space-y-2">
                      <li>Ketidaktransparanan data menurunkan tingkat kepercayaan pemangku kepentingan terhadap kinerja lingkungan perusahaan.</li>
                      <li>Ketidaksesuaian laporan memengaruhi reputasi dalam pemenuhan standar PROPER atau regulasi reklamasi.</li>
                    </ul>
                  </div>
                </div>
             </section>

             {/* 1.3 QCDSM TABLE */}
             <section className="space-y-12">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-1 bg-amber-500 rounded-full"></div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">1.3 Tinjauan Masalah Terhadap Aspek QCDSM</h3>
                </div>

                <div className="overflow-x-auto bg-white dark:bg-slate-950 rounded-[44px] border border-slate-100 dark:border-white/5 shadow-2xl p-1 no-scrollbar">
                   <table className="w-full text-left min-w-[950px]">
                      <thead>
                        <tr className="border-b border-slate-100 dark:border-white/5">
                          <th className="p-8 text-[11px] font-black text-slate-400 uppercase tracking-widest w-[20%]">PANCA MUTU</th>
                          <th className="p-8 text-[11px] font-black text-rose-500 uppercase tracking-widest w-[40%] bg-rose-500/5 text-center">Kondisi Saat Ini (Data Kuantitatif)</th>
                          <th className="p-8 text-[11px] font-black text-emerald-600 uppercase tracking-widest w-[40%] bg-emerald-500/5 text-center">Kondisi yang Diharapkan (Target / KPI)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                        <tr>
                          <td className="p-8 font-black text-slate-900 dark:text-white text-xs uppercase">Quality (Mutu Data)</td>
                          <td className="p-8 text-[11px] font-medium text-slate-500 leading-relaxed italic text-justify">
                            1. Akurasi GPS rata-rata rendah: ±15–40 meter.<br/>
                            2. Konsistensi tinggi tanaman error ±10–20 cm karena pengukuran manual.<br/>
                            3. Ketidaksesuaian laporan manual mencapai 20–35%.
                          </td>
                          <td className="p-8 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 leading-relaxed text-justify">
                            1. Akurasi GPS ditingkatkan menjadi ≤5 meter melalui AI sampling.<br/>
                            2. Error pengukuran tinggi berkurang menjadi ≤3 cm.<br/>
                            3. Ketidaksesuaian laporan turun menjadi &lt;5% karena verifikasi otomatis.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-8 font-black text-slate-900 dark:text-white text-xs uppercase">Delivery (Kecepatan Laporan)</td>
                          <td className="p-8 text-[11px] font-medium text-slate-500 leading-relaxed italic text-justify">
                            1. Waktu penyusunan laporan manual 3–7 hari.<br/>
                            2. Keterlambatan upload progres lapangan 50–70%.<br/>
                            3. Tidak ada dashboard → inspeksi menjadi reaktif.
                          </td>
                          <td className="p-8 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 leading-relaxed text-justify">
                            1. Laporan otomatis keluar &lt;5 menit setiap capture.<br/>
                            2. Pengiriman data real-time → keterlambatan turun menjadi &lt;10%.<br/>
                            3. Dashboard monitoring harian tersedia 100% otomatis.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-8 font-black text-slate-900 dark:text-white text-xs uppercase">Safety & Compliance</td>
                          <td className="p-8 text-[11px] font-medium text-slate-500 leading-relaxed italic text-justify">
                            1. Bukti digital kurang lengkap → risiko ketidaksesuaian audit mencapai 15–25%.<br/>
                            2. Dokumentasi hilang/tidak valid 10–20%.
                          </td>
                          <td className="p-8 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 leading-relaxed text-justify">
                            1. Bukti digital lengkap → risiko audit turun menjadi &lt;3%.<br/>
                            2. Dokumentasi tervalidasi AI → kehilangan data 0%.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-8 font-black text-slate-900 dark:text-white text-xs uppercase">Morale (Motivasi Tim)</td>
                          <td className="p-8 text-[11px] font-medium text-slate-500 leading-relaxed italic text-justify">
                            1. Beban dokumentasi manual menyebabkan efisiensi turun 20–30%.<br/>
                            2. Tekanan audit membuat produktivitas turun 10–15%.
                          </td>
                          <td className="p-8 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 leading-relaxed text-justify">
                            1. Efisiensi tim naik 25–40% karena workflow otomatis.<br/>
                            2. Kepercayaan diri meningkat → produktivitas naik 15–20%.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-8 font-black text-slate-900 dark:text-white text-xs uppercase">Cost (Biaya Monitoring)</td>
                          <td className="p-8 text-[11px] font-medium text-slate-500 leading-relaxed italic text-justify">
                            1. Monitoring manual → membutuhkan 2–3 jam per titik.<br/>
                            2. Duplikasi pekerjaan hingga 30–40% akibat data salah/kurang.<br/>
                            3. Biaya transport meningkat karena kunjungan ulang.
                          </td>
                          <td className="p-8 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 leading-relaxed text-justify">
                            1. Waktu monitoring berkurang menjadi 30–45 menit per titik.<br/>
                            2. Duplikasi pekerjaan turun menjadi &lt;5% (validasi otomatis).<br/>
                            3. Pengurangan kunjungan ulang hingga 50%.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-8 font-black text-slate-900 dark:text-white text-xs uppercase">Cost (Biaya Audit)</td>
                          <td className="p-8 text-[11px] font-medium text-slate-500 leading-relaxed italic text-justify">
                            1. Audit manual memakan waktu 2–4 hari.<br/>
                            2. Ketidakcocokan data menyebabkan overhead audit 10–20%.
                          </td>
                          <td className="p-8 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 leading-relaxed text-justify">
                            1. Audit otomatis → waktu audit turun menjadi &lt;4 jam.<br/>
                            2. Biaya audit manual berkurang 50–70% karena data terstruktur.
                          </td>
                        </tr>
                      </tbody>
                   </table>
                </div>
             </section>

             {/* EPILOGUE */}
             <section className="pt-20 border-t border-slate-100 dark:border-white/5 text-center space-y-8">
                <p className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter max-w-2xl mx-auto">
                  “Transparansi bukan sekadar angka, melainkan integritas setiap pixel data yang kami jaga.”
                </p>
                <div className="flex flex-col items-center gap-6">
                   <div className="w-16 h-16 bg-slate-900 dark:bg-emerald-600 rounded-[24px] flex items-center justify-center text-white shadow-xl">
                      <img src="https://i.ibb.co.com/29Gzw6k/montana-AI.jpg" className="w-8 h-8 object-contain opacity-50" alt="Logo" />
                   </div>
                   <button onClick={toggleNarrative} className="px-12 py-5 bg-slate-900 dark:bg-emerald-600 text-white rounded-3xl text-[12px] font-black uppercase tracking-[0.3em] shadow-2xl active:scale-95 transition-all">
                      Tutup Arsip Sejarah
                   </button>
                </div>
                <div className="pt-10">
                   <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.5em]">Dokumentasi Internal PT Montana Wana Teknologi © 2026</p>
                </div>
             </section>
          </div>
        </div>
      )}
    </section>
  );
};
