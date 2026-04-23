import { Input } from './ui/input';
import { motion } from 'motion/react';

type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet';

interface PaymentInputProps {
  method: PaymentMethod;
  upiId: string;
  onUpiIdChange: (value: string) => void;
}

export function PaymentInput({ method, upiId, onUpiIdChange }: PaymentInputProps) {
  if (method !== 'upi') return null;

  const quickOptions = [
    { name: 'Google Pay', icon: '🟢' },
    { name: 'PhonePe', icon: '🟣' },
    { name: 'Paytm', icon: '🔵' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-white rounded-2xl p-6 shadow-md"
    >
      <div className="mb-4">
        <label htmlFor="upi-id" className="block text-sm font-medium text-gray-700 mb-2">
          Enter UPI ID
        </label>
        <Input
          id="upi-id"
          type="text"
          placeholder="yourname@upi"
          value={upiId}
          onChange={(e) => onUpiIdChange(e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-3">Quick Pay</p>
        <div className="grid grid-cols-3 gap-3">
          {quickOptions.map((option, index) => (
            <motion.button
              key={option.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 p-3 border-2 border-gray-200 rounded-xl hover:border-[#2C5F2D] hover:bg-[#E8F5E9] transition-all"
            >
              <span className="text-2xl">{option.icon}</span>
              <span className="text-xs text-gray-700">{option.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}