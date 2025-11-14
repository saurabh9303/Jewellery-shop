import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // REQUIRED VALIDATION LOGS
    console.log("RECEIVED ORDER BODY:", body);

    const {
      products,
      address,
      paymentMethod,
      paymentStatus,
      totalAmount,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = body;

    // Validate required fields
    if (!products || products.length === 0) {
      return NextResponse.json({ error: "Products missing" }, { status: 400 });
    }

    if (!address) {
      return NextResponse.json({ error: "Address missing" }, { status: 400 });
    }

    if (!paymentMethod) {
      return NextResponse.json({ error: "paymentMethod missing" }, { status: 400 });
    }

    if (!totalAmount) {
      return NextResponse.json({ error: "totalAmount missing" }, { status: 400 });
    }

    // ENSURE PAYMENT STATUS IS IN UPPERCASE
    const formattedPaymentStatus = paymentStatus?.toUpperCase() || "PENDING";

    await connectToDatabase();

    const newOrder = new Order({
      userEmail: session.user.email,
      userName: session.user.name,

      products,
      address,
      paymentMethod,
      paymentStatus: formattedPaymentStatus,
      totalAmount,

      razorpayOrderId: razorpayOrderId || null,
      razorpayPaymentId: razorpayPaymentId || null,
      razorpaySignature: razorpaySignature || null,
    });

    const savedOrder = await newOrder.save();

    return NextResponse.json({ success: true, order: savedOrder });
  } catch (err) {
    console.error("ORDER ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
// GET ORDERS BY USER EMAIL
export async function GET(req) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const orders = await Order.find({ "userEmail": email }).sort({ createdAt: -1 });

  return NextResponse.json({ orders });
}
