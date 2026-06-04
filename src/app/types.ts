export interface DonationData {
  // Step 1
  amount: number;
  trees: number;
  location?: string;
  projectType?: "trees" | "water" | "waste";

  // Step 2
  donorName?: string;
  email?: string;
  phone?: string;
  address?: string;
  pan?: string;
  wants80G?: boolean;

  // Step 3
  isGift?: boolean;
  recipientName?: string;
  recipientEmail?: string;
  giftMessage?: string;
  occasion?: string;
  deliveryDate?: string;

  // Post-payment
  transactionId?: string;
  donationId?: string;
  treeIds?: string[];
  paymentDate?: string;
}
