
import React from 'react';

interface Partner {
  name: string;
  logo: string;
  category: string;
}

const PARTNERS: Partner[] = [
  // AI & Analytics
  { name: 'OpenAI', logo: 'https://cdn.simpleicons.org/openai/74aa12', category: 'AI' },
  { name: 'DeepSeek', logo: 'https://raw.githubusercontent.com/Ebastari/ebastari.github.io/main/assets/deepseek.png', category: 'AI' },
  { name: 'HuggingFace', logo: 'https://cdn.simpleicons.org/huggingface/FFD21E', category: 'AI' },
  { name: 'Google AI', logo: 'https://cdn.simpleicons.org/google/4285F4', category: 'AI' },
  
  // Maps & GIS
  { name: 'Google Maps', logo: 'https://cdn.simpleicons.org/googlemaps/4285F4', category: 'GIS' },
  { name: 'Mapbox', logo: 'https://cdn.simpleicons.org/mapbox/000000/white', category: 'GIS' },
  { name: 'OpenStreetMap', logo: 'https://cdn.simpleicons.org/openstreetmap/7EBC6F', category: 'GIS' },
  { name: 'ESRI ArcGIS', logo: 'https://cdn.simpleicons.org/esri/007AC2', category: 'GIS' },
  
  // Data & No-Code
  { name: 'AppSheet', logo: 'https://raw.githubusercontent.com/Ebastari/ebastari.github.io/main/assets/appsheet.png', category: 'DATA' },
  { name: 'Airtable', logo: 'https://cdn.simpleicons.org/airtable/18BFFF', category: 'DATA' },
  { name: 'Google Forms', logo: 'https://cdn.simpleicons.org/googleforms/7248B9', category: 'DATA' },
  
  // Weather & Climate
  { name: 'OpenWeather', logo: 'https://cdn.simpleicons.org/openweathermap/EB6E4B', category: 'CLIMATE' },
  { name: 'BMKG', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Logo_BMKG.png', category: 'CLIMATE' },
  
  // Satellite
  { name: 'NASA', logo: 'https://cdn.simpleicons.org/nasa/E03C31', category: 'SAT' },
  { name: 'ESA', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/ESA_logo.svg', category: 'SAT' },
  { name: 'Planet Labs', logo: 'https://cdn.simpleicons.org/planet/0097D9', category: 'SAT' },

  // Cloud & Hosting
  { name: 'AWS', logo: 'https://cdn.simpleicons.org/amazonwebservices/232F3E/white', category: 'CLOUD' },
  { name: 'Google Cloud', logo: 'https://cdn.simpleicons.org/googlecloud/4285F4', category: 'CLOUD' },
  { name: 'Azure', logo: 'https://cdn.simpleicons.org/microsoftazure/0078D4', category: 'CLOUD' },
  { name: 'Vercel', logo: 'https://cdn.simpleicons.org/vercel/000000/white', category: 'CLOUD' },
  { name: 'Firebase', logo: 'https://cdn.simpleicons.org/firebase/FFCA28', category: 'CLOUD' },
  
  // Dev & Distribution
  { name: 'GitHub', logo: 'https://cdn.simpleicons.org/github/181717/white', category: 'DEV' },
  { name: 'GitLab', logo: 'https://cdn.simpleicons.org/gitlab/FC6D26', category: 'DEV' },
  { name: 'Play Store', logo: 'https://cdn.simpleicons.org/googleplay/41E0FD', category: 'DIST' }
];

export const PartnerSection: React.FC = () => {
  return (
    <section className="py-24 px-6 relative z-10 bg-transparent">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex flex-col items-center gap-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl px-10 py-6 rounded-[40px] shadow-2xl border border-white/20 dark:border-white/10 ring-1 ring-black/5">
             <i className="fas fa-handshake-angle text-emerald-500 text-2xl mb-2"></i>
             <h2 className="text-sm md:text-lg font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] leading-tight">
               My Montana AI bekerjasama dengan :
             </h2>
             <p className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest opacity-70">
               Integrated Technology Partnership Ecosystem
             </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-10 gap-y-16">
          {PARTNERS.map((partner) => (
            <div 
              key={partner.name} 
              className="group flex flex-col items-center gap-5 transition-all"
              title={`${partner.name} - ${partner.category}`}
            >
              <div className="w-14 h-14 flex items-center justify-center relative bg-white/10 dark:bg-black/10 rounded-2xl backdrop-blur-sm group-hover:bg-white/20 transition-all p-2">
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  loading="lazy"
                  className="max-w-full max-h-full object-contain opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-125"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'text-[9px] font-black text-slate-400 text-center uppercase';
                      fallback.innerText = partner.name;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest leading-none group-hover:text-emerald-500 transition-colors drop-shadow-sm">
                  {partner.name}
                </span>
                <span className="text-[7px] font-black text-emerald-500/60 uppercase tracking-tighter mt-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
                  {partner.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 flex flex-wrap justify-center gap-12 opacity-40">
           <div className="flex items-center gap-3">
              <i className="fas fa-shield-check text-xs text-emerald-500"></i>
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Enterprise Security Grade</span>
           </div>
           <div className="flex items-center gap-3">
              <i className="fas fa-bolt-lightning text-xs text-amber-500"></i>
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Real-time Data Sync</span>
           </div>
           <div className="flex items-center gap-3">
              <i className="fas fa-earth-asia text-xs text-blue-500"></i>
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Global Geospatial Network</span>
           </div>
        </div>
      </div>
    </section>
  );
};
