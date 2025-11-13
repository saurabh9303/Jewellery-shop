import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/mongodb";
import Cart from "@/models/Cart";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const userEmail = session.user.email;
  const userName = session.user.name;

  await connectToDatabase();

  let cart = await Cart.findOne({ email: userEmail });
  const productId = String(body.productId);

  if (!cart) {
    cart = new Cart({
      email: userEmail,
      userName,
      products: [{ ...body, productId, quantity: 1 }],
    });
  } else {
    const existingItem = cart.products.find(
      (item) => String(item.productId) === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.products.push({ ...body, productId, quantity: 1 });
    }
  }

  await cart.save();

  return NextResponse.json(cart);
}

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ products: [] });
  }

  await connectToDatabase();
  const cart = await Cart.findOne({ email: session.user.email });

  return NextResponse.json(cart || { products: [] });
}

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    await connectToDatabase();

    // 🧹 Remove specific product from the user's cart
    const updatedCart = await Cart.findOneAndUpdate(
      { email: session.user.email },
      { $pull: { products: { productId } } },
      { new: true }
    );

    if (!updatedCart) {
      return NextResponse.json({ message: "Cart or product not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Product removed successfully", cart: updatedCart },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
