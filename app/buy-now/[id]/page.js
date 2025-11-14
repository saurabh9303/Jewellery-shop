"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function BuyNowPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const products = [
    { id: 1, name: "Elegant Gold Necklace", price: 1, image: "/necklace.jpg" },
    { id: 2, name: "Diamond Ring", price: 4, image: "/ring.jpg" },
    { id: 3, name: "Pearl Earrings", price: 1, image: "/earrings.jpg" },
    { id: 4, name: "Royal Bracelet", price: 5, image: "/Royal-Bracelet.jpg" },
    { id: 5, name: "Luxury Pendant", price: 2, image: "/Luxury-Pendant.jpg" },
    { id: 6, name: "Gold Bangles Set", price:3, image: "/Gold-Bangles-Set.jpg" },
  ];

  const product = products.find((p) => p.id == id);

  if (!session) {
    router.push("/account");
    return null;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // remove error while typing
  };

  // ------------------ FORM VALIDATION ------------------
  const validateForm = () => {
    let newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(form.phone)) newErrors.phone = "Enter valid 10-digit phone number";

    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";

    if (!form.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^[0-9]{6}$/.test(form.pincode)) newErrors.pincode = "Enter valid 6-digit pincode";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // return true if no errors
  };

  // ------------------ COD ORDER ------------------
  const handleCOD = async () => {
    if (!validateForm()) return;

    setLoading(true);

    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        products: [
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
          },
        ],

        address: {
          fullName: form.fullName,
          phone: form.phone,
          house: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          road: "",
        },

        paymentMethod: "COD",
        paymentStatus: "PENDING",
        totalAmount: product.price,
      }),
    });

    setLoading(false);

    if (res.ok) router.push("/order-success?type=cod");
    else alert("Error placing COD order");
  };

  // ------------------ ONLINE PAYMENT ------------------
  const handleOnlinePay = async () => {
    if (!validateForm()) return;

    setLoading(true);

    const res = await fetch("/api/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: product.price }),
    });

    const data = await res.json();

    if (!data.order) {
      alert("Failed to create Razorpay order");
      setLoading(false);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "Abhi Jewellers",
        description: product.name,
        order_id: data.order.id,

        handler: async (response) => {
          await fetch("/api/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              products: [
                {
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                  image: product.image,
                },
              ],

              address: {
                fullName: form.fullName,
                phone: form.phone,
                house: form.address,
                city: form.city,
                state: form.state,
                pincode: form.pincode,
                road: "",
              },

              paymentMethod: "ONLINE",
              paymentStatus: "PAID",
              totalAmount: product.price,
              razorpayPaymentId: response.razorpay_payment_id,
            }),
          });

          router.push("/order-success?type=online");
        },

        prefill: {
          name: session?.user?.name,
          email: session?.user?.email,
        },

        theme: { color: "#D4AF37" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    };

    setLoading(false);
  };

  const handleSubmit = () => {
    if (paymentMethod === "COD") handleCOD();
    else handleOnlinePay();
  };

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 p-6 flex justify-center">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden border border-amber-200">

        {/* Header */}
        <div className="p-6 border-b bg-amber-50 border-amber-200">
          <h2 className="text-3xl font-bold text-amber-800">Checkout</h2>
          <p className="text-gray-600 text-sm mt-1">Complete your order securely</p>
        </div>

        {/* Product Summary */}
        <div className="p-6 flex gap-6 border-b">
          <img src={product.image} className="w-32 h-32 object-cover rounded-lg shadow" />
          <div>
            <h3 className="text-xl font-semibold text-amber-800">{product.name}</h3>
            <p className="mt-1 text-gray-600">Quantity: 1</p>
            <p className="mt-2 text-lg font-bold text-amber-700">₹ {product.price}</p>
          </div>
        </div>

        {/* Delivery Form */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-amber-800 mb-4">Delivery Details</h3>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <input
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
                className={`inputBox ${errors.fullName ? "errorField" : ""}`}
              />
              {errors.fullName && <p className="errorText">{errors.fullName}</p>}
            </div>

            <div>
              <input
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                className={`inputBox ${errors.phone ? "errorField" : ""}`}
              />
              {errors.phone && <p className="errorText">{errors.phone}</p>}
            </div>

            <div>
              <textarea
                name="address"
                placeholder="House No. / Apartment"
                onChange={handleChange}
                className={`inputBox h-24 ${errors.address ? "errorField" : ""}`}
              />
              {errors.address && <p className="errorText">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  name="city"
                  placeholder="City"
                  onChange={handleChange}
                  className={`inputBox ${errors.city ? "errorField" : ""}`}
                />
                {errors.city && <p className="errorText">{errors.city}</p>}
              </div>

              <div>
                <input
                  name="state"
                  placeholder="State"
                  onChange={handleChange}
                  className={`inputBox ${errors.state ? "errorField" : ""}`}
                />
                {errors.state && <p className="errorText">{errors.state}</p>}
              </div>
            </div>

            <div>
              <input
                name="pincode"
                placeholder="Pincode"
                onChange={handleChange}
                className={`inputBox ${errors.pincode ? "errorField" : ""}`}
              />
              {errors.pincode && <p className="errorText">{errors.pincode}</p>}
            </div>
          </div>

          {/* Payment Method */}
          <h3 className="text-xl font-semibold text-amber-800 mt-8">Payment Method</h3>

          <div className="mt-4 space-y-3">
            <label className="paymentOption">
              <input
                type="radio"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              <span>Cash on Delivery</span>
            </label>

            <label className="paymentOption">
              <input
                type="radio"
                checked={paymentMethod === "ONLINE"}
                onChange={() => setPaymentMethod("ONLINE")}
              />
              <span>Pay Online (Razorpay)</span>
            </label>
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-8 bg-amber-600 hover:bg-amber-700 transition text-white font-semibold p-4 rounded-xl shadow"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>

      {/* Extra CSS */}
      <style jsx>{`
        .inputBox {
          padding: 14px;
          border: 1px solid #e5c07b;
          border-radius: 10px;
          background: #fff;
          outline: none;
          font-size: 15px;
          transition: 0.2s;
          width: 100%;
        }
        .inputBox:focus {
          border-color: #d4a017;
          box-shadow: 0 0 6px #d4a01744;
        }
        .errorField {
          border-color: red !important;
        }
        .errorText {
          font-size: 13px;
          color: red;
          margin-top: 3px;
          margin-left: 2px;
        }

        .paymentOption {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          border: 1px solid #f1d38a;
          border-radius: 10px;
          cursor: pointer;
          background: #fffdf5;
          transition: 0.2s;
        }
        .paymentOption:hover {
          background: #fff7e5;
        }
      `}</style>
    </div>
  );
}
