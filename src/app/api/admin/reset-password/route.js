// app/api/admin/reset-password/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const resetTokens = new Map();

export async function POST(request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      );
    }

    const tokenData = resetTokens.get(token);

    if (!tokenData) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    if (Date.now() > tokenData.expires) {
      resetTokens.delete(token);
      return NextResponse.json(
        { error: "Token has expired" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // In production, update the password in your database
    // For now, we'll just remove the token
    resetTokens.delete(token);

    // TODO: Update the actual admin password in your storage
    console.log("New password hash:", hashedPassword);

    return NextResponse.json({ 
      success: true, 
      message: "Password reset successfully" 
    });

  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}