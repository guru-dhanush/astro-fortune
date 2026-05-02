import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    console.log("[Payment Create] Environment check:");
    console.log("- Key ID present:", !!keyId);
    console.log("- Key Secret present:", !!keySecret);

    if (!keyId) {
      return NextResponse.json(
        {
          success: false,
          error:
            "❌ Razorpay Key ID not configured. Please set NEXT_PUBLIC_RAZORPAY_KEY_ID in .env.local",
        },
        { status: 500 }
      );
    }

    if (!keySecret) {
      return NextResponse.json(
        {
          success: false,
          error:
            "❌ Razorpay Key Secret not configured. Please set RAZORPAY_KEY_SECRET in .env.local",
        },
        { status: 500 }
      );
    }

    // Check if keys are still placeholder values
    if (keyId.includes("your_razorpay") || keySecret.includes("your_razorpay")) {
      return NextResponse.json(
        {
          success: false,
          error:
            "❌ Razorpay credentials are placeholder values. Please update .env.local with real credentials from https://dashboard.razorpay.com/settings/api-keys",
        },
        { status: 400 }
      );
    }

    console.log("[Payment Create] Initializing Razorpay...");

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const body = await request.json();
    const { amount, bookingDetails } = body;

    if (!amount || !bookingDetails) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: amount and bookingDetails" },
        { status: 400 }
      );
    }

    // Amount should be in paise (convert from rupees)
    const amountInPaise = Math.round(amount * 100);

    console.log("[Payment Create] Creating order with:", {
      amount: amountInPaise,
      currency: "INR",
      service: bookingDetails.service,
    });

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        booking_id: bookingDetails.id || "pending",
        service: bookingDetails.service,
        customer_email: bookingDetails.email,
      },
    });

    console.log("[Payment Create] Order created successfully:", order.id);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: any) {
    console.error("[Payment Create] Error:", {
      message: error?.message,
      code: error?.code,
      status: error?.statusCode,
      errorDetails: error?.error,
      fullError: error,
    });

    let errorMessage = "Failed to create payment order";

    if (error?.statusCode === 401) {
      errorMessage =
        "❌ Authentication failed with Razorpay. Please verify your API keys are correct.";
    } else if (error?.error?.description) {
      errorMessage = `❌ ${error.error.description}`;
    } else if (error?.message) {
      errorMessage = `❌ ${error.message}`;
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
