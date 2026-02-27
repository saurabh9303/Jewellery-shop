"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

export default function ChatAssistant() {
  const { data: session } = useSession();
  const userName = session?.user?.name?.split(" ")[0] || "Guest";

  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);

  const qaPairs = [
    { q: "Gold Jewellery", a: "We offer 22K and 18K BIS Hallmarked gold jewellery including necklaces, bangles, rings, earrings, and bridal collections." },
    { q: "Diamond Jewellery", a: "All our diamond jewellery is IGI or GIA certified to ensure authenticity and superior craftsmanship." },
    { q: "Customization", a: "Yes, our expert designers can create personalized jewellery based on your specific requirements." },
    { q: "EMI Options", a: "Flexible EMI options are available through partnered banks and credit card providers." },
    { q: "Shipping", a: "We offer insured express shipping across India with secure packaging for all orders." },
    { q: "Returns", a: "We accept returns within 7 days of delivery, subject to product condition verification." },
    { q: "Store Visit", a: "Our flagship store is open Monday–Saturday, 10 AM to 8 PM. Walk-ins and appointments both welcome." },
  ];

  useEffect(() => {
    setChat([
      {
        id: Date.now(),
        sender: "bot",
        text: `Welcome, ${userName}. How may we assist you today?`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  }, [userName]);

  const sendMessage = (message) => {
    if (!message.trim()) return;

    setChat((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setInput("");
    setIsTyping(true);

    const matched = qaPairs.find((pair) =>
      message.toLowerCase().includes(pair.q.toLowerCase())
    );

    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: matched
            ? matched.a
            : "Thank you for your message. Our team will get back to you shortly.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, isTyping]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        .ij * { box-sizing: border-box; }
        .ij { font-family: 'DM Sans', sans-serif; }

        .ij-panel {
          width: 320px;
          height: 480px;
          background: #111;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(196,158,84,0.15);
        }

        .ij-header {
          background: #111;
          padding: 16px 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(196,158,84,0.15);
        }

        .ij-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ij-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c49e54, #8a6b2e);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          font-weight: 600;
          color: #111;
          flex-shrink: 0;
        }

        .ij-header-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          font-weight: 600;
          color: #e8d5a3;
          letter-spacing: 0.04em;
          margin: 0 0 2px;
          line-height: 1;
        }

        .ij-header-sub {
          font-size: 11px;
          color: #6a5c3e;
          margin: 0;
          font-weight: 300;
          letter-spacing: 0.04em;
        }

        .ij-close {
          background: none;
          border: none;
          color: #5a4f38;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          transition: color 0.15s;
        }
        .ij-close:hover { color: #c49e54; }

        .ij-body {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #0c0c0c;
          scrollbar-width: thin;
          scrollbar-color: #2a2318 transparent;
        }
        .ij-body::-webkit-scrollbar { width: 3px; }
        .ij-body::-webkit-scrollbar-thumb { background: #2a2318; border-radius: 2px; }

        .ij-row { display: flex; }
        .ij-row.user { justify-content: flex-end; }
        .ij-row.bot  { justify-content: flex-start; }

        .ij-bubble {
          max-width: 80%;
          padding: 10px 14px;
          font-size: 13px;
          line-height: 1.6;
          font-weight: 300;
        }

        .ij-bubble.user {
          background: linear-gradient(135deg, #c49e54, #9e7c38);
          color: #111;
          font-weight: 400;
          border-radius: 12px 12px 2px 12px;
        }

        .ij-bubble.bot {
          background: #1a1a1a;
          color: #c8bfa8;
          border: 1px solid rgba(196,158,84,0.1);
          border-radius: 12px 12px 12px 2px;
        }

        .ij-time {
          font-size: 9.5px;
          margin-top: 5px;
          opacity: 0.45;
          text-align: right;
        }
        .ij-bubble.bot .ij-time { text-align: left; }

        .ij-typing-row {
          display: flex;
          align-items: center;
          padding: 4px 6px;
        }
        .ij-dots { display: flex; gap: 4px; }
        .ij-dots span {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #c49e54;
          animation: dot-bounce 1.2s ease-in-out infinite;
        }
        .ij-dots span:nth-child(2) { animation-delay: 0.2s; }
        .ij-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes dot-bounce {
          0%, 80%, 100% { opacity: 0.2; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-3px); }
        }

        /* ── Quick Actions: always-visible gold horizontal scrollbar ── */
        .ij-quick-wrap {
          border-top: 1px solid rgba(196,158,84,0.1);
          background: #111;
          padding: 10px 14px 8px;
          overflow-x: scroll;
          overflow-y: hidden;
          scrollbar-width: thin;
          scrollbar-color: #c49e54 #1e1505;
        }
        .ij-quick-wrap::-webkit-scrollbar {
          height: 4px;
        }
        .ij-quick-wrap::-webkit-scrollbar-track {
          background: #1e1505;
          border-radius: 99px;
          margin: 0 4px;
        }
        .ij-quick-wrap::-webkit-scrollbar-thumb {
          background: #c49e54;
          border-radius: 99px;
        }
        .ij-quick-wrap::-webkit-scrollbar-thumb:hover {
          background: #e8c97a;
        }

        .ij-quick-inner {
          display: flex;
          gap: 8px;
          width: max-content;
          padding-bottom: 6px;
        }

        .ij-chip {
          flex-shrink: 0;
          font-family: 'DM Sans', sans-serif;
          font-size: 11.5px;
          font-weight: 400;
          padding: 5px 13px;
          border: 1px solid rgba(196,158,84,0.22);
          background: transparent;
          color: #8a7a5a;
          cursor: pointer;
          border-radius: 99px;
          transition: all 0.18s ease;
          white-space: nowrap;
        }
        .ij-chip:hover {
          border-color: #c49e54;
          color: #c49e54;
          background: rgba(196,158,84,0.06);
        }

        .ij-input-row {
          border-top: 1px solid rgba(196,158,84,0.1);
          padding: 12px 14px;
          background: #111;
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .ij-input {
          flex: 1;
          background: #1a1a1a;
          border: 1px solid rgba(196,158,84,0.15);
          border-radius: 8px;
          padding: 9px 13px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: #c8bfa8;
          outline: none;
          transition: border-color 0.18s;
        }
        .ij-input::placeholder { color: #3a3020; font-style: italic; }
        .ij-input:focus { border-color: rgba(196,158,84,0.35); }

        .ij-send {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #c49e54, #9e7c38);
          border: none;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: #111;
          flex-shrink: 0;
          transition: opacity 0.18s;
        }
        .ij-send:hover { opacity: 0.85; }

        .ij-fab {
          width: 54px; height: 54px;
          background: linear-gradient(135deg, #c49e54, #9e7c38);
          border: none;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: #111;
          box-shadow: 0 8px 28px rgba(196,158,84,0.35), 0 2px 8px rgba(0,0,0,0.4);
        }
      `}</style>

      <div className="ij" style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 9999 }}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="ij-panel"
              initial={{ opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Header */}
              <div className="ij-header">
                <div className="ij-header-left">
                  <div className="ij-avatar">IJ</div>
                  <div>
                    <p className="ij-header-title">Imperial Jewels</p>
                    <p className="ij-header-sub">Exclusive Assistance for {userName}</p>
                  </div>
                </div>
                <button className="ij-close" onClick={() => setIsOpen(false)}>
                  <X size={16} strokeWidth={2} />
                </button>
              </div>

              {/* Messages */}
              <div className="ij-body">
                {chat.map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={`ij-row ${msg.sender}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`ij-bubble ${msg.sender}`}>
                      {msg.text}
                      <div className="ij-time">{msg.time}</div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <div className="ij-typing-row">
                    <div className="ij-dots">
                      <span /><span /><span />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Actions with horizontal scrollbar */}
              <div className="ij-quick-wrap">
                <div className="ij-quick-inner">
                  {qaPairs.map((pair, i) => (
                    <button key={i} className="ij-chip" onClick={() => sendMessage(pair.q)}>
                      {pair.q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="ij-input-row">
                <input
                  type="text"
                  className="ij-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                  placeholder="Type your message…"
                />
                <button className="ij-send" onClick={() => sendMessage(input)}>
                  <Send size={15} strokeWidth={2} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB */}
        {!isOpen && (
          <motion.button
            className="ij-fab"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
          >
            <MessageCircle size={22} strokeWidth={1.8} />
          </motion.button>
        )}
      </div>
    </>
  );
}