import { HeroSection } from '@/components/sections/hero'
import { FeaturedCategories } from '@/components/sections/featured-categories'
import { BestSellers } from '@/components/sections/best-sellers'
import { NewArrivals } from '@/components/sections/new-arrivals'
import { WhyChooseUs } from '@/components/sections/why-choose-us'
// import { Testimonials } from '@/components/sections/testimonials'
import { InstagramGallery } from '@/components/sections/instagram-gallery'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <BestSellers />
      <NewArrivals />
      <WhyChooseUs />
      {/* <Testimonials /> */}
      <InstagramGallery />
    </>
  )
}
