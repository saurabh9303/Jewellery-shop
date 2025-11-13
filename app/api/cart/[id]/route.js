import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Cart from "@/models/Cart";

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();
  const userId = req.cookies.get("sessionId")?.value || "guest";

  await connectToDatabase();
  const cart = await Cart.findOne({ userId });
  if (!cart) return NextResponse.json({ error: "Cart not found" }, { status: 404 });

  const item = cart.products.find(p => String(p.productId) === id);
  if (!item) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  if (body.action === "decrease" && item.quantity > 1) {
    item.quantity -= 1;
  } else if (body.action === "decrease" && item.quantity === 1) {
    // remove when qty = 0
    cart.products = cart.products.filter(p => String(p.productId) !== id);
  }

  await cart.save();
  return NextResponse.json(cart);
}

export async function DELETE(req, { params }) {
  const { id } = params;
  const userId = req.cookies.get("sessionId")?.value || "guest";

  await connectToDatabase();
  const cart = await Cart.findOne({ userId });
  if (!cart) return NextResponse.json({ error: "Cart not found" }, { status: 404 });

  cart.products = cart.products.filter(p => String(p.productId) !== id);
  await cart.save();

  return NextResponse.json(cart);
}
