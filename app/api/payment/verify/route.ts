import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import path from "path";
import { createBookingAction } from "@/app/actions/calendar";

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

async function sendBookingEmail(
  customerEmail: string,
  ownerEmail: string,
  bookingData: any,
  meetLink?: string
) {
  const logoCid = "astrologo@astrofortune.com";

  const customerEmailContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          <!-- Header -->
          <div style="background-color: #6B5A4E; padding: 30px 20px; text-align: center;">
            <img src="cid:${logoCid}" alt="Astrofortune Logo" style="max-width: 150px; height: auto; margin-bottom: 15px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">Booking Confirmed!</h1>
          </div>
          
          <!-- Body -->
          <div style="padding: 40px 30px;">
            <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-top: 0;">Dear <strong style="color: #6B5A4E;">${bookingData.fullName}</strong>,</p>
            <p style="color: #555555; font-size: 15px; line-height: 1.6;">Thank you for choosing Astrofortune. We are thrilled to confirm your consultation booking.</p>
            
            <div style="background-color: #f9f6f4; border-left: 4px solid #6B5A4E; padding: 20px; border-radius: 4px; margin: 30px 0;">
              <h3 style="color: #6B5A4E; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Consultation Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; width: 40%;">Service:</td>
                  <td style="padding: 8px 0; color: #333; font-weight: 500;">${bookingData.service}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Date:</td>
                  <td style="padding: 8px 0; color: #333; font-weight: 500;">${bookingData.date}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Time:</td>
                  <td style="padding: 8px 0; color: #333; font-weight: 500;">${bookingData.time}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Duration:</td>
                  <td style="padding: 8px 0; color: #333; font-weight: 500;">${bookingData.duration}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Consulting For:</td>
                  <td style="padding: 8px 0; color: #333; font-weight: 500;">${bookingData.consultName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Amount Paid:</td>
                  <td style="padding: 8px 0; color: #2e7d32; font-weight: 600;">₹${bookingData.amount}</td>
                </tr>
              </table>
            </div>
            
            ${meetLink ? `
            <div style="background-color: #e3f2fd; border-left: 4px solid #2196f3; padding: 20px; border-radius: 4px; margin: 30px 0;">
              <h3 style="color: #1976d2; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Google Meet Link</h3>
              <p style="color: #555555; font-size: 15px; line-height: 1.6; margin-bottom: 15px;">Your consultation will be held via Google Meet. You can join using the link below:</p>
              <a href="${meetLink}" style="display: inline-block; background-color: #2196f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">Join Google Meet</a>
            </div>
            ` : ''}
            
            <p style="color: #555555; font-size: 15px; line-height: 1.6;">Our team will contact you shortly on <strong>${bookingData.mobile}</strong> to confirm the exact consultation timing.</p>
            
            <!-- Footer -->
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eeeeee; text-align: center;">
              <p style="color: #6B5A4E; font-size: 16px; font-weight: 600; margin-bottom: 5px;">Best regards,</p>
              <p style="color: #888888; font-size: 14px; margin-top: 0;">The Astrofortune Team</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const ownerEmailContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          <!-- Header -->
          <div style="background-color: #6B5A4E; padding: 25px 20px; text-align: center;">
            <img src="cid:${logoCid}" alt="Astrofortune Logo" style="max-width: 120px; height: auto; margin-bottom: 10px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 600;">New Booking Received</h1>
          </div>
          
          <!-- Body -->
          <div style="padding: 30px;">
            <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-top: 0;">You have received a new consultation booking from <strong>${bookingData.fullName}</strong>.</p>
            
            <div style="background-color: #f9f6f4; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <h3 style="color: #6B5A4E; margin-top: 0; border-bottom: 1px solid #e0d5cd; padding-bottom: 10px; font-size: 16px;">Contact Information</h3>
              <p style="margin: 5px 0; color: #555; font-size: 15px;"><strong>Name:</strong> ${bookingData.fullName}</p>
              <p style="margin: 5px 0; color: #555; font-size: 15px;"><strong>Email:</strong> <a href="mailto:${bookingData.email}" style="color: #6B5A4E; text-decoration: none;">${bookingData.email}</a></p>
              <p style="margin: 5px 0; color: #555; font-size: 15px;"><strong>Mobile:</strong> <a href="tel:${bookingData.mobile}" style="color: #6B5A4E; text-decoration: none;">${bookingData.mobile}</a></p>
            </div>

            <div style="background-color: #f9f6f4; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <h3 style="color: #6B5A4E; margin-top: 0; border-bottom: 1px solid #e0d5cd; padding-bottom: 10px; font-size: 16px;">Booking Details</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
                <tr><td style="padding: 6px 0; color: #666; width: 40%;">Service:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${bookingData.service}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Date:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${bookingData.date}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Time:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${bookingData.time}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Duration:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${bookingData.duration}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Amount Paid:</td><td style="padding: 6px 0; color: #2e7d32; font-weight: 600;">₹${bookingData.amount}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Payment ID:</td><td style="padding: 6px 0; color: #333; font-family: monospace;">${bookingData.paymentId}</td></tr>
              </table>
            </div>

            ${meetLink ? `
            <div style="background-color: #e3f2fd; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <h3 style="color: #1976d2; margin-top: 0; border-bottom: 1px solid #bbdefb; padding-bottom: 10px; font-size: 16px;">Google Meet Link</h3>
              <p style="margin: 5px 0; color: #555; font-size: 15px;"><strong>Meet Link:</strong> <a href="${meetLink}" style="color: #1976d2; text-decoration: none;">${meetLink}</a></p>
            </div>
            ` : ''}

            <div style="background-color: #f9f6f4; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <h3 style="color: #6B5A4E; margin-top: 0; border-bottom: 1px solid #e0d5cd; padding-bottom: 10px; font-size: 16px;">Birth Details</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
                <tr><td style="padding: 6px 0; color: #666; width: 40%;">Consultation For:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${bookingData.consultName}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Gender:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${bookingData.gender}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Birth Date:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${bookingData.birthDate}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Birth Time:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${bookingData.birthTime}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Birth Place:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${bookingData.birthPlace}</td></tr>
              </table>
            </div>
            
            <p style="color: #555555; font-size: 14px; text-align: center; margin-top: 30px;">Please contact the customer to confirm their booking.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const logoPath = path.join(process.cwd(), 'public', 'astrologo.png');
  const mailAttachments = [
    {
      filename: 'astrologo.png',
      path: logoPath,
      cid: logoCid,
    }
  ];

  try {
    // Send email to customer
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: customerEmail,
      subject: "Your Astrofortune Booking is Confirmed!",
      html: customerEmailContent,
      attachments: mailAttachments,
    });

    // Send email to owner
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: ownerEmail,
      subject: "New Booking Received - Astrofortune",
      html: ownerEmailContent,
      attachments: mailAttachments,
    });

    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("Missing Razorpay credentials in environment variables");
      return NextResponse.json(
        { success: false, error: "Payment service not configured" },
        { status: 500 }
      );
    }

    if (!process.env.GMAIL_USER) {
      console.error("Missing GMAIL_USER in environment variables");
      return NextResponse.json(
        { success: false, error: "Email configuration error" },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingData,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingData) {
      return NextResponse.json(
        { success: false, error: "Missing required payment verification fields" },
        { status: 400 }
      );
    }

    // Verify signature
    const body_data = razorpay_order_id + "|" + razorpay_payment_id;
    const expected_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body_data)
      .digest("hex");

    if (expected_signature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Payment signature verification failed" },
        { status: 400 }
      );
    }

    // Get payment details from Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (payment.status !== "captured") {
      return NextResponse.json(
        { success: false, error: "Payment not captured" },
        { status: 400 }
      );
    }

    // Create Google Calendar event after successful payment
    let meetLink: string | undefined;
    if (bookingData.startTime && bookingData.endTime) {
      const calendarResult = await createBookingAction(
        bookingData.date,
        bookingData.startTime,
        bookingData.endTime,
        {
          fullName: bookingData.fullName,
          email: bookingData.email,
          mobile: bookingData.mobile,
          service: bookingData.service,
        }
      );

      if (calendarResult.success && calendarResult.meetLink) {
        meetLink = calendarResult.meetLink;
      }
    }

    // Send emails with Google Meet link
    const emailSent = await sendBookingEmail(
      bookingData.email,
      process.env.GMAIL_USER,
      {
        ...bookingData,
        paymentId: razorpay_payment_id,
      },
      meetLink
    );

    // TODO: Save booking to database here

    return NextResponse.json({
      success: true,
      message: "Payment verified and booking confirmed",
      paymentId: razorpay_payment_id,
      emailSent,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { success: false, error: "Payment verification failed. Please contact support." },
      { status: 500 }
    );
  }
}
