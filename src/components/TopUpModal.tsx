import React, { useState } from 'react';
import { X, Wallet, CreditCard, Apple, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

interface TopUpModalProps {
  onTopUp: (amount: number) => void;
  onClose: () => void;
}

export const TopUpModal: React.FC<TopUpModalProps> = ({ onTopUp, onClose }) => {
  const [amount, setAmount] = useState<number>(648);

  const handleTopUp = () => {
    onTopUp(amount);
    onClose();
  };

  const amounts = [6, 30, 98, 198, 328, 648];

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

        <div className="flex items-center gap-3 mb-8">
          <div className="bg-emerald-500/10 p-2.5 rounded-lg">
            <Wallet className="w-6 h-6 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold">充值中心</h2>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {amounts.map((a) => (
            <button
              key={a}
              onClick={() => setAmount(a)}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                amount === a
                  ? 'bg-emerald-500/10 border-emerald-500/50 shadow-lg shadow-emerald-500/10 scale-[1.02]'
                  : 'bg-zinc-800 border-transparent hover:border-white/20'
              }`}
            >
              <span className="text-lg font-bold text-white">¥{a}</span>
              <span className="text-[10px] text-zinc-400 font-medium">{a * 10} 灵石</span>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-4">
            支付方式
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors border border-white/5">
              <CreditCard className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">微信支付</span>
            </button>
            <button className="flex items-center justify-center gap-2 p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors border border-white/5">
              <Apple className="w-4 h-4 text-white" />
              <span className="text-sm font-medium">Apple Pay</span>
            </button>
          </div>
        </div>

        <button
          onClick={handleTopUp}
          className="w-full mt-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <DollarSign className="w-5 h-5" />
          立即充值 ¥{amount}
        </button>
      </motion.div>
    </motion.div>
  );
};
