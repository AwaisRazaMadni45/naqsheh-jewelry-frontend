export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen pt-24 lg:pt-28 max-w-3xl mx-auto px-4 pb-16">
      <h1 className="font-serif text-3xl mb-2">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-foreground font-medium text-base mb-2">1. Acceptance of Terms</h2>
          <p>By accessing or using the Naqsheh website, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website.</p>
        </section>

        <section>
          <h2 className="text-foreground font-medium text-base mb-2">2. Products & Pricing</h2>
          <p>All prices are listed in Pakistani Rupees (Rs) and are subject to change without prior notice. We make every effort to display accurate product images and descriptions, but slight variations in color or design may occur.</p>
        </section>

        <section>
          <h2 className="text-foreground font-medium text-base mb-2">3. Orders & Payment</h2>
          <p>We currently accept Cash on Delivery (COD) and other payment methods as shown at checkout. Orders are confirmed once payment is received or COD is selected successfully.</p>
        </section>

        <section>
          <h2 className="text-foreground font-medium text-base mb-2">4. Shipping</h2>
          <p>Delivery times vary by product category and location, typically between 2-7 business days within Pakistan. Shipping fees, if applicable, are shown at checkout.</p>
        </section>

        <section>
          <h2 className="text-foreground font-medium text-base mb-2">5. Returns & Exchanges</h2>
          <p>We accept returns within 7 days of delivery, provided the item is unused and in its original packaging. Please see our Returns section on the Contact page for details on how to initiate a return.</p>
        </section>

        <section>
          <h2 className="text-foreground font-medium text-base mb-2">6. Account Responsibility</h2>
          <p>You are responsible for maintaining the confidentiality of your account login details and for all activities under your account.</p>
        </section>

        <section>
          <h2 className="text-foreground font-medium text-base mb-2">7. Limitation of Liability</h2>
          <p>Naqsheh is not liable for any indirect or incidental damages arising from the use of our products or website, to the fullest extent permitted by law.</p>
        </section>

        <section>
          <h2 className="text-foreground font-medium text-base mb-2">8. Changes to Terms</h2>
          <p>We may update these Terms of Service from time to time. Continued use of the website after changes constitutes acceptance of the updated terms.</p>
        </section>

        <section>
          <h2 className="text-foreground font-medium text-base mb-2">9. Contact Us</h2>
          <p>For any questions regarding these Terms, contact us at awaisrazamadni67@gmail.com.</p>
        </section>
      </div>
    </div>
  )
}