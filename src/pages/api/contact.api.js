import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message, turnstileToken } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!turnstileToken) {
    return res.status(400).json({ error: 'Missing Turnstile token' });
  }

  try {
    // Verify Turnstile token
    const turnstileResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
        }),
      }
    );

    const turnstileResult = await turnstileResponse.json();

    if (!turnstileResult.success) {
      return res
        .status(400)
        .json({ error: 'Turnstile verification failed', details: turnstileResult });
    }

    // Send email using Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'contact@badr.lol',
        to: 'contact@badr.lol',
        subject: `Contact Form: ${subject || '(No Subject)'}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Subject:</strong> ${subject || '(No Subject)'}</p>
               <p><strong>Message:</strong> ${message}</p>`,
      }),
    });

    const resendResult = await resendResponse.json();

    if (!resendResponse.ok) {
      return res
        .status(500)
        .json({ error: 'Failed to send email', details: resendResult });
    }

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Contact API error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
