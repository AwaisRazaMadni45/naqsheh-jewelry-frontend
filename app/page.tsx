import { HeroSection }                from '@/components/sections/hero'
import { TrustStrip }                 from '@/components/sections/trust-strip'
import { FeaturedCategories }         from '@/components/sections/featured-categories'
import { ShopByBudget }               from '@/components/sections/shop-by-budget'
import { BestSellers }                from '@/components/sections/best-sellers'
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
      <CustomerReviews />
      <NewArrivals />
      <InstagramGallery />
    </>
  )
}
