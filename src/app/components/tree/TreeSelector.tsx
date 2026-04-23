import { useState } from 'react';
import { TreeCard } from './TreeCard';
import { motion } from 'motion/react';

const trees = [
  {
    id: 'common',
    name: 'Common Species',
    subtitle: 'Neem • Peepal • Banyan',
    price: 100,
    co2: '~5kg CO2/year',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
    badge: 'Most Popular',
    badgeColor: 'bg-orange-500'
  },
  {
    id: 'fruit',
    name: 'Fruit Trees',
    subtitle: 'Mango • Jamun • Guava',
    price: 250,
    co2: '~12kg CO2/year',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop',
    badge: 'Best Regards',
    badgeColor: 'bg-orange-500'
  },
  {
    id: 'native',
    name: 'Native Large Trees',
    subtitle: 'Rain Tree • Gulmohar • Arjuna',
    price: 500,
    co2: '~25kg CO2/year',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300&fit=crop',
    badge: 'Max Impact',
    badgeColor: 'bg-green-600'
  },
  {
    id: 'miyawaki',
    name: 'Miyawaki Mini Forest',
    subtitle: '30+ native species dense urban forest',
    price: 5000,
    co2: '~20kg CO2/year',
    image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400&h=300&fit=crop',
    badge: 'Premium',
    badgeColor: 'bg-purple-600'
  }
];

interface TreeSelectorProps {
  onContinue?: () => void;
}

export function TreeSelector({ onContinue }: TreeSelectorProps) {
  const [selectedTree, setSelectedTree] = useState('common');
  const [quantity, setQuantity] = useState(1);

  const currentTree = trees.find(t => t.id === selectedTree)!;
  const totalPrice = currentTree.price * quantity;
  const co2Number = parseInt(currentTree.co2.match(/\d+/)![0]);
  const totalCO2 = co2Number * quantity;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose your tree</h2>
        <p className="text-gray-600">We plant, GPS-tag, AI-verify and track it — you watch it grow.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trees.map((tree) => (
          <TreeCard
            key={tree.id}
            {...tree}
            isSelected={selectedTree === tree.id}
            onClick={() => setSelectedTree(tree.id)}
          />
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Number of trees</label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#2C5F2D] hover:text-[#2C5F2D] transition-colors"
          >
            −
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20 text-center text-lg font-semibold border-none focus:outline-none"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#2C5F2D] hover:text-[#2C5F2D] transition-colors"
          >
            +
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#E8F5E9] rounded-2xl p-4 space-y-2"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700 flex items-center gap-2">
            <span className="text-lg">🌿</span> {currentTree.name} × {quantity}
          </span>
          <span className="font-bold text-gray-900">₹{totalPrice.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 flex items-center gap-2">
            <span>🌍</span> CO₂ Offset
          </span>
          <span className="text-gray-900">~{totalCO2}kg CO₂/year</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 flex items-center gap-2">
            <span>📊</span> Tracking
          </span>
          <span className="text-gray-900">3 years, GPS + AI</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 flex items-center gap-2">
            <span>📜</span> Certificate
          </span>
          <span className="text-gray-900">Sent instantly by email</span>
        </div>
      </motion.div>

      <button
        onClick={onContinue}
        className="w-full bg-[#2C5F2D] text-white py-4 rounded-xl font-semibold hover:bg-[#234d24] transition-colors"
      >
        Continue → Enter Details
      </button>
    </div>
  );
}
