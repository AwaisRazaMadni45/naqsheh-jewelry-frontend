'use client'

import { motion } from 'framer-motion'
import { Shield, Truck, CreditCard, RotateCcw } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Premium Quality',
    description: 'Every piece is handcrafted with the finest materials and inspected by certified gemologists.',
  },
  {
    icon: Truck,
    title: 'Worldwide Shipping',
    description: 'Complimentary insured shipping on all orders. Delivery to over 100 countries.',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Shop with confidence using our encrypted payment processing and fraud protection.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free returns. If you are not satisfied, we will make it right.',
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3 block">
            The NAQSHEH Difference
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-4">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            We are committed to delivering an exceptional experience from the moment you browse to the unboxing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center p-8 bg-card rounded-lg border border-border/50 hover:border-gold/30 transition-all duration-500 hover:shadow-lg"
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 mb-6 group-hover:bg-gold/20 transition-colors duration-500">
                <feature.icon className="h-7 w-7 text-gold" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-3">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
