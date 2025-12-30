import { transporter } from "@/config/email.config";
import { interviewerApprovalEmailTemplate } from "@/templates/emailApproveTemplate";

class EmailService {
  async sendReviewerApprovalEmail(params: {
    to: string;
    name: string;
    field: string;
    tempPassword: string;
  }) {
    const { to, name, field, tempPassword } = params;

    const html = interviewerApprovalEmailTemplate(
      name,
      field,
      tempPassword,
      "https://interlearn.com/dashboard"
    );

    await transporter.sendMail({
      from: `"InterLearn" <${process.env.EMAIL_USER}>`,
      to,
      subject: "🎉 Your InterLearn Reviewer Account Has Been Approved",
      html,
    });
  }
}

export const emailService = new EmailService();
