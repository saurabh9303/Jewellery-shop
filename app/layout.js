import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import ChatWidget from "@/components/ChatWidget"; // 🧩 Add this import

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Abhi Jewellers",
  description: "Discover premium gold, diamond, and silver jewellery collections.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-amber-50 text-gray-900`}
      >
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ChatWidget /> {/* 💬 Chat feature here */}
        </Providers>
      </body>
    </html>
  );
}
