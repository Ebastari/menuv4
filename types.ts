
export enum GrowthLevel {
  SEMAI = 'Semai',
  PANCANG = 'Pancang',
  TIANG = 'Tiang',
  POHON = 'Pohon',
  RIMBA = 'Rimba'
}

export interface MenuItem {
  id: string;
  title: string;
  icon: string;
  href: string;
  badge?: string;
  gradient?: string;
}

export interface UserProfile {
  name: string;
  photo: string;
  jabatan?: string;
  telepon?: string;
  email?: string;
  activeSeconds: number;
  lastSeen: string;
}

export interface Member extends UserProfile {
  id: string;
}

export type WeatherCondition = 'clear' | 'rain' | 'cloudy' | 'storm' | 'unknown';

export interface WeatherData {
  temp: number;
  windspeed: number;
  condition: WeatherCondition;
  icon: string;
}
