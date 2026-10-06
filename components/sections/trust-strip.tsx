'use client'

import { motion } from 'framer-motion'
import { STORE } from '@/config/store'
import { Banknote, Truck, Gift, MessageCircle } from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  cod: Banknote,
  truck: Truck,
  gift: Gift,
  whatsapp: MessageCircle,
}

export function TrustStrip() {
  return (
    <section className="bg-muted/40 border-y border-border">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {STORE.trustItems.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Truck
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div className="flex-shrink-0 h-9 w-9 rounded-full bg-gold/10 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-foreground leading-tight">{item.title}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">{item.subtitle}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
