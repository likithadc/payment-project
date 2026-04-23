import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

interface SuccessPageProps {
  transactionId: string;
  selectedItem: {
    name: string;
    icon: string;
    quantity: number;
    price: number;
  };
  userDetails: {
    fullName: string;
    email: string;
  };
  onViewTrees: () => void;
  onDownloadReceipt: () => void;
  onDownloadCertificate: () => void;
}

export function SuccessPage({
  transactionId,
  selectedItem,
  userDetails,
  onViewTrees,
  onDownloadReceipt,
  onDownloadCertificate
}: SuccessPageProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti on mount
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#2C5F2D', '#81C784', '#4CAF50']
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#2C5F2D', '#81C784', '#4CAF50']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  const totalAmount = selectedItem.price * selectedItem.quantity;

  const handleShare = () => {
    const shareText = `I just planted ${selectedItem.quantity} ${selectedItem.quantity === 1 ? 'tree' : 'trees'} with MaraChitra! 🌱 Join me in making Earth greener. #PlantTrees #MaraChitra`;

    if (navigator.share) {
      navigator.share({
        title: 'I Planted Trees!',
        text: shareText,
        url: window.location.origin
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(shareText);
      alert('Share text copied to clipboard!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto"
    >
      {/* Success Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-block mb-6"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-[#2C5F2D] to-[#4CAF50] rounded-full flex items-center justify-center text-white text-5xl shadow-2xl">
            ✓
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-gray-900 mb-3"
        >
          Payment Successful!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-semibold text-[#2C5F2D] mb-6"
        >
          🌱 You planted {selectedItem.quantity} {selectedItem.quantity === 1 ? 'tree' : 'trees'}!
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed"
        >
          Your trees will soon be planted and tracked. You're making a real difference for our planet! 🌍
        </motion.p>
      </div>

      {/* Transaction Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-6"
      >
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>📋</span> Transaction Details
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Transaction ID</span>
            <span className="font-mono font-semibold text-gray-900">{transactionId}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Donor Name</span>
            <span className="font-medium text-gray-900">{userDetails.fullName}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Email</span>
            <span className="font-medium text-gray-900">{userDetails.email}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Number of Trees</span>
            <span className="font-medium text-gray-900">{selectedItem.quantity}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Location</span>
            <span className="font-medium text-gray-900">Bangalore</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">Amount Paid</span>
            <span className="font-bold text-[#2C5F2D] text-lg">₹{totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onViewTrees}
          className="bg-[#2C5F2D] text-white py-4 px-6 rounded-xl font-semibold hover:bg-[#234d24] transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          <span>📍</span> View My Trees
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="bg-[#4CAF50] text-white py-4 px-6 rounded-xl font-semibold hover:bg-[#45a049] transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          <span>📤</span> Share
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDownloadReceipt}
          className="border-2 border-[#2C5F2D] text-[#2C5F2D] py-4 px-6 rounded-xl font-semibold hover:bg-[#E8F5E9] transition-colors flex items-center justify-center gap-2"
        >
          <span>📥</span> Download Receipt
        </motion.button>
      </motion.div>

      {/* Certificate Download */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-br from-[#E8F5E9] to-[#F5F9F5] rounded-2xl p-6 border-2 border-[#2C5F2D] mb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
              <span>🎖️</span> Your Tree Certificate is Ready!
            </h3>
            <p className="text-sm text-gray-600">Download your personalized certificate with unique Tree ID and QR code</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDownloadCertificate}
            className="bg-[#2C5F2D] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#234d24] transition-colors whitespace-nowrap"
          >
            Download Certificate
          </motion.button>
        </div>
      </motion.div>

      {/* What's Next */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>🚀</span> What Happens Next?
        </h3>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[#E8F5E9] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl">📧</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Email Confirmation (Now)</h4>
              <p className="text-sm text-gray-600">Receipt and certificate sent to {userDetails.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[#E8F5E9] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🌱</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Tree Planting (Within 7 Days)</h4>
              <p className="text-sm text-gray-600">Field team plants your tree at verified location in Bangalore</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[#E8F5E9] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🎈</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">GPS Tagging & AI Verification</h4>
              <p className="text-sm text-gray-600">Unique coordinates assigned and AI verifies species and health</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[#E8F5E9] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl">📊</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Dashboard Activation</h4>
              <p className="text-sm text-gray-600">Track your tree with monthly photos for 3 years</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-8"
      >
        <p className="text-gray-600 italic">
          "The best time to plant a tree was 20 years ago. The second best time is now."
        </p>
        <p className="text-sm text-gray-500 mt-2">Thank you for choosing EcoTree 💚</p>
      </motion.div>
    </motion.div>
  );
}
