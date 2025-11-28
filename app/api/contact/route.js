import { connectToDatabase } from "@/lib/mongodb";
import Message from "@/models/Message";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; // adjust path if needed

// ================= POST (existing contact form save) =================
export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    await connectToDatabase();
    await Message.create({ name, email, subject, message });

    return new Response(
      JSON.stringify({ success: true, message: "Message saved successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving message:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

// ================= GET (Admin Only) =================
export async function GET(req) {
  try {
    // Check admin session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    await connectToDatabase();
    const messages = await Message.find().sort({ createdAt: -1 });

    return new Response(JSON.stringify({ messages }), { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
