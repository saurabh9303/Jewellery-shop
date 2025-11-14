"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShoppingBag, Heart, Check, X, AlertCircle, Package, Shield, Truck } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [wishlist, setWishlist] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Notification System
  const showNotification = (type, title, message) => {
    setNotification({ type, title, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // 🟡 Dummy data (replace with DB/API later)
  const products = [
    {
      id: 1,
      name: "Elegant Gold Necklace",
      price: 1,
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
      price: 4,
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
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-yellow-50">
        <div className="text-center bg-white rounded-2xl shadow-2xl p-12 border border-amber-200">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-amber-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Product Not Found</h1>
          <p className="text-slate-600 mb-6">The item you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/shop"
            className="inline-block bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-yellow-700 transition-all shadow-lg"
          >
            Browse Our Collection
          </Link>
        </div>
      </main>
    );
  }

  const toggleWishlist = () => {
    setWishlist(!wishlist);
    if (!wishlist) {
      showNotification("success", "Added to Wishlist", "Product has been saved to your wishlist");
    } else {
      showNotification("info", "Removed from Wishlist", "Product removed from your wishlist");
    }
  };

  // 🟢 Add to Cart Function
  const handleAddToCart = async () => {
    if (!session) {
      showNotification("warning", "Login Required", "Please sign in to add items to your cart");
      setTimeout(() => router.push("/account"), 1500);
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
        showNotification("success", "Added to Cart", `${product.name} has been added to your cart successfully`);
      } else {
        showNotification("error", "Failed", "Unable to add item to cart. Please try again.");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      showNotification("error", "Error", "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = () => {
    if (!session) {
      showNotification("warning", "Login Required", "Please sign in to proceed with purchase");
      setTimeout(() => router.push("/account"), 1500);
      return;
    }
    router.push(`/buy-now/${product.id}`);
  };

  const NotificationIcon = ({ type }) => {
    switch (type) {
      case "success":
        return <Check className="w-6 h-6" />;
      case "error":
        return <X className="w-6 h-6" />;
      case "warning":
        return <AlertCircle className="w-6 h-6" />;
      default:
        return <AlertCircle className="w-6 h-6" />;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Styled Notification System */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-6 right-6 z-50 max-w-md"
          >
            <div
              className={`rounded-2xl shadow-2xl border-2 p-5 backdrop-blur-xl ${
                notification.type === "success"
                  ? "bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-400"
                  : notification.type === "error"
                  ? "bg-gradient-to-br from-red-500 to-red-600 border-red-400"
                  : notification.type === "warning"
                  ? "bg-gradient-to-br from-amber-500 to-yellow-500 border-amber-400"
                  : "bg-gradient-to-br from-blue-500 to-blue-600 border-blue-400"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-white/20 rounded-full p-2">
                  <NotificationIcon type={notification.type} />
                </div>
                <div className="flex-1 text-white">
                  <h4 className="font-bold text-lg mb-1">{notification.title}</h4>
                  <p className="text-sm opacity-95">{notification.message}</p>
                </div>
                <button
                  onClick={() => setNotification(null)}
                  className="flex-shrink-0 text-white hover:bg-white/20 rounded-lg p-1 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto max-w-7xl">
        {/* Professional Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm">
          <Link href="/" className="text-slate-600 hover:text-amber-600 font-medium transition">
            Home
          </Link>
          <span className="text-slate-400">/</span>
          <Link href="/shop" className="text-slate-600 hover:text-amber-600 font-medium transition">
            Shop
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-semibold">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Premium Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-yellow-200 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-slate-100 to-amber-50 border-2 border-amber-200">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-[550px] object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {product.isBestseller && (
                  <span className="absolute top-6 left-6 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white text-sm px-5 py-2 rounded-full font-bold shadow-xl uppercase tracking-wide">
                    ✨ Bestseller
                  </span>
                )}

                <button
                  onClick={toggleWishlist}
                  className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl hover:bg-white hover:scale-110 transition-all duration-300"
                >
                  <Heart
                    className={`w-6 h-6 transition-all ${
                      wishlist ? "fill-red-500 text-red-500 scale-110" : "text-slate-600"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Premium Thumbnails */}
            <div className="flex gap-4 justify-center flex-wrap">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-24 h-24 rounded-2xl overflow-hidden border-3 transition-all duration-300 ${
                    selectedImage === index
                      ? "border-amber-500 shadow-xl scale-110"
                      : "border-amber-200 hover:border-amber-400 hover:scale-105"
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Premium Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Title & Category */}
            <div>
              <span className="inline-block bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-amber-300">
                {product.category}
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-500 px-3 py-1.5 rounded-lg">
                  <Star className="w-4 h-4 fill-white text-white" />
                  <span className="font-bold text-white">{product.rating}</span>
                </div>
                <span className="text-slate-600 font-medium">
                  {product.reviews} verified reviews
                </span>
              </div>
            </div>

            {/* Premium Pricing */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-amber-200">
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-bold bg-gradient-to-r from-amber-700 to-yellow-700 bg-clip-text text-transparent">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <span className="text-2xl text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
                <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">About This Product</h3>
              <p className="text-slate-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Premium Specifications */}
            <div className="bg-white rounded-2xl border-2 border-amber-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Product Specifications</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(product.details).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                      {key}
                    </span>
                    <span className="text-slate-900 font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200">
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-xs font-bold text-blue-900">Certified Quality</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 text-center border border-emerald-200">
                <Truck className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-xs font-bold text-emerald-900">Free Shipping</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 text-center border border-amber-200">
                <Package className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <p className="text-xs font-bold text-amber-900">Premium Packaging</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:from-amber-700 hover:to-yellow-700 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                <ShoppingBag className="w-6 h-6" />
                {loading ? "Adding..." : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={loading}
                className="flex-1 bg-white border-3 border-amber-600 text-amber-700 hover:bg-amber-50 px-8 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
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