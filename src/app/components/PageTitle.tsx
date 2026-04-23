import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export function PageTitle() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-6"
    >
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E8F5E9] to-green-100 px-4 py-2 rounded-full mb-2">
        <Sparkles className="w-4 h-4 text-[#2C5F2D]" />
        <span className="text-sm font-medium text-[#2C5F2D]">Almost there!</span>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Complete Your Donation</h1>
      <p className="text-sm text-gray-600">
        Choose your payment method to plant trees
      </p>
    </motion.div>
  );
}
