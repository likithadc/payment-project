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
  // Create certificate HTML
  const certificateHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Georgia', serif;
          padding: 40px;
          background: linear-gradient(135deg, #E8F5E9 0%, #ffffff 100%);
        }
        .certificate {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border: 10px solid #2C5F2D;
          border-radius: 20px;
          padding: 60px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
          position: relative;
        }
        .corner-decoration {
          position: absolute;
          width: 80px;
          height: 80px;
          border: 4px solid #4CAF50;
        }
        .top-left { top: 20px; left: 20px; border-right: none; border-bottom: none; }
        .top-right { top: 20px; right: 20px; border-left: none; border-bottom: none; }
        .bottom-left { bottom: 20px; left: 20px; border-right: none; border-top: none; }
        .bottom-right { bottom: 20px; right: 20px; border-left: none; border-top: none; }
        .header {
          text-align: center;
          margin-bottom: 40px;
        }
        .logo { font-size: 48px; margin-bottom: 10px; }
        .org-name {
          font-size: 32px;
          color: #2C5F2D;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .tagline {
          font-size: 12px;
          color: #666;
          letter-spacing: 3px;
          text-transform: uppercase;
        }
        .title {
          text-align: center;
          font-size: 36px;
          color: #2C5F2D;
          margin: 30px 0;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .content {
          text-align: center;
          font-size: 18px;
          line-height: 1.8;
          color: #333;
          margin: 30px 0;
        }
        .donor-name {
          font-size: 32px;
          color: #2C5F2D;
          font-weight: bold;
          margin: 20px 0;
          text-decoration: underline;
          text-decoration-color: #4CAF50;
        }
        .details {
          display: flex;
          justify-content: space-around;
          margin: 40px 0;
          padding: 30px;
          background: #E8F5E9;
          border-radius: 15px;
        }
        .detail-item {
          text-align: center;
        }
        .detail-label {
          font-size: 12px;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        .detail-value {
          font-size: 20px;
          color: #2C5F2D;
          font-weight: bold;
        }
        .tree-id {
          text-align: center;
          margin: 30px 0;
          padding: 20px;
          background: #1B4332;
          color: white;
          border-radius: 10px;
        }
        .tree-id-label {
          font-size: 14px;
          margin-bottom: 8px;
        }
        .tree-id-value {
          font-size: 24px;
          font-family: 'Courier New', monospace;
          letter-spacing: 2px;
          font-weight: bold;
        }
        .qr-placeholder {
          width: 120px;
          height: 120px;
          background: #f0f0f0;
          margin: 20px auto;
          border: 2px solid #2C5F2D;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: #666;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #2C5F2D;
        }
        .registration {
          font-size: 10px;
          color: #666;
          margin-top: 10px;
        }
        .signature-section {
          display: flex;
          justify-content: space-between;
          margin-top: 50px;
        }
        .signature {
          text-align: center;
          flex: 1;
        }
        .signature-line {
          border-top: 2px solid #333;
          margin: 40px 20px 10px 20px;
        }
        .signature-name {
          font-weight: bold;
          color: #2C5F2D;
        }
      </style>
    </head>
    <body>
      <div class="certificate">
        <div class="corner-decoration top-left"></div>
        <div class="corner-decoration top-right"></div>
        <div class="corner-decoration bottom-left"></div>
        <div class="corner-decoration bottom-right"></div>

        <div class="header">
          <div class="logo">🌲</div>
          <div class="org-name">MaraChitra</div>
          <div class="tagline">Every Impact, Verified.</div>
        </div>

        <div class="title">Certificate of Tree Plantation</div>

        <div class="content">
          This is to certify that
        </div>

        <div class="donor-name">${data.donorName}</div>

        <div class="content">
          has contributed to environmental conservation by planting
        </div>

        <div class="details">
          <div class="detail-item">
            <div class="detail-label">Number of Trees</div>
            <div class="detail-value">${data.numberOfTrees}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Tree Species</div>
            <div class="detail-value">${data.treeName}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Location</div>
            <div class="detail-value">${data.location}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Date</div>
            <div class="detail-value">${data.date}</div>
          </div>
        </div>

        <div class="tree-id">
          <div class="tree-id-label">Unique Tree ID</div>
          <div class="tree-id-value">${data.treeId}</div>
        </div>

        <div class="qr-placeholder">
          QR Code<br/>Scan to Track
        </div>

        <div class="content" style="font-size: 14px; color: #666;">
          This tree is GPS-tagged, AI-verified, and will be tracked for 3 years.<br/>
          Monthly photo updates available on your personal dashboard.
        </div>

        <div class="signature-section">
          <div class="signature">
            <div class="signature-line"></div>
            <div class="signature-name">Founder</div>
            <div style="font-size: 12px; color: #666;">MaraChitra Foundation</div>
          </div>
          <div class="signature">
            <div class="signature-line"></div>
            <div class="signature-name">Date</div>
            <div style="font-size: 12px; color: #666;">${data.date}</div>
          </div>
        </div>

        <div class="footer">
          <div class="registration">
            SECTION 8 COMPANY • 12A REGISTERED • 80G APPROVED • NGO DARPAN CERTIFIED<br/>
            Registration No: U85100KA2020NPL000000 | 80G Registration: AABCM1234F
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  // Create a blob and download
  const blob = new Blob([certificateHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `MaraChitra_Certificate_${data.treeId}.html`;
  link.click();
  URL.revokeObjectURL(url);
};

export const generateReceiptPDF = (data: ReceiptData) => {
  const receiptHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: Arial, sans-serif;
          padding: 40px;
          background: #f5f5f5;
        }
        .receipt {
          max-width: 700px;
          margin: 0 auto;
          background: white;
          border-radius: 10px;
          padding: 40px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          border-bottom: 3px solid #2C5F2D;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .logo { font-size: 40px; }
        .org-name {
          font-size: 28px;
          color: #2C5F2D;
          font-weight: bold;
          margin: 10px 0;
        }
        .receipt-title {
          font-size: 24px;
          color: #2C5F2D;
          font-weight: bold;
          margin: 20px 0;
        }
        .tax-notice {
          background: #FFF9C4;
          border-left: 4px solid #FBC02D;
          padding: 15px;
          margin: 20px 0;
          font-size: 14px;
        }
        .details-table {
          width: 100%;
          margin: 20px 0;
        }
        .details-table tr {
          border-bottom: 1px solid #e0e0e0;
        }
        .details-table td {
          padding: 12px 0;
        }
        .details-table .label {
          color: #666;
          font-weight: 500;
        }
        .details-table .value {
          text-align: right;
          font-weight: bold;
          color: #333;
        }
        .total-row {
          font-size: 20px;
          color: #2C5F2D;
          background: #E8F5E9;
        }
        .total-row td {
          padding: 15px 10px !important;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #e0e0e0;
          text-align: center;
          font-size: 11px;
          color: #666;
        }
        .thank-you {
          text-align: center;
          margin: 30px 0;
          font-size: 16px;
          color: #2C5F2D;
          font-style: italic;
        }
      </style>
    </head>
    <body>
      <div class="receipt">
        <div class="header">
          <div class="logo">🌲</div>
          <div class="org-name">MaraChitra Foundation</div>
          <div style="font-size: 12px; color: #666;">EVERY IMPACT, VERIFIED.</div>
          <div style="margin-top: 15px; font-size: 14px;">
            123 Green Street, Bangalore - 560001<br/>
            Email: donate@marachitra.org | Phone: +91 80 1234 5678
          </div>
        </div>

        <div class="receipt-title">🧾 DONATION RECEIPT</div>

        <div class="tax-notice">
          <strong>⚠️ 80G Tax Benefit:</strong> This donation is eligible for tax deduction under Section 80G of the Income Tax Act, 1961.
          You can claim up to 80% of the donated amount as tax deduction.
        </div>

        <table class="details-table">
          <tr>
            <td class="label">Receipt Date:</td>
            <td class="value">${data.date}</td>
          </tr>
          <tr>
            <td class="label">Transaction ID:</td>
            <td class="value">${data.transactionId}</td>
          </tr>
          <tr>
            <td class="label">Donor Name:</td>
            <td class="value">${data.donorName}</td>
          </tr>
          <tr>
            <td class="label">Email:</td>
            <td class="value">${data.email}</td>
          </tr>
          <tr>
            <td class="label">Phone:</td>
            <td class="value">${data.phone}</td>
          </tr>
          <tr style="height: 20px;"></tr>
          <tr>
            <td class="label">Number of Trees:</td>
            <td class="value">${data.numberOfTrees}</td>
          </tr>
          <tr>
            <td class="label">Tree Type:</td>
            <td class="value">${data.treeName}</td>
          </tr>
          <tr>
            <td class="label">Planting Location:</td>
            <td class="value">Bangalore, Karnataka</td>
          </tr>
          <tr style="height: 20px;"></tr>
          <tr class="total-row">
            <td class="label"><strong>Total Amount Paid:</strong></td>
            <td class="value"><strong>₹${data.amount.toLocaleString()}</strong></td>
          </tr>
        </table>

        <div class="thank-you">
          🌱 Thank you for contributing to a greener planet! 🌍
        </div>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <strong style="color: #2C5F2D;">What's Next?</strong>
          <ul style="margin-top: 10px; padding-left: 20px; font-size: 14px; line-height: 1.8;">
            <li>Your tree will be planted within 7 days</li>
            <li>GPS coordinates will be assigned and shared</li>
            <li>AI verification will confirm planting</li>
            <li>Monthly updates for 3 years on your dashboard</li>
          </ul>
        </div>

        <div class="footer">
          <strong>MaraChitra Foundation</strong><br/>
          Section 8 Company | CIN: U85100KA2020NPL000000<br/>
          12A Registration No: AABCM1234F | 80G Registration No: AABCM1234F/2020<br/>
          NGO Darpan ID: KA/2020/0123456<br/>
          <br/>
          This is a computer-generated receipt and does not require a signature.<br/>
          For queries, contact: support@marachitra.org
        </div>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([receiptHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `MaraChitra_Receipt_${data.transactionId}.html`;
  link.click();
  URL.revokeObjectURL(url);
};
