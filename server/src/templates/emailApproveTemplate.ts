export function interviewerApprovalEmailTemplate(
  interviewerName: string,
  expertise: string,
  tempPassword:string,
  dashboardUrl: string = "https://interlearn.com/dashboard"
) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Account Approved - InterLearn</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
          background: linear-gradient(135deg, #0f172a 0%, #1a202c 100%);
          padding: 40px 0;
          color: #e2e8f0;
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
          background: linear-gradient(135deg, #1a1f2e 0%, #16181b 100%);
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(59, 130, 246, 0.2);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }

        .header {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          padding: 50px 40px;
          text-align: center;
          color: white;
        }

        .header h1 {
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 12px;
        }

        .header p {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
        }

        .success-badge {
          text-align: center;
          padding: 40px;
        }

        .badge-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          background: rgba(34, 197, 94, 0.1);
          border-radius: 50%;
          font-size: 48px;
          margin-bottom: 24px;
        }

        .success-badge h2 {
          font-size: 28px;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 16px;
        }

        .success-badge p {
          color: #cbd5e1;
          font-size: 14px;
        }

        .content {
          padding: 0 40px;
        }

        .greeting {
          margin-bottom: 20px;
          color: #cbd5e1;
          font-size: 14px;
          line-height: 1.8;
        }

        .greeting strong {
          color: #f1f5f9;
        }

        .intro {
          margin-bottom: 30px;
          color: #cbd5e1;
          font-size: 14px;
          line-height: 1.8;
        }

        .intro strong {
          color: #f1f5f9;
        }

        .approval-status {
          color: #22c55e;
        }

        .details-box {
          background: rgba(59, 130, 246, 0.08);
          border-left: 3px solid #3b82f6;
          border-radius: 6px;
          padding: 20px;
          margin-bottom: 30px;
        }

        .details-box h3 {
          font-size: 14px;
          font-weight: 700;
          color: #cbd5e1;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          font-size: 13px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .detail-row:last-child {
          border-bottom: none;
        }

        .detail-label {
          color: #6b7684;
        }

        .detail-value {
          color: #f1f5f9;
          font-weight: 600;
        }

        .detail-value.success {
          color: #22c55e;
        }

        .features-section {
          margin: 40px 0;
        }

        .features-section h3 {
          font-size: 14px;
          font-weight: 700;
          color: #cbd5e1;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
        }

        .features-list {
          list-style: none;
          padding: 0;
        }

        .features-list li {
          padding: 12px 0;
          color: #cbd5e1;
          font-size: 13px;
          display: flex;
          align-items: center;
        }

        .features-list li:before {
          content: '→';
          color: #3b82f6;
          font-weight: 700;
          margin-right: 10px;
          font-size: 14px;
        }

        .cta-section {
          text-align: center;
          padding: 40px 0;
        }

        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          padding: 14px 40px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: -0.3px;
          box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          box-shadow: 0 12px 24px rgba(59, 130, 246, 0.4);
        }

        .quick-start {
          background: rgba(59, 130, 246, 0.05);
          border-top: 1px solid rgba(59, 130, 246, 0.1);
          padding: 30px 40px;
        }

        .quick-start h3 {
          font-size: 14px;
          font-weight: 700;
          color: #cbd5e1;
          margin-bottom: 16px;
        }

        .quick-start ol {
          margin: 0;
          padding-left: 20px;
          color: #a6adb8;
          font-size: 13px;
          line-height: 1.8;
        }

        .quick-start ol li {
          margin-bottom: 8px;
        }

        .quick-start ol li:last-child {
          margin-bottom: 0;
        }

        .quick-start a {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 600;
        }

        .support-section {
          text-align: center;
          padding: 30px 40px;
          border-top: 1px solid rgba(59, 130, 246, 0.1);
        }

        .support-section p {
          margin: 0 0 8px;
          font-size: 13px;
          color: #6b7684;
        }

        .support-section p:last-child {
          margin-bottom: 0;
        }

        .support-section a {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 600;
        }

        .footer {
          background: linear-gradient(135deg, #0f172a 0%, #1a202c 100%);
          padding: 30px 40px;
          text-align: center;
          border-top: 1px solid rgba(59, 130, 246, 0.1);
        }

        .footer p {
          margin: 0;
          font-size: 12px;
          color: #6b7684;
        }

        .footer p:last-child {
          margin-top: 12px;
        }

        .footer a {
          color: #3b82f6;
          text-decoration: none;
          margin: 0 12px;
        }

        @media (max-width: 600px) {
          .container {
            border-radius: 0;
          }

          .header {
            padding: 30px 20px;
          }

          .header h1 {
            font-size: 24px;
          }

          .success-badge {
            padding: 30px 20px;
          }

          .content {
            padding: 0 20px;
          }

          .details-box {
            padding: 16px;
          }

          .cta-section {
            padding: 30px 0;
          }

          .quick-start {
            padding: 20px;
          }

          .support-section {
            padding: 20px;
          }

          .footer {
            padding: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        
        <!-- Header -->
        <div class="header">
          <h1>InterLearn</h1>
          <p>Welcome Aboard, ${interviewerName}!</p>
        </div>

        <!-- Success Badge -->
        <div class="success-badge">
          <div class="badge-icon">✓</div>
          <h2>Your Account Has Been Approved!</h2>
          <p>We're excited to have you as an InterLearn interviewer</p>
        </div>

        <!-- Content -->
        <div class="content">
          <p class="greeting">Hello <strong>${interviewerName}</strong>,</p>
          
          <p class="intro">
            Congratulations! Your application as an Interviewer has been <strong class="approval-status">approved</strong>. We believe your expertise in <strong>${expertise}</strong> will help candidates succeed.
            this is your temporary password <strong>${tempPassword}</strong> please change immediatly
          </p>

          <!-- Account Details -->
          <div class="details-box">
            <h3>Your Account Details</h3>
            <div class="detail-row">
              <span class="detail-label">✓ Role:</span>
              <span class="detail-value">Interview Expert</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">✓ Expertise:</span>
              <span class="detail-value">${expertise}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">✓ Status:</span>
              <span class="detail-value success">Active</span>
            </div>
          </div>

          <!-- Features -->
          <div class="features-section">
            <h3>What You Can Now Do</h3>
            <ul class="features-list">
              <li>Schedule and conduct interviews</li>
              <li>Provide detailed feedback & reports</li>
              <li>Track performance metrics</li>
              <li>Access payment dashboard</li>
              <li>Join community forums</li>
            </ul>
          </div>
        </div>

        <!-- CTA Button -->
        <div class="cta-section">
          <a href="${dashboardUrl}" class="cta-button">Access Your Dashboard</a>
        </div>

        <!-- Quick Start -->
        <div class="quick-start">
          <h3>Quick Start Guide</h3>
          <ol>
            <li>Log in to your dashboard at <a href="${dashboardUrl}">${dashboardUrl}</a></li>
            <li>Complete your professional profile with credentials</li>
            <li>Set your availability for interview sessions</li>
            <li>Start mentoring candidates and earn rewards!</li>
          </ol>
        </div>

        <!-- Support -->
        <div class="support-section">
          <p>Questions? We're here to help!</p>
          <p><a href="mailto:support@interlearn.com">support@interlearn.com</a></p>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p>© ${new Date().getFullYear()} InterLearn. All rights reserved.</p>
          <p>
            <a href="https://interlearn.com">Website</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </p>
        </div>

      </div>
    </body>
    </html>
  `;
}
