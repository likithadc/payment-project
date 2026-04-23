import { motion } from 'motion/react';
import { X, CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
          >
            <CheckCircle className="w-12 h-12 text-[#2C5F2D]" />
          </motion.div>

          <h2 className="text-2xl font-bold text-[#2C5F2D] mb-3">
            Thank You! 🌳
          </h2>

          <p className="text-gray-600 mb-6">
            Your donation of <strong>₹500</strong> will plant <strong>5 Neem trees</strong> in Bangalore.
          </p>

          <div className="bg-gradient-to-r from-[#E8F5E9] to-green-100 rounded-2xl p-4 mb-6">
            <p className="text-sm text-gray-700 italic">
              "Together we're creating a greener, healthier planet for future generations."
            </p>
          </div>

          <div className="space-y-2 text-sm text-gray-600 mb-6">
            <p>✅ Payment confirmation sent to your email</p>
            <p>✅ 80G tax certificate will be issued</p>
            <p>✅ Tree planting updates coming soon</p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-[#2C5F2D] text-white py-3 rounded-xl font-semibold hover:bg-[#234d24] transition-colors"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
}
