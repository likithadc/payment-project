import { QRCodeCanvas } from "qrcode.react";

interface Props {
  amount: number;
  onSuccess: () => void;
}

export function UPIPayment({ amount, onSuccess }: Props) {
  const upiId = "yourupi@okaxis"; // 🔥 change this
  const name = "Tree Donation";

  const upiLink = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR`;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md text-center">
      <h2 className="text-xl font-bold mb-4">Pay via UPI</h2>

      {/* QR Code */}
      <div className="flex justify-center mb-4">
        <QRCodeCanvas value={upiLink} size={200} />
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Scan this QR using any UPI app
      </p>

      {/* UPI Button */}
      <a
        href={upiLink}
        className="block bg-green-600 text-white py-3 rounded-lg font-semibold mb-3"
      >
        Pay ₹{amount} via UPI
      </a>

      {/* Demo confirm */}
      <button
        onClick={onSuccess}
        className="w-full border border-gray-300 py-2 rounded-lg"
      >
        I have completed payment
      </button>
    </div>
  );
}