import { motion } from 'motion/react';
import { TreePine, Loader2 } from 'lucide-react';

interface StickyButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

export function StickyButton({ onClick, isLoading = false }: StickyButtonProps) {
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent p-4 pt-8">
      <div className="max-w-md mx-auto">
        <motion.button
          onClick={onClick}
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          animate={!isLoading ? { boxShadow: ['0 20px 25px -5px rgba(44, 95, 45, 0.2), 0 8px 10px -6px rgba(44, 95, 45, 0.2)', '0 20px 25px -5px rgba(44, 95, 45, 0.3), 0 8px 10px -6px rgba(44, 95, 45, 0.3)', '0 20px 25px -5px rgba(44, 95, 45, 0.2), 0 8px 10px -6px rgba(44, 95, 45, 0.2)'] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full bg-[#2C5F2D] text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:bg-[#234d24] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <TreePine className="w-5 h-5" />
              <span>Plant Trees</span>
              <span className="ml-2">₹500</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}