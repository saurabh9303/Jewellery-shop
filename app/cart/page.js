"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return; // wait until session known

    if (!session) {
      router.push("/account");
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart");
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        const data = await res.json();
        setCart(data.products || []);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [session, status]);

  // 🗑️ Delete Product Function
  const handleDelete = async (productId) => {
    if (!confirm("Are you sure you want to remove this item from your cart?"))
      return;

    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (res.ok) {
        setCart((prev) => prev.filter((item) => item.productId !== productId));
      } else {
        alert("Failed to remove item. Try again.");
      }
    } catch (err) {
      console.error("Error deleting cart item:", err);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500">
        Loading your cart...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-amber-50 p-10">
      <h1 className="text-4xl font-bold mb-8 text-amber-700">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border hover:shadow-lg transition"
            >
              {/* 🖼 Product Section */}
              <div
                className="flex items-center gap-4 cursor-pointer flex-1"
                onClick={() => router.push(`/shop/${item.productId}`)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl hover:scale-105 transition-transform"
                />
                <div>
                  <h2 className="font-semibold text-lg text-gray-800 hover:text-amber-600 transition">
                    {item.name}
                  </h2>
                  <p className="text-gray-600">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>

              {/* 💰 Price + 🗑️ Delete Button */}
              <div className="flex flex-col items-end gap-2">
                <div className="font-bold text-lg text-amber-700">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </div>
                <button
                  onClick={() => handleDelete(item.productId)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-medium transition"
                >
                  <Trash2 className="w-4 h-4" /> Remove
                </button>
              </div>
            </div>
          ))}

          {/* 🧾 Total Section */}
          <div className="text-right font-bold text-2xl mt-6 border-t pt-4 text-amber-800">
            Total: ₹
            {cart
              .reduce((sum, item) => sum + item.price * item.quantity, 0)
              .toLocaleString("en-IN")}
          </div>
        </div>
      )}
    </main>
  );
}
