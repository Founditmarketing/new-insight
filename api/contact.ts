import { Resend } from 'resend';

let resend: any;

export default async function handler(req: any, res: any) {
  // Initialize Resend lazily
  if (!resend) {
    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ error: 'RESEND_API_KEY is missing from environment variables.' });
    }
    resend = new Resend(process.env.RESEND_API_KEY);
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, location, type, message } = req.body;

  // Determine routing based on location
  let insightEmail = 'support@insighthelps.com'; // Default to support
  if (location === 'Ponchatoula' || location === 'Slidell') {
    insightEmail = 'robbie@insighthelps.com';
  }

  // Submissions go to the designated insight email
  const toEmail = [insightEmail];

  try {
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <hello@insighthelps.com>',
      to: toEmail,
      replyTo: email,
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

    if (error) {
      console.error('Resend API error:', JSON.stringify(error));
      return res.status(500).json({ error: error.message || 'Resend rejected the email.' });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err: any) {
    console.error('Server error:', err);
    return res.status(500).json({ error: err.message || 'Failed to send email' });
  }
}
