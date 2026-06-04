/* MARKER-MAKE-KIT-INVOKED */
import { useState, useEffect } from "react";
import { ProgressBar } from "./components/ProgressBar";
import { Step1Contribution } from "./components/Step1Contribution";
import { Step2DonorDetails } from "./components/Step2DonorDetails";
import { Step3GiftOption } from "./components/Step3GiftOption";
import { Step4Review } from "./components/Step4Review";
import { Step5Payment } from "./components/Step5Payment";
import { Step6Success } from "./components/Step6Success";
import { Dashboard } from "./components/Dashboard";
import type { DonationData } from "./types";

const STORAGE_KEY = "greenindia_donation_draft";
const DONATIONS_KEY = "greenindia_donations";

function generateId(prefix: string) {
  return prefix + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase();
}

function generateTreeIds(count: number) {
  return Array.from({ length: count }, (_, i) =>
    "TRE" + (Date.now() + i).toString(36).toUpperCase().slice(-5)
  );
}

const INITIAL_DATA: DonationData = {
  amount: 0,
  trees: 0,
  projectType: "trees",
  wants80G: true,
  isGift: false,
};

type Screen = "flow" | "dashboard";

export default function App() {
  const [screen, setScreen] = useState<Screen>("flow");
  const [step, setStep] = useState(1);
  const [data, setData] = useState<DonationData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...INITIAL_DATA, ...JSON.parse(saved) } : INITIAL_DATA;
    } catch {
      return INITIAL_DATA;
    }
  });
  const [donations, setDonations] = useState<DonationData[]>(() => {
    try {
      const saved = localStorage.getItem(DONATIONS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Auto-save draft
  useEffect(() => {
    if (step <= 4) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, step]);

  function updateData(partial: Partial<DonationData>) {
    setData(prev => ({ ...prev, ...partial }));
  }

  async function handlePaymentSuccess(
  txnId: string,
  paymentMethod: string
)  {
    const now = new Date();

const completed: DonationData = {
  ...data,
  transactionId: txnId,
  paymentMethod,
  donationId: generateId("DON"),
  treeIds: generateTreeIds(data.trees),
  paymentDate: now.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }),
};

try {
  await fetch("http://localhost:5000/api/donations/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: completed.email,
      transaction_id: completed.transactionId,
      donation_id: completed.donationId,
      payment_method: completed.paymentMethod,
      payment_status: "SUCCESS",
    }),
  });
} catch (err) {
  console.error("Update Error:", err);
}

setData(completed);

const updated = [completed, ...donations];
setDonations(updated);

localStorage.setItem(
  DONATIONS_KEY,
  JSON.stringify(updated)
);

localStorage.removeItem(STORAGE_KEY);

setStep(6);
}

  function handleNewDonation() {
    setData(INITIAL_DATA);
    setStep(1);
    setScreen("flow");
  }

  if (screen === "dashboard") {
    return <Dashboard donations={donations} onNewDonation={handleNewDonation} />;
  }

  if (step === 6) {
    return (
      <Step6Success
        data={data}
        onViewDashboard={() => setScreen("dashboard")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f0faf4]">
      {/* Top nav */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-[#e6f4ec] px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <button onClick={() => setScreen("dashboard")} className="text-[#1a7a3c] font-bold text-sm flex items-center gap-1.5">
          🌱 <span>GreenIndia</span>
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#4a7a5c] bg-[#e6f4ec] px-2 py-1 rounded-full">10,000+ trees planted</span>
          <button
            onClick={() => setScreen("dashboard")}
            className="text-xs text-[#1a7a3c] font-medium hover:underline"
          >
            My Trees
          </button>
        </div>
      </div>

      {/* Progress bar for steps 1-4 */}
      {step >= 1 && step <= 4 && <ProgressBar currentStep={step} />}

      {step === 1 && (
        <Step1Contribution
          data={data}
          onUpdate={updateData}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <Step2DonorDetails
          data={data}
          onUpdate={updateData}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <Step3GiftOption
          data={data}
          onUpdate={updateData}
          onNext={() => setStep(4)}
          onBack={() => setStep(2)}
        />
      )}
      {step === 4 && (
        <Step4Review
          data={data}
          onNext={() => setStep(5)}
          onBack={() => setStep(3)}
        />
      )}
      {step === 5 && (
        <Step5Payment
          data={data}
          onSuccess={handlePaymentSuccess}
          onBack={() => setStep(4)}
        />
      )}
    </div>
  );
}
