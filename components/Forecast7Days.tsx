
import React, { useEffect, useState, useMemo } from 'react';

interface HourlyData {
  time: string;
  temp: number;
  rainProb: number;
  precip: number;
  weatherCode: number;
}

interface DayForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  rainProb: number;
  weatherCode: number;
  label: string;
  fullDate: string;
  hourly: HourlyData[];
}

export const Forecast7Days: React.FC = () => {
  const [forecast, setForecast] = useState<DayForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);

  const getWeatherStyle = (code: number, rainProb: number) => {
    if (code >= 95) return { icon: 'fa-cloud-bolt', color: 'text-amber-500', bg: 'bg-amber-500/10', gradient: 'from-amber-500/20 to-transparent', label: 'Badai Petir' };
    if (code >= 80 || rainProb > 70) return { icon: 'fa-cloud-showers-heavy', color: 'text-blue-600', bg: 'bg-blue-600/10', gradient: 'from-blue-600/20 to-transparent', label: 'Hujan Deras' };
    if (code >= 51 || rainProb > 30) return { icon: 'fa-cloud-rain', color: 'text-blue-400', bg: 'bg-blue-400/10', gradient: 'from-blue-400/20 to-transparent', label: 'Hujan Ringan' };
    if (code >= 1 && code <= 3) return { icon: 'fa-cloud-sun', color: 'text-slate-400', bg: 'bg-slate-400/10', gradient: 'from-slate-400/20 to-transparent', label: 'Cerah Berawan' };
    return { icon: 'fa-sun', color: 'text-yellow-500', bg: 'bg-yellow-500/10', gradient: 'from-yellow-500/20 to-transparent', label: 'Cerah' };
  };

  const fetchForecast = async () => {
    try {
      const LAT = -3.33;
      const LON = 115.79;
      // Fetch daily and hourly in one go
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&hourly=temperature_2m,precipitation_probability,precipitation,weather_code&timezone=Asia%2FMakassar`;
      
      const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
      if (!res.ok) throw new Error(`Weather Server Error: ${res.status}`);
      
      const data = await res.json();

      if (data.daily && data.hourly) {
        const formatted: DayForecast[] = data.daily.time.map((t: string, i: number) => {
          const dateObj = new Date(t);
          
          // Filter hourly data for this specific day
          const dayStart = i * 24;
          const dayEnd = dayStart + 24;
          const dayHourly: HourlyData[] = [];
          
          for (let h = dayStart; h < dayEnd; h++) {
            dayHourly.push({
              time: data.hourly.time[h],
              temp: Math.round(data.hourly.temperature_2m[h]),
              rainProb: data.hourly.precipitation_probability[h],
              precip: data.hourly.precipitation[h],
              weatherCode: data.hourly.weather_code[h]
            });
          }

          return {
            date: t,
            maxTemp: Math.round(data.daily.temperature_2m_max[i]),
            minTemp: Math.round(data.daily.temperature_2m_min[i]),
            rainProb: data.daily.precipitation_probability_max[i],
            weatherCode: data.daily.weather_code[i],
            label: dateObj.toLocaleDateString('id-ID', { weekday: 'short' }),
            fullDate: dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'long' }),
            hourly: dayHourly
          };
        });
        setForecast(formatted);
      }
    } catch (error) {
      console.warn("Gagal mengambil data cuaca, menggunakan data simulasi:", error);
      // Fallback with empty array or simulated data if desired, but we'll just keep it empty to not mislead
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForecast();
  }, []);

  const selectedDay = selectedDayIndex !== null ? forecast[selectedDayIndex] : null;

  if (loading) return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 w-full h-48 animate-pulse">
      {[...Array(7)].map((_, i) => (
        <div key={i} className="bg-white/50 dark:bg-slate-900/50 rounded-[40px] border border-slate-100 dark:border-slate-800"></div>
      ))}
    </div>
  );

  if (forecast.length === 0) return (
    <div className="bg-white/50 dark:bg-slate-900/50 rounded-[44px] p-8 border border-dashed border-slate-200 dark:border-slate-800 text-center">
      <i className="fas fa-cloud-slash text-slate-300 text-3xl mb-4"></i>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data prakiraan cuaca tidak tersedia sementara waktu.</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-fadeIn w-full">
      <div className="flex items-center justify-between px-2">
        <div className="flex flex-col">
          <h3 className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.4em] mb-1">Advanced Forecast</h3>
          <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Meteo Analytics 7 Hari</p>
        </div>
        <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">Rantau, Tapin</span>
            <p className="text-[8px] font-bold text-slate-400 uppercase mt-2">Klik kartu untuk detail jam</p>
        </div>
      </div>

      {/* Grid Utama Kartu Cuaca */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 w-full">
        {forecast.map((day, idx) => {
          const style = getWeatherStyle(day.weatherCode, day.rainProb);
          const isSelected = selectedDayIndex === idx;

          return (
            <button 
              key={day.date}
              onClick={() => setSelectedDayIndex(isSelected ? null : idx)}
              className={`p-6 rounded-[44px] border transition-all duration-500 group relative overflow-hidden flex flex-col items-center gap-4 text-center ${
                isSelected 
                ? 'bg-slate-900 dark:bg-emerald-600 border-emerald-500/50 shadow-2xl scale-[1.02] z-10' 
                : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-blue-500/30 hover:-translate-y-1 shadow-sm'
              }`}
            >
              <div className="relative z-10 w-full">
                <p className={`text-[11px] font-black uppercase tracking-widest mb-1 ${isSelected ? 'text-emerald-400' : 'text-blue-600'}`}>
                  {idx === 0 ? 'Hari Ini' : day.label}
                </p>
                <p className={`text-[9px] font-bold uppercase tracking-tighter mb-4 opacity-60 ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                  {day.fullDate}
                </p>
                
                <div className={`w-16 h-16 mx-auto rounded-[24px] ${style.bg} flex items-center justify-center text-3xl ${isSelected ? 'text-white bg-white/10' : style.color} group-hover:scale-110 transition-transform duration-500 mb-4 shadow-inner`}>
                  <i className={`fas ${style.icon}`}></i>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <span className={`text-2xl font-black tracking-tighter ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{day.maxTemp}°</span>
                    <span className={`text-sm font-bold tracking-tighter ${isSelected ? 'text-white/60' : 'text-slate-400'}`}>{day.minTemp}°</span>
                  </div>
                  <div className={`flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-tighter ${isSelected ? 'text-emerald-400' : 'text-blue-500'}`}>
                    <i className="fas fa-droplet text-[9px]"></i>
                    {day.rainProb}%
                  </div>
                </div>

                <p className={`text-[8px] font-black uppercase tracking-widest mt-4 opacity-50 ${isSelected ? 'text-white' : 'text-slate-500'}`}>
                  {style.label}
                </p>
              </div>

              {/* Latar belakang dekoratif */}
              <div className={`absolute inset-0 bg-gradient-to-t ${isSelected ? 'from-emerald-500/10' : style.gradient} opacity-30 pointer-events-none`}></div>
            </button>
          );
        })}
      </div>

      {/* Detail View Berdasarkan Jam */}
      {selectedDay && (
        <div className="bg-white dark:bg-slate-900 rounded-[52px] p-8 md:p-12 border border-blue-500/20 shadow-2xl animate-drift-puff relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                <h4 className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.4em]">Hourly Probability</h4>
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Detail Jam: {selectedDay.label}, {selectedDay.fullDate}</h3>
            </div>
            <button 
              onClick={() => setSelectedDayIndex(null)}
              className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-95"
            >
              <i className="fas fa-times mr-2"></i> Tutup Detail
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
            {/* Grafik Estimasi Hujan */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                  <i className="fas fa-cloud-showers-water text-blue-500"></i>
                  Peluang & Intensitas Hujan
                </p>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">24 Jam</span>
              </div>
              
              <div className="flex items-end justify-between h-48 gap-1 pt-4">
                {selectedDay.hourly.map((h, i) => (
                  <div className="flex-1 flex flex-col items-center group h-full" key={i}>
                    <div className="flex-1 w-full flex items-end justify-center relative">
                      {/* Bar Peluang Hujan */}
                      <div 
                        className="w-full bg-blue-500/20 group-hover:bg-blue-500/40 rounded-t-lg transition-all duration-500 relative"
                        style={{ height: `${h.rainProb}%` }}
                      >
                         {h.rainProb > 0 && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded shadow-lg z-20">
                              {h.rainProb}%
                            </div>
                         )}
                      </div>
                      {/* Bar Intensitas (Garis Tipis) */}
                      <div 
                        className="absolute bottom-0 w-0.5 bg-blue-600 rounded-full"
                        style={{ height: `${Math.min(100, h.precip * 10)}%` }}
                      ></div>
                    </div>
                    {i % 4 === 0 && (
                      <span className="text-[7px] font-black text-slate-400 uppercase tracking-tighter mt-3 tabular-nums">
                        {new Date(h.time).getHours()}:00
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="p-4 bg-blue-500/5 rounded-3xl border border-blue-500/10">
                <p className="text-[9px] font-medium text-blue-600/80 leading-relaxed italic">
                  *Bar biru muda menunjukkan persentase peluang hujan, garis biru pekat menunjukkan intensitas curah hujan (mm).
                </p>
              </div>
            </div>

            {/* Grafik Suhu */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                  <i className="fas fa-temperature-half text-amber-500"></i>
                  Grafik Perubahan Suhu
                </p>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">°Celsius</span>
              </div>

              <div className="flex items-end justify-between h-48 gap-1 pt-4 border-l border-b border-slate-100 dark:border-slate-800 px-2">
                {selectedDay.hourly.map((h, i) => {
                  // Normalisasi tinggi bar suhu (misal range 20-40 derajat)
                  const height = ((h.temp - 20) / (40 - 20)) * 100;
                  return (
                    <div className="flex-1 flex flex-col items-center group h-full" key={i}>
                      <div className="flex-1 w-full flex items-end justify-center relative">
                        <div 
                          className="w-1.5 bg-amber-500 rounded-full group-hover:scale-y-110 transition-all duration-500 origin-bottom"
                          style={{ height: `${Math.max(10, height)}%` }}
                        >
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-amber-500 text-white text-[7px] font-black px-1.5 py-0.5 rounded shadow-lg z-20">
                            {h.temp}°
                          </div>
                        </div>
                      </div>
                      {i % 4 === 0 && (
                        <span className="text-[7px] font-black text-slate-400 uppercase tracking-tighter mt-3 tabular-nums">
                          {new Date(h.time).getHours()}:00
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-amber-500/5 rounded-3xl border border-amber-500/10 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-600"><i className="fas fa-arrow-up text-xs"></i></div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Maksimum</p>
                      <p className="text-sm font-black text-slate-900 dark:text-white uppercase">{selectedDay.maxTemp}°C</p>
                    </div>
                 </div>
                 <div className="p-4 bg-blue-500/5 rounded-3xl border border-blue-500/10 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-600"><i className="fas fa-arrow-down text-xs"></i></div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Minimum</p>
                      <p className="text-sm font-black text-slate-900 dark:text-white uppercase">{selectedDay.minTemp}°C</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
