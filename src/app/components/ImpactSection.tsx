import { motion } from 'motion/react';

export function ImpactSection() {
  const impacts = [
    { icon: '🌳', value: '100kg/year', label: 'CO₂ Offset' },
    { icon: '💧', value: '500 liters', label: 'Water Saved' },
    { icon: '🌍', value: '5 Trees', label: 'Planet Impact' },
  ];

  return (
    <div className="bg-gradient-to-br from-[#E8F5E9] to-white rounded-2xl p-6 shadow-md">
      <h3 className="text-center text-lg font-semibold mb-2 text-[#2C5F2D]">
        Your Impact
      </h3>
      <p className="text-center text-sm text-gray-600 mb-6 italic">
        "Your small step creates a greener future"
      </p>
      
      <div className="grid grid-cols-3 gap-4">
        {impacts.map((impact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className="text-3xl mb-2">{impact.icon}</div>
            <div className="font-bold text-[#2C5F2D] text-sm">{impact.value}</div>
            <div className="text-xs text-gray-600 mt-1">{impact.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
