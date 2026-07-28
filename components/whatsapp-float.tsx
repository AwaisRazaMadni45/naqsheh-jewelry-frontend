'use client'

import { MessageCircle } from 'lucide-react'

export function WhatsAppFloat() {
  const phoneNumber = '923365125119'
  const message = 'Hi! I have a question about your jewelry collection.'

  return (
    <a href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 h-14 w-14 bg-green-600 rounded-full shadow-lg flex items-center justify-center hover:bg-green-700 hover:scale-110 transition-all duration-300" aria-label="Chat on WhatsApp">
      <MessageCircle className="h-7 w-7 text-white fill-white" />
    </a>
  )
}