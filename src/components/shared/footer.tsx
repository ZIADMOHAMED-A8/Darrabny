"use client"

export default function Footer() {
  return (
    <footer className="py-4 text-center text-sm text-muted-foreground">
      <div className="mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* النص */}
        <p>© {new Date().getFullYear()} InternLink. All rights reserved.</p>

        {/* روابط التنقل */}
        <nav className="flex flex-wrap justify-center gap-4">
          <a href="#" className="hover:text-primary transition-colors">
            About
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Contact
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Terms of Service
          </a>
        </nav>
      </div>
    </footer>
  )
}
