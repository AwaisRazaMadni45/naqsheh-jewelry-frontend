// ─── NAQSHEH Store Config ────────────────────────────────────────────────────
// Sab kuch ek jagah. Koi bhi price, message ya link yahan se update karo —
// poori website automatically update ho jaegi.

export const STORE = {
  name: 'NAQSHEH',
  tagline: 'Elegant jewelry for every occasion, starting from Rs. 250.',
  country: 'Pakistan',
  currency: 'PKR',
  currencySymbol: 'Rs.',
  established: '2026',

  // ─── Pricing & Offers ───────────────────────────────────────────────────
  startingPrice: 250,
  shippingCharge: 250,
  freeShippingThreshold: 2000,
  freeGiftThreshold: 1000,

  // ─── Contact ────────────────────────────────────────────────────────────
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923157726839',
  whatsappDefaultMessage: 'Hi! I need help with an order.',
  email: 'naqshehjewels@gmail.com',
  phone: '+92 315 7726839',
  address: 'Plot No 5, Rawalpindi, Pakistan',

  // ─── Social ─────────────────────────────────────────────────────────────
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/naqshehofficials/',
  instagramHandle: '@naqshehofficials',
  facebook: 'https://www.facebook.com/profile.php?id=61591472600822',
  tiktok: 'https://www.tiktok.com/@naqsheh3',

  // ─── Announcement Bar Messages ──────────────────────────────────────────
  announcements: [
    'Cash on Delivery Available All Over Pakistan',
    'Delivery Rs. 250  |  Free Delivery on Orders Rs. 2,000+',
    'Free Gift on Orders Rs. 1,000+  🎁',
  ],

  // ─── Trust Strip (4 blocks under hero) ──────────────────────────────────
  trustItems: [
    { icon: 'cod',     title: 'Cash on Delivery',         subtitle: 'Pay when order arrives' },
    { icon: 'truck',   title: 'Delivery Rs. 250',          subtitle: 'Free above Rs. 2,000' },
    { icon: 'gift',    title: 'Free Gift',                 subtitle: 'On orders Rs. 1,000+' },
    { icon: 'whatsapp',title: 'WhatsApp Support',          subtitle: 'Chat with us anytime' },
  ],

  // ─── Shop by Budget tiles ────────────────────────────────────────────────
  budgetTiles: [
    { label: 'Under Rs. 500',   maxPrice: 500,     href: '/shop?maxPrice=500' },
    { label: 'Under Rs. 1,000', maxPrice: 1000,    href: '/shop?maxPrice=1000' },
    { label: 'Under Rs. 2,000', maxPrice: 2000,    href: '/shop?maxPrice=2000' },
    { label: 'Premium',         maxPrice: 999999,  href: '/shop?minPrice=2000' },
  ],

  // ─── Featured Collection Banners ────────────────────────────────────────
  // image: swap with Shopify collection image URL or /public path
  collectionBanners: [
    {
      title: 'Bridal Collection',
      subtitle: 'Complete the look for your special day',
      href: '/shop?category=Necklaces',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=600&fit=crop',
    },
    {
      title: 'Daily Wear',
      subtitle: 'Light, elegant pieces for every day',
      href: '/shop?category=Earrings',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=600&fit=crop',
    },
    {
      title: 'Gift Ideas',
      subtitle: 'Perfect gifts, starting from Rs. 250',
      href: '/shop',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=600&fit=crop',
    },
    {
      title: 'Festive Picks',
      subtitle: 'Eid, weddings & celebrations',
      href: '/shop?category=Rings',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop',
    },
  ],

  // ─── Hero ───────────────────────────────────────────────────────────────
  // Swap heroImage with any Shopify product/lifestyle URL
  heroImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&h=900&fit=crop',

  // ─── SEO ────────────────────────────────────────────────────────────────
  seoTitle: 'NAQSHEH | Elegant Jewelry in Pakistan. Starting from Rs. 250. COD Available.',
  seoDescription:
    'Shop elegant jewelry at NAQSHEH Pakistan. Rings, necklaces, earrings, bracelets & more. Starting from Rs. 250. Cash on delivery. Free delivery on Rs. 2,000+.',
} as const
