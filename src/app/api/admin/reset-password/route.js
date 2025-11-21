// app/api/admin/reset-password/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { tokenStore } from "@/app/utils/tokenStore";

let adminPasswordHash = "$2b$10$SHD/onD/oKYRaMZzCsTjh.jfOtRHfUrrBESjIObh1NHRcyyZT2oJG";

export const dynamic = 'force-dynamic'; // Add this line

export async function POST(request) {
  try {
    const { token, password } = await request.json();

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

    const hashedPassword = await bcrypt.hash(password, 10);
    adminPasswordHash = hashedPassword;
    
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

export function getAdminPasswordHash() {
  return adminPasswordHash;
}