import { useEffect, useRef, useState } from "react";
import { Download, Share2, MapPin, CheckCircle2, TreePine, Mail, ExternalLink } from "lucide-react";
import confetti from "canvas-confetti";
import { QRCodeSVG } from "qrcode.react";
import { generateReceiptPDF, generateCertificatePDF } from "../utils/pdfGenerator";
import type { DonationData } from "../types";

interface Props {
  data: DonationData;
  onViewDashboard: () => void;
}

export function Step6Success({ data, onViewDashboard }: Props) {
  const [activeTab, setActiveTab] = useState<"receipt" | "certificate">("receipt");
  const confettiFired = useRef(false);

  useEffect(() => {
    if (confettiFired.current) return;
    confettiFired.current = true;
    const end = Date.now() + 3000;
    const colors = ["#22c55e", "#16a34a", "#86efac", "#4ade80", "#ffffff"];
    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  function handleShare() {
    const text = `🌱 I just planted ${data.trees} tree${data.trees > 1 ? "s" : ""} with GreenIndia! Join me in making our planet greener. #PlantTrees #GreenIndia`;
    if (navigator.share) {
      navigator.share({ title: "I planted trees!", text });
    } else {
      navigator.clipboard.writeText(text);
      alert("Share text copied to clipboard!");
    }
  }

  const dashboardUrl = `https://greenindia.org/trees/${data.donationId}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#dcfce7] to-[#f0faf4] pb-10">
      {/* Hero Success */}
      <div className="bg-gradient-to-br from-[#15803d] to-[#166534] text-white px-6 pt-10 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${(i * 13) % 100}%`,
                top: `${(i * 17) % 80}%`,
                fontSize: `${16 + (i % 3) * 8}px`,
                animationDelay: `${(i * 0.15) % 1}s`,
                animationDuration: `${2 + (i % 3)}s`,
                opacity: 0.2,
              }}
            >
              🌳
            </div>
          ))}
        </div>
        <div className="relative z-10">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={44} className="text-[#86efac]" />
          </div>
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm mb-4">
            ✅ Payment Successful
          </div>
          <h1 className="text-3xl font-bold mb-2">Thank You! 🙏</h1>
          <div className="text-5xl font-black mb-2">
            🌱 {data.trees} Tree{data.trees > 1 ? "s" : ""}
          </div>
          <p className="text-green-100 text-base max-w-xs mx-auto">
            Your trees will soon be planted and tracked.
          </p>
          <p className="text-green-200 text-sm mt-2 italic">
            "One tree planted today, a forest tomorrow."
          </p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-10 relative z-10 space-y-4">
        {/* Transaction Card */}
        <div className="bg-white rounded-2xl shadow-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold text-[#0f2d1a]">Transaction Details</div>
            <span className="bg-[#dcfce7] text-[#16a34a] text-xs font-bold px-2 py-1 rounded-full">SUCCESS</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#4a7a5c]">Transaction ID</span>
              <span className="font-mono font-medium text-[#0f2d1a]">{data.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4a7a5c]">Amount Paid</span>
              <span className="font-bold text-[#1a7a3c]">₹{data.amount.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4a7a5c]">Date</span>
              <span className="text-[#0f2d1a]">{data.paymentDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4a7a5c]">Donation ID</span>
              <span className="font-mono text-[#0f2d1a]">{data.donationId}</span>
            </div>
            {data.wants80G && (
              <div className="flex justify-between">
                <span className="text-[#4a7a5c]">80G Certificate</span>
                <span className="text-[#1a7a3c] font-medium">Will be emailed</span>
              </div>
            )}
          </div>
        </div>

        {/* Tree IDs */}
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <h3 className="font-semibold text-[#0f2d1a] flex items-center gap-2 mb-3">
            <TreePine size={16} className="text-[#1a7a3c]" /> Your Trees
          </h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {(data.treeIds || []).map(id => (
              <span key={id} className="bg-[#dcfce7] text-[#15803d] text-xs font-mono px-2 py-1 rounded-lg border border-[#86efac]">
                {id}
              </span>
            ))}
          </div>
          {data.location && (
            <div className="flex items-center gap-2 text-sm text-[#4a7a5c]">
              <MapPin size={13} className="text-[#1a7a3c]" /> {data.location}
            </div>
          )}
          <div className="mt-3 flex justify-center">
            <QRCodeSVG
              value={dashboardUrl}
              size={80}
              bgColor="#ffffff"
              fgColor="#15803d"
              level="M"
            />
          </div>
          <p className="text-center text-xs text-[#4a7a5c] mt-2">Scan to track your trees</p>
        </div>

        {/* Gift info */}
        {data.isGift && (
          <div className="bg-gradient-to-r from-[#f0fdf4] to-[#dcfce7] rounded-2xl border-2 border-[#86efac] p-4">
            <div className="font-medium text-[#0f2d1a] mb-1">🎁 Gift Certificate Sent!</div>
            <div className="text-sm text-[#4a7a5c]">
              A special tree certificate has been sent to <span className="text-[#1a7a3c] font-medium">{data.recipientEmail}</span>
            </div>
          </div>
        )}

        {/* Email confirmation */}
        <div className="bg-[#f0fdf4] rounded-xl border border-[#86efac] p-4 flex items-start gap-3">
          <Mail size={18} className="text-[#1a7a3c] flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-[#0f2d1a]">Confirmation sent to {data.email}</div>
            <div className="text-xs text-[#4a7a5c] mt-0.5">Receipt + Tree Certificate attached</div>
          </div>
        </div>

        {/* Document Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex border-b border-[#e6f4ec]">
            <button
              onClick={() => setActiveTab("receipt")}
              className={`flex-1 py-3 text-sm font-semibold transition-all ${activeTab === "receipt" ? "border-b-2 border-[#22c55e] text-[#1a7a3c] bg-[#f0fdf4]" : "text-[#4a7a5c]"}`}
            >
              📄 Receipt
            </button>
            <button
              onClick={() => setActiveTab("certificate")}
              className={`flex-1 py-3 text-sm font-semibold transition-all ${activeTab === "certificate" ? "border-b-2 border-[#22c55e] text-[#1a7a3c] bg-[#f0fdf4]" : "text-[#4a7a5c]"}`}
            >
              🌳 Certificate
            </button>
          </div>

          {activeTab === "receipt" && (
            <div className="p-5">
              <div className="bg-[#f0faf4] rounded-xl p-4 font-mono text-xs text-[#0f2d1a] space-y-1 mb-4">
                <div className="text-center font-bold text-sm mb-2">GreenIndia Foundation</div>
                <div className="text-center text-[#4a7a5c] mb-3">Reg No: NGO/KA/2019/00123 | 80G: AAACG1234C</div>
                <div className="border-t border-dashed border-[#d4eddf] pt-2">
                  <div className="flex justify-between"><span>Donor:</span><span>{data.donorName}</span></div>
                  <div className="flex justify-between"><span>Amount:</span><span>₹{data.amount.toLocaleString("en-IN")}</span></div>
                  <div className="flex justify-between"><span>Trees:</span><span>{data.trees}</span></div>
                  <div className="flex justify-between"><span>Date:</span><span>{data.paymentDate}</span></div>
                  <div className="flex justify-between"><span>TXN:</span><span>{data.transactionId}</span></div>
                  {data.wants80G && <div className="flex justify-between"><span>80G:</span><span>Eligible ✓</span></div>}
                </div>
              </div>
              <button
                onClick={() => generateReceiptPDF(data)}
                className="w-full py-3 rounded-xl bg-[#1a7a3c] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#15803d] active:scale-[0.98] transition-all"
              >
                <Download size={16} /> Download Receipt PDF
              </button>
            </div>
          )}

          {activeTab === "certificate" && (
            <div className="p-5">
              <div className="bg-gradient-to-br from-[#15803d] to-[#166534] rounded-xl p-5 text-white text-center mb-4">
                <div className="text-3xl mb-2">🌳</div>
                <div className="text-xs opacity-70 uppercase tracking-widest mb-1">Tree Plantation Certificate</div>
                <div className="text-lg font-bold">{data.isGift ? data.recipientName : data.donorName}</div>
                <div className="text-sm opacity-80 mt-1">has contributed to planting</div>
                <div className="text-3xl font-black my-2">{data.trees} Tree{data.trees > 1 ? "s" : ""}</div>
                <div className="text-sm opacity-80">{data.location || "India"} • {data.paymentDate}</div>
                <div className="flex justify-center mt-3">
                  <QRCodeSVG value={dashboardUrl} size={60} bgColor="transparent" fgColor="#86efac" />
                </div>
                <div className="text-xs opacity-60 mt-1 font-mono">{data.donationId}</div>
              </div>
              <button
                onClick={() => generateCertificatePDF(data)}
                className="w-full py-3 rounded-xl bg-[#1a7a3c] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#15803d] active:scale-[0.98] transition-all"
              >
                <Download size={16} /> Download Certificate PDF
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onViewDashboard}
            className="py-4 rounded-2xl bg-[#1a7a3c] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#15803d] transition-all"
          >
            <MapPin size={16} /> View My Trees
          </button>
          <button
            onClick={handleShare}
            className="py-4 rounded-2xl border-2 border-[#22c55e] text-[#1a7a3c] font-semibold flex items-center justify-center gap-2 hover:bg-[#f0fdf4] transition-all"
          >
            <Share2 size={16} /> Share Impact
          </button>
        </div>

        <button
          onClick={onViewDashboard}
          className="w-full py-3 rounded-xl border border-[#d4eddf] text-[#4a7a5c] text-sm flex items-center justify-center gap-2 hover:bg-white transition-all"
        >
          <ExternalLink size={14} /> Plant More Trees
        </button>
      </div>
    </div>
  );
}
