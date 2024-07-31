
import { Resend } from "resend";
import PasswordResetLink from "@/resend/emails/password-reset-link";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    // html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
    react: <PasswordResetLink resetLink={ resetLink } />
  });
};

// import { Resend } from 'resend';
// import { Email } from './email';

// const resend = new Resend('re_123456789');

// await resend.emails.send({
//   from: 'you@example.com',
//   to: 'user@gmail.com',
//   subject: 'hello world',
//   react: <Email url="https://example.com" />,
// })