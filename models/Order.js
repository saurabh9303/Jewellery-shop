import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    // User Info
    userEmail: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },

    // Ordered Products → (Cart or Buy-Now)
    products: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 },
        image: { type: String },
      },
    ],

    // Delivery Address
    address: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      pincode: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true },
      house: { type: String, required: true },
      road: { type: String },
    },

    // Payment Details
    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "FAILED", "PAID"],
      default: "PENDING",
    },

    // Razorpay Fields
    razorpayOrderId: { type: String, default: null },
    razorpayPaymentId: { type: String, default: null },
    razorpaySignature: { type: String, default: null },

    // Tracking Status
    orderStatus: {
      type: String,
      enum: [
        "PLACED",
        "SHIPPED",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "PLACED",
    },

    // Required
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);
