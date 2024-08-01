
import { Resend } from "resend";
import { ResetPassword } from "@/emails/reset-password";
import ResetSuccessMessage from "@/emails/reset-success-message";
import { RegisterWelcomeMessage } from "@/emails/register-welcome-message";
import IPChangeNotification from "@/emails/ipchange-notification";

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
    react: ResetPassword({ resetPasswordLink: resetLink })
  });
};

export const PasswodResetSuccessMessage = async (
  email: string,
) => {

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Password Reset Successfull",
    react: ResetSuccessMessage(),
  });
};

export const RegisterWelcomeMessageEmail = async (
  email: string,
) => {

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Registration Successful",
    react: RegisterWelcomeMessage(),
  });
};



export const sendIPChangeNotification = async (
  email: string,
  ipAddress: string,
  country: string,
  loginDate: Date,
  loginDevice: string
) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "New Login from a Different IP Address",
    react: IPChangeNotification({
      ipAddress,
      country,
      loginDate,
      loginDevice
    }),
  });
};

