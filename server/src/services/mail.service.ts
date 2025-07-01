import sgMail, { MailDataRequired } from "@sendgrid/mail";
// import { config } from "../config/variables.config";

// sgMail.setApiKey(config.sendGridApi);

// subject: 'Payment Successful - Test Registration',
//           html: `<p>Hi ${mUser.name || ''},</p>
//             <p>Your payment for the test (ID: ${testId}) was successful.</p>
//             <p>Thank you for registering. You will receive further instructions soon.</p>
//             <p>Regards,<br/>The Team</p>`

export async function sendMail(options: MailDataRequired): Promise<void> {
  try {
    await sgMail.send(options);
  } catch (mailErr) {
    console.error('SendGrid mail error:', mailErr);
  }
} 