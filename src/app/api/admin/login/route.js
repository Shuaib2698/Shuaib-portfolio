// app/api/admin/login/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Store admin credentials (in production, use a database)
const ADMIN_EMAIL = "298shuaib@gmail.com";
const ADMIN_PASSWORD_HASH = "$2b$10$SHD/onD/oKYRaMZzCsTjh.jfOtRHfUrrBESjIObh1NHRcyyZT2oJG"; // hash for "admin123"

export async function POST(request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    // Verify password
    const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

    if (isValid) {
      return NextResponse.json({ success: true });
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