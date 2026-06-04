import { useState } from "react";
import { ChevronLeft, Smartphone, CreditCard, Landmark, CheckCircle2, Loader2 } from "lucide-react";
import type { DonationData } from "../types";

type PaymentMethod = "upi" | "card" | "netbanking";

interface Props {
  data: DonationData;
  onSuccess: (
    txnId: string,
    paymentMethod: string
  ) => void;
  onBack: () => void;
}

const UPI_APPS = [
  { name: "PhonePe", emoji: "💜" },
  { name: "GPay", emoji: "🔵" },
  { name: "Paytm", emoji: "💙" },
  { name: "BHIM", emoji: "🇮🇳" },
];

const BANKS = ["SBI", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Bank", "Yes Bank"];

export function Step5Payment({ data, onSuccess, onBack }: Props) {
  const [method, setMethod] = useState<PaymentMethod>("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [processing, setProcessing] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [step, setStep] = useState<"form" | "verify" | "done">("form");

  function formatCard(val: string) {
    return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  }

  function formatExpiry(val: string) {
    const clean = val.replace(/\D/g, "").slice(0, 4);
    return clean.length > 2 ? clean.slice(0, 2) + "/" + clean.slice(2) : clean;
  }

  function canPay() {
    if (method === "upi") return upiId.includes("@") || upiId.length >= 10;
    if (method === "card") return cardNum.replace(/\s/g, "").length === 16 && expiry.length === 5 && cvv.length === 3 && cardName.length > 2;
    if (method === "netbanking") return !!selectedBank;
    return false;
  }

  async function handlePay() {
    setProcessing(true);
    setStep("verify");
    await new Promise(r => setTimeout(r, 1800));
    setVerifying(true);
    await new Promise(r => setTimeout(r, 1500));
    setStep("done");
    await new Promise(r => setTimeout(r, 800));
    const txnId = "TXN" + Date.now().toString().slice(-8);
    onSuccess(txnId, method);
  }

  if (step === "verify" || step === "done") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#e6f4ec] to-[#f0faf4] flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-20 h-20 rounded-full bg-[#e6f4ec] flex items-center justify-center mx-auto mb-6">
            {step === "done" ? (
              <CheckCircle2 size={44} className="text-[#22c55e]" />
            ) : (
              <Loader2 size={44} className="text-[#22c55e] animate-spin" />
            )}
          </div>
          <h2 className="text-xl font-bold text-[#0f2d1a] mb-2">
            {step === "done" ? "Payment Confirmed!" : verifying ? "Verifying Payment..." : "Processing Payment..."}
          </h2>
          <p className="text-[#4a7a5c] text-sm">
            {step === "done" ? "Redirecting to success page..." : "Please do not close or refresh this page"}
          </p>
          <div className="mt-6 bg-white rounded-xl p-4 inline-block">
            <div className="text-[#0f2d1a] font-bold text-2xl">₹{data.amount.toLocaleString("en-IN")}</div>
            <div className="text-[#4a7a5c] text-sm">{data.trees} Tree{data.trees > 1 ? "s" : ""}</div>
          </div>
          {step !== "done" && (
            <div className="mt-6 flex justify-center gap-1">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full bg-[#22c55e] animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6f4ec] to-[#f0faf4] pb-10">
      <div className="bg-gradient-to-br from-[#15803d] to-[#1a7a3c] text-white px-6 pt-8 pb-14">
        <button onClick={onBack} className="flex items-center gap-1 text-green-200 text-sm mb-4 hover:text-white">
          <ChevronLeft size={16} /> Back
        </button>
        <h1 className="text-2xl font-bold">Complete Payment 💳</h1>
        <p className="text-green-100 text-sm mt-1">Powered by Razorpay • 100% Secure</p>
        <div className="mt-3 bg-white/20 rounded-xl p-3 inline-flex items-center gap-3">
          <span className="text-white/80 text-sm">Total:</span>
          <span className="text-white font-bold text-xl">₹{data.amount.toLocaleString("en-IN")}</span>
          <span className="text-white/70 text-sm">({data.trees} Tree{data.trees > 1 ? "s" : ""})</span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-8 relative z-10 space-y-4">
        {/* Payment Method Tabs */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex border-b border-[#e6f4ec]">
            {[
              { id: "upi" as const, label: "UPI", icon: Smartphone },
              { id: "card" as const, label: "Card", icon: CreditCard },
              { id: "netbanking" as const, label: "Net Banking", icon: Landmark },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setMethod(id)}
                className={`flex-1 py-3.5 text-sm font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                  method === id
                    ? "border-[#22c55e] text-[#1a7a3c] bg-[#f0fdf4]"
                    : "border-transparent text-[#4a7a5c] hover:bg-[#f9fefb]"
                }`}
              >
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* UPI */}
            {method === "upi" && (
              <div>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {UPI_APPS.map(app => (
                    <button
                      key={app.name}
                      onClick={() => setUpiId("")}
                      className="flex flex-col items-center gap-1 py-3 rounded-xl border-2 border-[#e6f4ec] hover:border-[#86efac] transition-all"
                    >
                      <span className="text-2xl">{app.emoji}</span>
                      <span className="text-xs text-[#4a7a5c]">{app.name}</span>
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter UPI ID (e.g. name@paytm)"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#e6f4ec] focus:border-[#22c55e] bg-[#f0faf4] outline-none text-[#0f2d1a]"
                  />
                </div>
                <p className="text-xs text-[#4a7a5c] mt-2">Enter your UPI ID or scan QR from any payment app</p>
              </div>
            )}

            {/* Card */}
            {method === "card" && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-[#4a7a5c] mb-1 block">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNum}
                    onChange={e => setCardNum(formatCard(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#e6f4ec] focus:border-[#22c55e] bg-[#f0faf4] outline-none text-[#0f2d1a] font-mono tracking-wider"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#4a7a5c] mb-1 block">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={e => setExpiry(formatExpiry(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#e6f4ec] focus:border-[#22c55e] bg-[#f0faf4] outline-none text-[#0f2d1a]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#4a7a5c] mb-1 block">CVV</label>
                    <input
                      type="password"
                      placeholder="•••"
                      value={cvv}
                      onChange={e => setCvv(e.target.value.slice(0, 3))}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#e6f4ec] focus:border-[#22c55e] bg-[#f0faf4] outline-none text-[#0f2d1a]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#4a7a5c] mb-1 block">Name on Card</label>
                  <input
                    type="text"
                    placeholder="RAHUL SHARMA"
                    value={cardName}
                    onChange={e => setCardName(e.target.value.toUpperCase())}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#e6f4ec] focus:border-[#22c55e] bg-[#f0faf4] outline-none text-[#0f2d1a] tracking-widest"
                  />
                </div>
              </div>
            )}

            {/* Net Banking */}
            {method === "netbanking" && (
              <div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {BANKS.map(bank => (
                    <button
                      key={bank}
                      onClick={() => setSelectedBank(bank)}
                      className={`py-3 px-3 rounded-xl border-2 text-sm font-medium transition-all text-left ${
                        selectedBank === bank
                          ? "border-[#22c55e] bg-[#f0fdf4] text-[#1a7a3c]"
                          : "border-[#e6f4ec] text-[#4a7a5c] hover:border-[#86efac]"
                      }`}
                    >
                      🏦 {bank}
                    </button>
                  ))}
                </div>
                <select
                  value={selectedBank}
                  onChange={e => setSelectedBank(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#e6f4ec] focus:border-[#22c55e] bg-[#f0faf4] outline-none text-[#0f2d1a]"
                >
                  <option value="">Other Banks...</option>
                  {["Punjab National Bank", "Bank of Baroda", "Canara Bank", "Union Bank", "Indian Bank"].map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Donor summary */}
        <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-[#0f2d1a]">{data.donorName}</div>
            <div className="text-xs text-[#4a7a5c]">{data.email}</div>
          </div>
          <div className="text-right">
            <div className="font-bold text-[#1a7a3c]">₹{data.amount.toLocaleString("en-IN")}</div>
            <div className="text-xs text-[#4a7a5c]">{data.trees} Tree{data.trees > 1 ? "s" : ""}</div>
          </div>
        </div>

        <button
          onClick={handlePay}
          disabled={!canPay() || processing}
          className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
            canPay() && !processing
              ? "bg-[#22c55e] hover:bg-[#16a34a] text-white shadow-lg shadow-green-300/40 active:scale-[0.98]"
              : "bg-[#d4eddf] text-[#4a7a5c] cursor-not-allowed"
          }`}
        >
          {processing ? <Loader2 size={20} className="animate-spin" /> : "🔒"}
          Pay ₹{data.amount.toLocaleString("en-IN")} Securely
        </button>

        <div className="flex items-center justify-center gap-4 text-xs text-[#4a7a5c]">
          <span>🔒 SSL Secured</span>
          <span>🏦 Razorpay</span>
          <span>📜 80G Valid</span>
        </div>
      </div>
    </div>
  );
}
