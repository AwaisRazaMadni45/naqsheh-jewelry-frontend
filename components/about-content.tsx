'use client'

import { motion } from 'framer-motion'
import { Award, Gem, Heart, Users } from 'lucide-react'

export function AboutContent() {
  return (
    <div className="min-h-screen bg-background pt-20 lg:pt-24">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=1920&h=1080&fit=crop&q=80"
            alt="Our atelier"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/70 mb-4 block">
              Our Story
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
              Crafted with Passion,<br />
              <span className="text-gold">Designed for Eternity</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Since 2026, Naqsheh Jewelry has been launching extraordinary pieces that celebrate the moments that matter most in life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
                Brand Story
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                A Legacy of Excellence
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in the heart of Rawalpindi, Naqsheh Jewelry began with a simple belief: that every woman deserves jewelry that tells her unique story. What started as a small atelier on Fifth Avenue has grown into a globally recognized luxury brand.
                </p>
                <p>
                  Our founder, Jaweria Basharat, brought together master jewelers from around the world to create pieces that blend traditional craftsmanship with modern design. Each piece is a testament to our unwavering commitment to excellence.
                </p>
                <p>
                  Today, Naqsheh continues to push the boundaries of jewelry design, creating collections that are both timeless and contemporary. We source only the finest materials and work with ethical suppliers to ensure every piece meets our exacting standards.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=1000&fit=crop"
                alt="Jewelry craftsmanship"
                className="w-full h-[500px] lg:h-[600px] object-cover rounded-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-card border border-border p-6 rounded-lg shadow-lg max-w-xs">
                <p className="font-serif text-2xl text-gold mb-1">6+</p>
                <p className="text-sm text-muted-foreground">Years of crafting extraordinary jewelry</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
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
              Our Pillars
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-4">What We Stand For</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: Gem, title: 'Ethical Sourcing', desc: 'We partner with responsible mines and suppliers who share our commitment to environmental and social standards.' },
              { icon: Award, title: 'Uncompromising Quality', desc: 'Every piece undergoes rigorous inspection by certified gemologists to ensure it meets our exacting standards.' },
              { icon: Heart, title: 'Handcrafted with Love', desc: 'Our master artisans bring decades of experience to every piece, infusing each creation with passion and precision.' },
              { icon: Users, title: 'Community First', desc: 'We believe in giving back. A portion of every sale supports women education and empowerment programs.' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-8 bg-card rounded-lg border border-border/50 hover:border-gold/30 transition-all duration-500"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 mb-6">
                  <item.icon className="h-7 w-7 text-gold" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <img
                src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&h=1000&fit=crop"
                alt="Craftsmanship"
                className="w-full h-[500px] lg:h-[600px] object-cover rounded-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
                Craftsmanship
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                The Art of Fine Jewelry
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Each Naqsheh piece is born from a meticulous process that can take hundreds of hours. From the initial sketch to the final polish, every step is guided by master artisans who have dedicated their lives to the art of jewelry making.
                </p>
                <p>
                  We combine centuries-old techniques with cutting-edge technology. Our state-of-the-art atelier features both traditional hand tools and modern laser engraving systems, allowing us to achieve precision that was once unimaginable.
                </p>
                <p>
                  Our gemologists personally select each stone, evaluating cut, color, clarity, and carat weight with uncompromising standards. Only stones that meet our exceptional criteria are set into Naqsheh pieces.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <p className="font-serif text-3xl text-gold">200+</p>
                  <p className="text-xs text-muted-foreground mt-1">Hours per piece</p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-3xl text-gold">50+</p>
                  <p className="text-xs text-muted-foreground mt-1">Master artisans</p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-3xl text-gold">12</p>
                  <p className="text-xs text-muted-foreground mt-1">Quality checks</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Message */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop"
              alt="Isabella Romano"
              className="h-24 w-24 rounded-full object-cover mx-auto mb-6"
            />
            <blockquote className="font-serif text-2xl lg:text-3xl text-foreground leading-relaxed mb-8">
              "Jewelry is not just an accessory. It is a vessel for memories, a symbol of love, and a testament to the beauty that exists in every moment of our lives."
            </blockquote>
            <div>
              <p className="text-sm font-medium text-foreground">Jaweria Basharat</p>
              <p className="text-xs text-muted-foreground">Founder & Creative Director</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
