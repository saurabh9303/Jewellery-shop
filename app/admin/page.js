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

  return (
    <div className="p-6 space-y-12">

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
      <section>
        <h1 className="text-2xl font-bold mb-4">Admin – All Users</h1>
        {userError && <Alert message={userError} type="error" />}
        {loadingUsers ? (
          <p>Loading users...</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center p-3">No Users Found</td>
                </tr>
              )}
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.role}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => { setUserToDelete(user._id); setConfirmVisible(true); }}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* ================= ORDERS TABLE ================= */}
      <section>
        <h1 className="text-2xl font-bold mb-4">Admin – All Orders</h1>
        {orderError && <Alert message={orderError} type="error" />}
        {loadingOrders ? (
          <p>Loading orders...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Order ID</th>
                  <th className="border p-2">User</th>
                  <th className="border p-2">Products</th>
                  <th className="border p-2">Address</th>
                  <th className="border p-2">Payment</th>
                  <th className="border p-2">Order Status</th>
                  <th className="border p-2">Amount</th>
                  <th className="border p-2">Created At</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center p-3">No Orders Found</td>
                  </tr>
                )}
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="border p-2">{order._id}</td>
                    <td className="border p-2"><b>{order.userName}</b><br />{order.userEmail}</td>
                    <td className="border p-2">
                      {order.products.map((p) => (
                        <div key={p.productId} className="mb-2">
                          <b>{p.name}</b> × {p.quantity} <br /> ₹{p.price}
                        </div>
                      ))}
                    </td>
                    <td className="border p-2">
                      {order.address.fullName}<br />
                      {order.address.house}, {order.address.road}<br />
                      {order.address.city} – {order.address.pincode}<br />
                      {order.address.state}<br />
                      📞 {order.address.phone}
                    </td>
                    <td className="border p-2">
                      Method: <b>{order.paymentMethod}</b><br />
                      Status:{" "}
                      <span className={
                        order.paymentStatus === "PAID" ? "text-green-600" :
                        order.paymentStatus === "FAILED" ? "text-red-600" :
                        "text-yellow-600"
                      }>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="border p-2">{order.orderStatus}</td>
                    <td className="border p-2 font-bold">₹{order.totalAmount}</td>
                    <td className="border p-2">{new Date(order.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ================= CONTACT MESSAGES ================= */}
      <section>
        <h1 className="text-2xl font-bold mb-4">Admin – Contact Messages</h1>
        {messageError && <Alert message={messageError} type="error" />}
        {loadingMessages ? (
          <p>Loading messages...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Subject</th>
                  <th className="border p-2">Message</th>
                  <th className="border p-2">Created At</th>
                </tr>
              </thead>
              <tbody>
                {messages.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center p-3">No Messages Found</td>
                  </tr>
                )}
                {messages.map((msg) => (
                  <tr key={msg._id} className="hover:bg-gray-50">
                    <td className="border p-2">{msg.name}</td>
                    <td className="border p-2">{msg.email}</td>
                    <td className="border p-2">{msg.subject || "-"}</td>
                    <td className="border p-2">{msg.message}</td>
                    <td className="border p-2">{new Date(msg.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
