"use client";

import { useEffect, useState } from "react";

// ===== Styled Alert Component =====
const Alert = ({ message, type = "info", onClose }) => {
  const colors = {
    info: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
  };
  return (
    <div className={`p-3 rounded mb-3 ${colors[type]} flex justify-between items-center`}>
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="font-bold ml-4">&times;</button>
      )}
    </div>
  );
};

// ===== Confirmation Modal Component =====
const ConfirmModal = ({ visible, message, onConfirm, onCancel }) => {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
        <p className="mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AdminDashboardPage() {
  // Active Tab
  const [activeTab, setActiveTab] = useState("users");

  // ============ USERS =============== //
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [userError, setUserError] = useState("");

  // ============ ORDERS ============== //
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [orderError, setOrderError] = useState("");

  // ============ MESSAGES ============== //
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messageError, setMessageError] = useState("");

  // ============ ALERT / CONFIRM ============ //
  const [alert, setAlert] = useState(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // ================= FETCH USERS =================== //
  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Failed to load users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setUserError(err.message);
    } finally {
      setLoadingUsers(false);
    }
  };

  // ================= FETCH ORDERS =================== //
  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const res = await fetch("/api/order");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load orders");
      setOrders(data.orders || []);
    } catch (err) {
      setOrderError(err.message);
    } finally {
      setLoadingOrders(false);
    }
  };

  // ================= FETCH CONTACT MESSAGES =================== //
  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load messages");
      setMessages(data.messages || []);
    } catch (err) {
      setMessageError(err.message);
    } finally {
      setLoadingMessages(false);
    }
  };

  // ================= DELETE USER =================== //
  const deleteUser = async () => {
    if (!userToDelete) return;
    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userToDelete }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      setUsers(users.filter((u) => u._id !== userToDelete));
      setAlert({ type: "success", message: "User deleted successfully!" });
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setUserToDelete(null);
      setConfirmVisible(false);
    }
  };

  // Fetch all on page load
  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchMessages();
  }, []);

  const tabs = [
    { id: "users", label: "Users", icon: "👥", count: users.length },
    { id: "orders", label: "Orders", icon: "📦", count: orders.length },
    { id: "messages", label: "Messages", icon: "✉️", count: messages.length },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* LEFT SIDEBAR */}
      <div className="w-64 bg-white border-r border-gray-200 flex mt-20 flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-sm text-gray-500 mt-1">Dashboard Overview</p>
        </div>
        
        <nav className="flex-1 p-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-all duration-200 flex items-center justify-between ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-xl">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                activeTab === tab.id
                  ? "bg-white/20 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* RIGHT CONTENT AREA */}
      <div className="flex-1 mt-15 overflow-x-auto overflow-y-auto max-h-[500px] ">
        <div className="p-8">
          {/* ALERT */}
          {alert && (
            <Alert
              message={alert.message}
              type={alert.type}
              onClose={() => setAlert(null)}
            />
          )}

          {/* CONFIRM MODAL */}
          <ConfirmModal
            visible={confirmVisible}
            message="Are you sure you want to delete this user?"
            onConfirm={deleteUser}
            onCancel={() => setConfirmVisible(false)}
          />

          {/* ================= USERS TABLE ================= */}
          {activeTab === "users" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
                <h2 className="text-xl font-semibold text-gray-800">All Users</h2>
                <p className="text-sm text-gray-500 mt-1">Manage user accounts and permissions</p>
              </div>
              <div className="p-0">
                {userError && <div className="p-6"><Alert message={userError} type="error" /></div>}
                {loadingUsers ? (
                  <div className="text-center py-16">
                    <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600 font-medium">Loading users...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">Name</th>
                          <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">Email</th>
                          <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">Role</th>
                          <th className="text-center py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {users.length === 0 && (
                          <tr>
                            <td colSpan="4" className="text-center py-12 text-gray-500">
                              <div className="text-4xl mb-2">👥</div>
                              <p className="font-medium">No Users Found</p>
                            </td>
                          </tr>
                        )}
                        {users.map((user, index) => (
                          <tr key={user._id} className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                            <td className="py-4 px-6 font-medium text-gray-800">{user.name}</td>
                            <td className="py-4 px-6 text-gray-600 text-sm">{user.email}</td>
                            <td className="py-4 px-6">
                              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 uppercase">
                                {user.role}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <button
                                onClick={() => {
                                  setUserToDelete(user._id);
                                  setConfirmVisible(true);
                                }}
                                className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors shadow-sm font-medium"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= ORDERS TABLE ================= */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-white">
                <h2 className="text-xl font-semibold text-gray-800">All Orders</h2>
                <p className="text-sm text-gray-500 mt-1">Track and manage customer orders</p>
              </div>
              <div className="p-0">
                {orderError && <div className="p-6"><Alert message={orderError} type="error" /></div>}
                {loadingOrders ? (
                  <div className="text-center py-16">
                    <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600 font-medium">Loading orders...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-4 px-4 font-semibold text-gray-700 text-xs uppercase tracking-wide min-w-[120px]">Order ID</th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-700 text-xs uppercase tracking-wide min-w-[160px]">Customer</th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-700 text-xs uppercase tracking-wide min-w-[200px]">Products</th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-700 text-xs uppercase tracking-wide min-w-[220px]">Shipping Address</th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-700 text-xs uppercase tracking-wide min-w-[140px]">Payment</th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-700 text-xs uppercase tracking-wide min-w-[120px]">Order Status</th>
                          <th className="text-right py-4 px-4 font-semibold text-gray-700 text-xs uppercase tracking-wide min-w-[100px]">Amount</th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-700 text-xs uppercase tracking-wide min-w-[140px]">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {orders.length === 0 && (
                          <tr>
                            <td colSpan="8" className="text-center py-12 text-gray-500">
                              <div className="text-4xl mb-2">📦</div>
                              <p className="font-medium">No Orders Found</p>
                            </td>
                          </tr>
                        )}
                        {orders.map((order, index) => (
                          <tr key={order._id} className={`hover:bg-purple-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                            <td className="py-4 px-4 font-mono text-xs text-blue-600 font-medium">
                              {order._id.substring(0, 8)}...
                            </td>
                            <td className="py-4 px-4">
                              <div className="font-semibold text-gray-800">{order.userName}</div>
                              <div className="text-xs text-gray-500 mt-0.5">{order.userEmail}</div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="space-y-2">
                                {order.products.map((p) => (
                                  <div key={p.productId} className="bg-gray-100 rounded px-2 py-1.5">
                                    <div className="font-medium text-gray-800 text-xs">{p.name}</div>
                                    <div className="text-xs text-gray-600 mt-0.5">
                                      <span className="font-semibold">Qty:</span> {p.quantity} × ₹{p.price}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="py-4 px-4 text-xs">
                              <div className="space-y-0.5">
                                <div className="font-semibold text-gray-800">{order.address.fullName}</div>
                                <div className="text-gray-600">{order.address.house}, {order.address.road}</div>
                                <div className="text-gray-600">{order.address.city}, {order.address.state} - {order.address.pincode}</div>
                                <div className="text-gray-600 font-medium mt-1">📞 {order.address.phone}</div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="space-y-1.5">
                                <div className="text-xs text-gray-600">
                                  <span className="font-semibold">Method:</span> {order.paymentMethod}
                                </div>
                                <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${
                                  order.paymentStatus === "PAID" ? "bg-green-100 text-green-700" :
                                  order.paymentStatus === "FAILED" ? "bg-red-100 text-red-700" :
                                  "bg-yellow-100 text-yellow-700"
                                }`}>
                                  {order.paymentStatus}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="inline-block px-3 py-1.5 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 uppercase">
                                {order.orderStatus}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right font-bold text-gray-800 text-base">
                              ₹{order.totalAmount.toLocaleString()}
                            </td>
                            <td className="py-4 px-4 text-xs text-gray-600">
                              {new Date(order.createdAt).toLocaleDateString('en-IN', { 
                                day: '2-digit', 
                                month: 'short', 
                                year: 'numeric' 
                              })}
                              <div className="text-gray-500 mt-0.5">
                                {new Date(order.createdAt).toLocaleTimeString('en-IN', { 
                                  hour: '2-digit', 
                                  minute: '2-digit'
                                })}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= CONTACT MESSAGES ================= */}
          {activeTab === "messages" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-white">
                <h2 className="text-xl font-semibold text-gray-800">Contact Messages</h2>
                <p className="text-sm text-gray-500 mt-1">View customer inquiries and feedback</p>
              </div>
              <div className="p-0">
                {messageError && <div className="p-6"><Alert message={messageError} type="error" /></div>}
                {loadingMessages ? (
                  <div className="text-center py-16">
                    <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600 font-medium">Loading messages...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wide min-w-[150px]">Name</th>
                          <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wide min-w-[200px]">Email</th>
                          <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wide min-w-[180px]">Subject</th>
                          <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wide min-w-[300px]">Message</th>
                          <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wide min-w-[160px]">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {messages.length === 0 && (
                          <tr>
                            <td colSpan="5" className="text-center py-12 text-gray-500">
                              <div className="text-4xl mb-2">✉️</div>
                              <p className="font-medium">No Messages Found</p>
                            </td>
                          </tr>
                        )}
                        {messages.map((msg, index) => (
                          <tr key={msg._id} className={`hover:bg-green-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                            <td className="py-4 px-6">
                              <div className="font-semibold text-gray-800">{msg.name}</div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="text-sm text-gray-600">{msg.email}</div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="font-medium text-gray-700">
                                {msg.subject || <span className="text-gray-400 italic">No Subject</span>}
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="text-sm text-gray-700 leading-relaxed max-w-md">
                                {msg.message}
                              </div>
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-600">
                              {new Date(msg.createdAt).toLocaleDateString('en-IN', { 
                                day: '2-digit', 
                                month: 'short', 
                                year: 'numeric' 
                              })}
                              <div className="text-gray-500 mt-0.5">
                                {new Date(msg.createdAt).toLocaleTimeString('en-IN', { 
                                  hour: '2-digit', 
                                  minute: '2-digit'
                                })}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}