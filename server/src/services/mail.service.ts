export interface SendMailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendMail(options: SendMailOptions): Promise<void> {
  
  console.log('[MAIL SERVICE] Sending email:', {
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
} 