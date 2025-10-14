// app/api/admin/forgot-password/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = "298shuaib@gmail.com";

// In-memory store for reset tokens (use database in production)
const resetTokens = new Map();

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Verify email matches admin email
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { error: "Email not found" },
        { status: 404 }
      );
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 3600000; // 1 hour

    // Store token
    resetTokens.set(token, { email, expires });

    // Create reset link
    const resetLink = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/reset-password?token=${token}`;

    // Send email
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