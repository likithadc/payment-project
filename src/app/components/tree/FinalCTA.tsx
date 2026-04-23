import { motion } from 'motion/react';

interface FinalCTAProps {
  onPlantTree?: () => void;
}

export function FinalCTA({ onPlantTree }: FinalCTAProps) {
  return (
    <div className="bg-[#1B4332] text-white py-20 -mx-4 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-6 bg-[#2C5F2D] text-white px-6 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2 hover:bg-[#234d24] transition-colors"
        >
          <span>🌱</span> Start today
        </motion.button>

        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Your tree is waiting.
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold text-[#81C784] mb-6">
          Plant it today.
        </h3>

        <p className="text-gray-300 mb-12 text-lg">
          From ₹100. Certificate instantly. Tracked for 3 years. 80G tax benefit.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPlantTree}
            className="bg-[#2C5F2D] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#234d24] transition-colors inline-flex items-center gap-2 w-full sm:w-auto"
          >
            <span>🌱</span> Plant a Tree - From ₹100
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-[#81C784] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#2C5F2D] transition-colors inline-flex items-center gap-2 w-full sm:w-auto"
          >
            <span>🎁</span> Gift a Tree
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#25D366] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#20ba5a] transition-colors inline-flex items-center gap-2"
        >
          <span>💬</span> WhatsApp Us
        </motion.button>
      </div>
    </div>
  );
}
