
import React, { useMemo } from 'react';
import { WeatherCondition } from '../types';

interface WeatherOverlayProps {
  condition: WeatherCondition;
}

export const WeatherOverlay: React.FC<WeatherOverlayProps> = React.memo(({ condition }) => {
  const rainDrops = useMemo(() => {
    if (condition !== 'rain' && condition !== 'storm') return [];
    const count = condition === 'storm' ? 120 : 60;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      height: `${Math.random() * 20 + 40}px`,
      duration: `${0.4 + Math.random() * 0.3}s`,
      delay: `${Math.random() * 2}s`,
      opacity: condition === 'storm' ? 0.3 + Math.random() * 0.4 : 0.15 + Math.random() * 0.2,
    }));
  }, [condition]);

  if (condition === 'unknown') return null;

  const getGradientClass = () => {
    switch (condition) {
      case 'clear':
        return 'from-[#7DD3FC] via-[#BAE6FD] to-[#F0FDFA]'; // Cerah menyegarkan
      case 'rain':
        return 'from-[#334155] via-[#475569] to-[#64748b]'; // Hujan kelabu-biru
      case 'storm':
        return 'from-[#0f172a] via-[#1e293b] to-[#334155]'; // Badai gelap
      case 'cloudy':
        return 'from-[#94a3b8] via-[#cbd5e1] to-[#f1f5f9]'; // Mendung soft
      default:
        return 'from-slate-50 to-slate-100';
    }
  };

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-[2000ms] ease-in-out bg-gradient-to-br ${getGradientClass()}`}>
      
      {/* 1. CERAH / CLEAR */}
      {condition === 'clear' && (
        <div className="absolute inset-0 overflow-hidden opacity-60">
          <div className="absolute top-[10%] right-[15%] w-64 h-64 bg-yellow-300 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute top-[20%] left-[-10%] w-[120%] h-40 bg-white/30 rounded-full blur-[80px] animate-drift"></div>
        </div>
      )}

      {/* 2. HUJAN / RAIN */}
      {(condition === 'rain' || condition === 'storm') && (
        <div className="absolute inset-0">
          {/* Efek Kabut/Misty */}
          <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px]"></div>
          
          {/* Clouds */}
          <div className="absolute top-0 w-full h-1/2 bg-slate-800/20 rounded-full blur-[120px] animate-drift"></div>
          
          {/* Rain Drops */}
          <div className="absolute inset-0">
            {rainDrops.map((drop) => (
              <div 
                key={drop.id}
                className="absolute w-[1.5px] bg-gradient-to-b from-transparent via-white/40 to-white/20 animate-rain"
                style={{
                  left: drop.left,
                  height: drop.height,
                  opacity: drop.opacity,
                  animationDuration: drop.duration,
                  animationDelay: drop.delay,
                  top: '-100px'
                }}
              />
            ))}
          </div>

          {/* Efek Petir untuk Badai */}
          {condition === 'storm' && (
            <div className="absolute inset-0 bg-white opacity-0 pointer-events-none animate-lightning"></div>
          )}
        </div>
      )}

      {/* 4. BERAWAN / CLOUDY */}
      {condition === 'cloudy' && (
        <div className="absolute inset-0 opacity-40">
           <div className="absolute top-[15%] left-[5%] w-full h-64 bg-white/40 rounded-full blur-[100px] animate-drift"></div>
           <div className="absolute bottom-0 right-0 w-[80%] h-48 bg-slate-200/50 rounded-full blur-[80px]" style={{ animationDelay: '-10s' }}></div>
        </div>
      )}

      <style>{`
        @keyframes rain {
          0% { transform: translateY(0); }
          100% { transform: translateY(110vh); }
        }
        @keyframes drift {
          0% { transform: translateX(-10%); }
          50% { transform: translateX(10%); }
          100% { transform: translateX(-10%); }
        }
        @keyframes lightning {
          0%, 95%, 98%, 100% { opacity: 0; }
          96% { opacity: 0.3; }
          97% { opacity: 0.1; }
          99% { opacity: 0.4; }
        }
        .animate-rain {
          animation-name: rain;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .animate-drift {
          animation: drift 30s ease-in-out infinite;
        }
        .animate-lightning {
          animation: lightning 8s infinite;
        }
      `}</style>
    </div>
  );
});
