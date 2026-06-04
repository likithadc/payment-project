import { useState } from "react";
import { Gift, ChevronRight, ChevronLeft, User, Mail, Heart, Calendar } from "lucide-react";
import type { DonationData } from "../types";

const OCCASIONS = ["Birthday 🎂", "Anniversary 💍", "Graduation 🎓", "Thank You 🙏", "Wedding 💒", "Custom 🎁"];

interface Props {
  data: DonationData;
  onUpdate: (d: Partial<DonationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step3GiftOption({ data, onUpdate, onNext, onBack }: Props) {
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    if (!data.isGift) return {};
    const e: Record<string, string> = {};
    if (!data.recipientName?.trim()) e.recipientName = "Recipient name required";
    if (!data.recipientEmail?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.recipientEmail = "Valid email required";
    return e;
  }

  function handleContinue() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) onNext();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6f4ec] to-[#f0faf4] pb-10">
      <div className="bg-gradient-to-br from-[#15803d] to-[#1a7a3c] text-white px-6 pt-8 pb-14">
        <button onClick={onBack} className="flex items-center gap-1 text-green-200 text-sm mb-4 hover:text-white">
          <ChevronLeft size={16} /> Back
        </button>
        <h1 className="text-2xl font-bold">Is this a Gift? 🎁</h1>
        <p className="text-green-100 text-sm mt-1">Plant trees in someone's honour</p>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-8 relative z-10 space-y-4">
        {/* Toggle */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex gap-3">
            <button
              onClick={() => { onUpdate({ isGift: false }); setErrors({}); }}
              className={`flex-1 py-4 rounded-xl font-semibold border-2 transition-all ${
                !data.isGift
                  ? "bg-[#1a7a3c] text-white border-[#1a7a3c]"
                  : "border-[#e6f4ec] text-[#4a7a5c] hover:border-[#86efac]"
              }`}
            >
              ❌ No, it's for me
            </button>
            <button
              onClick={() => onUpdate({ isGift: true })}
              className={`flex-1 py-4 rounded-xl font-semibold border-2 transition-all ${
                data.isGift
                  ? "bg-[#22c55e] text-white border-[#22c55e] shadow-lg shadow-green-300/40"
                  : "border-[#e6f4ec] text-[#4a7a5c] hover:border-[#86efac]"
              }`}
            >
              ✅ Yes, it's a gift!
            </button>
          </div>

          {data.isGift && (
            <div className="mt-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
              <div className="border-t border-[#e6f4ec] pt-4">
                {/* Recipient Name */}
                <div className="mb-3">
                  <label className="flex items-center gap-1.5 text-sm font-medium text-[#0f2d1a] mb-1.5">
                    <User size={14} className="text-[#1a7a3c]" /> Recipient Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Priya Patel"
                    value={data.recipientName || ""}
                    onChange={(e) => { onUpdate({ recipientName: e.target.value }); setErrors(p => ({...p, recipientName: ""})); }}
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-[#f0faf4] outline-none transition-colors text-[#0f2d1a] ${errors.recipientName ? "border-red-400" : "border-[#e6f4ec] focus:border-[#22c55e]"}`}
                  />
                  {errors.recipientName && <p className="text-red-500 text-xs mt-1">{errors.recipientName}</p>}
                </div>

                {/* Recipient Email */}
                <div className="mb-3">
                  <label className="flex items-center gap-1.5 text-sm font-medium text-[#0f2d1a] mb-1.5">
                    <Mail size={14} className="text-[#1a7a3c]" /> Recipient Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="priya@example.com"
                    value={data.recipientEmail || ""}
                    onChange={(e) => { onUpdate({ recipientEmail: e.target.value }); setErrors(p => ({...p, recipientEmail: ""})); }}
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-[#f0faf4] outline-none transition-colors text-[#0f2d1a] ${errors.recipientEmail ? "border-red-400" : "border-[#e6f4ec] focus:border-[#22c55e]"}`}
                  />
                  {errors.recipientEmail && <p className="text-red-500 text-xs mt-1">{errors.recipientEmail}</p>}
                </div>

                {/* Occasion */}
                <div className="mb-3">
                  <label className="flex items-center gap-1.5 text-sm font-medium text-[#0f2d1a] mb-2">
                    <Heart size={14} className="text-[#1a7a3c]" /> Occasion <span className="text-[#4a7a5c] font-normal">(optional)</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {OCCASIONS.map((occ) => (
                      <button
                        key={occ}
                        onClick={() => onUpdate({ occasion: occ })}
                        className={`text-xs py-2 px-1 rounded-lg border-2 font-medium transition-all ${
                          data.occasion === occ
                            ? "border-[#22c55e] bg-[#f0fdf4] text-[#1a7a3c]"
                            : "border-[#e6f4ec] text-[#4a7a5c] hover:border-[#86efac]"
                        }`}
                      >
                        {occ}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="mb-3">
                  <label className="text-sm font-medium text-[#0f2d1a] mb-1.5 block">
                    Personal Message <span className="text-[#4a7a5c] font-normal">(optional)</span>
                  </label>
                  <textarea
                    placeholder="I planted trees in your honour because you make the world greener 🌱"
                    value={data.giftMessage || ""}
                    onChange={(e) => onUpdate({ giftMessage: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#e6f4ec] focus:border-[#22c55e] bg-[#f0faf4] outline-none text-[#0f2d1a] resize-none"
                  />
                </div>

                {/* Delivery Date */}
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-[#0f2d1a] mb-1.5">
                    <Calendar size={14} className="text-[#1a7a3c]" /> Delivery Date <span className="text-[#4a7a5c] font-normal">(optional)</span>
                  </label>
                  <input
                    type="date"
                    value={data.deliveryDate || ""}
                    onChange={(e) => onUpdate({ deliveryDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#e6f4ec] focus:border-[#22c55e] bg-[#f0faf4] outline-none text-[#0f2d1a]"
                  />
                </div>

                {/* Preview button */}
                <button
                  onClick={() => setShowPreview(true)}
                  className="mt-4 w-full py-3 rounded-xl border-2 border-[#22c55e] text-[#1a7a3c] font-semibold text-sm hover:bg-[#f0fdf4] transition-all flex items-center justify-center gap-2"
                >
                  <Gift size={16} /> Preview Gift Certificate
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleContinue}
          className="w-full py-4 rounded-2xl bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-green-300/40 active:scale-[0.98] transition-all"
        >
          Continue <ChevronRight size={20} />
        </button>
      </div>

      {/* Gift Certificate Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 relative">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 text-[#4a7a5c] hover:text-[#0f2d1a]"
            >✕</button>
            <div className="text-center">
              <div className="text-4xl mb-3">🌳</div>
              <div className="bg-gradient-to-br from-[#15803d] to-[#1a7a3c] text-white rounded-xl p-4 mb-4">
                <div className="text-xs opacity-80 mb-1">GIFT CERTIFICATE</div>
                <div className="text-xl font-bold">{data.trees} Tree{data.trees > 1 ? "s" : ""} Planted</div>
                <div className="text-sm opacity-90 mt-1">In honour of</div>
                <div className="text-lg font-semibold mt-1">{data.recipientName || "Recipient Name"}</div>
                {data.occasion && <div className="text-xs opacity-75 mt-1">{data.occasion}</div>}
              </div>
              {data.giftMessage && (
                <p className="text-sm text-[#4a7a5c] italic">"{data.giftMessage}"</p>
              )}
              <div className="text-xs text-[#4a7a5c] mt-3">From: {data.donorName}</div>
              <div className="text-xs text-[#4a7a5c]">📍 {data.location || "India"}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
