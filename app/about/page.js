"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-gradient-to-b from-white to-yellow-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <Image
          src="/about-banner.jpg"
          alt="Jewellery Workshop"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center text-white z-10"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-wide">
            About <span className="text-yellow-400">AbhiJewellers</span>
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Celebrating the art of fine jewellery — where tradition meets modern
            elegance.
          </p>
        </motion.div>
      </section>

      {/* Brand Story */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-yellow-600">Story</span>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Founded in 1998, <strong>AurumJewels</strong> began with a single
            vision — to craft timeless pieces that embody elegance, purity, and
            the eternal beauty of gold and gemstones.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Each creation tells a story of love, artistry, and devotion. With a
            blend of traditional craftsmanship and contemporary design, we bring
            to life jewellery that reflects who you are — graceful, confident,
            and radiant.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="/about-story.jpg"
            alt="Crafting Jewellery"
            fill
            className="object-cover"
          />
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="bg-gradient-to-r from-yellow-100 to-yellow-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[380px] rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src="/about-mission.jpg"
              alt="Jewellery Craftsmanship"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-yellow-600">Mission</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We believe jewellery is more than adornment — it’s an expression
              of identity and emotion. Our mission is to create pieces that
              connect deeply with the wearer, capturing life’s most precious
              moments.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With sustainable practices, ethical sourcing, and handcrafted
              perfection, AurumJewels continues to redefine luxury with purpose.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4"
        >
          Discover the <span className="text-yellow-600">Beauty</span> That
          Defines You
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-gray-600 max-w-2xl mx-auto mb-8"
        >
          Explore our handcrafted collections and experience the art of true
          luxury. Each piece is made to celebrate your story.
        </motion.p>

        <Link
          href="/collections"
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold transition"
        >
          Explore Our Collection
        </Link>
      </section>
    </main>
  );
}
