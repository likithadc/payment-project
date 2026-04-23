import { CreditCard, Building2, Wallet, Smartphone } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { motion } from 'motion/react';

type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet';

interface PaymentMethodSelectionProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
}

export function PaymentMethodSelection({ selectedMethod, onMethodChange }: PaymentMethodSelectionProps) {
  const methods = [
    { value: 'upi' as const, label: 'UPI', icon: Smartphone, recommended: true },
    { value: 'card' as const, label: 'Card', icon: CreditCard, recommended: false },
    { value: 'netbanking' as const, label: 'Net Banking', icon: Building2, recommended: false },
    { value: 'wallet' as const, label: 'Wallet', icon: Wallet, recommended: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl p-6 shadow-md"
    >
      <h3 className="text-lg font-semibold mb-4 text-[#2C5F2D]">Payment Method</h3>
      
      <RadioGroup value={selectedMethod} onValueChange={(value) => onMethodChange(value as PaymentMethod)}>
        <div className="space-y-3">
          {methods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.value;
            
            return (
              <div key={method.value}>
                <Label
                  htmlFor={method.value}
                  className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#2C5F2D] bg-[#E8F5E9]'
                      : 'border-gray-200 hover:border-[#2C5F2D]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={method.value} id={method.value} />
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-[#2C5F2D]' : 'text-gray-500'}`} />
                    <span className={`font-medium ${isSelected ? 'text-[#2C5F2D]' : 'text-gray-700'}`}>
                      {method.label}
                    </span>
                  </div>
                  {method.recommended && (
                    <span className="text-xs bg-[#2C5F2D] text-white px-2 py-1 rounded-full">
                      Recommended
                    </span>
                  )}
                </Label>
              </div>
            );
          })}
        </div>
      </RadioGroup>
    </motion.div>
  );
}