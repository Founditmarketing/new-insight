import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  try {
    console.log("Sending email...");
    const data = await resend.emails.send({
      from: 'Contact Form <hello@insighthelps.com>',
      to: 'robbie@insighthelps.com',
      subject: 'Test API Email',
      html: '<p>Testing Resend API...</p>'
    });
    console.log("Response:", data);
  } catch (err) {
    console.error("Caught Exception:", err);
  }
}
test();
