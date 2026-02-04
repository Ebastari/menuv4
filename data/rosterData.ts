
export type ShiftType = 'D' | 'THR' | 'OFF' | 'N' | 'C' | 'T';

export interface PersonilRoster {
  id: string;
  nama: string;
  jabatan: string;
  shifts: ShiftType[]; // Array isi 31 hari mulai dari 26 Jan
  color: string;
}

export const ROSTER_START_DATE = new Date(2026, 0, 26); // 26 Januari 2026

// Helper untuk pola berulang
const d_cycle: ShiftType[] = ['D','D','D','D','D','D','OFF','D','D','D','D','D','D','OFF','D','D','D','D','D','D','OFF','D','D','D','D','D','D','OFF','D','D','D'];
const thr_cycle: ShiftType[] = ['THR','THR','THR','THR','THR','THR','OFF','THR','THR','THR','THR','THR','THR','OFF','THR','THR','THR','THR','THR','THR','OFF','THR','THR','THR','THR','THR','THR','OFF','THR','THR','THR'];
const khl_1_cycle: ShiftType[] = ['OFF','D','D','D','OFF','OFF','OFF','OFF','OFF','D','D','D','OFF','OFF','OFF','OFF','D','D','D','D','OFF','OFF','OFF','D','D','D','D','OFF','OFF','OFF','D'];
const khl_2_cycle: ShiftType[] = ['D','OFF','OFF','OFF','D','D','D','D','D','OFF','OFF','OFF','D','D','D','D','OFF','OFF','OFF','OFF','D','D','D','OFF','OFF','D','D','OFF','OFF','OFF','OFF'];

export const ROSTER_TEAM: PersonilRoster[] = [
  { 
    id: '1', 
    nama: "MARIANO ALVARADO SIMAMORA", 
    jabatan: "REVEGETATION & REHABILITATION", 
    color: "#4f46e5",
    shifts: ['THR','THR','D','D','D','THR','OFF','THR','THR','D','D','D','THR','OFF','THR','THR','D','D','D','THR','OFF','THR','THR','D','D','D','THR','OFF','THR','THR','D']
  },
  { 
    id: '2', 
    nama: "AGUNG LAKSONO", 
    jabatan: "REVEGETATION SECTION HEAD", 
    color: "#0ea5e9",
    shifts: d_cycle
  },
  { 
    id: '3', 
    nama: "M. JEMBAR SURYANA", 
    jabatan: "REHABILITATION SECTION HEAD", 
    color: "#f59e0b",
    shifts: thr_cycle
  },
  { 
    id: '4', 
    nama: "SYAHRUDIN", 
    jabatan: "NURSERY GROUP LEADER", 
    color: "#10b981",
    shifts: d_cycle
  },
  { 
    id: '5', 
    nama: "EDWIN ALDOIN DANIEL HUTAGALUNG", 
    jabatan: "REVEGETATION FGDP", 
    color: "#8b5cf6",
    shifts: d_cycle
  },
  { 
    id: '6', 
    nama: "M. NOOR JAMALUDIN", 
    jabatan: "REHABILITATION GROUP LEADER", 
    color: "#ec4899",
    shifts: thr_cycle
  },
  { 
    id: '7', 
    nama: "MUHAMMAD SYAHRANI", 
    jabatan: "REVEGETATION CREW", 
    color: "#6366f1",
    shifts: d_cycle
  },
  { 
    id: '9', 
    nama: "RISTIAN EFENDI", 
    jabatan: "REVEGETATION CREW", 
    color: "#14b8a6",
    shifts: d_cycle
  },
  { 
    id: '10', 
    nama: "PAHRUL ZAINI", 
    jabatan: "REHABILITATION CREW", 
    color: "#f43f5e",
    shifts: thr_cycle
  },
  { 
    id: '11', 
    nama: "M. SYAHRANI (KHL)", 
    jabatan: "REVEGETATION CREW", 
    color: "#22c55e",
    shifts: khl_1_cycle
  },
  { 
    id: '12', 
    nama: "ARBANI (KHL)", 
    jabatan: "REVEGETATION CREW", 
    color: "#64748b",
    shifts: khl_1_cycle
  },
  { 
    id: '13', 
    nama: "AHMAD RISKY AWALI (KHL)", 
    jabatan: "REVEGETATION CREW", 
    color: "#a855f7",
    shifts: khl_2_cycle
  }
];
