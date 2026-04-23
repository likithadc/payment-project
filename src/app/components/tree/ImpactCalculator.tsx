import { useState } from 'react';
import { motion } from 'motion/react';

export function ImpactCalculator() {
  const [trees, setTrees] = useState(1000);

  const co2 = trees * 22;
  const yearlyPrice = trees * 100;
  const carbonCredits = (trees * 0.0048).toFixed(1);

  return (
    <div className="bg-[#1B4332] text-white py-16 -mx-4 px-4">
      <div className="max-w-4xl mx-auto">
        <p className="text-[#81C784] text-sm font-semibold uppercase tracking-wide mb-3">
          Impact Calculator
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          See your impact before you plant
        </h2>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">Number of trees</label>
            <span className="text-2xl font-bold text-[#81C784]">{trees}</span>
          </div>
          <input
            type="range"
            min="1"
            max="10000"
            value={trees}
            onChange={(e) => setTrees(parseInt(e.target.value))}
            className="w-full h-2 bg-[#2C5F2D] rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #81C784 0%, #81C784 ${(trees / 10000) * 100}%, #2C5F2D ${(trees / 10000) * 100}%, #2C5F2D 100%)`
            }}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-12">
          <motion.div
            key={co2}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-[#2C5F2D] rounded-xl p-6 text-center"
          >
            <div className="text-3xl font-bold mb-1">{co2.toLocaleString()} kg</div>
            <div className="text-sm text-gray-300">CO₂ offset yearly</div>
          </motion.div>

          <motion.div
            key={yearlyPrice}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-[#2C5F2D] rounded-xl p-6 text-center"
          >
            <div className="text-3xl font-bold mb-1">₹{yearlyPrice.toLocaleString()}</div>
            <div className="text-sm text-gray-300">Yearly Price</div>
          </motion.div>

          <motion.div
            key={carbonCredits}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-[#2C5F2D] rounded-xl p-6 text-center"
          >
            <div className="text-3xl font-bold mb-1">{carbonCredits}</div>
            <div className="text-sm text-gray-300">Carbon credit vouchers</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
