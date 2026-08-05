import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: [String], required: true },
    stock: { type: Number, required: true, default: 0 },
    discount: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    soldCount: { type: Number, default: 0 },
    material: { type: String, default: '' },
    sizes: { type: [String], default: [] },
    isNew: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    reviewsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.models.Product || mongoose.model('Product', productSchema)