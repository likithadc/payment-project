import { motion } from 'motion/react';

interface TreeCardProps {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  co2: string;
  image: string;
  badge?: string;
  badgeColor?: string;
  isSelected?: boolean;
  onClick: () => void;
}

export function TreeCard({
  name,
  subtitle,
  price,
  co2,
  image,
  badge,
  badgeColor = 'bg-blue-500',
  isSelected,
  onClick
}: TreeCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-[#2C5F2D] shadow-lg' : 'hover:shadow-md'
      }`}
    >
      <div className="relative h-40 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        {badge && (
          <div className={`absolute top-3 left-3 ${badgeColor} text-white text-xs px-3 py-1 rounded-full font-medium`}>
            {badge}
          </div>
        )}
        {isSelected && (
          <div className="absolute top-3 right-3 bg-[#2C5F2D] text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
            <span>✓</span> Selected
          </div>
        )}
      </div>

      <div className="bg-white p-4 border border-gray-200">
        <div className="mb-3">
          <div className="text-2xl mb-1">{name === 'Common Species' ? '🌿' : name === 'Fruit Trees' ? '🍊' : name === 'Native Large Trees' ? '🌲' : '🏞️'}</div>
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-[#2C5F2D] bg-[#E8F5E9] px-2 py-1 rounded-full">
            🌍 {co2}
          </span>
        </div>

        <div className="text-lg font-bold text-gray-900">
          ₹{price.toLocaleString()} <span className="text-sm font-normal text-gray-500">/ tree</span>
        </div>
      </div>
    </motion.div>
  );
}
