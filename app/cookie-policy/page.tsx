export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen pt-24 lg:pt-28 max-w-3xl mx-auto px-4 pb-16">
      <h1 className="font-serif text-3xl mb-2">Cookie Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-foreground font-medium text-base mb-2">1. What Are Cookies</h2>
          <p>Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences and improve your browsing experience.</p>
        </section>

        <section>
          <h2 className="text-foreground font-medium text-base mb-2">2. How We Use Cookies</h2>
          <p>Naqsheh uses cookies to keep you logged in, remember items in your cart and wishlist, and understand how visitors use our website so we can improve it.</p>
        </section>

        <section>
          <h2 className="text-foreground font-medium text-base mb-2">3. Managing Cookies</h2>
          <p>Most web browsers allow you to control cookies through their settings. You can choose to block or delete cookies, though this may affect certain features of our website, such as staying logged in or keeping items in your cart.</p>
        </section>

        <section>
          <h2 className="text-foreground font-medium text-base mb-2">4. Third-Party Cookies</h2>
          <p>We do not currently use third-party advertising or tracking cookies.</p>
        </section>

        <section>
          <h2 className="text-foreground font-medium text-base mb-2">5. Contact Us</h2>
          <p>If you have questions about our use of cookies, contact us at awaisrazamadni67@gmail.com.</p>
        </section>
      </div>
    </div>
  )
}