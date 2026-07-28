'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X, Grid3X3, LayoutGrid, ChevronDown } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { getAllProducts } from '@/lib/api'
import Fuse from 'fuse.js'
const priceRanges = [
  { label: 'Under Rs 500', min: 0, max: 500 },
  { label: 'Rs 500 - Rs 1,000', min: 500, max: 1000 },
  { label: 'Rs 1,000 - Rs 2,000', min: 1000, max: 2000 },
  { label: 'Rs 2,000+', min: 2000, max: Infinity },
]

const categories = ['All', 'Rings', 'Necklaces', 'Earrings', 'Watches', 'Hand Harness', 'Bracelets']
const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
  { label: 'Best Rated', value: 'rating' },
]

export function ShopContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid')
  const [sortBy, setSortBy] = useState('featured')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All')
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null)
  const [showNewOnly, setShowNewOnly] = useState(searchParams.get('new') === 'true')
 const [products, setProducts] = useState<any[]>([])

useEffect(() => {
  getAllProducts()
    .then((data) => setProducts(Array.isArray(data) ? data : []))
    .catch(() => setProducts([]))
}, [])

// 👇 YE NAYA CODE ADD KAREIN 👇
useEffect(() => {
  setSelectedCategory(searchParams.get('category') || 'All')
}, [searchParams])
 const filteredProducts = useMemo(() => {
  let result = Array.isArray(products) ? [...products] : []

  const searchQuery = searchParams.get('search')
  if (searchQuery) {
    const fuse = new Fuse(result, {
      keys: ['name', 'category', 'material', 'description'],
      threshold: 0.4,
    })
    result = fuse.search(searchQuery).map((r) => r.item)
  }

  if (selectedCategory !== 'All') {
    result = result.filter((p) => p.category === selectedCategory)
  }

    if (selectedPriceRange) {
      const range = priceRanges.find((r) => r.label === selectedPriceRange)
      if (range) {
        result = result.filter((p) => p.price >= range.min && p.price < range.max)
      }
    }

    if (showNewOnly) {
      result = result.filter((p) => p.isNew)
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1))
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
    }

    return result
 }, [products, selectedCategory, selectedPriceRange, showNewOnly, sortBy, searchParams])

  const clearFilters = useCallback(() => {
    setSelectedCategory('All')
    setSelectedPriceRange(null)
    setShowNewOnly(false)
    router.push('/shop')
  }, [router])

  const hasFilters = selectedCategory !== 'All' || selectedPriceRange || showNewOnly

  return (
    <div className="min-h-screen bg-background pt-20 lg:pt-24">
      {/* Page Header */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-2">Shop All</h1>
            <p className="text-muted-foreground">Discover {filteredProducts.length} exquisite pieces in our collection</p>
          </motion.div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 text-sm font-medium"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>

          <div className="hidden lg:flex items-center gap-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-sm transition-colors ${
                  selectedCategory === cat
                    ? 'text-foreground font-medium border-b-2 border-gold pb-1'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-muted' : 'text-muted-foreground'}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`p-2 rounded transition-colors ${viewMode === 'compact' ? 'bg-muted' : 'text-muted-foreground'}`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none h-10 pl-4 pr-10 bg-transparent border border-border rounded-md text-sm focus:outline-none focus:border-gold"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      <AnimatePresence>
        {hasFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-border"
          >
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 flex-wrap">
              <span className="text-xs text-muted-foreground">Active filters:</span>
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-muted text-xs rounded-full">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')} className="hover:text-gold">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedPriceRange && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-muted text-xs rounded-full">
                  {selectedPriceRange}
                  <button onClick={() => setSelectedPriceRange(null)} className="hover:text-gold">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {showNewOnly && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-muted text-xs rounded-full">
                  New Arrivals
                  <button onClick={() => setShowNewOnly(false)} className="hover:text-gold">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              <button onClick={clearFilters} className="text-xs text-gold hover:underline ml-2">
                Clear all
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h3 className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-6">Filter By</h3>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="text-sm font-medium mb-4">Price Range</h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPriceRange === range.label}
                        onChange={() => setSelectedPriceRange(range.label)}
                        className="accent-gold h-4 w-4"
                      />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* New Arrivals */}
              <div className="mb-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={showNewOnly}
                    onChange={(e) => setShowNewOnly(e.target.checked)}
                    className="accent-gold h-4 w-4"
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    New Arrivals Only
                  </span>
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground mb-4">No products match your filters</p>
                <button onClick={clearFilters} className="text-gold hover:underline text-sm">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }`}>
                {filteredProducts.map((product) => (
  <ProductCard
    key={product._id}
    id={product._id}
    {...product}
    image={product.image?.[0] || ''}
  />
))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            onClick={() => setIsMobileFilterOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-80 bg-background shadow-xl overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="font-serif text-lg">Filters</h2>
                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6 space-y-8">
                {/* Category */}
                <div>
                  <h3 className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">Category</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="mobile-category"
                          checked={selectedCategory === cat}
                          onChange={() => setSelectedCategory(cat)}
                          className="accent-gold h-4 w-4"
                        />
                        <span className="text-sm">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h3 className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label key={range.label} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="mobile-price"
                          checked={selectedPriceRange === range.label}
                          onChange={() => setSelectedPriceRange(range.label)}
                          className="accent-gold h-4 w-4"
                        />
                        <span className="text-sm">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* New */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showNewOnly}
                      onChange={(e) => setShowNewOnly(e.target.checked)}
                      className="accent-gold h-4 w-4"
                    />
                    <span className="text-sm">New Arrivals Only</span>
                  </label>
                </div>

                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full h-12 bg-gold text-white font-medium rounded-md hover:bg-gold-light transition-colors"
                >
                  Show {filteredProducts.length} Results
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
