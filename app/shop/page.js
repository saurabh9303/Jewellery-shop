"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Heart, ShoppingBag, Star } from "lucide-react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function ProfessionalShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [wishlist, setWishlist] = useState([]);

  const { data: session } = useSession();
const router = useRouter();

  const categories = ["All", "Necklaces", "Rings", "Earrings", "Bracelets", "Pendants", "Bangles"];

  const products = [
    {
      id: 1,
      name: "Elegant Gold Necklace",
      price: 25999,
      originalPrice: 32999,
      image: "/images/necklace.jpg",
      category: "Necklaces",
      rating: 4.8,
      reviews: 127,
      inStock: true,
      isBestseller: true,
      description: "Handcrafted 22K gold necklace with intricate design",
      metal: "22K Gold",
      weight: "28.5g",
      purity: "916 Hallmark",
    },
    {
      id: 2,
      name: "Diamond Ring",
      price: 45499,
      originalPrice: 52999,
      image: "/images/ring.jpg",
      category: "Rings",
      rating: 4.9,
      reviews: 203,
      inStock: true,
      isBestseller: true,
      isNew: true,
      description: "Solitaire diamond ring in platinum setting",
      metal: "Platinum",
      weight: "4.2g",
      diamond: "0.75 Carat",
    },
    {
      id: 3,
      name: "Pearl Earrings",
      price: 15799,
      originalPrice: 19999,
      image: "/images/earrings.jpg",
      category: "Earrings",
      rating: 4.7,
      reviews: 89,
      inStock: true,
      description: "Natural pearl drop earrings in 18K gold",
      metal: "18K Gold",
      weight: "6.8g",
      pearl: "8mm Natural",
    },
    {
      id: 4,
      name: "Royal Bracelet",
      price: 29999,
      originalPrice: 35999,
      image: "/images/bracelet.jpg",
      category: "Bracelets",
      rating: 4.6,
      reviews: 64,
      inStock: true,
      description: "Traditional gold bracelet with filigree work",
      metal: "22K Gold",
      weight: "18.3g",
      purity: "916 Hallmark",
    },
    {
      id: 5,
      name: "Luxury Pendant",
      price: 22499,
      originalPrice: 27999,
      image: "/images/pendant.jpg",
      category: "Pendants",
      rating: 4.8,
      reviews: 142,
      inStock: true,
      isNew: true,
      description: "Diamond-studded pendant with matching chain",
      metal: "18K Gold",
      weight: "12.5g",
      diamond: "0.35 Carat",
    },
    {
      id: 6,
      name: "Gold Bangles Set",
      price: 35999,
      originalPrice: 42999,
      image: "/images/bangles.jpg",
      category: "Bangles",
      rating: 4.9,
      reviews: 178,
      inStock: true,
      isBestseller: true,
      description: "Set of 4 traditional gold bangles",
      metal: "22K Gold",
      weight: "42.0g",
      purity: "916 Hallmark",
    },
  ];

  const filteredProducts = products
    .filter((p) => selectedCategory === "All" || p.category === selectedCategory)
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  const addToCart = async (product) => {
  try {
    // 🧠 If not logged in, redirect to login (Google)
    if (!session) {
      alert("Please sign in to add items to your cart.");
      signIn("google");
      return;
    }

    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      }),
    });

    if (!res.ok) {
      if (res.status === 401) {
        alert("Please sign in to add to cart.");
        signIn("google");
        return;
      }
      throw new Error(`Failed to add to cart (${res.status})`);
    }

    const data = await res.json();
    console.log("✅ Cart updated:", data);
    alert(`${product.name} added to cart successfully!`);
  } catch (err) {
    console.error("❌ Error adding to cart:", err);
    alert("Something went wrong. Please try again later.");
  }
};




  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-amber-50">
      <div className="container mx-auto px-6 py-12">
        {/* HEADER */}
        <header className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              Exquisite Jewelry Collection
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Discover fine jewelry meticulously handcrafted by artisans using
              certified and ethically sourced materials.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="h-1 w-20 bg-gradient-to-r from-transparent to-amber-500 rounded-full" />
              <div className="h-2 w-2 rounded-full bg-amber-500" />
              <div className="h-1 w-20 bg-gradient-to-l from-transparent to-amber-500 rounded-full" />
            </div>
          </motion.div>
        </header>

        {/* FILTER BAR */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 border border-gray-100">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jewelry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition"
              />
            </div>

            {/* Category */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition appearance-none bg-white cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition appearance-none bg-white cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Result Count */}
          <div className="mt-4 flex items-center gap-3 flex-wrap text-sm text-gray-600">
            <span className="font-medium">{filteredProducts.length} Products Found</span>
            {selectedCategory !== "All" && (
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full flex items-center gap-2">
                {selectedCategory}
                <button onClick={() => setSelectedCategory("All")} className="hover:text-amber-900">×</button>
              </span>
            )}
          </div>
        </div>

        {/* PRODUCT GRID */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-amber-300 shadow-sm hover:shadow-2xl transition-all duration-300"
              >
                {/* BADGES */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                  {product.isBestseller && (
                    <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
                      Bestseller
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
                      New Arrival
                    </span>
                  )}
                  {!product.inStock && (
                    <span className="bg-gray-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* WISHLIST */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-amber-50 transition"
                >
                  <Heart
                    className={`w-5 h-5 ${wishlist.includes(product.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400"
                      }`}
                  />
                </button>

                {/* IMAGE */}
                <div className="relative h-72 bg-gradient-to-br from-gray-50 to-amber-50 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {product.originalPrice && (
                    <div className="absolute bottom-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      Save ₹{(product.originalPrice - product.price).toLocaleString("en-IN")}
                    </div>
                  )}
                </div>

                {/* DETAILS */}
                <div className="p-5">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-md font-medium">
                      {product.metal}
                    </span>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium">
                      {product.weight}
                    </span>
                    {product.purity && (
                      <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-md font-medium">
                        {product.purity}
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 disabled:from-gray-300 disabled:to-gray-400 text-white px-4 py-3 rounded-xl text-sm font-semibold shadow-md hover:shadow-xl transition disabled:cursor-not-allowed"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      {product.inStock ? "Add to Cart" : "Unavailable"}
                    </button>



                    <Link
                      href={`/shop/${product.id}`}
                      className="border-2 border-amber-500 text-amber-600 hover:bg-amber-50 px-4 py-3 rounded-xl text-sm font-semibold text-center transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}