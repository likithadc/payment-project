import { useState } from "react";
import { TreePine, Droplets, Trash2, MapPin, ChevronRight, Star, Shield, Leaf } from "lucide-react";
import type { DonationData } from "../types";

const PRESETS = [
  { amount: 100, trees: 1, label: "₹100", sublabel: "1 Tree" },
  { amount: 500, trees: 5, label: "₹500", sublabel: "5 Trees", popular: true },
  { amount: 1000, trees: 10, label: "₹1,000", sublabel: "10 Trees" },
  { amount: 5000, trees: 50, label: "₹5,000", sublabel: "50 Trees" },
];

const LOCATIONS = [
  "Bangalore, Karnataka",
  "Mumbai, Maharashtra",
  "Delhi, NCR",
  "Chennai, Tamil Nadu",
  "Hyderabad, Telangana",
  "Pune, Maharashtra",
  "Ahmedabad, Gujarat",
  "Kolkata, West Bengal",
];

const PROJECT_TYPES = [
  { id: "trees", label: "Tree Plantation", icon: TreePine, color: "text-green-600" },
  { id: "water", label: "Water Conservation", icon: Droplets, color: "text-blue-500" },
  { id: "waste", label: "Waste Management", icon: Trash2, color: "text-orange-500" },
];

interface Props {
  data: DonationData;
  onUpdate: (d: Partial<DonationData>) => void;
  onNext: () => void;
}

