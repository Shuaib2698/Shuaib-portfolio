// app/api/admin/login/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getAdminPasswordHash } from "../reset-password/route";

export async function POST(request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    // Get current password hash
    const ADMIN_PASSWORD_HASH = getAdminPasswordHash();

    // Verify password
    const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

    console.log("Login attempt - Valid:", isValid); // Debug

    if (isValid) {
      const response = NextResponse.json({ 
        success: true,
        message: "Login successful" 
      });
      
      // Set HTTP-only cookie for server-side authentication
      response.cookies.set('adminAuth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 hours
      });

      return response;
    } else {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}