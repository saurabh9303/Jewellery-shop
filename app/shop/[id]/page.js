"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Star, ShoppingBag, Heart } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [wishlist, setWishlist] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(false);

  // 🟡 Dummy data (replace with DB/API later)
  const products = [
    {
      id: 1,
      name: "Elegant Gold Necklace",
      price: 10,
      originalPrice: 32999,
      rating: 4.8,
      reviews: 127,
      category: "Necklaces",
      inStock: true,
      isBestseller: true,
      description:
        "This handcrafted 22K gold necklace combines timeless design with exquisite craftsmanship. Each link is polished to perfection, ensuring a radiant and luxurious finish.",
      details: {
        metal: "22K Gold",
        purity: "916 Hallmark",
        weight: "28.5g",
        length: "18 Inches",
        clasp: "Traditional Hook",
      },
      images: [
        "/necklace.jpg",
        "/necklace-side.jpg",
        "/necklace-close.jpg",
        "/necklace-box.jpg",
      ],
    },
    {
      id: 2,
      name: "Diamond Ring",
      price: 45499,
      originalPrice: 50999,
      rating: 4.9,
      reviews: 201,
      category: "Rings",
      inStock: true,
      isBestseller: true,
      description:
        "A stunning diamond ring featuring a brilliant-cut centerpiece, set in a 14K gold band. Perfect for engagements, anniversaries, or luxury gifting.",
      details: {
        metal: "14K Gold",
        diamond: "VVS1 Clarity",
        weight: "7.8g",
        size: "Adjustable",
        certification: "IGI Certified",
      },
      images: [
        "/ring.jpg",
        "/ring-side.jpg",
        "/ring-box.jpg",
        "/ring-close.jpg",
      ],
    },
    {
      id: 3,
      name: "Pearl Earrings",
      price: 15799,
      originalPrice: 18999,
      rating: 4.6,
      reviews: 86,
      category: "Earrings",
      inStock: true,
      isBestseller: false,
      description:
        "Elegant pearl drop earrings handcrafted in silver and coated with 18K gold. A graceful addition to your everyday and festive collection.",
      details: {
        metal: "Silver with 18K Gold Plating",
        pearlType: "Natural Freshwater",
        weight: "12g",
        clasp: "Push Back",
      },
      images: ["/earrings.jpg", "/earrings-box.jpg", "/earrings-close.jpg"],
    },
    {
      id: 4,
      name: "Royal Bracelet",
      price: 29999,
      originalPrice: 35999,
      rating: 4.7,
      reviews: 92,
      category: "Bracelets",
      inStock: true,
      isBestseller: false,
      description:
        "A regal gold bracelet crafted with intricate filigree patterns and a luxurious polished finish — a perfect blend of tradition and style.",
      details: {
        metal: "22K Gold",
        purity: "916 Hallmark",
        weight: "24g",
        clasp: "Box Lock",
      },
      images: ["/bracelet.jpg", "/bracelet-side.jpg", "/bracelet-box.jpg"],
    },
    {
      id: 5,
      name: "Luxury Pendant",
      price: 22499,
      originalPrice: 25999,
      rating: 4.5,
      reviews: 65,
      category: "Pendants",
      inStock: true,
      isBestseller: false,
      description:
        "A modern pendant with delicate gold framing and a fine diamond touch — ideal for formal and festive wear.",
      details: {
        metal: "18K Gold",
        weight: "9.5g",
        stone: "Swarovski Crystal",
        chain: "Not Included",
      },
      images: ["/pendant.jpg", "/pendant-side.jpg", "/pendant-close.jpg"],
    },
    {
      id: 6,
      name: "Gold Bangles Set",
      price: 35999,
      originalPrice: 42999,
      rating: 4.9,
      reviews: 190,
      category: "Bangles",
      inStock: true,
      isBestseller: true,
      description:
        "A premium set of 22K gold bangles with intricate designs and smooth polished finish — the epitome of Indian elegance.",
      details: {
        metal: "22K Gold",
        purity: "916 Hallmark",
        weight: "38g",
        set: "2 Pieces",
      },
      images: ["/bangles.jpg", "/bangles-box.jpg", "/bangles-close.jpg"],
    },
  ];

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-4">Product Not Found</h1>
          <Link
            href="/shop"
            className="text-amber-600 underline hover:text-amber-700"
          >
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const toggleWishlist = () => setWishlist(!wishlist);

  // 🟢 Add to Cart Function
  const handleAddToCart = async () => {
    if (!session) {
      router.push("/account"); // redirect to login if not logged in
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          email: session.user.email,
          userName: session.user.name,
        }),
      });

      if (res.ok) {
        alert("✅ Added to cart successfully!");
      } else {
        alert("⚠️ Failed to add item to cart!");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = async () => {
    if (!session) {
      router.push("/account");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Create order on backend
      const res = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: product.price }),
      });

      const data = await res.json();

      if (!data.order) {
        alert("Error creating Razorpay order");
        return;
      }

      // 2️⃣ Load Razorpay script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // frontend public key
          amount: data.order.amount,
          currency: "INR",
          name: "Jewellery Shop",
          description: `Purchase of ${product.name}`,
          order_id: data.order.id,
          handler: function (response) {
            alert("Payment Successful! 🎉");
            console.log("Payment ID:", response.razorpay_payment_id);
            console.log("Order ID:", response.razorpay_order_id);
          },
          prefill: {
            name: session.user.name,
            email: session.user.email,
          },
          theme: {
            color: "#FBBF24",
          },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      };
    } catch (error) {
      console.error("Razorpay payment error:", error);
      alert("Something went wrong during payment.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-amber-50 py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6 text-gray-500">
          <Link href="/" className="hover:text-amber-600">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/shop" className="hover:text-amber-600">
            Shop
          </Link>{" "}
          / <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="relative w-full overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-gray-100 to-amber-50">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-[500px] object-cover transition-all duration-500"
              />

              {product.isBestseller && (
                <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
                  Bestseller
                </span>
              )}

              <button
                onClick={toggleWishlist}
                className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-md hover:bg-amber-50 transition"
              >
                <Heart
                  className={`w-5 h-5 ${wishlist ? "fill-red-500 text-red-500" : "text-gray-500"
                    }`}
                />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 justify-center flex-wrap">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-24 h-24 rounded-xl overflow-hidden border-2 ${selectedImage === index
                    ? "border-amber-500 shadow-md"
                    : "border-transparent"
                    } transition`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span className="font-semibold">{product.rating}</span>
              <span className="text-gray-500 text-sm">
                ({product.reviews} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              <span className="text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            </div>

            <p className="text-gray-700">{product.description}</p>

            <div className="border-t border-b py-4">
              <h3 className="font-semibold mb-3 text-gray-800">
                Specifications
              </h3>
              <div className="grid sm:grid-cols-2 gap-y-2 text-gray-700">
                {Object.entries(product.details).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize font-medium">{key}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-4 rounded-xl font-semibold shadow-md hover:shadow-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShoppingBag className="w-5 h-5" />{" "}
                {loading ? "Adding..." : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={loading}
                className="flex-1 border-2 border-amber-500 text-amber-600 hover:bg-amber-50 px-6 py-4 rounded-xl font-semibold shadow-sm transition disabled:opacity-50"
              >
                {loading ? "Processing..." : "Buy Now"}
              </button>

            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
