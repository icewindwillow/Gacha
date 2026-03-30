import React from 'react';
import type { Card as CardType } from '../types';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  card: CardType;
  className?: string;
}

const RARITY_COLORS: Record<string, string> = {
  SSR: 'from-yellow-400 to-orange-600 shadow-yellow-500/50',
  SR: 'from-purple-400 to-indigo-600 shadow-purple-500/50',
  R: 'from-blue-400 to-cyan-600 shadow-blue-500/50',
  N: 'from-gray-400 to-slate-600 shadow-gray-500/50',
};

export const Card: React.FC<CardProps> = ({ card, className }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        'relative w-48 h-72 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 cursor-pointer',
        'border-2 border-white/20',
        className
      )}
    >
      <div className={cn('absolute inset-0 bg-gradient-to-br opacity-80', RARITY_COLORS[card.rarity])} />
      
      <img
        src={card.image}
        alt={card.name}
        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
      />

      <div className="absolute inset-x-0 bottom-0 p-3 bg-black/60 backdrop-blur-sm text-white">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-bold tracking-widest bg-white/20 px-1.5 py-0.5 rounded">
            {card.rarity}
          </span>
          <h3 className="text-sm font-bold truncate">{card.name}</h3>
        </div>
        <p className="text-[10px] opacity-80 line-clamp-2 leading-tight">
          {card.effect}
        </p>
      </div>
    </motion.div>
  );
};
