"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("❌ Failed to send message.");
      }
    } catch (error) {
      setStatus("❌ Error sending message.");
    }
  };

  return (
    <main className="bg-gradient-to-b from-white to-yellow-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <Image
          src="/contact-banner.jpg"
          alt="Contact Abhi Jewellers"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center text-white z-10"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-3 tracking-wide">
            Get in <span className="text-yellow-400">Touch</span>
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg">
            We’d love to hear from you. Whether it’s a question, feedback, or a
            custom jewellery request - we’re here to help.
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-20 grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 rounded-2xl shadow-lg border border-yellow-100"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Contact <span className="text-yellow-600">Information</span>
          </h2>
          <ul className="space-y-5 text-gray-700">
            <li className="flex items-center space-x-4">
              <MapPin className="text-yellow-500" />
              <span>Khermai Road Satna</span>
            </li>
            <li className="flex items-center space-x-4">
              <Phone className="text-yellow-500" />
              <span>+91 9109128882</span>
            </li>
            <li className="flex items-center space-x-4">
              <Mail className="text-yellow-500" />
              <span>anand797447@gmail.com</span>
            </li>
          </ul>
          <h1 className="mt-5 text-yellow-600 font-bold">Other wey to contact</h1>
          <div className="flex space-x-5 mt-4">

            <a href="https://www.instagram.com/saurabh0nly/" target="_blank" className="text-gray-500 hover:text-yellow-500 transition"><Instagram size={22} /></a>
            <a href="https://x.com/IMANAND74" target="_blank" className="text-gray-500 hover:text-yellow-500 transition"><Twitter size={22} /></a>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 rounded-2xl shadow-lg border border-yellow-100"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Send <span className="text-yellow-600">a Message</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 transition"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 transition"
            />
          </div>

          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            type="text"
            placeholder="Subject"
            className="w-full p-3 mb-4 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 transition"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            placeholder="Your Message"
            className="w-full p-3 mb-6 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 transition"
          ></textarea>

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold transition w-full"
          >
            Send Message
          </button>
          {status && <p className="mt-3 text-center text-sm text-gray-600">{status}</p>}
        </motion.form>
      </section>
    </main>
  );
}
