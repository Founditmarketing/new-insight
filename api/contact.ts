import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, location, type, message } = req.body;

  // 1. Logic & Routing
  let toEmail = 'support@insighthelps.com'; // Default or Alexandria
  if (location === 'Ponchatoula' || location === 'Slidell') {
    toEmail = 'robbie@insighthelps.com';
  }

  try {
    const data = await resend.emails.send({
      from: 'Contact Form <hello@insighthelps.com>',
      to: toEmail,
      reply_to: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Help with:</strong> ${type}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
