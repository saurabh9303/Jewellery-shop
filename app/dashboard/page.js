"use client";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    // Redirect if user not logged in
    useEffect(() => {
        if (status === "unauthenticated") router.push("/signin");
    }, [status, router]);

    // Fetch Orders
    useEffect(() => {
        if (session?.user?.email) {
            fetch(`/api/order?email=${session.user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setOrders(data.orders || []);
                    setLoadingOrders(false);
                })
                .catch(() => setLoadingOrders(false));
        }
    }, [session]);

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
                <div className="text-center">
                    <div className="w-20 h-20 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-700 font-semibold text-lg">Loading Your Exclusive Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
            
            {/* ============================== HEADER =============================== */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-amber-200/50 shadow-lg">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-xl blur opacity-40"></div>
                                <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 shadow-xl">
                                    <span className="text-xl font-bold text-white">AJ</span>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-700 via-yellow-700 to-amber-800 bg-clip-text text-transparent">
                                    Abhi Jewellers
                                </h1>
                                <p className="text-xs font-medium text-amber-600 tracking-wide uppercase">Luxury Collection</p>
                            </div>
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: "/account" })}
                            className="px-5 py-2.5 text-sm font-semibold text-amber-800 hover:text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg transition-all duration-200 border border-amber-300"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            {/* ============================== MAIN CONTENT =============================== */}
            <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">

                {/* ============================== USER PROFILE =============================== */}
                <section className="relative bg-gradient-to-r from-white via-amber-50/30 to-white rounded-2xl border border-amber-200/60 p-8 mb-10 shadow-xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-200/20 to-transparent rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-yellow-200/20 to-transparent rounded-full blur-3xl"></div>
                    
                    <div className="relative flex items-center gap-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full blur-lg opacity-30"></div>
                            <img
                                src={session?.user?.image || "/default-avatar.png"}
                                className="relative w-24 h-24 rounded-full border-4 border-white shadow-2xl object-cover ring-2 ring-amber-300"
                                alt="Profile"
                            />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-slate-900 mb-1">
                                Welcome back, {session?.user?.name}
                            </h2>
                            <p className="text-amber-700 font-medium mb-2">
                                Valued Client
                            </p>
                            <p className="text-slate-600 text-sm">
                                {session?.user?.email}
                            </p>
                        </div>
                    </div>
                </section>

                {/* ============================== QUICK STATS =============================== */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                    <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-300">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                        
                        <div className="relative">
                            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <p className="text-blue-100 text-sm font-semibold uppercase tracking-wider mb-2">Total Orders</p>
                            <p className="text-5xl font-bold text-white">{orders.length}</p>
                        </div>
                    </div>

                    <div className="relative bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-300">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                        
                        <div className="relative">
                            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-amber-100 text-sm font-semibold uppercase tracking-wider mb-2">Pending Payments</p>
                            <p className="text-5xl font-bold text-white">
                                {orders.filter(o => o.paymentStatus !== "PAID").length}
                            </p>
                        </div>
                    </div>

                    <div className="relative bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-300">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                        
                        <div className="relative">
                            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-emerald-100 text-sm font-semibold uppercase tracking-wider mb-2">Delivered</p>
                            <p className="text-5xl font-bold text-white">
                                {orders.filter(o => o.orderStatus === "DELIVERED").length}
                            </p>
                        </div>
                    </div>

                </section>

                {/* ============================== RECOMMENDED PRODUCTS =============================== */}
                <section className="mb-10">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">Curated For You</h3>
                            <p className="text-amber-700 text-sm font-medium">Handpicked luxury pieces</p>
                        </div>
                        <button className="px-5 py-2.5 text-sm font-semibold text-amber-700 hover:text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-lg transition-all border border-amber-300">
                            View Collection
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { id: 1, name: "Luxury Gold Necklace", price: "₹45,000", img: "/images/gold1.jpg" },
                            { id: 2, name: "Premium Diamond Earrings", price: "₹28,000", img: "/images/diamond1.jpg" },
                            { id: 3, name: "Royal Kundan Set", price: "₹60,000", img: "/images/kundan1.jpg" },
                            { id: 4, name: "Elegant Gold Bracelet", price: "₹18,500", img: "/images/bracelet1.jpg" },
                        ].map((item) => (
                            <div
                                key={item.id}
                                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-100 hover:border-amber-300"
                            >
                                <div className="aspect-square overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50">
                                    <img 
                                        src={item.img} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                        alt={item.name}
                                    />
                                </div>

                                <div className="p-5">
                                    <h4 className="text-base font-bold text-slate-900 mb-2 line-clamp-2">{item.name}</h4>
                                    <p className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-yellow-700 bg-clip-text text-transparent mb-4">
                                        {item.price}
                                    </p>

                                    <button className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white text-sm font-bold py-3 rounded-xl hover:from-amber-700 hover:to-yellow-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                        Explore Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ============================== ORDERS =============================== */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">Order History</h3>
                            <p className="text-amber-700 text-sm font-medium">Track your luxury purchases</p>
                        </div>
                        <button className="px-5 py-2.5 text-sm font-semibold text-amber-700 hover:text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-lg transition-all border border-amber-300">
                            View All Orders
                        </button>
                    </div>

                    {loadingOrders ? (
                        <div className="bg-white/80 backdrop-blur-xl border border-amber-200 rounded-2xl p-16 text-center shadow-xl">
                            <div className="w-16 h-16 border-4 border-amber-300 border-t-amber-600 rounded-full animate-spin mx-auto mb-6"></div>
                            <p className="text-slate-700 font-semibold text-lg">Fetching your orders...</p>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="bg-gradient-to-br from-white to-amber-50/50 border border-amber-200 rounded-2xl p-16 text-center shadow-xl">
                            <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <p className="text-slate-800 font-bold text-xl mb-2">No Orders Yet</p>
                            <p className="text-slate-600">Start exploring our exclusive jewellery collection</p>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {orders.map((order) => (
                                <div
                                    key={order._id}
                                    className="bg-white/90 backdrop-blur-xl border border-amber-200 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:border-amber-300"
                                >
                                    <div className="flex gap-6">
                                        <div className="relative flex-shrink-0">
                                            <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-yellow-200 rounded-xl blur opacity-30"></div>
                                            <img
                                                src={order.products[0]?.image}
                                                className="relative w-28 h-28 rounded-xl border-2 border-amber-200 object-cover shadow-lg"
                                                alt={order.products[0]?.name}
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4 mb-4">
                                                <div>
                                                    <p className="text-lg font-bold text-slate-900 mb-1">
                                                        {order.products[0].name}
                                                    </p>
                                                    <p className="text-sm text-slate-600">
                                                        Quantity: <span className="font-semibold text-amber-700">{order.products[0].quantity}</span>
                                                    </p>
                                                </div>
                                                <span
                                                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide shadow-lg ${
                                                        order.paymentStatus === "PAID"
                                                            ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
                                                            : "bg-gradient-to-r from-amber-400 to-yellow-500 text-white"
                                                    }`}
                                                >
                                                    {order.paymentStatus}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-8">
                                                    <div>
                                                        <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Order ID</p>
                                                        <p className="font-bold text-slate-900 font-mono">
                                                            #{order._id.slice(-8).toUpperCase()}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Order Date</p>
                                                        <p className="font-bold text-slate-900">
                                                            {new Date(order.createdAt).toLocaleDateString('en-IN', { 
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric'
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Total Amount</p>
                                                    <p className="font-bold text-2xl bg-gradient-to-r from-amber-700 to-yellow-700 bg-clip-text text-transparent">
                                                        ₹{order.totalAmount.toLocaleString('en-IN')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

            </main>

            {/* ============================== FOOTER =============================== */}
            <footer className="mt-16 bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 border-t border-amber-200 py-8">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-sm text-slate-600">
                        © 2024 Abhi Jewellers. Crafting timeless elegance since decades.
                    </p>
                </div>
            </footer>

        </div>
    );
}