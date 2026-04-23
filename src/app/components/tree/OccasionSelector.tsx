import { useState } from 'react';
import { motion } from 'motion/react';

const occasions = [
  {
    id: 'birthday',
    icon: '🎂',
    title: 'Birthday',
    quote: 'A tree planted in your name on your special day — growing alongside you.',
    price: 100,
    badge: 'Most Popular',
    badgeColor: 'bg-orange-500'
  },
  {
    id: 'anniversary',
    icon: '💐',
    title: 'Anniversary',
    quote: 'A love that grows as strong as your love — rooted, lasting, alive.',
    price: 250,
    badge: 'Best Regards',
    badgeColor: 'bg-orange-500'
  },
  {
    id: 'memory',
    icon: '🕯️',
    title: 'In Memory',
    quote: 'A living tribute — their memory grows in the shade of the tree.',
    price: 100
  },
  {
    id: 'festival',
    icon: '🎊',
    title: 'Festival',
    quote: 'Celebrate the season with a tree that grows leaf for the earth every year.',
    price: 100
  },
  {
    id: 'baby',
    icon: '👶',
    title: 'New Baby',
    quote: 'A tree planted on the day you arrived — growing alongside you, for years to come.',
    price: 250
  },
  {
    id: 'corporate',
    icon: '🏢',
    title: 'Corporate',
    quote: 'Walking your milestone with a forest — perfect, trackable and CSR-ready.',
    price: 500,
    badge: 'Premium',
    badgeColor: 'bg-purple-600'
  },
  {
    id: 'custom',
    icon: '🎁',
    title: 'Custom',
    quote: 'Your words, your love, your story — personalized and tracked forever.',
    price: 100
  }
];

interface OccasionSelectorProps {
  onContinue?: () => void;
}

export function OccasionSelector({ onContinue }: OccasionSelectorProps) {
  const [selectedOccasion, setSelectedOccasion] = useState('birthday');
  const [quantity, setQuantity] = useState(1);

  const currentOccasion = occasions.find(o => o.id === selectedOccasion)!;
  const totalPrice = currentOccasion.price * quantity;
  const co2Number = currentOccasion.price === 100 ? 5 : currentOccasion.price === 250 ? 12 : 25;
  const totalCO2 = co2Number * quantity;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose your occasion</h2>
        <p className="text-gray-600">We plant, GPS-tag, AI-verify and track it — you watch it grow.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {occasions.map((occasion) => (
          <motion.div
            key={occasion.id}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedOccasion(occasion.id)}
            className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all border-2 ${
              selectedOccasion === occasion.id
                ? 'border-[#2C5F2D] shadow-lg'
                : 'border-gray-200 hover:shadow-md'
            }`}
          >
            <div className="bg-white p-6">
              {occasion.badge && (
                <div className={`absolute top-3 right-3 ${occasion.badgeColor} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                  {occasion.badge}
                </div>
              )}

              {selectedOccasion === occasion.id && (
                <div className="absolute top-3 left-3 bg-[#2C5F2D] text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
                  <span>✓</span> Selected
                </div>
              )}

              <div className="text-center">
                <div className="text-5xl mb-3">{occasion.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{occasion.title}</h3>
                <p className="text-xs text-gray-600 mb-4 italic leading-relaxed min-h-[60px]">
                  "{occasion.quote}"
                </p>
                <div className="text-xl font-bold text-gray-900">
                  ₹{occasion.price} <span className="text-sm font-normal text-gray-500">/ tree</span>
                </div>
              </div>
            </div>
          </motion.div>
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
            <span className="text-lg">{currentOccasion.icon}</span> {currentOccasion.title} × {quantity}
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
