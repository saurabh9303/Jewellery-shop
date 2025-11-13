"use client";
import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Redirect unauthenticated users
    useEffect(() => {
        if (status === "unauthenticated") router.push("/signin");
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center text-amber-700 text-lg font-medium">
                Loading your dashboard...
            </div>
        );
    }

    if (status === "unauthenticated") return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 px-4 sm:px-6 md:px-10 py-6">
            {/* Header */}
            <header className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-5">
                <div className="flex items-center gap-3">
                    {/* Logo SVG */}
                    <svg
                        width="60"
                        height="60"
                        viewBox="0 0 200 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="100" cy="100" r="95" stroke="#D4AF37" strokeWidth="8" fill="white" />
                        <text
                            x="50%"
                            y="54%"
                            textAnchor="middle"
                            fill="#B8860B"
                            fontSize="48"
                            fontFamily="serif"
                            fontWeight="bold"
                            dy=".3em"
                        >
                            AJ
                        </text>
                    </svg>
                    <h1 className="text-3xl sm:text-4xl font-bold text-amber-800">
                        Abhi Jewellers
                    </h1>
                </div>


            </header>

            {/* Profile Section */}
            <section className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 sm:gap-8 mb-12 border border-amber-100">
                <img
                    src={session?.user?.image || "/default-avatar.png"}
                    alt="User avatar"
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-amber-400 shadow-md object-cover"
                />
                <div className="text-center md:text-left">
                    <h2 className="text-xl sm:text-2xl font-semibold text-amber-800">
                        Welcome, {session?.user?.name || "Guest"} 👋
                    </h2>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">
                        We’re delighted to see you at <b>Abhi Jewellers</b>. Discover
                        elegance and style handpicked just for you.
                    </p>
                    <p className="mt-3 text-gray-500 text-xs sm:text-sm">
                        Email: {session?.user?.email || "Not available"}
                    </p>
                </div>
            </section>

            {/* Recommended Jewellery Section */}
            <section className="mb-16">
                <h3 className="text-2xl font-bold text-amber-700 mb-6 text-center sm:text-left">
                    ✨ Recommended for You
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                    {[
                        { id: 1, name: "Elegant Gold Necklace", price: "₹45,000", img: "/images/gold1.jpg" },
                        { id: 2, name: "Diamond Stud Earrings", price: "₹28,000", img: "/images/diamond1.jpg" },
                        { id: 3, name: "Royal Kundan Set", price: "₹60,000", img: "/images/kundan1.jpg" },
                        { id: 4, name: "Modern Bracelet", price: "₹18,500", img: "/images/bracelet1.jpg" },
                    ].map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden border border-amber-100"
                        >
                            <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-52 sm:h-56 object-cover"
                            />
                            <div className="p-4 text-center">
                                <h4 className="text-lg font-semibold text-amber-800">
                                    {item.name}
                                </h4>
                                <p className="text-gray-600 mt-1">{item.price}</p>
                                <button className="mt-3 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition text-sm font-medium w-full sm:w-auto">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Recent Orders */}
            <section className="mb-10">
                <h3 className="text-2xl font-bold text-amber-700 mb-4 text-center sm:text-left">
                    📦 Recent Orders
                </h3>
                <div className="bg-white/80 backdrop-blur-md border border-amber-100 shadow-md rounded-xl overflow-x-auto">
                    <table className="w-full min-w-[600px] text-left">
                        <thead className="bg-amber-100 text-amber-900 text-sm sm:text-base">
                            <tr>
                                <th className="p-4">Order ID</th>
                                <th className="p-4">Item</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Price</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm sm:text-base">
                            <tr className="border-b border-amber-50">
                                <td className="p-4 text-gray-700">#AJ1023</td>
                                <td className="p-4">Gold Pendant Set</td>
                                <td className="p-4 text-green-600 font-medium">Delivered</td>
                                <td className="p-4">₹32,000</td>
                            </tr>
                            <tr className="border-b border-amber-50">
                                <td className="p-4 text-gray-700">#AJ1041</td>
                                <td className="p-4">Silver Bracelet</td>
                                <td className="p-4 text-yellow-600 font-medium">In Transit</td>
                                <td className="p-4">₹12,500</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <button
                onClick={() => signOut({ callbackUrl: "/account" })}
                className="bg-amber-600 text-white px-5 py-2 rounded-lg hover:bg-amber-700 transition font-medium w-full sm:w-auto"
            >
                Sign Out
            </button>
        </div>
    );
}