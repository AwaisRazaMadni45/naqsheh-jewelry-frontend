import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
      {
        product: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
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

// Dev mode me Next.js hot-reload ke dauran Mongoose purana schema cache kar
// leta hai. Ye line hamesha latest schema use karna confirm karti hai.
if (mongoose.models.Order) {
  delete mongoose.models.Order
}

export default mongoose.model('Order', orderSchema)