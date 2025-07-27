export interface Material {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  availability: 'available' | 'limited' | 'out-of-stock';
  supplier: string;
  location: string;
  description: string;
  lastUpdated: string;
  phone: string;
  email: string;
  minOrder: number;
  maxOrder: number;
  quality: 'premium' | 'standard' | 'basic';
}

export type Language = 'en' | 'te' | 'ta' | 'hi' | 'ml';

export interface Translation {
  [key: string]: string;
}

export interface Translations {
  [key: string]: Translation;
}