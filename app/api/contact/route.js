import { connectToDatabase } from "@/lib/mongodb";
import Message from "@/models/Message";

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    await connectToDatabase();
    await Message.create({ name, email, subject, message });

    return new Response(JSON.stringify({ success: true, message: "Message saved successfully!" }), { status: 200 });
  } catch (error) {
    console.error("Error saving message:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
