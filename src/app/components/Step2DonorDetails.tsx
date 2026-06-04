import { useState } from "react";
import type { ElementType } from "react";
import { User, Mail, Phone, MapPin, CreditCard, ChevronRight, ChevronLeft, Info } from "lucide-react";
import type { DonationData } from "../types";

interface Props {
  data: DonationData;
  onUpdate: (d: Partial<DonationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step2DonorDetails({ data, onUpdate, onNext, onBack }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!data.donorName?.trim()) e.donorName = "Name is required";
    if (!data.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!data.phone?.match(/^[6-9]\d{9}$/)) e.phone = "Valid 10-digit phone required";
    if (data.wants80G && !data.address?.trim()) e.address = "Address required for 80G";
    return e;
  }

  function handleContinue() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) onNext();
  }

  const InputField = ({
    icon: Icon,
    label,
    field,
    type = "text",
    placeholder,
    optional,
  }: {
    icon: ElementType;
    label: string;
    field: keyof DonationData;
    type?: string;
    placeholder: string;
    optional?: boolean;
  }) => (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-medium text-[#0f2d1a] mb-1.5">
        <Icon size={14} className="text-[#1a7a3c]" />
        {label}
        {optional && <span className="text-[#4a7a5c] font-normal">(optional)</span>}
        {!optional && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={(data[field] as string) || ""}
        onChange={(e) => {
          onUpdate({ [field]: e.target.value });
          if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
        }}
        className={`w-full px-4 py-3 rounded-xl border-2 bg-[#f0faf4] outline-none transition-colors text-[#0f2d1a] placeholder:text-[#4a7a5c]/60 ${
          errors[field]
            ? "border-red-400 bg-red-50"
            : "border-[#e6f4ec] focus:border-[#22c55e]"
        }`}
      />
      {errors[field] && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <Info size={11} /> {errors[field]}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6f4ec] to-[#f0faf4] pb-10">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#15803d] to-[#1a7a3c] text-white px-6 pt-8 pb-14">
        <button onClick={onBack} className="flex items-center gap-1 text-green-200 text-sm mb-4 hover:text-white">
          <ChevronLeft size={16} /> Back
        </button>
        <h1 className="text-2xl font-bold">Your Details 👤</h1>
        <p className="text-green-100 text-sm mt-1">We need these to send your certificate</p>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-4 space-y-4">
          <InputField icon={User} label="Full Name" field="donorName" placeholder="Rahul Sharma" />
          <InputField icon={Mail} label="Email Address" field="email" type="email" placeholder="rahul@example.com" />
          <InputField icon={Phone} label="Phone Number" field="phone" type="tel" placeholder="9876543210" />
          <InputField icon={MapPin} label="Address" field="address" placeholder="123, MG Road, Bangalore" optional />
          <InputField
            icon={CreditCard}
            label="PAN Number"
            field="pan"
            placeholder="ABCDE1234F"
            optional
          />

          {/* 80G Checkbox */}
          <div
            className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              data.wants80G ? "border-[#22c55e] bg-[#f0fdf4]" : "border-[#e6f4ec] bg-[#f9fefb]"
            }`}
            onClick={() => onUpdate({ wants80G: !data.wants80G })}
          >
            <div
              className={`w-5 h-5 rounded flex items-center justify-center mt-0.5 transition-all flex-shrink-0 ${
                data.wants80G ? "bg-[#22c55e]" : "border-2 border-[#d4eddf]"
              }`}
            >
              {data.wants80G && (
                <svg viewBox="0 0 12 10" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="1,5 4,8 11,1" />
                </svg>
              )}
            </div>
            <div>
              <div className="font-medium text-[#0f2d1a] text-sm">I want 80G tax benefit</div>
              <div className="text-xs text-[#4a7a5c] mt-0.5">
                Save up to 50% tax on your donation. PAN required for certificate.
              </div>
            </div>
          </div>

          {data.wants80G && (
            <div className="bg-[#f0fdf4] border border-[#86efac] rounded-xl p-3 text-sm text-[#15803d]">
              📜 Your 80G certificate will be emailed within 24 hours of donation confirmation.
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#4a7a5c]">Planting</span>
            <span className="font-bold text-[#1a7a3c]">{data.trees} Tree{data.trees > 1 ? "s" : ""} • ₹{data.amount.toLocaleString("en-IN")}</span>
          </div>
          {data.location && (
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-[#4a7a5c]">Location</span>
              <span className="text-[#0f2d1a]">{data.location}</span>
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
    </div>
  );
}
