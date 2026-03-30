import React from 'react';
import type { Card as CardType } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './Card';
import { X } from 'lucide-react';

interface GachaResultProps {
  results: CardType[];
  onClose: () => void;
}

export const GachaResult: React.FC<GachaResultProps> = ({ results, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-8 backdrop-blur-md cursor-pointer"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-8 right-8 text-white hover:bg-white/10 p-2 rounded-full transition-colors z-50"
      >
        <X className="w-8 h-8" />
      </button>

      <div 
        className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence>
          {results.map((card, index) => (
            <motion.div
              key={`${card.id}-${index}`}
              initial={{ y: 500, opacity: 0, scale: 0.5, rotate: -15 }}
              animate={{
                y: 0,
                opacity: 1,
                scale: 1,
                rotate: 0,
                transition: {
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100,
                  damping: 15,
                },
              }}
              whileHover={{ scale: 1.1, zIndex: 10 }}
              className="flex justify-center"
            >
              <Card card={card} className="w-40 h-60" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {results.some(c => c.rarity === 'SSR') && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-12 text-4xl font-black text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)] tracking-widest uppercase italic"
        >
          Congratulations! SSR!
        </motion.div>
      )}
    </motion.div>
  );
};
