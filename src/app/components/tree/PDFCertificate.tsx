import { jsPDF } from 'jspdf';

interface CertificateData {
  treeId: string;
  donorName: string;
  numberOfTrees: number;
  treeName: string;
  location: string;
  date: string;
  transactionId: string;
}

interface ReceiptData {
  donorName: string;
  amount: number;
  date: string;
  transactionId: string;
  numberOfTrees: number;
  treeName: string;
  email: string;
  phone: string;
}

export const generateCertificatePDF = (data: CertificateData) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Background gradient effect (using rectangles)
  doc.setFillColor(232, 245, 233); // #E8F5E9
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Border
  doc.setDrawColor(44, 95, 45); // #2C5F2D
  doc.setLineWidth(3);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  doc.setLineWidth(0.5);
  doc.setDrawColor(76, 175, 80); // #4CAF50
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

  // Corner decorations
  const cornerSize = 15;
  doc.setLineWidth(1);
  doc.setDrawColor(76, 175, 80);

  // Top-left corner
  doc.line(15, 15, 15 + cornerSize, 15);
  doc.line(15, 15, 15, 15 + cornerSize);

  // Top-right corner
  doc.line(pageWidth - 15 - cornerSize, 15, pageWidth - 15, 15);
  doc.line(pageWidth - 15, 15, pageWidth - 15, 15 + cornerSize);

  // Bottom-left corner
  doc.line(15, pageHeight - 15, 15 + cornerSize, pageHeight - 15);
  doc.line(15, pageHeight - 15 - cornerSize, 15, pageHeight - 15);

  // Bottom-right corner
  doc.line(pageWidth - 15 - cornerSize, pageHeight - 15, pageWidth - 15, pageHeight - 15);
  doc.line(pageWidth - 15, pageHeight - 15 - cornerSize, pageWidth - 15, pageHeight - 15);

  // Logo and header
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(44, 95, 45);
  doc.text('EcoTree', pageWidth / 2, 30, { align: 'center' });

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('EVERY IMPACT, VERIFIED.', pageWidth / 2, 38, { align: 'center' });

  // Certificate title
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(44, 95, 45);
  doc.text('CERTIFICATE OF TREE PLANTATION', pageWidth / 2, 52, { align: 'center' });

  // Decorative line
  doc.setDrawColor(76, 175, 80);
  doc.setLineWidth(0.5);
  doc.line(60, 55, pageWidth - 60, 55);

  // Content
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text('This is to certify that', pageWidth / 2, 75, { align: 'center' });

  // Donor name - highlighted
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(44, 95, 45);
  doc.text(data.donorName, pageWidth / 2, 88, { align: 'center' });

  // Underline for name
  const nameWidth = doc.getTextWidth(data.donorName);
  doc.setDrawColor(76, 175, 80);
  doc.setLineWidth(0.8);
  doc.line((pageWidth - nameWidth) / 2, 90, (pageWidth + nameWidth) / 2, 90);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text('has contributed to environmental conservation by planting', pageWidth / 2, 100, { align: 'center' });

  // Details box
  const boxY = 108;
  const boxHeight = 28;
  doc.setFillColor(27, 67, 50); // #1B4332
  doc.roundedRect(40, boxY, pageWidth - 80, boxHeight, 3, 3, 'F');

  doc.setFontSize(9);
  doc.setTextColor(180, 180, 180);
  const col1X = 70;
  const col2X = 120;
  const col3X = 170;
  const col4X = 220;

  doc.text('NUMBER OF TREES', col1X, boxY + 8, { align: 'center' });
  doc.text('TREE SPECIES', col2X, boxY + 8, { align: 'center' });
  doc.text('LOCATION', col3X, boxY + 8, { align: 'center' });
  doc.text('DATE', col4X, boxY + 8, { align: 'center' });

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(String(data.numberOfTrees), col1X, boxY + 20, { align: 'center' });
  doc.text(data.treeName, col2X, boxY + 20, { align: 'center' });
  doc.text(data.location, col3X, boxY + 20, { align: 'center' });
  doc.text(data.date, col4X, boxY + 20, { align: 'center' });

  // Tree ID box
  const treeIdY = 145;
  doc.setFillColor(44, 95, 45);
  doc.roundedRect(80, treeIdY, pageWidth - 160, 18, 2, 2, 'F');

  doc.setFontSize(9);
  doc.setTextColor(200, 200, 200);
  doc.text('UNIQUE TREE ID', pageWidth / 2, treeIdY + 6, { align: 'center' });

  doc.setFontSize(14);
  doc.setFont('courier', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(data.treeId, pageWidth / 2, treeIdY + 14, { align: 'center' });

  // Description
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(80, 80, 80);
  const descLine1 = 'This tree is GPS-tagged, AI-verified, and will be tracked for 3 years.';
  const descLine2 = 'Monthly photo updates available on your personal dashboard.';
  doc.text(descLine1, pageWidth / 2, 170, { align: 'center' });
  doc.text(descLine2, pageWidth / 2, 176, { align: 'center' });

  // Signature section
  const sigY = pageHeight - 35;
  doc.setLineWidth(0.5);
  doc.setDrawColor(44, 95, 45);

  // Left signature
  doc.line(50, sigY, 90, sigY);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(44, 95, 45);
  doc.text('Authorized Signature', 70, sigY + 5, { align: 'center' });
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('EcoTree Foundation', 70, sigY + 10, { align: 'center' });

  // Right signature
  doc.line(pageWidth - 90, sigY, pageWidth - 50, sigY);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(44, 95, 45);
  doc.text('Date of Issue', pageWidth - 70, sigY + 5, { align: 'center' });
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(data.date, pageWidth - 70, sigY + 10, { align: 'center' });

  // Footer
  doc.setFontSize(7);
  doc.setTextColor(120, 120, 120);
  const footer1 = 'SECTION 8 COMPANY • 12A REGISTERED • 80G APPROVED • NGO DARPAN CERTIFIED';
  const footer2 = 'Registration No: U85100KA2020NPL000000 | 80G Registration: AABCE1234F';
  doc.text(footer1, pageWidth / 2, pageHeight - 12, { align: 'center' });
  doc.text(footer2, pageWidth / 2, pageHeight - 8, { align: 'center' });

  // QR Code placeholder
  doc.setFillColor(240, 240, 240);
  doc.setDrawColor(44, 95, 45);
  doc.setLineWidth(1);
  doc.roundedRect(pageWidth - 40, 50, 25, 25, 2, 2, 'FD');
  doc.setFontSize(6);
  doc.setTextColor(100, 100, 100);
  doc.text('SCAN', pageWidth - 27.5, 60, { align: 'center' });
  doc.text('TO', pageWidth - 27.5, 64, { align: 'center' });
  doc.text('TRACK', pageWidth - 27.5, 68, { align: 'center' });

  // Save the PDF
  doc.save(`EcoTree_Certificate_${data.treeId}.pdf`);
};

