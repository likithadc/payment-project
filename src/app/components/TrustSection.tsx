import { Shield, Eye, FileText } from 'lucide-react';
import { motion } from 'motion/react';

export function TrustSection() {
  const features = [
    { icon: Shield, label: 'Secure payments' },
    { icon: Eye, label: '100% transparency' },
    { icon: FileText, label: '80G tax benefit' },
  ];

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 shadow-sm">
      <div className="grid grid-cols-3 gap-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center gap-2 text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"
              >
                <Icon className="w-5 h-5 text-[#2C5F2D]" />
              </motion.div>
              <span className="text-xs text-gray-700 leading-tight">{feature.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}