export function Step1Contribution({ data, onUpdate, onNext }: Props) {
  const [customAmount, setCustomAmount] = useState(
    data.amount && !PRESETS.find((p) => p.amount === data.amount) ? String(data.amount) : ""
  );
  const [showCustom, setShowCustom] = useState(
    !!data.amount && !PRESETS.find((p) => p.amount === data.amount)
  );

  const selectedPreset = PRESETS.find((p) => p.amount === data.amount);

  function selectPreset(preset: (typeof PRESETS)[0]) {
    setShowCustom(false);
    setCustomAmount("");
    onUpdate({ amount: preset.amount, trees: preset.trees });
  }

  function handleCustomAmount(val: string) {
    const num = parseInt(val) || 0;
    setCustomAmount(val);
    onUpdate({ amount: num, trees: Math.max(1, Math.floor(num / 100)) });
  }

  const canContinue = data.amount > 0 && data.trees > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6f4ec] to-[#f0faf4] pb-10">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#15803d] to-[#1a7a3c] text-white px-6 pt-10 pb-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-white text-4xl"
              style={{ left: `${(i * 17) % 100}%`, top: `${(i * 23) % 100}%`, opacity: 0.3 }}
            >
              🌳
            </div>
          ))}
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm mb-4">
            <Leaf size={14} />
            <span>10,000+ Trees Planted</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Plant a Tree 🌱</h1>
          <p className="text-green-100 text-base">Your contribution creates real, lasting impact</p>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm text-green-100">
            <span className="flex items-center gap-1"><Star size={12} fill="currentColor" /> 91% survival rate</span>
            <span className="flex items-center gap-1"><Shield size={12} /> 80G tax benefit</span>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-8 relative z-10">
        {/* Preset Cards */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-4">
          <h2 className="font-semibold text-[#0f2d1a] mb-4">Select Your Contribution</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {PRESETS.map((preset) => (
              <button
                key={preset.amount}
                onClick={() => selectPreset(preset)}
                className={`relative rounded-xl p-4 border-2 text-left transition-all duration-200 ${
                  selectedPreset?.amount === preset.amount && !showCustom
                    ? "border-[#22c55e] bg-[#f0faf4] shadow-md"
                    : "border-[#e6f4ec] hover:border-[#86efac] bg-white"
                }`}
              >
                {preset.popular && (
                  <span className="absolute -top-2.5 right-3 bg-[#22c55e] text-white text-xs px-2 py-0.5 rounded-full font-medium">
                    Popular
                  </span>
                )}
                <div className="text-xl font-bold text-[#15803d]">{preset.label}</div>
                <div className="text-sm text-[#4a7a5c] flex items-center gap-1 mt-1">
                  <TreePine size={13} />
                  {preset.sublabel}
                </div>
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <button
            onClick={() => { setShowCustom(true); onUpdate({ amount: 0, trees: 0 }); }}
            className={`w-full py-3 rounded-xl border-2 border-dashed text-sm font-medium transition-all ${
              showCustom ? "border-[#22c55e] bg-[#f0faf4]" : "border-[#d4eddf] text-[#4a7a5c] hover:border-[#22c55e]"
            }`}
          >
            ✏️ Enter Custom Amount
          </button>

          {showCustom && (
            <div className="mt-3">
              <div className="flex items-center border-2 border-[#22c55e] rounded-xl overflow-hidden bg-white">
                <span className="px-4 text-[#1a7a3c] font-bold text-lg">₹</span>
                <input
                  type="number"
                  placeholder="Enter amount (min ₹100)"
                  value={customAmount}
                  onChange={(e) => handleCustomAmount(e.target.value)}
                  className="flex-1 py-3 pr-4 outline-none text-[#0f2d1a] bg-transparent"
                  min={100}
                />
              </div>
              {customAmount && (
                <p className="text-sm text-[#1a7a3c] mt-2 font-medium">
                  🌳 = {Math.max(1, Math.floor(parseInt(customAmount) / 100))} trees
                </p>
              )}
            </div>
          )}
        </div>

        {/* Location & Project */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <h2 className="font-semibold text-[#0f2d1a] mb-4">Planting Preferences <span className="text-[#4a7a5c] font-normal text-sm">(optional)</span></h2>

          <div className="mb-4">
            <label className="text-sm font-medium text-[#0f2d1a] flex items-center gap-2 mb-2">
              <MapPin size={14} className="text-[#1a7a3c]" /> Location
            </label>
            <select
              value={data.location || ""}
              onChange={(e) => onUpdate({ location: e.target.value })}
              className="w-full border-2 border-[#e6f4ec] rounded-xl p-3 text-[#0f2d1a] bg-[#f0faf4] outline-none focus:border-[#22c55e] transition-colors"
            >
              <option value="">Any Location</option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-[#0f2d1a] mb-2 block">Project Type</label>
            <div className="flex gap-2">
              {PROJECT_TYPES.map((pt) => (
                <button
                  key={pt.id}
                  onClick={() => onUpdate({ projectType: pt.id as DonationData["projectType"] })}
                  className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 text-xs font-medium transition-all ${
                    data.projectType === pt.id
                      ? "border-[#22c55e] bg-[#f0faf4]"
                      : "border-[#e6f4ec] hover:border-[#86efac]"
                  }`}
                >
                  <pt.icon size={18} className={pt.color} />
                  {pt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Banner */}
        {canContinue && (
          <div className="bg-[#1a7a3c] text-white rounded-2xl p-4 mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm opacity-80">Your impact</div>
              <div className="font-bold text-lg">
                {data.trees} Tree{data.trees > 1 ? "s" : ""} • ₹{data.amount.toLocaleString("en-IN")}
              </div>
            </div>
            <div className="text-3xl">🌳</div>
          </div>
        )}

        <button
          onClick={onNext}
          disabled={!canContinue}
          className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-200 ${
            canContinue
              ? "bg-[#22c55e] hover:bg-[#16a34a] text-white shadow-lg shadow-green-300/40 active:scale-[0.98]"
              : "bg-[#d4eddf] text-[#4a7a5c] cursor-not-allowed"
          }`}
        >
          Continue <ChevronRight size={20} />
        </button>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-[#4a7a5c]">
          <span>🔒 Secure Payment</span>
          <span>📜 80G Eligible</span>
          <span>🌍 Real Impact</span>
        </div>
      </div>
    </div>
  );
}
