// PAGE ORDER (top → bottom):
// 1. Hero
// 2. Trust Strip (COD / Delivery / Free Gift / WhatsApp)
// 3. Shop by Category
// 4. Shop by Budget
// 5. Best Sellers
// 6. Featured Collection Banners
// 7. Customer Reviews (Instagram)
// 8. New Arrivals
// (AnnouncementBar + Navbar rendered in layout.tsx above <main>)

import { HeroSection }                from '@/components/sections/hero'
import { TrustStrip }                 from '@/components/sections/trust-strip'
import { FeaturedCategories }         from '@/components/sections/featured-categories'
import { ShopByBudget }               from '@/components/sections/shop-by-budget'
import { BestSellers }                from '@/components/sections/best-sellers'
import { FeaturedCollectionBanners }  from '@/components/sections/featured-collection-banners'
import { CustomerReviews }            from '@/components/sections/customer-reviews'
import { NewArrivals }                from '@/components/sections/new-arrivals'
import { InstagramGallery }           from '@/components/sections/instagram-gallery'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <FeaturedCategories />
      <ShopByBudget />
      <BestSellers />
      <FeaturedCollectionBanners />
      <CustomerReviews />
      <NewArrivals />
      <InstagramGallery />
    </>
  )
}
