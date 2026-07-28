'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_RECIPIENT = process.env.CONTACT_EMAIL_TO ?? 'hello@felipegutierrez.dev';
const CONTACT_SENDER = process.env.CONTACT_EMAIL_FROM ?? 'felipegutierrez.dev <onboarding@resend.dev>';

export type ContactFormPayload = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
};

export async function sendContactEmail(payload: ContactFormPayload) {
  const { name, email, projectType, budget, timeline, message } = payload;

  if (!name.trim() || !email.trim() || !message.trim()) {
    return { success: false as const };
  }

  const { error } = await resend.emails.send({
    from: CONTACT_SENDER,
    to: CONTACT_RECIPIENT,
    replyTo: email,
    subject: `Nuevo contacto de ${name}${projectType ? ` — ${projectType}` : ''}`,
    text: [
      `Nombre: ${name}`,
      `Email: ${email}`,
      projectType && `Tipo de proyecto: ${projectType}`,
      budget && `Presupuesto: ${budget}`,
      timeline && `Timeline: ${timeline}`,
      '',
      message,
    ]
      .filter(Boolean)
      .join('\n'),
  });

  if (error) {
    return { success: false as const };
  }

  return { success: true as const };
}
