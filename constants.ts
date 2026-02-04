
import { GrowthLevel, MenuItem } from './types';

export const LEVEL_THRESHOLDS = {
  [GrowthLevel.SEMAI]: 0,             // Dimulai langsung sebagai Semai
  [GrowthLevel.PANCANG]: 259200,      // 3 Hari (3 * 86400)
  [GrowthLevel.TIANG]: 604800,        // 7 Hari (7 * 86400)
  [GrowthLevel.POHON]: 1296000,       // 15 Hari (15 * 86400)
  [GrowthLevel.RIMBA]: 2592000        // 30 Hari (30 * 86400)
};

export const MENU_ITEMS: MenuItem[] = [
  { id: 'db-bibit-ai', title: 'Dashboard Bibit AI', icon: 'fa-chart-simple', href: 'https://ebastari.github.io/dasboard-AI/testdas45.html', badge: 'AI' },
  { id: 'notif-bibit', title: 'Notifikasi Bibit', icon: 'fa-bell', href: 'https://ebastari.github.io/notifikasi/notif.html', badge: 'Update' },
  { id: 'chatbot', title: 'AI Chatbot Analysis', icon: 'fa-microchip', href: 'https://ebastari.github.io/allchatbot/ALLCHATBOT.html' },
  { id: 'form-bibit', title: 'Form Bibit', icon: 'fa-clipboard-list', href: 'https://www.appsheet.com/start/91bfe218-36d0-4f6e-ac9e-ca32b4ddb0c7?platform=desktop#appName=RimbaRaya-863683625-25-05-22&vss=H4sIAAAAAAAAA6WOMQ7CMBAE_7K1X-ASRIEQNCAaTOHEZ8kisaPYASLLf-cSQNQR5c1pdjfj7uhxTLq-QV7y79rRCImscBo7UpAK6-BTHxoFoXDQ7RuuXOWSQkG5iq-cKELmBa78o1fAGfLJWU+9FDRpHPCR-D0pDGYBRaAdkq4amneyUAozG-ohkjnziKXlces3z057sw-G86xuIpUXf0AzE1YBAAA=&view=Bibit', badge: 'Admin' },
  { id: 'about-app', title: 'Tentang Aplikasi', icon: 'fa-circle-info', href: 'https://ebastari.github.io/Poin/Poin.html' },
  { id: 'download-1', title: 'Download Realisasi', icon: 'fa-cloud-arrow-down', href: 'https://www.arcgis.com/sharing/rest/content/items/e422f795c4774c65af35b034f2255894/data' },
  { id: 'download-2', title: 'Download IPPKH', icon: 'fa-file-arrow-down', href: 'https://www.arcgis.com/sharing/rest/content/items/5e253c50a5364155a37390eeac2cc819/data' },
  { id: 'report-seed', title: 'Laporan Bibit', icon: 'fa-chart-line', href: 'https://lookerstudio.google.com/s/oDcbCRPbvm0' },
  { id: 'weather', title: 'Perkiraan Cuaca', icon: 'fa-cloud-sun-rain', href: 'https://www.msn.com/id-id/cuaca' },
  { id: 'docs-rr', title: 'Dokumen RR', icon: 'fa-book-open', href: 'https://drive.google.com/file/d/177quXwlMkQusQRSbZboRrNnFSqwNaZhw/view' },
  { id: 'news-2025', title: 'Berita Acara 2025', icon: 'fa-newspaper', href: 'https://ebastari.github.io/Realisasi-pekerjaan/Realisasi2025.html' },
  { id: 'mom', title: 'MOM Meeting', icon: 'fa-handshake', href: 'https://www.appsheet.com/start/f912f118-c330-4435-b1f2-2d8834992211' },
  { id: 'pesticide', title: 'Manajemen Pestisida', icon: 'fa-spray-can', href: 'https://www.appsheet.com/start/c686e2ea-ef8d-47bd-9318-80d81163c0c3' },
  { id: 'montana-v2', title: 'Montana Camera V2', icon: 'fa-camera', href: 'https://kameracerdas2.vercel.app/', badge: 'Admin' },
  { id: 'height', title: 'Pengukur Tinggi', icon: 'fa-arrows-up-down', href: 'https://ebastari.github.io/Tinggi/Tinggi%20Fix.Html' },
  { id: 'carbon', title: 'Serapan Karbon', icon: 'fa-leaf', href: 'https://ebastari.github.io/Dasboard-Karbon/Karbon', badge: 'New' },
];
