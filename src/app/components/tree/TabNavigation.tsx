import { motion } from 'motion/react';

interface TabNavigationProps {
  activeTab: 'plant' | 'gift';
  onTabChange: (tab: 'plant' | 'gift') => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex border-b border-gray-200 mb-8">
      <button
        onClick={() => onTabChange('plant')}
        className={`flex-1 py-4 px-6 text-sm font-semibold relative transition-colors ${
          activeTab === 'plant' ? 'text-[#2C5F2D]' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <span className="flex items-center justify-center gap-2">
          <span>🌱</span> Plant a Tree
        </span>
        {activeTab === 'plant' && (
          <motion.div
            layoutId="activeTab"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2C5F2D]"
          />
        )}
      </button>

      <button
        onClick={() => onTabChange('gift')}
        className={`flex-1 py-4 px-6 text-sm font-semibold relative transition-colors ${
          activeTab === 'gift' ? 'text-[#2C5F2D]' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <span className="flex items-center justify-center gap-2">
          <span>🎁</span> Gift a Tree
        </span>
        {activeTab === 'gift' && (
          <motion.div
            layoutId="activeTab"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2C5F2D]"
          />
        )}
      </button>
    </div>
  );
}
