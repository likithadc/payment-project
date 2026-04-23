import { useState } from 'react';
import { motion } from 'motion/react';

interface ReviewConfirmProps {
  onBack: () => void;
  onContinue: () => void;
  selectedItem: {
    name: string;
    icon: string;
    quantity: number;
    price: number;
  };
  userDetails: {
    fullName: string;
    email: string;
    phone: string;
  };
  isGift: boolean;
}

export function ReviewConfirm({ onBack, onContinue, selectedItem, userDetails, isGift }: ReviewConfirmProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const totalAmount = selectedItem.price * selectedItem.quantity;
  const co2Offset = selectedItem.quantity * (selectedItem.price === 100 ? 5 : selectedItem.price === 250 ? 12 : 25);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Contribution</h2>
          <p className="text-gray-600">Please review your details before proceeding to payment</p>
        </div>

        <div className="space-y-6">
          {/* Contribution Summary */}
          <div className="bg-gradient-to-br from-[#E8F5E9] to-[#F5F9F5] rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span>🌱</span> Contribution Summary
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 flex items-center gap-2">
                  <span className="text-xl">{selectedItem.icon}</span>
                  <span>{selectedItem.name}</span>
                </span>
                <span className="font-semibold text-gray-900">{selectedItem.quantity} {selectedItem.quantity === 1 ? 'tree' : 'trees'}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700">💰 Amount</span>
                <span className="font-bold text-[#2C5F2D] text-xl">₹{totalAmount.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700">📍 Location</span>
                <span className="font-medium text-gray-900">Bangalore</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700">🌍 CO₂ Offset</span>
                <span className="font-medium text-gray-900">~{co2Offset}kg/year</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700">🎁 Gift</span>
                <span className="font-medium text-gray-900">{isGift ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>

          {/* Donor Details */}
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span>👤</span> Donor Details
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Name</span>
                <span className="font-medium text-gray-900">{userDetails.fullName || 'Not provided'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Email</span>
                <span className="font-medium text-gray-900">{userDetails.email || 'Not provided'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Phone</span>
                <span className="font-medium text-gray-900">{userDetails.phone || 'Not provided'}</span>
              </div>
            </div>
          </div>

          {/* What You Get */}
          <div className="bg-[#1B4332] text-white rounded-xl p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span>✨</span> What You Get
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-[#81C784]">✓</span>
                <span>Digital Certificate (instant)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#81C784]">✓</span>
                <span>80G Tax Benefit Receipt</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#81C784]">✓</span>
                <span>GPS Tracking Dashboard</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#81C784]">✓</span>
                <span>Monthly Photo Updates</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#81C784]">✓</span>
                <span>AI Verification Reports</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#81C784]">✓</span>
                <span>3 Years Tree Tracking</span>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="border-t border-gray-200 pt-6">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-gray-300 text-[#2C5F2D] focus:ring-[#2C5F2D]"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                I agree to the <a href="#" className="text-[#2C5F2D] underline font-medium">terms & conditions</a> and confirm that the above details are correct. I understand that my trees will be planted in verified locations and tracked for 3 years.
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              ← Back
            </button>

            <button
              onClick={onContinue}
              disabled={!agreedToTerms}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                agreedToTerms
                  ? 'bg-[#2C5F2D] text-white hover:bg-[#234d24] shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>💳</span> Proceed to Payment · ₹{totalAmount.toLocaleString()}
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-6 text-xs text-gray-500 pt-4">
            <div className="flex items-center gap-1">
              <span>🔒</span> Secure Payment
            </div>
            <div className="flex items-center gap-1">
              <span>✓</span> 10,000+ Trees Planted
            </div>
            <div className="flex items-center gap-1">
              <span>⭐</span> 91% Survival Rate
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
