import { useState } from "react";
import { ChevronLeft, TreePine, MapPin, User, Gift, Shield, Lock } from "lucide-react";
import type { DonationData } from "../types";


interface Props {
  data: DonationData;
  onNext: () => void;
  onBack: () => void;
}

export function Step4Review({ data, onNext, onBack }: Props) {
  const [agreed, setAgreed] = useState(false);

  const handleProceed = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/donations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trees: data.trees,
        amount: data.amount,
        donor_name: data.donorName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        pan_number: data.pan,
        tax_benefit: data.wants80G,
        location: data.location,
        project_type: data.projectType,
        is_gift: data.isGift,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save donation");
    }

    const result = await response.json();
    console.log("Saved to PostgreSQL:", result);

    onNext();
  } catch (error) {
    console.error("Database Error:", error);
    alert("Failed to save donation.");
  }
};

  const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-start justify-between py-2.5 border-b border-[#e6f4ec] last:border-0">
      <span className="text-[#4a7a5c] text-sm">{label}</span>
      <span className="text-[#0f2d1a] font-medium text-sm text-right max-w-[60%]">{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6f4ec] to-[#f0faf4] pb-10">
      <div className="bg-gradient-to-br from-[#15803d] to-[#1a7a3c] text-white px-6 pt-8 pb-14">
        <button onClick={onBack} className="flex items-center gap-1 text-green-200 text-sm mb-4 hover:text-white">
          <ChevronLeft size={16} /> Back
        </button>
        <h1 className="text-2xl font-bold">Review Your Contribution 🧾</h1>
        <p className="text-green-100 text-sm mt-1">Please verify all details before payment</p>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-8 relative z-10 space-y-4">
        {/* Impact Banner */}
        <div className="bg-gradient-to-r from-[#1a7a3c] to-[#16a34a] text-white rounded-2xl p-5 text-center shadow-xl">
          <div className="text-5xl mb-2">🌳</div>
          <div className="text-3xl font-bold">{data.trees} Tree{data.trees > 1 ? "s" : ""}</div>
          <div className="text-green-100 text-sm mt-1">Will be planted in your name</div>
          <div className="text-2xl font-bold mt-3">₹{data.amount.toLocaleString("en-IN")}</div>
        </div>

        {/* Donation Details */}
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <h3 className="font-semibold text-[#0f2d1a] flex items-center gap-2 mb-3">
            <TreePine size={16} className="text-[#1a7a3c]" /> Donation Details
          </h3>
          <Row label="Trees" value={`${data.trees} Tree${data.trees > 1 ? "s" : ""}`} />
          <Row label="Amount" value={`₹${data.amount.toLocaleString("en-IN")}`} />
          {data.location && <Row label="Location" value={data.location} />}
          {data.projectType && <Row label="Project" value={data.projectType.charAt(0).toUpperCase() + data.projectType.slice(1)} />}
          {data.wants80G && <Row label="80G Benefit" value="✅ Yes (Certificate will be emailed)" />}
        </div>

        {/* Donor Info */}
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <h3 className="font-semibold text-[#0f2d1a] flex items-center gap-2 mb-3">
            <User size={16} className="text-[#1a7a3c]" /> Donor Details
          </h3>
          <Row label="Name" value={data.donorName || ""} />
          <Row label="Email" value={data.email || ""} />
          <Row label="Phone" value={data.phone || ""} />
          {data.address && <Row label="Address" value={data.address} />}
          {data.pan && <Row label="PAN" value={data.pan} />}
        </div>

        {/* Gift Info */}
        {data.isGift && (
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-semibold text-[#0f2d1a] flex items-center gap-2 mb-3">
              <Gift size={16} className="text-[#1a7a3c]" /> Gift Details
            </h3>
            <Row label="Recipient" value={data.recipientName || ""} />
            <Row label="Recipient Email" value={data.recipientEmail || ""} />
            {data.occasion && <Row label="Occasion" value={data.occasion} />}
            {data.giftMessage && <Row label="Message" value={data.giftMessage} />}
            {data.deliveryDate && <Row label="Delivery Date" value={new Date(data.deliveryDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} />}
          </div>
        )}

        {/* Terms */}
        <div
          className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
            agreed ? "border-[#22c55e] bg-[#f0fdf4]" : "border-[#e6f4ec] bg-white"
          }`}
          onClick={() => setAgreed(!agreed)}
        >
          <div
            className={`w-5 h-5 rounded flex items-center justify-center mt-0.5 flex-shrink-0 transition-all ${
              agreed ? "bg-[#22c55e]" : "border-2 border-[#d4eddf]"
            }`}
          >
            {agreed && (
              <svg viewBox="0 0 12 10" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="1,5 4,8 11,1" />
              </svg>
            )}
          </div>
          <p className="text-sm text-[#4a7a5c]">
            I agree to the{" "}
            <span className="text-[#1a7a3c] underline">Terms & Conditions</span> and{" "}
            <span className="text-[#1a7a3c] underline">Privacy Policy</span>. I confirm that the above details are correct.
          </p>
        </div>

        {/* Security note */}
        <div className="flex items-center gap-2 text-xs text-[#4a7a5c] justify-center">
          <Lock size={12} />
          <span>256-bit SSL encrypted payment</span>
          <Shield size={12} />
          <span>100% secure</span>
        </div>

        <button
  onClick={handleProceed}
  disabled={!agreed}
  className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
    agreed
      ? "bg-[#22c55e] hover:bg-[#16a34a] text-white shadow-lg shadow-green-300/40 active:scale-[0.98]"
      : "bg-[#d4eddf] text-[#4a7a5c] cursor-not-allowed"
  }`}
>
  🔒 Proceed to Payment — ₹{data.amount.toLocaleString("en-IN")}
</button>
      </div>
    </div>
  );
}
