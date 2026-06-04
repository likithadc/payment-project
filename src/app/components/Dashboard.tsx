import { TreePine, MapPin, Calendar, QrCode, Download, Plus } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import type { DonationData } from "../types";

interface Props {
  donations: DonationData[];
  onNewDonation: () => void;
}

export function Dashboard({ donations, onNewDonation }: Props) {
  const totalTrees = donations.reduce((sum, d) => sum + d.trees, 0);
  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6f4ec] to-[#f0faf4] pb-10">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#15803d] to-[#1a7a3c] text-white px-6 pt-10 pb-16 text-center">
        <div className="text-5xl mb-2">🌲</div>
        <h1 className="text-2xl font-bold">My Forest Dashboard</h1>
        <p className="text-green-100 text-sm mt-1">Track your environmental impact</p>
        <div className="flex items-center justify-center gap-6 mt-5">
          <div className="text-center">
            <div className="text-3xl font-black">{totalTrees}</div>
            <div className="text-green-200 text-sm">Trees Planted</div>
          </div>
          <div className="w-px h-10 bg-white/30" />
          <div className="text-center">
            <div className="text-3xl font-black">₹{totalAmount.toLocaleString("en-IN")}</div>
            <div className="text-green-200 text-sm">Total Donated</div>
          </div>
          <div className="w-px h-10 bg-white/30" />
          <div className="text-center">
            <div className="text-3xl font-black">{donations.length}</div>
            <div className="text-green-200 text-sm">Donations</div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-8 relative z-10 space-y-4">
        {/* CO2 offset */}
        <div className="bg-white rounded-2xl shadow-xl p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#dcfce7] flex items-center justify-center text-2xl flex-shrink-0">
            🌍
          </div>
          <div>
            <div className="font-bold text-[#0f2d1a]">{(totalTrees * 22).toLocaleString()} kg CO₂</div>
            <div className="text-sm text-[#4a7a5c]">Estimated lifetime CO₂ offset</div>
            <div className="text-xs text-[#86efac] mt-0.5">≈ {totalTrees} trees × 22 kg/year</div>
          </div>
        </div>

        {/* Donation history */}
        {donations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
            <div className="text-5xl mb-3">🌱</div>
            <div className="font-semibold text-[#0f2d1a] mb-1">No donations yet</div>
            <div className="text-sm text-[#4a7a5c] mb-4">Start your green journey today</div>
          </div>
        ) : (
          donations.map((d, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-semibold text-[#0f2d1a] flex items-center gap-2">
                    <TreePine size={15} className="text-[#1a7a3c]" />
                    {d.trees} Tree{d.trees > 1 ? "s" : ""} Planted
                  </div>
                  <div className="text-[#4a7a5c] text-sm flex items-center gap-1 mt-0.5">
                    <MapPin size={12} /> {d.location || "India"}
                  </div>
                  <div className="text-[#4a7a5c] text-xs flex items-center gap-1 mt-0.5">
                    <Calendar size={12} /> {d.paymentDate}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#1a7a3c]">₹{d.amount.toLocaleString("en-IN")}</div>
                  <div className="text-xs font-mono text-[#4a7a5c] mt-0.5">{d.donationId}</div>
                  <span className="text-xs bg-[#dcfce7] text-[#16a34a] px-2 py-0.5 rounded-full font-medium mt-1 inline-block">
                    Active
                  </span>
                </div>
              </div>

              {/* Tree IDs */}
              <div className="flex flex-wrap gap-1 mb-3">
                {(d.treeIds || []).map(id => (
                  <span key={id} className="text-xs font-mono bg-[#f0fdf4] text-[#15803d] border border-[#86efac] px-1.5 py-0.5 rounded">
                    {id}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <QRCodeSVG
                  value={`https://greenindia.org/trees/${d.donationId}`}
                  size={50}
                  bgColor="#ffffff"
                  fgColor="#15803d"
                />
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 text-xs text-[#1a7a3c] border border-[#86efac] px-3 py-2 rounded-lg hover:bg-[#f0fdf4]">
                    <QrCode size={13} /> Track
                  </button>
                  <button className="flex items-center gap-1 text-xs text-[#1a7a3c] border border-[#86efac] px-3 py-2 rounded-lg hover:bg-[#f0fdf4]">
                    <Download size={13} /> Cert
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        <button
          onClick={onNewDonation}
          className="w-full py-4 rounded-2xl bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-300/40 active:scale-[0.98] transition-all"
        >
          <Plus size={20} /> Plant More Trees
        </button>
      </div>
    </div>
  );
}
