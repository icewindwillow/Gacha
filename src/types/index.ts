export type Rarity = 'SSR' | 'SR' | 'R' | 'N';

export interface Card {
  id: string;
  name: string;
  image: string;
  rarity: Rarity;
  effect: string;
}

export interface GachaPool {
  id: string;
  name: string;
  cards: Card[];
  rates: Record<Rarity, number>;
}

export interface UserProfile {
  balance: number; // Real money simulation
  gems: number;    // Currency for drawing
  inventory: Card[];
}
