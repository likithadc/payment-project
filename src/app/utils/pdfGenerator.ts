import jsPDF from "jspdf";
import type { DonationData } from "../types";

function addGreenHeader(doc: jsPDF, title: string) {
  doc.setFillColor(21, 128, 61);
  doc.rect(0, 0, 210, 40, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("🌱 GreenIndia Foundation", 105, 18, { align: "center" });
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(title, 105, 30, { align: "center" });
  doc.setTextColor(74, 122, 92);
  doc.setFontSize(9);
  doc.text("Reg No: NGO/KA/2019/00123  |  80G: AAACG1234C  |  12A: AAACG5678A", 105, 48, { align: "center" });
}

function addRow(doc: jsPDF, y: number, label: string, value: string) {
  doc.setFont("helvetica", "bold");
  doc.setTextColor(74, 122, 92);
  doc.setFontSize(10);
  doc.text(label, 20, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(15, 45, 26);
  doc.text(value, 85, y);
  doc.setDrawColor(214, 237, 223);
  doc.line(20, y + 3, 190, y + 3);
}

export function generateReceiptPDF(data: DonationData) {
  const doc = new jsPDF();

  addGreenHeader(doc, "DONATION RECEIPT");

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(21, 128, 61);
  doc.text("Payment Receipt", 105, 62, { align: "center" });

  let y = 75;
  addRow(doc, y, "Donor Name", data.donorName || "");
  addRow(doc, (y += 12), "Email", data.email || "");
  addRow(doc, (y += 12), "Phone", data.phone || "");
  if (data.address) addRow(doc, (y += 12), "Address", data.address);
  if (data.pan) addRow(doc, (y += 12), "PAN Number", data.pan);
  addRow(doc, (y += 12), "Trees Planted", `${data.trees} Tree${data.trees > 1 ? "s" : ""}`);
  addRow(doc, (y += 12), "Amount Paid", `INR ${data.amount.toLocaleString("en-IN")} /-`);
  addRow(doc, (y += 12), "Transaction ID", data.transactionId || "");
  addRow(doc, (y += 12), "Donation ID", data.donationId || "");
  addRow(doc, (y += 12), "Date", data.paymentDate || "");
  if (data.location) addRow(doc, (y += 12), "Location", data.location);
  if (data.wants80G) addRow(doc, (y += 12), "80G Eligible", "Yes — Certificate will be emailed within 24hrs");

  // 80G Box
  if (data.wants80G) {
    y += 18;
    doc.setFillColor(240, 250, 244);
    doc.roundedRect(20, y, 170, 22, 4, 4, "F");
    doc.setTextColor(21, 128, 61);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("80G Tax Benefit", 30, y + 8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(74, 122, 92);
    doc.text("50% of this donation (INR " + (data.amount / 2).toLocaleString("en-IN") + ") is deductible under Section 80G.", 30, y + 16);
  }

  // Footer
  doc.setFillColor(240, 250, 244);
  doc.rect(0, 272, 210, 25, "F");
  doc.setTextColor(74, 122, 92);
  doc.setFontSize(8);
  doc.text("This is a computer-generated receipt. No signature required.", 105, 280, { align: "center" });
  doc.text("GreenIndia Foundation | info@greenindia.org | +91 98765 43210 | greenindia.org", 105, 287, { align: "center" });

  doc.save(`GreenIndia_Receipt_${data.transactionId}.pdf`);
}

export function generateCertificatePDF(data: DonationData) {
  const doc = new jsPDF({ orientation: "landscape" });

  // Background
  doc.setFillColor(240, 250, 244);
  doc.rect(0, 0, 297, 210, "F");

  // Border
  doc.setDrawColor(21, 128, 61);
  doc.setLineWidth(3);
  doc.rect(10, 10, 277, 190);
  doc.setLineWidth(1);
  doc.setDrawColor(134, 239, 172);
  doc.rect(13, 13, 271, 184);

  // Header
  doc.setFillColor(21, 128, 61);
  doc.rect(10, 10, 277, 50, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("TREE PLANTATION CERTIFICATE", 148.5, 33, { align: "center" });
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("GreenIndia Foundation — Planting a Greener Tomorrow", 148.5, 48, { align: "center" });

  // Body
  doc.setTextColor(15, 45, 26);
  doc.setFontSize(13);
  doc.setFont("helvetica", "normal");
  doc.text("This is to certify that", 148.5, 80, { align: "center" });

  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(21, 128, 61);
  doc.text(data.isGift ? (data.recipientName || "") : (data.donorName || ""), 148.5, 96, { align: "center" });

  doc.setFontSize(13);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(15, 45, 26);
  doc.text("has contributed to planting", 148.5, 110, { align: "center" });

  doc.setFontSize(36);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(22, 197, 94);
  doc.text(`${data.trees} Tree${data.trees > 1 ? "s" : ""}`, 148.5, 130, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(74, 122, 92);
  doc.text(`Location: ${data.location || "India"}  |  Date: ${data.paymentDate}  |  ID: ${data.donationId}`, 148.5, 144, { align: "center" });

  if (data.isGift && data.donorName) {
    doc.setFontSize(10);
    doc.text(`Gifted by: ${data.donorName}`, 148.5, 155, { align: "center" });
  }

  // Tree IDs
  if (data.treeIds && data.treeIds.length > 0) {
    doc.setFontSize(9);
    doc.setTextColor(134, 239, 172);
    doc.text("Tree IDs: " + data.treeIds.join("  •  "), 148.5, 162, { align: "center" });
  }

  // Footer
  doc.setFillColor(21, 128, 61);
  doc.rect(10, 180, 277, 20, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text("GreenIndia Foundation  |  Reg: NGO/KA/2019/00123  |  greenindia.org  |  Scan QR to track your trees", 148.5, 193, { align: "center" });

  doc.save(`GreenIndia_Certificate_${data.donationId}.pdf`);
}
