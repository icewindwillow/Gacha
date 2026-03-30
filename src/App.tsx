import { useState } from 'react';
import { useGameStore } from './hooks/useGameStore';
import { Card as CardComponent } from './components/Card';
import { GachaResult } from './components/GachaResult';
import { CardCustomizer } from './components/CardCustomizer';
import { TopUpModal } from './components/TopUpModal';
import type { Card as CardType } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, 
  Gem, 
  Plus, 
  Library, 
  Dices, 
  User as UserIcon,
  Sparkles,
  Search,
  ChevronRight
} from 'lucide-react';

type Tab = 'gacha' | 'inventory' | 'custom';

function App() {
  const { 
    profile, 
    cards, 
    topUp, 
    performGacha, 
    addCustomCard,
    GACHA_SINGLE_COST,
    GACHA_TEN_COST 
  } = useGameStore();

  const [activeTab, setActiveTab] = useState<Tab>('gacha');
  const [gachaResults, setGachaResults] = useState<CardType[] | null>(null);
  const [showTopUp, setShowTopUp] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleGacha = (count: number) => {
    const results = performGacha(count);
    if (results) {
      setGachaResults(results);
    } else {
      setShowTopUp(true);
    }
  };

  const filteredInventory = profile.inventory.filter(card => 
    card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.rarity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-purple-500/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-gradient-to-tr from-purple-600 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-purple-900/20 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-black tracking-tighter uppercase italic">氪金模拟器</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 bg-zinc-900/50 px-4 py-2 rounded-2xl border border-white/5 shadow-inner">
              <div className="flex items-center gap-2 group cursor-help">
                <Wallet className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold tabular-nums">¥{profile.balance}</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2 group cursor-help">
                <Gem className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-sm font-bold tabular-nums">{profile.gems}</span>
              </div>
            </div>
            
            <button
              onClick={() => setShowTopUp(true)}
              className="bg-white text-black hover:bg-zinc-200 px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-white/5"
            >
              <Plus className="w-4 h-4" />
              充值
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Navigation Tabs */}
        <nav className="flex items-center gap-2 mb-10 bg-zinc-900/50 p-1.5 rounded-2xl border border-white/5 w-fit shadow-xl">
          {[
            { id: 'gacha', label: '祈愿', icon: Dices },
            { id: 'inventory', label: '仓库', icon: Library },
            { id: 'custom', label: '图鉴', icon: UserIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-zinc-800 text-white shadow-lg ring-1 ring-white/10'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-purple-400' : ''}`} />
              {tab.label}
            </button>
          ))}
        </nav>

        <AnimatePresence mode="wait">
          {activeTab === 'gacha' && (
            <motion.section
              key="gacha"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Gacha Banner */}
              <div className="relative h-[450px] min-h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=2000" 
                  alt="Banner"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                
                <div className="absolute bottom-12 left-12 space-y-4 z-10">
                  <div className="flex items-center gap-3">
                    <span className="bg-purple-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-purple-900/40">
                      Limited Rate Up
                    </span>
                    <h2 className="text-5xl font-black italic tracking-tighter uppercase">星海祈愿</h2>
                  </div>
                  <p className="text-zinc-400 text-lg max-w-xl font-medium leading-relaxed">
                    SSR 角色出现概率提升！探索无尽星海的奥秘，获得传奇角色的青睐。
                  </p>
                </div>

                <div className="absolute bottom-12 right-12 flex items-center gap-4 z-10">
                  <button
                    onClick={() => handleGacha(1)}
                    className="group bg-zinc-900/80 backdrop-blur-md hover:bg-zinc-800 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-2xl flex flex-col items-center gap-1 min-w-[160px]"
                  >
                    <span className="text-sm">单次祈愿</span>
                    <div className="flex items-center gap-1.5 text-cyan-400">
                      <Gem className="w-3.5 h-3.5" />
                      <span className="text-xs">{GACHA_SINGLE_COST}</span>
                    </div>
                  </button>
                  <button
                    onClick={() => handleGacha(10)}
                    className="group bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-8 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-2xl shadow-purple-900/40 flex flex-col items-center gap-1 min-w-[160px]"
                  >
                    <span className="text-sm">十连祈愿</span>
                    <div className="flex items-center gap-1.5 text-white/80">
                      <Gem className="w-3.5 h-3.5" />
                      <span className="text-xs">{GACHA_TEN_COST}</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Rarity Info */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'SSR', rate: '2%', color: 'text-yellow-400', bg: 'bg-yellow-400/5' },
                  { label: 'SR', rate: '10%', color: 'text-purple-400', bg: 'bg-purple-400/5' },
                  { label: 'R', rate: '38%', color: 'text-blue-400', bg: 'bg-blue-400/5' },
                  { label: 'N', rate: '50%', color: 'text-zinc-400', bg: 'bg-zinc-400/5' },
                ].map((item) => (
                  <div key={item.label} className={`${item.bg} border border-white/5 p-4 rounded-2xl flex items-center justify-between`}>
                    <span className={`text-sm font-black ${item.color}`}>{item.label}</span>
                    <span className="text-xs font-bold text-zinc-500">{item.rate}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {activeTab === 'inventory' && (
            <motion.section
              key="inventory"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-2">我的仓库</h2>
                  <p className="text-zinc-500 text-sm font-medium">共拥有 {profile.inventory.length} 张卡牌</p>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input 
                    type="text" 
                    placeholder="搜索卡牌..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-zinc-900 border border-white/5 rounded-2xl pl-12 pr-6 py-3 text-sm focus:ring-2 focus:ring-purple-500/50 outline-none w-80 transition-all shadow-xl"
                  />
                </div>
              </div>

              {profile.inventory.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-white/5 rounded-3xl bg-zinc-900/20">
                  <Library className="w-16 h-16 text-zinc-800 mb-4" />
                  <p className="text-zinc-500 font-bold">仓库空空如也，快去祈愿吧！</p>
                  <button 
                    onClick={() => setActiveTab('gacha')}
                    className="mt-6 text-purple-400 font-bold hover:text-purple-300 flex items-center gap-1 transition-colors"
                  >
                    前往祈愿 <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                  {filteredInventory.map((card, index) => (
                    <CardComponent key={`${card.id}-${index}`} card={card} className="w-full" />
                  ))}
                </div>
              )}
            </motion.section>
          )}

          {activeTab === 'custom' && (
            <motion.section
              key="custom"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-2">卡牌图鉴</h2>
                  <p className="text-zinc-500 text-sm font-medium">当前卡池中包含 {cards.length} 种卡牌</p>
                </div>
                <button
                  onClick={() => setShowCustomizer(true)}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 shadow-xl shadow-purple-900/20 flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  新增卡牌
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {cards.map((card) => (
                  <CardComponent key={card.id} card={card} className="w-full" />
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {gachaResults && (
          <GachaResult results={gachaResults} onClose={() => setGachaResults(null)} />
        )}
        {showTopUp && (
          <TopUpModal onTopUp={topUp} onClose={() => setShowTopUp(false)} />
        )}
        {showCustomizer && (
          <CardCustomizer onAdd={addCustomCard} onClose={() => setShowCustomizer(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
