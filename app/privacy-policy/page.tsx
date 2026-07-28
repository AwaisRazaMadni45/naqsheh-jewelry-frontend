export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-24 lg:pt-28 max-w-3xl mx-auto px-4 pb-16">
      <h1 className="font-serif text-3xl mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-foreground font-medium text-base mb-2">1. Information We Collect</h2>
          <p>When you use Naqsheh, we may collect your name, email address, phone number, shipping address, and order history. We collect this information when you create an account, place an order, subscribe to our newsletter, or contact us.</p>
        </section>

        <section>
          <h2 className="text-foreground font-medium text-base mb-2">2. How We Use Your Information</h2>
          <p>We use your information to process and deliver your orders, communicate with you about your purchases, send you updates or offers (if you've subscribed), and improve our website and services.</p>
        </section>

        <section>
          <h2 className="text-foreground font-medium text-base mb-2">3. Sharing Your Information</h2>
          <p>We do not sell your personal information to third parties. We may share necessary details (such as your name and address) with delivery/courier partners solely to fulfill your order.</p>
        </section>

        <section>
          <h2 className="text-foreground font-medium text-base mb-2">4. Data Security</h2>
          <p>We take reasonable measures to protect your personal information. Passwords are stored in encrypted form and are never visible to our team.</p>
        </section>

        <section>
          <h2 className="text-foreground font-medium text-base mb-2">5. Your Rights</h2>
          <p>You may request to view, update, or delete your personal information at any time by contacting us at awaisrazamadni67@gmail.com.</p>
        </section>

        <section>
          <h2 className="text-foreground font-medium text-base mb-2">6. Cookies</h2>
          <p>Our website may use cookies to improve your browsing experience. See our Cookie Policy for more details.</p>
        </section>

        <section>
          <h2 className="text-foreground font-medium text-base mb-2">7. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at awaisrazamadni67@gmail.com or +92 336 5125119.</p>
        </section>
      </div>
    </div>
  )
}