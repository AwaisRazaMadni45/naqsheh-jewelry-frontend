'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Star, ShoppingBag, Truck, RotateCcw, ChevronRight, Minus, Plus, ChevronDown, Check } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRouter } from 'next/navigation'
import { useCart } from '@/components/cart-context'
import { useWishlist } from '@/components/wishlist-context'
import { useAuth } from '@/components/auth-context'

interface ProductDetailProps {
  product: {
    _id: string
    name: string
    price: number
    rating?: number
    reviews?: number
    description: string
    material?: string
    sizes?: string[]
    image: string[]
    category: string
    isNew?: boolean
    isBestseller?: boolean
  }
  relatedProducts: any[]
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const images = product.image && product.image.length > 0 ? product.image : ['/images/placeholder.jpg']
  const rating = product.rating || 0
  const reviews = product.reviews || 0
  const sizes = product.sizes || []
const shippingRates: Record<string, { fee: string; days: string }> = {
  Rings: { fee: 'Free Shipping', days: '3-5 days' },
  Necklaces: { fee: 'Free Shipping', days: '3-5 days' },
  Earrings: { fee: 'Free Shipping', days: '2-4 days' },
  Watches: { fee: 'Rs 200 Shipping', days: '5-7 days' },
  'Hand Harness': { fee: 'Free Shipping', days: '3-5 days' },
  Bracelets: { fee: 'Free Shipping', days: '3-5 days' },
}
const shippingDetails = shippingRates[product.category] || { fee: 'Affordable Shipping', days: '3-5 days' }
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(sizes[0] || '')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

 const formatPrice = (price: number) => `Rs ${price.toLocaleString('en-PK')}`

const router = useRouter()
const { addToCart } = useCart()
const { isInWishlist, toggleWishlist } = useWishlist()
const { user } = useAuth()
const isWishlistedActual = isInWishlist(product._id)

const handleAddToCart = () => {
  addToCart({ id: product._id, name: product.name, price: product.price, image: images[0] }, quantity)
  setAddedToCart(true)
  setTimeout(() => setAddedToCart(false), 2000)
}

const handleBuyNow = () => {
  addToCart({ id: product._id, name: product.name, price: product.price, image: images[0] }, quantity)
  router.push(user ? '/checkout' : '/login?redirect=/checkout')
}

const handleToggleWishlist = () => {
  toggleWishlist({ id: product._id, name: product.name, price: product.price, image: images[0], category: product.category })
}

