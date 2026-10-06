'use client'

import { useState, useEffect, useRef } from 'react'
import { STORE } from '@/config/store'
import { X } from 'lucide-react'

export function AnnouncementBar() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const msgs = STORE.announcements

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % msgs.length)
    }, 4000)
  }

  useEffect(() => {
    startTimer()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [msgs.length])

  useEffect(() => {
    if (paused) {
      if (intervalRef.current) clearInterval(intervalRef.current)
    } else {
      startTimer()
    }
  }, [paused])

  if (!visible) return null

  return (
    <div
      className="relative z-[60] bg-charcoal text-white text-xs sm:text-sm overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-center relative">
        {/* Messages — slide animation */}
        <div className="overflow-hidden flex-1 text-center">
          {msgs.map((msg, i) => (
            <span
              key={i}
              className={`block transition-all duration-500 ${
                i === current
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 absolute -translate-y-2 pointer-events-none'
              }`}
              style={{ position: i === current ? 'static' : 'absolute', left: 0, right: 0 }}
            >
              <span className="text-gold font-semibold">✦</span>
              <span className="mx-2 tracking-wide text-white/90">{msg}</span>
              <span className="text-gold font-semibold">✦</span>
            </span>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="absolute right-8 flex items-center gap-1">
          {msgs.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? 'w-3 h-1.5 bg-gold' : 'w-1.5 h-1.5 bg-white/30'
              }`}
              aria-label={`Message ${i + 1}`}
            />
          ))}
        </div>

        {/* Close */}
        <button
          onClick={() => setVisible(false)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white transition-colors"
          aria-label="Close announcement"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}
