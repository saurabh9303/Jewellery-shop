"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const heroSlides = [
    {
      image: "/images/hero.jpg",
      title: "Discover Your Inner Sparkle",
      subtitle: "Timeless elegance crafted to perfection",
      icon: "✨",
    },
    {
      image: "/images/necklace.jpg",
      title: "Exquisite Necklaces",
      subtitle: "Statement pieces that define luxury",
      icon: "💎",
    },
    {
      image: "/images/ring.jpg",
      title: "Diamond Dreams",
      subtitle: "Where brilliance meets artistry",
      icon: "💍",
    },
    {
      image: "/images/earrings.jpg",
      title: "Stunning Earrings",
      subtitle: "Elegance that frames your beauty",
      icon: "✨",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  const handleSlideChange = (newIndex) => {
    setDirection(newIndex > currentSlide ? 1 : -1);
    setCurrentSlide(newIndex);
  };

  return (
    <main className="bg-gradient-to-b from-yellow-50 to-white text-gray-900">
      {/* Hero Slider Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
            }}
            className="absolute inset-0"
          >
            <Image
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              fill
              priority
              className="object-cover brightness-75"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

        {/* Hero Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 text-center px-4 max-w-4xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="text-7xl mb-4"
            >
              {heroSlides[currentSlide].icon}
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl mb-4">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto font-light">
              {heroSlides[currentSlide].subtitle}
            </p>
            <div className="mt-10 flex justify-center gap-4 flex-wrap">
              <Link
                href="/shop"
                className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white px-8 py-4 rounded-full font-semibold shadow-2xl transition-all hover:scale-105 hover:shadow-yellow-500/50"
              >
                Shop Now
              </Link>
              <Link
                href="/collections"
                className="bg-white/90 backdrop-blur-sm hover:bg-yellow-100 text-yellow-700 px-8 py-4 rounded-full font-semibold shadow-2xl transition-all hover:scale-105"
              >
                View Collections
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`transition-all duration-300 rounded-full ${currentSlide === index
                  ? "w-12 h-3 bg-yellow-500"
                  : "w-3 h-3 bg-white/50 hover:bg-white/80"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() =>
            handleSlideChange(
              currentSlide === 0 ? heroSlides.length - 1 : currentSlide - 1
            )
          }
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white p-3 md:p-4 rounded-full transition-all hover:scale-110"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6 md:w-8 md:h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={() =>
            handleSlideChange((currentSlide + 1) % heroSlides.length)
          }
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white p-3 md:p-4 rounded-full transition-all hover:scale-110"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6 md:w-8 md:h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </section>

      {/* Featured Collection */}
      <section className="py-20 px-6 md:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent mb-6">
            Featured Collections
          </h2>
          <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Handcrafted masterpieces designed to capture your essence and
            elevate your beauty.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { src: "/images/necklace.jpg", title: "Necklaces", desc: "Timeless elegance" },
            { src: "/images/earrings.jpg", title: "Earrings", desc: "Graceful accents" },
            { src: "/images/ring.jpg", title: "Rings", desc: "Forever bonds" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group rounded-2xl overflow-hidden shadow-xl cursor-pointer bg-white border border-yellow-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm font-light mb-2">{item.desc}</p>
                    <button className="bg-white text-gray-900 px-6 py-2 rounded-full text-sm font-semibold hover:bg-yellow-500 hover:text-white transition-colors">
                      Explore
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-yellow-600 transition-colors">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center text-white">
          {[
            { icon: "✓", title: "Certified Authentic", desc: "100% genuine" },
            { icon: "🚚", title: "Free Shipping", desc: "On orders over ₹10,000" },
            { icon: "🔒", title: "Secure Payment", desc: "Safe & protected" },
            { icon: "↩️", title: "Easy Returns", desc: "30-day guarantee" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h4 className="font-bold text-lg mb-1">{item.title}</h4>
              <p className="text-white/90 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}