"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function CollectionsPage() {
  const collections = [
    {
      id: 1,
      name: "Bridal Collection",
      description: "Timeless designs crafted for your most special day.",
      image: "/bridal.jpg",
    },
    {
      id: 2,
      name: "Diamond Elegance",
      description: "Experience the brilliance of pure diamonds.",
      image: "/diamond.jpg",
    },
    {
      id: 3,
      name: "Traditional Heritage",
      description: "Classic Indian artistry with a touch of royal grace.",
      image: "/traditional.jpg",
    },
    {
      id: 4,
      name: "Everyday Glam",
      description: "Subtle yet stunning pieces for your daily elegance.",
      image: "/everyday.jpg",
    },
    {
      id: 5,
      name: "Men’s Collection",
      description: "Bold designs that redefine men’s luxury fashion.",
      image: "/mens.jpg",
    },
    {
      id: 6,
      name: "Limited Edition",
      description: "Rare and exquisite designs for true connoisseurs.",
      image: "/limited.jpg",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-yellow-50 text-gray-900 px-6 md:px-16 py-16">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-3">
          Our <span className="text-yellow-600">Collections</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Explore our exquisite collections — where timeless elegance meets
          modern design. Crafted with precision and passion.
        </p>
        <div className="mt-6 w-24 mx-auto h-1 bg-yellow-500 rounded-full"></div>
      </div>

      {/* Collections Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {collections.map((collection) => (
          <motion.div
            key={collection.id}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all group"
          >
            {/* Image */}
            <div className="relative h-[400px] w-full">
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-90 group-hover:opacity-80 transition"></div>
            </div>

            {/* Overlay Text */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-2xl font-bold mb-2 tracking-wide"
              >
                {collection.name}
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-sm text-gray-200"
              >
                {collection.description}
              </motion.p>
              <Link
                href={`/collections/${collection.id}`}
                className="inline-block mt-4 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-semibold px-4 py-2 rounded-full transition"
              >
                Explore Now
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
