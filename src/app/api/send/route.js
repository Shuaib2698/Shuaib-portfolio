
// For App Router (/app/api/send/route.js):
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = "298shuaib@gmail.com";
const FROM_EMAIL = "onboarding@resend.dev"; // Use a Resend provided email for testing

export async function POST(req) {
  try {
    const { email, subject, message } = await req.json();
    
    // Simple HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Portfolio Message</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #7e22ce; border-bottom: 2px solid #7e22ce; padding-bottom: 10px;">
              New Portfolio Message
            </h2>
            <p><strong>From:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="margin-top: 20px;">
              <strong>Message:</strong>
              <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #7e22ce; margin-top: 10px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: email,
      subject: `Portfolio Contact: ${subject}`,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Email send failed:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}