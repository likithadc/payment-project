import { motion } from 'motion/react';

interface StepProgressProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: 'Choose Tree' },
  { number: 2, label: 'Your Details' },
  { number: 3, label: 'Review' },
  { number: 4, label: 'Pay' }
];

export function StepProgress({ currentStep }: StepProgressProps) {
  return (
    <div className="flex items-center justify-center mb-12">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: currentStep >= step.number ? 1 : 0.8 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold mb-2 ${
                currentStep >= step.number
                  ? 'bg-[#2C5F2D] text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step.number}
            </motion.div>
            <span className={`text-xs whitespace-nowrap ${
              currentStep >= step.number ? 'text-[#2C5F2D] font-medium' : 'text-gray-500'
            }`}>
              {step.label}
            </span>
          </div>

          {index < steps.length - 1 && (
            <div className="w-20 md:w-32 h-0.5 bg-gray-200 mx-2 mb-8">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: currentStep > step.number ? '100%' : '0%' }}
                className="h-full bg-[#2C5F2D]"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
