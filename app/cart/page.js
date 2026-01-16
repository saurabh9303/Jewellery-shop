"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Trash2,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  BadgeCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ================= Toast ================= */
function FancyAlert({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="fixed top-6 right-6 z-50 bg-white border border-amber-300 shadow-2xl rounded-xl px-5 py-4 flex gap-3 items-center"
    >
      <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center">
        !
      </div>
      <p className="text-sm font-medium text-gray-800">{message}</p>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
        ✕
      </button>
    </motion.div>
  );
}

/* ================= Confirm Modal ================= */
function ConfirmModal({ onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="bg-white p-6 rounded-2xl shadow-2xl w-80 text-center"
        >
          <h2 className="text-lg font-semibold text-gray-800">
            Remove Product?
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            This item will be removed from your cart.
          </p>

          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white transition"
            >
              Remove
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ================= Cart Page ================= */
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
      } catch {
        setAlert("Failed to load cart.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [status, session, router]);

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
        setCart((prev) => prev.filter((i) => i.productId !== productId));
        setAlert("Product removed from cart.");
      } else {
        setAlert("Failed to remove product.");
      }
    } catch {
      setAlert("Something went wrong.");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-600">
       Checking authentication…
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-amber-50 p-6 md:p-10">
      <h1 className="text-4xl font-bold text-amber-700 mb-10 flex items-center gap-3">
        <ShoppingBag /> Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center text-gray-600">
          Your cart is empty.
        </div>
      ) : (
        <>
          {/* PRODUCT GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
            {cart.map((item) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition border overflow-hidden"
              >
                {/* Image */}
                <div
                  onClick={() => router.push(`/shop/${item.productId}`)}
                  className="cursor-pointer overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-52 object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h2
                    onClick={() => router.push(`/shop/${item.productId}`)}
                    className="text-lg font-semibold text-gray-800 hover:text-amber-600 cursor-pointer"
                  >
                    {item.name}
                  </h2>

                  <p className="text-gray-500">
                    ₹{item.price.toLocaleString("en-IN")} × {item.quantity}
                  </p>

                  <p className="text-xl font-bold text-amber-700">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>

                  {/* META INFO */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 pt-2">
                    <span className="flex items-center gap-1">
                      <Truck size={14} /> Free Delivery
                    </span>
                    <span className="flex items-center gap-1">
                      <RotateCcw size={14} /> Easy Returns
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={14} /> Secure Payment
                    </span>
                    <span className="flex items-center gap-1">
                      <BadgeCheck size={14} /> Certified Jewelry
                    </span>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => setConfirmDelete(item.productId)}
                    className="mt-4 flex items-center gap-2 text-sm text-red-500 hover:text-red-700 font-medium"
                  >
                    <Trash2 size={16} /> Remove Item
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="mt-12 text-right text-3xl font-bold text-amber-800">
            Total: ₹
            {cart
              .reduce((sum, i) => sum + i.price * i.quantity, 0)
              .toLocaleString("en-IN")}
          </div>
        </>
      )}

      {alert && <FancyAlert message={alert} onClose={() => setAlert(null)} />}

      {confirmDelete && (
        <ConfirmModal
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </main>
  );
}
