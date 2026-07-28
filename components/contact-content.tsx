'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { faqs } from '@/lib/data'
import { submitContactForm } from '@/lib/api'

export function ContactContent() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
const [openFaq, setOpenFaq] = useState<number | null>(0)
const [error, setError] = useState('')

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError('')
  setIsSubmitting(true)

  const result = await submitContactForm(formData)

  setIsSubmitting(false)

  if (result.success) {
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  } else {
    setError(result.message || 'Something went wrong. Please try again.')
  }
}
  return (
    <div className="min-h-screen bg-background pt-20 lg:pt-24">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1920&h=600&fit=crop&q=80"
            alt="Contact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/70 mb-4 block">
              Get in Touch
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
              We Would Love to <span className="text-gold">Hear from You</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Phone, title: 'Call Us', content: '+92 336 5125119', sub: '' },
              { icon: Mail, title: 'Email Us', content: 'awaisrazamadni67@gmail.com', sub: 'We reply within 24 hours' },
              { icon: MapPin, title: 'Visit Us', content: 'Plot no 5 Rawalpindi, Pakistan', sub: 'By appointment only' },
              { icon: Clock, title: 'Hours', content: '24/7', sub: '' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-card rounded-lg border border-border/50 text-center hover:border-gold/30 transition-colors"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 mb-4">
                  <item.icon className="h-5 w-5 text-gold" />
                </div>
                <h3 className="text-sm font-medium text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-foreground mb-1">{item.content}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="py-16 lg:py-20 border-t border-border">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
                Send a Message
              </span>
              <h2 className="font-serif text-3xl text-foreground mb-2">Contact Form</h2>
              <p className="text-muted-foreground mb-8">
                Have a question? Our concierge team is here to help.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
  {error && (
    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">{error}</div>
  )}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2 block">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-12 px-4 bg-transparent border border-border rounded-md text-sm focus:outline-none focus:border-gold transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2 block">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-12 px-4 bg-transparent border border-border rounded-md text-sm focus:outline-none focus:border-gold transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2 block">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full h-12 px-4 bg-transparent border border-border rounded-md text-sm focus:outline-none focus:border-gold transition-colors"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2 block">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-border rounded-md text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-gold text-white font-medium rounded-md hover:bg-gold-light transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : submitted ? (
                    <span>Message Sent!</span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Map & Store Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
                  Our Flagship
                </span>
                <h2 className="font-serif text-3xl text-foreground mb-2">Plot no 5 Rawalpindi, Pakistan</h2>
                <p className="text-muted-foreground mb-6">
                  Experience Naqsheh in person at our Plot no 5. Private appointments available for bespoke consultations.
                </p>
              </div>
              <div className="aspect-[4/3] rounded-lg overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2!2d-73.9784!3d40.7589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzMyLjAiTiA3M8KwNTgnNDIuMiJX!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(1) contrast(1.1)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-6 bg-card rounded-lg border border-border/50">
                <h3 className="text-sm font-medium text-foreground mb-3">Store Information</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Plot no 5 Rawalpindi Pakistan</p>
                  <p>Mon–Sun: 24/7</p>
                  {/* <p>Sunday: 11:00 AM – 5:00 PM</p>
                  <p>Private appointments available</p> */}
                </div>
              </div>
              <a
                href="https://wa.me/18885550199"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-12 px-6 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20 border-t border-border">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3 block">
              Support
            </span>
            <h2 className="font-serif text-3xl text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Find answers to common questions about our products and services
            </p>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="border border-border/50 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                >
                  <span className="text-sm font-medium text-foreground pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === index ? 'auto' : 0, opacity: openFaq === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
