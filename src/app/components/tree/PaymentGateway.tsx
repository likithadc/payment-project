import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { QRCodeCanvas } from 'qrcode.react';

interface PaymentGatewayProps {
  onBack: () => void;
  onSuccess: (transactionId: string) => void;
  amount: number;
}

type PaymentMethod = 'upi' | 'card' | 'netbanking';

export function PaymentGateway({ onBack, onSuccess, amount }: PaymentGatewayProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');

  const [upiId, setUpiId] = useState('');
  const [transactionRef, setTransactionRef] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // 👇 NEW: detect return from UPI app
  const [showVerify, setShowVerify] = useState(false);

  useEffect(() => {
    const handleFocus = () => {
      // User came back to tab
      setShowVerify(true);
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleVerifyPayment = () => {
    if (!transactionRef.trim()) {
      alert('Please enter transaction ID');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      onSuccess('UPI_TXN_' + Date.now());
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Payment</h2>
          <p className="text-gray-600">Choose your preferred payment method</p>
        </div>

        {/* Amount */}
        <div className="bg-gradient-to-br from-[#2C5F2D] to-[#1B4332] text-white rounded-xl p-6 mb-8 text-center">
          <p className="text-sm text-gray-300 mb-2">Total Amount</p>
          <p className="text-4xl font-bold">₹{amount.toLocaleString()}</p>
        </div>

        {/* Payment Methods */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => setSelectedMethod('upi')}
            className={`p-4 rounded-xl border-2 ${
              selectedMethod === 'upi'
                ? 'border-[#2C5F2D] bg-[#E8F5E9]'
                : 'border-gray-200'
            }`}
          >
            📱 UPI
          </button>

          <button
            onClick={() => setSelectedMethod('card')}
            className={`p-4 rounded-xl border-2 ${
              selectedMethod === 'card'
                ? 'border-[#2C5F2D] bg-[#E8F5E9]'
                : 'border-gray-200'
            }`}
          >
            💳 Card
          </button>

          <button
            onClick={() => setSelectedMethod('netbanking')}
            className={`p-4 rounded-xl border-2 ${
              selectedMethod === 'netbanking'
                ? 'border-[#2C5F2D] bg-[#E8F5E9]'
                : 'border-gray-200'
            }`}
          >
            🏦 NetBanking
          </button>
        </div>

        {/* ================= UPI ================= */}
        {selectedMethod === 'upi' && (
          <div className="bg-gray-50 p-6 rounded-xl">

            {/* UPI ID */}
            <label className="block text-sm font-medium mb-2">
              Enter UPI ID *
            </label>

            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="example@upi"
              spellCheck={false}
              className="w-full px-4 py-3 border rounded-lg mb-4 outline-none focus:ring-2 focus:ring-[#2C5F2D]"
            />

            {/* Instruction */}
            <p className="text-sm text-gray-600 mb-4">
              After payment, come back to this page to verify.
            </p>

            {/* QR */}
            <div className="flex justify-center mb-4">
              <QRCodeCanvas
                value={`upi://pay?pa=${upiId || "demo@upi"}&pn=EcoTree&am=${amount}&cu=INR`}
                size={180}
              />
            </div>

            <p className="text-center text-sm text-gray-600 mb-4">
              Scan using Google Pay / PhonePe / Paytm
            </p>

            {/* Pay Button */}
            <a
              href={`upi://pay?pa=${upiId || "demo@upi"}&pn=EcoTree&am=${amount}&cu=INR`}
              className="block text-center bg-green-600 text-white py-3 rounded-lg font-semibold mb-4"
            >
              Pay ₹{amount.toLocaleString()} via UPI
            </a>

            {/* 👇 Show only AFTER return */}
            {showVerify && (
              <>
                <label className="block text-sm font-medium mb-2">
                  Enter Transaction ID
                </label>

                <input
                  type="text"
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  placeholder="UPI Ref Number"
                  className="w-full px-4 py-3 border rounded-lg mb-4 outline-none focus:ring-2 focus:ring-[#2C5F2D]"
                />

                <button
                  onClick={handleVerifyPayment}
                  disabled={isProcessing}
                  className={`w-full py-3 rounded-lg font-semibold ${
                    isProcessing
                      ? 'bg-gray-400'
                      : 'bg-[#2C5F2D] text-white'
                  }`}
                >
                  {isProcessing ? 'Verifying...' : 'Verify Payment'}
                </button>
              </>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={onBack}
            className="px-6 py-3 border rounded-lg"
          >
            ← Back
          </button>
        </div>

      </div>
    </motion.div>
  );
}