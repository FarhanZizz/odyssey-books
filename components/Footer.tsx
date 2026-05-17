"use client";
import Link from "next/link";
import { BookOpen, GitFork, MessageCircle, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{
      background: "var(--bg2)",
      borderTop: "1px solid var(--border)",
      padding: "48px 0 32px",
      marginTop: "auto",
    }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 40,
          marginBottom: 40,
        }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 32, height: 32, background: "var(--accent)", borderRadius: 4,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <BookOpen size={18} color="var(--bg)" />
              </div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700 }}>Odyssey</span>
            </div>
            <p style={{ fontSize: 14, color: "var(--text3)", lineHeight: 1.7, maxWidth: 280 }}>
              A curated marketplace for readers who seek the extraordinary. Every book tells a story — find yours.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              {[
                { icon: GitFork, href: "#" },
                { icon: MessageCircle, href: "#" },
                { icon: Share2, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} style={{
                  width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: "var(--radius)", border: "1px solid var(--border2)",
                  color: "var(--text3)", transition: "all 0.2s", textDecoration: "none",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border2)"; (e.currentTarget as HTMLElement).style.color = "var(--text3)"; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
              Explore
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { href: "/items", label: "Browse Books" },
                { href: "/items/add", label: "Sell a Book" },
                { href: "/about", label: "About Us" },
              ].map((l) => (
                <Link key={l.href} href={l.href} style={{ fontSize: 14, color: "var(--text3)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text3)"; }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
              Genres
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Fiction", "Non-Fiction", "Sci-Fi", "Mystery", "Biography"].map((g) => (
                <Link key={g} href={`/items?category=${g}`} style={{ fontSize: 14, color: "var(--text3)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text3)"; }}>
                  {g}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
              Account
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { href: "/login", label: "Sign In" },
                { href: "/register", label: "Register" },
                { href: "/items/manage", label: "My Books" },
              ].map((l) => (
                <Link key={l.href} href={l.href} style={{ fontSize: 14, color: "var(--text3)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text3)"; }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: "var(--border)", marginBottom: 24 }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 13, color: "var(--text3)" }}>
            &copy; {new Date().getFullYear()} Odyssey Books. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((t) => (
              <a key={t} href="#" style={{ fontSize: 13, color: "var(--text3)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text3)"; }}>
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
