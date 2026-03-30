import { useState, useEffect } from 'react';
import type { Card, UserProfile, Rarity } from '../types';

const INITIAL_PROFILE: UserProfile = {
  balance: 0,
  gems: 0,
  inventory: [],
};

const DEFAULT_CARDS: Card[] = [
  { id: '1', name: '绝代佳人', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop', rarity: 'SSR', effect: '提升全队攻击力 50%' },
  { id: '2', name: '苍蓝剑士', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop', rarity: 'SR', effect: '单体伤害 200%' },
  { id: '3', name: '铁甲守卫', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop', rarity: 'R', effect: '防御力增加 30%' },
  { id: '4', name: '见习法师', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop', rarity: 'N', effect: '小幅回血' },
];

const GACHA_RATES: Record<Rarity, number> = {
  'SSR': 0.02,
  'SR': 0.10,
  'R': 0.38,
  'N': 0.50,
};

const GEM_PRICE = 1; // 1 balance = 10 gems
const GACHA_SINGLE_COST = 160;
const GACHA_TEN_COST = 1600;

export const useGameStore = () => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('gacha_simulator_profile');
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  const [cards, setCards] = useState<Card[]>(() => {
    const saved = localStorage.getItem('gacha_simulator_cards');
    return saved ? JSON.parse(saved) : DEFAULT_CARDS;
  });

  useEffect(() => {
    localStorage.setItem('gacha_simulator_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('gacha_simulator_cards', JSON.stringify(cards));
  }, [cards]);

  const topUp = (amount: number) => {
    setProfile(prev => ({
      ...prev,
      balance: prev.balance + amount,
      gems: prev.gems + amount * 10,
    }));
  };

  const drawCard = (): Card => {
    const rand = Math.random();
    let rarity: Rarity = 'N';
    let cumulative = 0;

    for (const [r, rate] of Object.entries(GACHA_RATES)) {
      cumulative += rate;
      if (rand < cumulative) {
        rarity = r as Rarity;
        break;
      }
    }

    const availableCards = cards.filter(c => c.rarity === rarity);
    const result = availableCards[Math.floor(Math.random() * availableCards.length)] || cards.find(c => c.rarity === 'N')!;
    return result;
  };

  const performGacha = (count: number) => {
    const cost = count === 10 ? GACHA_TEN_COST : GACHA_SINGLE_COST * count;
    if (profile.gems < cost) return null;

    const results: Card[] = [];
    for (let i = 0; i < count; i++) {
      results.push(drawCard());
    }

    setProfile(prev => ({
      ...prev,
      gems: prev.gems - cost,
      inventory: [...prev.inventory, ...results],
    }));

    return results;
  };

  const addCustomCard = (card: Omit<Card, 'id'>) => {
    const newCard = { ...card, id: Date.now().toString() };
    setCards(prev => [...prev, newCard]);
  };

  return {
    profile,
    cards,
    topUp,
    performGacha,
    addCustomCard,
    GACHA_SINGLE_COST,
    GACHA_TEN_COST,
  };
};
