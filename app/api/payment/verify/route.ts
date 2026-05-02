import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";

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
  bookingData: any
) {
  const customerEmailContent = `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #7d6352;">Booking Confirmation</h2>
          <p>Dear ${bookingData.fullName},</p>
          
          <p>Your consultation booking has been confirmed successfully!</p>
          
          <div style="background-color: #f9f6f4; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #7d6352; margin-top: 0;">Booking Details</h3>
            <p><strong>Service:</strong> ${bookingData.service}</p>
            <p><strong>Date:</strong> ${bookingData.date}</p>
            <p><strong>Time:</strong> ${bookingData.time}</p>
            <p><strong>Duration:</strong> ${bookingData.duration}</p>
            <p><strong>Amount Paid:</strong> ₹${bookingData.amount}</p>
            <p><strong>Consultation For:</strong> ${bookingData.consultName}</p>
          </div>
          
          <p><strong>Your Details:</strong></p>
          <p>Email: ${bookingData.email}</p>
          <p>Mobile: ${bookingData.mobile}</p>
          
          <p>We will contact you shortly to confirm the consultation timing. Thank you for choosing Astrofortune!</p>
          
          <p style="color: #7d6352; margin-top: 30px;">Best regards,<br/>Astrofortune Team</p>
        </div>
      </body>
    </html>
  `;

  const ownerEmailContent = `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #7d6352;">New Booking Received</h2>
          
          <div style="background-color: #f9f6f4; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #7d6352; margin-top: 0;">Booking Information</h3>
            <p><strong>Customer Name:</strong> ${bookingData.fullName}</p>
            <p><strong>Email:</strong> ${bookingData.email}</p>
            <p><strong>Mobile:</strong> ${bookingData.mobile}</p>
            
            <p><strong>Service:</strong> ${bookingData.service}</p>
            <p><strong>Date:</strong> ${bookingData.date}</p>
            <p><strong>Time:</strong> ${bookingData.time}</p>
            <p><strong>Duration:</strong> ${bookingData.duration}</p>
            <p><strong>Amount:</strong> ₹${bookingData.amount}</p>
            
            <p><strong>Consultation For:</strong></p>
            <p>Name: ${bookingData.consultName}</p>
            <p>Gender: ${bookingData.gender}</p>
            <p>Birth Date: ${bookingData.birthDate}</p>
            <p>Birth Time: ${bookingData.birthTime}</p>
            <p>Birth Place: ${bookingData.birthPlace}</p>
            
            <p><strong>Payment Status:</strong> Completed</p>
            <p><strong>Payment ID:</strong> ${bookingData.paymentId}</p>
          </div>
          
          <p>Please contact the customer to confirm the consultation details.</p>
        </div>
      </body>
    </html>
  `;

  try {
    // Send email to customer
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: customerEmail,
      subject: "Your Astrofortune Booking is Confirmed!",
      html: customerEmailContent,
    });

    // Send email to owner
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: ownerEmail,
      subject: "New Booking Received - Astrofortune",
      html: ownerEmailContent,
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

    // Send emails
    const emailSent = await sendBookingEmail(
      bookingData.email,
      process.env.GMAIL_USER,
      {
        ...bookingData,
        paymentId: razorpay_payment_id,
      }
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
