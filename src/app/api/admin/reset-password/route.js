// app/api/admin/reset-password/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { tokenStore } from "@/app/utils/tokenStore";

// In-memory password storage (replace with database in production)
let adminPasswordHash = "$2b$10$SHD/onD/oKYRaMZzCsTjh.jfOtRHfUrrBESjIObh1NHRcyyZT2oJG"; // Default: "admin123"

export async function POST(request) {
  try {
    const { token, password } = await request.json();

    console.log("Reset password request - Token:", token); // Debug

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      );
    }

    const tokenData = tokenStore.get(token);

    if (!tokenData) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    if (Date.now() > tokenData.expires) {
      tokenStore.delete(token);
      return NextResponse.json(
        { error: "Token has expired" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Update the admin password
    adminPasswordHash = hashedPassword;
    
    console.log("Password updated successfully. New hash:", hashedPassword);

    // Remove the used token
    tokenStore.delete(token);

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

// Export the current password hash for login verification
export function getAdminPasswordHash() {
  return adminPasswordHash;
}