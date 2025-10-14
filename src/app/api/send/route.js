// app/api/send/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Use your domain email or get a domain from Resend
const TO_EMAIL = "298shuaib@gmail.com";
const FROM_EMAIL = "portfolio@yourdomain.com"; // You need to verify this domain in Resend

export async function POST(req) {
  try {
    const { email, subject, message } = await req.json();

    // Validate required fields
    if (!email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Enhanced HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Portfolio Message</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background: #fafafa; }
            .header { color: #20dc23; border-bottom: 2px solid #20dc23; padding-bottom: 10px; }
            .message-box { background-color: white; padding: 15px; border-left: 4px solid #20dc23; margin-top: 10px; border-radius: 5px; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2 class="header">New Portfolio Contact Form Submission</h2>
            <p><strong>From:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
            <div style="margin-top: 20px;">
              <strong>Message:</strong>
              <div class="message-box">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <div class="footer">
              This message was sent from your portfolio website contact form.
            </div>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <portfolio@resend.dev>", // Use Resend's test domain
      to: TO_EMAIL,
      reply_to: email,
      subject: `Portfolio Contact: ${subject}`,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    console.log("Email sent successfully:", data);
    return NextResponse.json({ 
      success: true, 
      message: "Email sent successfully!" 
    });

  } catch (error) {
    console.error("Email send failed:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Internal server error. Please try again later." 
      },
      { status: 500 }
    );
  }
}