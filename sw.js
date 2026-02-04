
/* Montana AI Service Worker Configuration */
const website_id = 200;
const website_pixel_key = 'OyMB0sZbvzsPwSj6';

try {
  importScripts("https://app.pushaja.com/pixel_service_worker.js");
} catch (e) {
  console.error("Pushaja Service Worker Script failed to load:", e);
}
