import nodemailer from "nodemailer"
import { config } from "../config/variables.config";

type SendMailOptions = {
  to: string | string[];
  subject: string;
  message: string;
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.userName,
    pass: config.pass,
  },
});

export async function sendMail(options: SendMailOptions): Promise<void> {
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f7f7f9; padding: 32px; border-radius: 8px; max-width: 480px; margin: 0 auto; border: 1px solid #e0e0e0;">
      <div style="text-align: center; margin-bottom: 24px;">
        <img src="${config.domainUrl}/assets/LOGO.jpg" alt="Mynirdeshak Logo" style="height: 64px; margin-bottom: 8px;" />
        <h2 style="color: #1a237e; margin: 0;">${options.subject}</h2>
      </div>
      <div style="color: #333; font-size: 16px;">${options.message}</div>
      <div style="margin: 32px 0 16px 0; text-align: center;">
        <a href="${config.domainUrl}/dashboard/student" style="display: inline-block; padding: 14px 32px; background: linear-gradient(90deg, #1976d2 0%, #5c6bc0 50%, #8e24aa 100%); color: #fff; font-weight: bold; border-radius: 999px; text-decoration: none; font-size: 16px; box-shadow: 0 4px 16px rgba(30, 41, 59, 0.10); transition: background 0.3s;">View Dashboard</a>
      </div>
      <div style="margin-top: 32px; text-align: center;">
        <span style="color: #888; font-size: 14px;">Regards,<br/>Mynirdeshak Team</span>
      </div>
    </div>
  `;

  const mailOptions = {
    from: config.userName,
    to: options.to,
    subject: options.subject,
    html,
    replyTo: config.userName,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (mailErr) {
    console.error("Gmail SMTP mail error:", mailErr);
  }
}