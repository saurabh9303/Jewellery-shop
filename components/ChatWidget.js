"use client";
import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [chat, setChat] = useState([
    {
      sender: "bot",
      text: "👋 Welcome to Abhi Jewellers! I’m your virtual assistant. How can I help you today?",
    },
  ]);
  const chatEndRef = useRef(null);

  const qaPairs = [
    {
      q: "What types of gold jewellery do you offer?",
      a: "We offer 22K and 18K gold jewellery including necklaces, bangles, rings, earrings, and bridal sets — all BIS Hallmarked for purity.",
    },
    {
      q: "Do you sell certified diamond jewellery?",
      a: "Yes 💎 All our diamond pieces are IGI/GIA certified to ensure authenticity and top-quality craftsmanship.",
    },
    {
      q: "Can I customize my own design?",
      a: "Absolutely! You can share your design or idea with our experts, and we’ll craft a beautiful, one-of-a-kind piece just for you.",
    },
    {
      q: "Do you have men’s gold chains?",
      a: "Yes, we have a wide selection of men’s chains, bracelets, and rings in both gold and platinum finishes.",
    },
    {
      q: "Is all jewellery BIS Hallmarked?",
      a: "Yes ✅ All our gold jewellery carries the BIS Hallmark, guaranteeing purity and trust.",
    },
    {
      q: "Can I exchange my old gold jewellery?",
      a: "Yes, you can exchange your old gold jewellery for new designs at the current market rate after purity testing.",
    },
    {
      q: "Do you provide polishing and cleaning services?",
      a: "We offer lifetime free cleaning and polishing services for all jewellery purchased from Abhi Jewellers.",
    },
    {
      q: "What are your current festive offers?",
      a: "During festive seasons, we offer attractive discounts on diamond and gold jewellery and making charges. Visit our store or follow us for updates!",
    },
    {
      q: "Do you have a lifetime exchange policy?",
      a: "Yes, we offer a lifetime exchange policy on all gold and diamond jewellery purchased from us.",
    },
    {
      q: "What are the trending bridal jewellery sets?",
      a: "Kundan, Polki, Temple, and antique gold sets are trending now — perfect for royal bridal looks 👑.",
    },
    {
      q: "Do you offer silver anklets and toe rings?",
      a: "Yes, we have a wide collection of pure silver anklets, toe rings, and other accessories available.",
    },
    {
      q: "Can I book jewellery online for in-store pickup?",
      a: "Yes, you can reserve your favourite designs online and pick them up at your nearest Abhi Jewellers store.",
    },
    {
      q: "How do I measure my ring size?",
      a: "You can use our online ring size chart or visit our store for an accurate measurement using professional tools.",
    },
    {
      q: "Do you make personalized name pendants?",
      a: "Yes, we craft personalized gold, silver, and diamond name pendants — perfect for gifting 🎁.",
    },
    {
      q: "Can you engrave initials on jewellery?",
      a: "Yes, we provide engraving services for rings, lockets, and bracelets for a small additional charge.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept cash, all major cards, UPI, bank transfers, and digital wallets like Paytm, GPay, and PhonePe.",
    },
    {
      q: "Is EMI or financing available?",
      a: "Yes, EMI options are available on select jewellery purchases through partnered banks and credit cards.",
    },
    {
      q: "Do you offer international delivery?",
      a: "Currently, we deliver across India. For international shipping, contact our customer care for special arrangements 🌍.",
    },
    {
      q: "How can I contact customer support?",
      a: "You can call us at +91-9876543210 or email support@abhijewellers.com. We’re available Mon–Sat, 10AM–8PM.",
    },
    {
      q: "Can I see your latest diamond collections?",
      a: "Sure! Visit our ‘Collections’ section to explore our latest certified diamond rings, earrings, and necklaces 💎.",
    },
  ];

  const handleQuestionClick = (question) => {
    const selected = qaPairs.find((pair) => pair.q === question);
    if (!selected) return;

    setChat((prev) => [...prev, { sender: "user", text: question }]);

    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: selected.a },
      ]);
    }, 600);
  };

  // 👇 Auto-scroll to bottom on new message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.9 }}
            transition={{ duration: 0.35 }}
            className="w-80 sm:w-96 h-[460px] bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl flex flex-col border border-amber-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white px-4 py-3 flex justify-between items-center shadow-md">
              <div className="flex items-center gap-2">
                <Sparkles size={18} />
                <h2 className="font-semibold tracking-wide">Abhi Assistant</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-amber-300/30 rounded-full p-1 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 px-4 py-3 space-y-3 overflow-y-auto bg-gradient-to-br from-amber-50 via-white to-yellow-50">
              {chat.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-2xl max-w-[75%] leading-snug text-sm ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-amber-400 to-yellow-400 text-white"
                        : "bg-white border border-amber-200 text-gray-800 shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Predefined Questions */}
            <div className="border-t border-amber-200 bg-white/80 backdrop-blur-lg p-3">
              <p className="text-xs text-gray-500 mb-2 font-medium">
                Select a question:
              </p>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {qaPairs.map((pair, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuestionClick(pair.q)}
                    className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full border border-amber-300 text-gray-700 hover:bg-amber-100 transition"
                  >
                    {pair.q}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className="relative bg-gradient-to-r from-amber-500 to-yellow-400 text-white p-4 rounded-full shadow-2xl hover:shadow-amber-400/50 transition-all duration-300"
        >
          <MessageCircle size={26} />
          <span className="absolute -top-2 -right-2 bg-white text-amber-600 text-xs px-1.5 py-0.5 rounded-full shadow">
            1
          </span>
        </motion.button>
      )}
    </div>
  );
}
