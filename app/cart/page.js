"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Trash2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 🔔 Custom Alert Component
function FancyAlert({ message, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="fixed bottom-6 right-6 bg-white shadow-xl border border-amber-300 px-5 py-4 rounded-xl z-50 flex items-center gap-3"
      >
        <div className="bg-amber-500 text-white w-8 h-8 flex items-center justify-center rounded-full">
          !
        </div>
        <p className="text-gray-800 font-medium">{message}</p>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-sm">
          ✕
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

// 🔥 Stylish Confirm Delete Modal
function ConfirmModal({ onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center space-y-4"
        >
          <h2 className="text-lg font-semibold text-gray-800">Remove Item?</h2>
          <p className="text-gray-600 text-sm">
            Are you sure you want to remove this product from your cart?
          </p>

          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function CartPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/account");
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart");
        const data = await res.json();
        setCart(data.products || []);
      } catch (err) {
        setAlert("Failed to load cart. Try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [session, status]);

  const confirmDeleteItem = (productId) => {
    setConfirmDelete(productId);
  };

  const handleDeleteConfirmed = async () => {
    const productId = confirmDelete;
    setConfirmDelete(null);

    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (res.ok) {
        setCart((prev) => prev.filter((item) => item.productId !== productId));
        setAlert("Item removed successfully!");
      } else {
        setAlert("Failed to remove item.");
      }
    } catch {
      setAlert("Error deleting item. Try again.");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        Loading your beautiful cart...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-amber-50 p-6 md:p-10">
      <h1 className="text-4xl font-bold text-amber-700 mb-8 flex items-center gap-2">
        <ShoppingBag className="text-amber-600" /> Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-gray-600 bg-white p-6 rounded-xl shadow text-center">
          Your cart is empty.
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <motion.div
              key={item.productId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row items-center justify-between bg-white p-5 rounded-2xl shadow-sm border hover:shadow-lg transition"
            >
              {/* Product Image + Info */}
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
                  <p className="text-gray-500">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                  <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                </div>
              </div>

              {/* Price & Delete */}
              <div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
                <div className="font-bold text-xl text-amber-700">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </div>
                <button
                  onClick={() => confirmDeleteItem(item.productId)}
                  className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  <Trash2 className="w-4 h-4" /> Remove
                </button>
              </div>
            </motion.div>
          ))}

          {/* Total */}
          <div className="text-right font-bold text-3xl mt-6 border-t pt-4 text-amber-800">
            Total: ₹
            {cart
              .reduce((sum, item) => sum + item.price * item.quantity, 0)
              .toLocaleString("en-IN")}
          </div>
        </div>
      )}

      {/* Alerts */}
      {alert && (
        <FancyAlert message={alert} onClose={() => setAlert(null)} />
      )}

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <ConfirmModal
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </main>
  );
}