export const generateReceiptPDF = (data: ReceiptData) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  // Header
  doc.setFillColor(27, 67, 50);
  doc.rect(0, 0, pageWidth, 50, 'F');

  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('EcoTree Foundation', pageWidth / 2, 25, { align: 'center' });

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('EVERY IMPACT, VERIFIED.', pageWidth / 2, 32, { align: 'center' });

  doc.setFontSize(9);
  doc.text('123 Green Street, Bangalore - 560001', pageWidth / 2, 39, { align: 'center' });
  doc.text('Email: donate@ecotree.org | Phone: +91 80 1234 5678', pageWidth / 2, 44, { align: 'center' });

  y = 60;

  // Receipt title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(44, 95, 45);
  doc.text('🧾 DONATION RECEIPT', pageWidth / 2, y, { align: 'center' });

  y += 15;

  // Tax benefit notice
  doc.setFillColor(255, 249, 196);
  doc.setDrawColor(251, 192, 45);
  doc.setLineWidth(0.5);
  doc.roundedRect(15, y, pageWidth - 30, 18, 2, 2, 'FD');

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text('80G Tax Benefit:', 20, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const taxText = 'This donation is eligible for tax deduction under Section 80G.';
  const taxText2 = 'You can claim up to 80 percent of the donated amount.';
  doc.text(taxText, 20, y + 12);
  doc.text(taxText2, 20, y + 16);

  y += 25;

  // Details table
  const leftMargin = 20;
  const rightMargin = pageWidth - 20;
  const lineHeight = 8;

  const addRow = (label: string, value: string, bold = false) => {
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text(label, leftMargin, y);

    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.text(value, rightMargin, y, { align: 'right' });

    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(0.3);
    doc.line(leftMargin, y + 2, rightMargin, y + 2);

    y += lineHeight;
  };

  addRow('Receipt Date:', data.date);
  addRow('Transaction ID:', data.transactionId);
  addRow('Donor Name:', data.donorName);
  addRow('Email:', data.email);
  addRow('Phone:', data.phone);

  y += 5;
  addRow('Number of Trees:', String(data.numberOfTrees));
  addRow('Tree Type:', data.treeName);
  addRow('Planting Location:', 'Bangalore, Karnataka');

  y += 5;

  // Total amount - highlighted
  doc.setFillColor(232, 245, 233);
  doc.roundedRect(leftMargin - 5, y - 5, rightMargin - leftMargin + 10, 12, 2, 2, 'F');

  doc.setFontSize(12);
  doc.setTextColor(44, 95, 45);
  doc.setFont('helvetica', 'bold');
  doc.text('Total Amount Paid:', leftMargin, y + 3);
  doc.text(`₹${data.amount.toLocaleString()}`, rightMargin, y + 3, { align: 'right' });

  y += 20;

  // Thank you message
  doc.setFontSize(12);
  doc.setTextColor(44, 95, 45);
  doc.setFont('helvetica', 'italic');
  doc.text('🌱 Thank you for contributing to a greener planet! 🌍', pageWidth / 2, y, { align: 'center' });

  y += 15;

  // What's next box
  doc.setFillColor(249, 249, 249);
  doc.roundedRect(15, y, pageWidth - 30, 35, 2, 2, 'F');

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(44, 95, 45);
  doc.text("What's Next?", 20, y + 8);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text('• Your tree will be planted within 7 days', 20, y + 15);
  doc.text('• GPS coordinates will be assigned and shared', 20, y + 20);
  doc.text('• AI verification will confirm planting', 20, y + 25);
  doc.text('• Monthly updates for 3 years on your dashboard', 20, y + 30);

  y += 45;

  // Footer
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(15, y, pageWidth - 15, y);

  y += 8;

  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.setFont('helvetica', 'bold');
  doc.text('EcoTree Foundation', pageWidth / 2, y, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  y += 4;
  doc.text('Section 8 Company | CIN: U85100KA2020NPL000000', pageWidth / 2, y, { align: 'center' });
  y += 3.5;
  doc.text('12A Registration No: AABCE1234F | 80G Registration No: AABCE1234F/2020', pageWidth / 2, y, { align: 'center' });
  y += 3.5;
  doc.text('NGO Darpan ID: KA/2020/0123456', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.text('This is a computer-generated receipt and does not require a signature.', pageWidth / 2, y, { align: 'center' });
  y += 3.5;
  doc.text('For queries, contact: support@ecotree.org', pageWidth / 2, y, { align: 'center' });

  // Save the PDF
  doc.save(`EcoTree_Receipt_${data.transactionId}.pdf`);
};
