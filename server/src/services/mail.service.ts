import nodemailer from "nodemailer"
import { config } from "../config/variables.config";

type SendMailOptions = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.userName,
    pass: config.pass,
  },
});

export async function sendMail(options: SendMailOptions): Promise<void> {
  const mailOptions = {
    from: config.userName,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (mailErr) {
    console.error("Gmail SMTP mail error:", mailErr);
  }
}