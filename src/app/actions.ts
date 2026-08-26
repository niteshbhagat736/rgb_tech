'use server';

import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables.
// Fallback to a dummy key to prevent crash if not configured in dev.
const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

interface SendEmailResponse {
  success: boolean;
  error?: string;
}

export async function sendContactEmail(formData: FormData): Promise<SendEmailResponse> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { success: false, error: 'All fields (name, email, message) are required.' };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Please provide a valid email address.' };
  }

  // If API key is not configured, simulate success in development
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not defined in environment variables. Simulating email sending.');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true };
  }

  try {
    const data = await resend.emails.send({
      from: 'RGB Tech Contact <onboarding@resend.dev>',
      to: 'tech@fasterkart.com', // ImprovMX forwards this to niteshbhagat726@gmail.com
      replyTo: email,
      subject: `New Contact Inquiry from ${name} [RGB Tech]`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">New Contact Inquiry - RGB Tech</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 15px;">
            <p style="margin: 0; font-weight: bold; color: #555;">Message:</p>
            <p style="margin-top: 5px; white-space: pre-wrap; line-height: 1.6; color: #333;">${message}</p>
          </div>
          <footer style="margin-top: 20px; font-size: 12px; color: #999; text-align: center;">
            This email was sent from the contact form on RGB Tech (RGB Graphics Design and Solution).
          </footer>
        </div>
      `,
    });

    if (data.error) {
      console.error('Resend error response:', data.error);
      return { success: false, error: data.error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Exception caught while sending email via Resend:', err);
    return { success: false, error: err.message || 'An unexpected error occurred.' };
  }
}
