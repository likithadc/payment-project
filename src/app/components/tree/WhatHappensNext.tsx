import { motion } from 'motion/react';

const steps = [
  {
    number: '0.1',
    icon: '🌱',
    title: 'We Plant',
    description: 'Field team plants your tree within 7 days at a verified site in Bangalore.'
  },
  {
    number: '0.2',
    icon: '🎈',
    title: 'GPS Tagged',
    description: 'Unique GPS coordinates and QR code assigned to your specific tree.'
  },
  {
    number: '0.3',
    icon: '🚛',
    title: 'AI Verified',
    description: 'Claude AI checks species, location till sapling found healthy before it reaches you.'
  },
  {
    number: '0.4',
    icon: '📊',
    title: 'Dashboard Live',
    description: 'Your tree appears on your personal dashboard with monthly photo updates.'
  }
];

export function WhatHappensNext() {
  return (
    <div className="bg-gradient-to-b from-[#E8F5E9] to-white py-16 -mx-4 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-[#2C5F2D] text-sm font-semibold mb-2 uppercase tracking-wide">
          After you donate
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          What happens next
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="text-center">
                <div className="text-5xl mb-4">{step.icon}</div>
                <div className="text-sm text-gray-500 mb-1">{step.number}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gray-300">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400">→</div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
