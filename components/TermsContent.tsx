
import React from 'react';

export const TermsContent: React.FC = () => {
  const pasalData = [
    { 
      pasal: 1, judul: "Ketentuan Umum", 
      isi: [
        "Montana AI merupakan sistem berbasis teknologi yang digunakan untuk mendukung pemantauan, pengelolaan lingkungan, dan kegiatan reklamasi.",
        "Aplikasi ini dikembangkan secara mandiri oleh Agung Laksono.",
        "Dengan menggunakan layanan Montana AI, pengguna dianggap telah membaca, memahami, dan menyetujui seluruh ketentuan dalam dokumen ini."
      ]
    },
    { 
      pasal: 2, judul: "Ruang Lingkup Layanan", 
      isi: [
        "Montana AI menyediakan layanan verifikasi pengguna, pemantauan lokasi, dokumentasi visual, serta pengolahan data lingkungan.",
        "Layanan digunakan untuk kepentingan operasional, evaluasi, dan pengambilan keputusan berbasis data.",
        "Pengelola berhak melakukan pengembangan, pembaruan, dan penyesuaian sistem sewaktu-waktu."
      ]
    },
    { 
      pasal: 3, judul: "Pengumpulan dan Penggunaan Data", 
      isi: [
        "Data yang dikumpulkan meliputi: (a) Nama lengkap, (b) Nomor telepon, (c) Alamat email, (d) Data lokasi GPS, (e) Data biometrik (verifikasi wajah), (f) Data operasional perusahaan.",
        "Data digunakan untuk: Autentikasi pengguna, Validasi lapangan, Keamanan sistem, Pemantauan reklamasi, dan Pengembangan layanan."
      ]
    },
    { 
      pasal: 4, judul: "Perlindungan Data dan Keamanan Informasi", 
      isi: [
        "Seluruh data pengguna dan data perusahaan disimpan secara aman sesuai standar perlindungan informasi.",
        "Montana AI menerapkan sistem pengamanan teknis dan administratif untuk mencegah kebocoran data.",
        "Data bersifat rahasia dan hanya dapat diakses oleh pihak yang berwenang."
      ]
    },
    { 
      pasal: 5, judul: "Data Sensitif PT EBL", 
      isi: [
        "Montana AI dapat mengelola data strategis dan sensitif milik PT EBL.",
        "Data tersebut merupakan aset perusahaan yang wajib dijaga kerahasiaannya.",
        "Pengguna dilarang menyebarkan, menyalin, atau memindahtangankan data tanpa izin tertulis."
      ]
    },
    { 
      pasal: 6, judul: "Larangan dan Tanggung Jawab Pengguna", 
      isi: [
        "Pengguna dilarang memberikan data palsu, memanipulasi sistem, melakukan akses ilegal, menyalahgunakan fitur, atau merusak integritas data.",
        "Pengguna bertanggung jawab atas seluruh aktivitas yang dilakukan melalui akunnya."
      ]
    },
    { 
      pasal: 7, judul: "Sanksi dan Penegakan Hukum", 
      isi: [
        "Setiap kebocoran atau penyalahgunaan data sensitif PT EBL tanpa izin resmi akan ditindak sesuai hukum yang berlaku.",
        "Dasar hukum meliputi: UU No. 27/2022 (PDP), UU No. 11/2008 (ITE), KUHP, dan Peraturan Internal PT EBL.",
        "Pengelola berhak menempuh jalur hukum perdata maupun pidana."
      ]
    },
    { 
      pasal: 8, judul: "Biaya Operasional dan Etika Penggunaan", 
      isi: [
        "Aplikasi dikembangkan mandiri oleh Agung Laksono. Mengingat biaya operasional (AI token), pengguna wajib menggunakan layanan secara bertanggung jawab.",
        "Penyalahgunaan sistem dapat mengakibatkan penghentian layanan secara permanen."
      ]
    },
    { 
      pasal: 9, judul: "Hak dan Kewajiban Pengelola", 
      isi: [
        "Pengelola berhak mengelola sistem, mengembangkan fitur, mengatur akses, dan menonaktifkan akun bermasalah.",
        "Pengelola berkewajiban menjaga keamanan dan kerahasiaan data."
      ]
    },
    { 
      pasal: 10, judul: "Perubahan Ketentuan", 
      isi: [
        "Pengelola berhak mengubah ketentuan ini sewaktu-waktu.",
        "Perubahan akan diinformasikan melalui sistem aplikasi.",
        "Penggunaan berkelanjutan dianggap sebagai persetujuan atas perubahan tersebut."
      ]
    },
    { 
      pasal: 11, judul: "Penutup", 
      isi: [
        "Dokumen ini berlaku sejak pertama kali pengguna menggunakan Montana AI.",
        "Dengan melakukan registrasi, pengguna menyatakan tunduk pada seluruh ketentuan.",
        "Apabila terdapat ketentuan yang tidak berlaku, maka tidak memengaruhi ketentuan lainnya."
      ]
    }
  ];

  return (
    <div className="space-y-8 py-4">
      {pasalData.map((p) => (
        <section key={p.pasal} className="space-y-3">
          <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-1">
            <span className="w-5 h-5 rounded bg-emerald-600 text-white flex items-center justify-center text-[9px] flex-shrink-0">
              {p.pasal}
            </span>
            Pasal {p.pasal} - {p.judul}
          </h3>
          <ul className="space-y-2 pl-7">
            {p.isi.map((item, idx) => (
              <li key={idx} className="text-[11px] leading-relaxed font-medium text-slate-600 dark:text-slate-400">
                {p.isi.length > 1 ? `${idx + 1}. ` : ""}{item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};
