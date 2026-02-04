
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MONTANA_FEATURES } from './LayananPengaduan';
import { ROSTER_TEAM, ROSTER_START_DATE } from '../data/rosterData';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const HelpCenter: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Halo! Saya asisten Montana AI. Saya dapat membantu Anda memahami fitur Montana Camera V2, Dashboard Bibit, hingga status Roster tim hari ini. Ada yang bisa saya bantu?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const todayRosterKnowledge = useMemo(() => {
    const now = new Date();
    const targetDate = now.getFullYear() === 2026 ? now : new Date(2026, 0, 27);
    const diffDays = Math.floor((targetDate.getTime() - ROSTER_START_DATE.getTime()) / (1000 * 60 * 60 * 24));
    const safeIdx = Math.max(0, Math.min(30, diffDays));

    const onDayShift = ROSTER_TEAM.filter(p => p.shifts[safeIdx] === 'D').map(p => p.nama);
    const onTahura = ROSTER_TEAM.filter(p => p.shifts[safeIdx] === 'THR').map(p => p.nama);
    const onOff = ROSTER_TEAM.filter(p => p.shifts[safeIdx] === 'OFF').map(p => p.nama);

    return `
      Status Roster Hari Ini (${targetDate.toLocaleDateString('id-ID')}):
      - Shift Siang (D): ${onDayShift.join(', ')}
      - Tahura-DAS (THR): ${onTahura.join(', ')}
      - Libur (OFF): ${onOff.join(', ')}
    `;
  }, []);

  // Fix: Property 'description' does not exist on type 'FeatureDetail'. Using 'highlight' which is defined in LayananPengaduan.tsx
  const featureKnowledge = MONTANA_FEATURES.map(f => `- ${f.title}: ${f.highlight}`).join('\n');

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })).concat({ role: 'user', parts: [{ text: userMsg }] }),
        config: {
          systemInstruction: `Anda adalah asisten cerdas untuk "Montana AI Pro" yang dimiliki dan dikelola secara resmi oleh PT Montana Wana Teknologi.
          
          PENGETAHUAN SISTEM:
          ${featureKnowledge}
          
          DATA ROSTER REAL-TIME:
          ${todayRosterKnowledge}
          
          KONTEKS PERUSAHAAN:
          - Pengembang: PT Montana Wana Teknologi.
          - Mitra Strategis: PT Energi Batubara Lestari (Hasnur Group).
          - Kontak Admin: 081122220044.
          
          ATURAN JAWABAN:
          1. Fokus pada bantuan operasional dan teknis seputar platform Montana.
          2. Gunakan Bahasa Indonesia yang profesional namun ramah.
          3. Jika ditanya siapa pembuatnya, jawab "Dikembangkan oleh tim engineering PT Montana Wana Teknologi".
          4. Berikan teks polos saja tanpa format markdown tebal berlebihan.`,
          temperature: 0.7,
        },
      });

      const aiText = response.text || "Maaf, pusat data sedang sibuk.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Koneksi terputus. Silakan hubungi WhatsApp Admin 081122220044." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[44px] border border-white/50 dark:border-slate-800 shadow-2xl overflow-hidden relative group transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] to-transparent opacity-100"></div>
      
      <div className="p-8 pb-4 relative z-10 border-b border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] mb-2">Support Center</h4>
            <p className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Asisten Montana AI</p>
          </div>
          <a href="https://wa.me/6281122220044" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 active:scale-95 transition-all">
            <i className="fab fa-whatsapp text-sm"></i>
            <span>WhatsApp Admin</span>
          </a>
        </div>
      </div>

      <div ref={scrollRef} className="h-[320px] overflow-y-auto p-8 space-y-6 no-scrollbar relative z-10 bg-slate-50/30 dark:bg-slate-950/20">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
            <div className={`max-w-[85%] p-5 rounded-[32px] text-[11px] font-medium leading-relaxed shadow-sm border ${
              msg.role === 'user' ? 'bg-emerald-600 text-white border-emerald-500 rounded-tr-none' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-100 dark:border-slate-700 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-full flex gap-1.5 px-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 relative z-10">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Tanyakan bantuan operasional..." className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 text-[11px] font-bold focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white" />
          <button type="submit" disabled={!input.trim() || isTyping} className="w-14 h-14 bg-slate-900 dark:bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-90 disabled:opacity-50 transition-all">
            <i className="fas fa-paper-plane text-xs"></i>
          </button>
        </form>
      </div>
    </div>
  );
};
