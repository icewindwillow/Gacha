import React, { useState } from 'react';
import type { Card, Rarity } from '../types';
import { X, Plus, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface CardCustomizerProps {
  onAdd: (card: Omit<Card, 'id'>) => void;
  onClose: () => void;
}

export const CardCustomizer: React.FC<CardCustomizerProps> = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState<Omit<Card, 'id'>>({
    name: '',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop',
    rarity: 'R',
    effect: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    onAdd(formData);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-zinc-900 border border-white/10 p-8 rounded-2xl w-full max-w-lg shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Plus className="w-6 h-6 text-purple-500" />
          自定义新卡牌
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
              卡牌名称
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-zinc-800 border border-white/5 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-purple-500/50 outline-none transition-all"
              placeholder="输入卡牌名称..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
                稀有度
              </label>
              <select
                value={formData.rarity}
                onChange={e => setFormData({ ...formData, rarity: e.target.value as Rarity })}
                className="w-full bg-zinc-800 border border-white/5 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-purple-500/50 outline-none transition-all"
              >
                <option value="SSR">SSR (传奇)</option>
                <option value="SR">SR (史诗)</option>
                <option value="R">R (稀有)</option>
                <option value="N">N (普通)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
                卡面 URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-zinc-800 border border-white/5 rounded-lg p-2.5 pl-9 text-sm focus:ring-2 focus:ring-purple-500/50 outline-none transition-all"
                  placeholder="https://..."
                />
                <ImageIcon className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
              卡牌效果
            </label>
            <textarea
              value={formData.effect}
              onChange={e => setFormData({ ...formData, effect: e.target.value })}
              className="w-full bg-zinc-800 border border-white/5 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-purple-500/50 outline-none transition-all min-h-[100px]"
              placeholder="描述卡牌的技能或效果..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-purple-900/20 active:scale-[0.98]"
          >
            保存卡牌
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};
