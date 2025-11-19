export function otpEmailTemplate(otp: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Verify Your Account</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background: #f4f7fa;">
      <table width="100%" cellspacing="0" cellpadding="0" style="background: #f4f7fa; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="600" style="background: #fff; border-radius: 8px; overflow: hidden;">
              
              <!-- Header -->
              <tr>
                <td style="padding: 40px; text-align: center; background: linear-gradient(135deg,#667eea,#764ba2); color: white;">
                  <h1 style="margin: 0; font-size: 28px;">InterLearn</h1>
                  <p style="margin: 8px 0 0;">Your Learning Journey Starts Here</p>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <h2 style="margin-bottom: 20px; color: #1f2937;">Verify Your Account</h2>
                  <p style="margin-bottom: 25px; color: #4b5563;">
                    Hello! Thank you for joining InterLearn.  
                    Use the verification code below:
                  </p>

                  <!-- OTP -->
                  <div style="padding: 30px; background: #f9fafb; border: 2px dashed #d1d5db; border-radius: 8px; text-align:center;">
                    <div style="font-size: 36px; font-weight: 700; color: #667eea; letter-spacing: 8px;">
                      ${otp}
                    </div>
                  </div>

                  <p style="margin-top: 20px; color: #6b7280;">
                    <strong>Note:</strong> This code expires in <strong>10 minutes</strong>.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background:#f9fafb; padding:20px; text-align:center; border-top:1px solid #e5e7eb;">
                  <p style="margin: 0; font-size: 14px; color:#6b7280;">
                    Need help? Contact us at  
                    <a href="mailto:support@interlearn.com" style="color:#667eea;">support@interlearn.com</a>
                  </p>
                  <p style="margin-top: 8px; font-size:12px; color:#9ca3af;">
                    © ${new Date().getFullYear()} InterLearn. All rights reserved.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
