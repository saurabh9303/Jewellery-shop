"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 via-black to-gray-950 text-gray-300 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative top glow */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-70" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        {/* Brand Section */}
        <div>
          <motion.h2
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-yellow-500 tracking-widest mb-4"
          >
            Abhi<span className="text-white">Jewellers</span>
          </motion.h2>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Discover timeless craftsmanship and modern luxury. Each piece is
            designed to make every moment shine brighter.
          </p>
          <div className="flex space-x-4 mt-4">
            <Link href="https://www.instagram.com/saurabh0nly/" target="_blank" className="hover:text-yellow-500 transition">
              <Instagram size={20} />
            </Link>
            <Link href="https://x.com/IMANAND74" target="_blank" className="hover:text-yellow-500 transition">
              <Twitter size={20} />
            </Link>
            <Link href="https://www.youtube.com/@engineeringcs" target="_blank" className="hover:text-yellow-500 transition">
              <Youtube size={20} />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {["Home", "Shop", "Collections", "About", "Contact"].map((link) => (
              <li key={link}>
                <Link
                  href={`/${link.toLowerCase().replace(" ", "")}`}
                  className="hover:text-yellow-500 transition duration-300"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Customer Care</h3>
          <ul className="space-y-2 text-sm">
            {["FAQs", "Shipping & Returns", "Privacy Policy", "Terms of Service"].map(
              (item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/ & | /g, "-")}`}
                    className="hover:text-yellow-500 transition duration-300"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center space-x-3">
              <MapPin size={18} className="text-yellow-500" />
              <span>Khermai Road Satna</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-yellow-500" />
              <span>+91 9109128882</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-yellow-500" />
              <span>anand797447@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider Line */}
      <div className="my-10 mx-auto w-3/4 h-px bg-gradient-to-r from-transparent via-yellow-700 to-transparent" />

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500">
        © {new Date().getFullYear()} <span className="text-yellow-500 font-semibold">AbhiJewellers</span>. All Rights Reserved.
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-70" />
    </footer>
  );
}
