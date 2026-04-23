import { TreePine, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export function DonationSummary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-md"
    >
      <h2 className="text-lg font-semibold mb-4 text-[#2C5F2D]">Donation Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Trees</span>
          <span className="font-semibold text-gray-900">5</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Species</span>
          <div className="flex items-center gap-2">
            <TreePine className="w-4 h-4 text-[#2C5F2D]" />
            <span className="font-semibold text-gray-900">Neem</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Location</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#2C5F2D]" />
            <span className="font-semibold text-gray-900">Bangalore</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Occasion</span>
          <span className="font-semibold text-gray-900">Birthday</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3 mt-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900">Total Amount</span>
            <span className="text-xl font-bold text-[#2C5F2D]">₹500</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}