import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    // Logged-in user ke liye optional — guest checkout mein nahi hoga
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },

    // Guest checkout fields
    guestName: { type: String },
    guestEmail: { type: String },
    guestPhone: { type: String },

    orderItems: [
      {
        product: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      nearbyPlace: { type: String }, // landmark / ghar ke paas koi jagah
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String },
    },
    totalPrice: { type: Number, required: true, default: 0 },
    shopifyOrderId: { type: String },
    shopifyOrderName: { type: String },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    paymentMethod: {
      type: String,
      enum: ['COD', 'JazzCash', 'EasyPaisa', 'Card'],
      default: 'COD',
    },
  },
  { timestamps: true }
)

if (mongoose.models.Order) {
  delete mongoose.models.Order
}

export default mongoose.model('Order', orderSchema)