  return (
    <div className="min-h-screen bg-background pt-20 lg:pt-24">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/shop?category=${product.category}`} className="hover:text-foreground transition-colors">{product.category}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Main */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-square bg-muted/30 rounded-lg overflow-hidden mb-4">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover cursor-zoom-in"
                onClick={() => setIsZoomed(true)}
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-gold text-white text-xs font-bold uppercase tracking-wider rounded">
                  New
                </span>
              )}
              {product.isBestseller && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-charcoal text-white text-xs font-bold uppercase tracking-wider rounded">
                  Bestseller
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-gold' : 'border-transparent hover:border-border'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-2">
              {product.category}
            </span>
            <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-4">{product.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-gold fill-gold' : 'text-border'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{rating} ({reviews} reviews)</span>
            </div>
            <p className="text-2xl lg:text-3xl font-semibold text-foreground mb-6">{formatPrice(product.price)}</p>
            <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            {/* Material */}
            {product.material && (
              <div className="mb-6">
                <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2 block">Material</span>
                <p className="text-sm text-foreground">{product.material}</p>
              </div>
            )}

            {/* Size Selector */}
            {sizes.length > 0 && (
              <div className="mb-6">
                <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-3 block">Size</span>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 px-4 text-sm border rounded-md transition-all ${
                        selectedSize === size
                          ? 'border-gold bg-gold/5 text-gold'
                          : 'border-border text-foreground hover:border-muted-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-3 block">Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10 border border-border rounded-md flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-10 w-10 border border-border rounded-md flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

           {/* Actions */}
<div className="flex gap-3 mb-8">
  <button
    onClick={handleAddToCart}
    className={`flex-1 h-14 flex items-center justify-center gap-2 text-sm font-medium rounded-md transition-all duration-300 ${
      addedToCart
        ? 'bg-green-600 text-white'
        : 'bg-gold text-white hover:bg-gold-light'
    }`}
  >
    {addedToCart ? (
      <>
        <Check className="h-5 w-5" />
        Added to Cart
      </>
    ) : (
      <>
        <ShoppingBag className="h-5 w-5" />
        Add to Cart
      </>
    )}
  </button>
  <button
    onClick={handleBuyNow}
    className="flex-1 h-14 flex items-center justify-center gap-2 border border-foreground text-sm font-medium rounded-md hover:bg-foreground hover:text-background transition-colors"
  >
    Buy Now
  </button>
  <button
    onClick={handleToggleWishlist}
    className={`h-14 w-14 flex items-center justify-center border rounded-md transition-colors ${
      isWishlistedActual
        ? 'border-red-500 bg-red-50 text-red-500'
        : 'border-border text-foreground hover:bg-muted'
    }`}
  >
    <Heart className={`h-5 w-5 ${isWishlistedActual ? 'fill-current' : ''}`} />
  </button>
</div>

 {/* Shipping & Returns Info */}
<div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
  <div className="text-center">
    <Truck className="h-5 w-5 mx-auto mb-2 text-gold" />
    <p className="text-xs font-medium text-foreground">{shippingDetails.fee}</p>
    <p className="text-[10px] text-muted-foreground mt-0.5">Delivery in {shippingDetails.days}</p>
  </div>
  <div className="text-center">
    <RotateCcw className="h-5 w-5 mx-auto mb-2 text-gold" />
    <p className="text-xs font-medium text-foreground">7-Day Returns</p>
    <p className="text-[10px] text-muted-foreground mt-0.5">Easy exchange</p>
  </div>
</div>
          </motion.div>
        </div>
      </div>

      {/* Tabs */}

      {/* Tabs */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0 mb-8">
              <TabsTrigger
                value="details"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 px-6 text-sm font-medium"
              >
                Product Details
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 px-6 text-sm font-medium"
              >
                Reviews ({reviews})
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 px-6 text-sm font-medium"
              >
                Shipping & Returns
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-0">
              <div className="max-w-3xl">
                <h3 className="font-serif text-xl mb-4">Product Details</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>{product.description}</p>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground block mb-1">Material</span>
                      <span className="text-sm text-foreground">{product.material || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground block mb-1">Category</span>
                      <span className="text-sm text-foreground">{product.category}</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground block mb-1">Warranty</span>
                      <span className="text-sm text-foreground">2 Years</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground block mb-1">Certificate</span>
                      <span className="text-sm text-foreground">Naqsheh Certificate of Authenticity</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-0">
              <div className="max-w-3xl">
                <h3 className="font-serif text-xl mb-4">Customer Reviews</h3>
                <div className="flex items-center gap-4 mb-8 p-6 bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <p className="text-4xl font-serif text-foreground">{rating}</p>
                    <div className="flex items-center gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-gold fill-gold' : 'text-border'}`} />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{reviews} reviews</p>
                  </div>
                  <div className="flex-1 ml-6">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-muted-foreground w-3">{star}</span>
                        <Star className="h-3 w-3 text-gold fill-gold" />
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gold rounded-full"
                            style={{ width: `${star === 5 ? 75 : star === 4 ? 15 : star === 3 ? 7 : star === 2 ? 2 : 1}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  {[
                    { name: 'Sarah M.', rating: 5, date: '2 weeks ago', text: 'Absolutely stunning piece. The craftsmanship is impeccable and the diamonds sparkle beautifully. Worth every penny.' },
                    { name: 'Emily R.', rating: 5, date: '1 month ago', text: 'Bought this as an anniversary gift and my wife was in tears. The packaging is luxurious and the piece itself is breathtaking.' },
                    { name: 'Jessica T.', rating: 4, date: '2 months ago', text: 'Beautiful ring, exactly as described. The sizing was perfect. Delivery was fast and the presentation box is gorgeous.' },
                  ].map((review, i) => (
                    <div key={i} className="border-b border-border pb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-medium text-sm">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{review.name}</p>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className={`h-3 w-3 ${j < review.rating ? 'text-gold fill-gold' : 'text-border'}`} />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="mt-0">
              <div className="max-w-3xl">
                <h3 className="font-serif text-xl mb-4">Shipping & Returns</h3>
                <div className="space-y-6 text-muted-foreground">
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Shipping Information</h4>
                    <p className="text-sm leading-relaxed">We offer complimentary insured shipping on all orders. Orders are processed within 1-2 business days and delivered via DHL or FedEx. Standard delivery takes 3-5 business days, express delivery takes 1-2 business days.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Returns & Exchanges</h4>
                    <p className="text-sm leading-relaxed">We accept returns within 30 days of delivery. Items must be in original condition with all packaging and certificates. Custom and engraved pieces are final sale. Please contact our concierge team to initiate a return.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Warranty</h4>
                    <p className="text-sm leading-relaxed">All Naqsheh pieces come with a 2-year warranty covering manufacturing defects. Our lifetime maintenance service includes complimentary cleaning and inspection.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Size Guide */}
      {sizes.length > 0 && (
        <div className="border-t border-border">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="max-w-3xl">
              <h3 className="font-serif text-xl mb-6">Size Guide</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 pr-4 font-medium text-foreground">Size</th>
                      <th className="text-left py-3 pr-4 font-medium text-foreground">Circumference (mm)</th>
                      <th className="text-left py-3 pr-4 font-medium text-foreground">Diameter (mm)</th>
                      <th className="text-left py-3 font-medium text-foreground">US Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { size: '5', circumference: '49.3', diameter: '15.7', us: '5' },
                      { size: '6', circumference: '51.8', diameter: '16.5', us: '6' },
                      { size: '7', circumference: '54.4', diameter: '17.3', us: '7' },
                      { size: '8', circumference: '57.0', diameter: '18.1', us: '8' },
                      { size: '9', circumference: '59.5', diameter: '18.9', us: '9' },
                    ].map((row) => (
                      <tr key={row.size} className="border-b border-border/50">
                        <td className="py-3 pr-4 text-muted-foreground">{row.size}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{row.circumference}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{row.diameter}</td>
                        <td className="py-3 text-muted-foreground">{row.us}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-border">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="font-serif text-2xl lg:text-3xl text-foreground mb-2">You May Also Like</h2>
              <p className="text-muted-foreground">More exquisite pieces from the {product.category} collection</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {relatedProducts.map((item) => (
                <ProductCard
                  key={item._id}
                  id={item._id}
                  {...item}
                  image={item.image?.[0] || ''}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <button className="absolute top-4 right-4 text-white/70 hover:text-white p-2">
              <Minus className="h-6 w-6" />
            </button>
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}