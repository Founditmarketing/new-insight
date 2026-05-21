import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  try {
    console.log("Sending email...");
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <hello@insighthelps.com>',
      to: 'jason@founditmarketing.com',
      replyTo: 'test@test.com',
      subject: 'Test API Email with ReplyTo',
      html: '<p>Testing Resend API...</p>'
    });
    console.log("Data:", data);
    console.log("Error:", error);
  } catch (err) {
    console.error("Caught Exception:", err);
  }
}
test();
