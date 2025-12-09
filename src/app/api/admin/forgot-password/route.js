// app/api/admin/forgot-password/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";
import { tokenStore } from "@/app/utils/dataStorage";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = "298shuaib@gmail.com";

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { error: "Email not found" },
        { status: 404 }
      );
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 3600000;

    tokenStore.set(token, { email, expires });

    const resetLink = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/reset-password?token=${token}`;

    const { error } = await resend.emails.send({
      from: "Portfolio Admin <onboarding@resend.dev>",
      to: [ADMIN_EMAIL],
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #20dc23;">Password Reset Request</h2>
          <p>You requested to reset your admin password.</p>
          <p>Click the link below to reset your password:</p>
          <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #20dc23; color: black; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Reset Password
          </a>
          <p style="margin-top: 20px; color: #666; font-size: 12px;">
            This link will expire in 1 hour. If you didn't request this, please ignore this email.
          </p>
          <p style="color: #999; font-size: 11px; margin-top: 20px;">
            If the button doesn't work, copy and paste this link: ${resetLink}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Email error:", error);
      return NextResponse.json(
        { error: "Failed to send reset email" },
        { status: 500 }
      );
    }

    console.log('📧 Reset password email sent to:', ADMIN_EMAIL);
    console.log('Reset link:', resetLink);

    return NextResponse.json({ 
      success: true, 
      message: "Reset link sent to your email" 
    });

  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}