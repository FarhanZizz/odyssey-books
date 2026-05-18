"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Star, Shield, Truck, Search, Quote } from "lucide-react";

const FEATURED_BOOKS = [
  { title: "The Midnight Library", author: "Matt Haig", price: "$14.99", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop", category: "Fiction" },
  { title: "Atomic Habits", author: "James Clear", price: "$16.99", img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop", category: "Self-Help" },
  { title: "Dune", author: "Frank Herbert", price: "$12.99", img: "https://images.unsplash.com/photo-1490633874781-1c63cc424610?w=300&h=400&fit=crop", category: "Sci-Fi" },
  { title: "Sapiens", author: "Yuval Noah Harari", price: "$15.99", img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=300&h=400&fit=crop", category: "History" },
];

const FEATURES = [
  { icon: BookOpen, title: "Curated Selection", desc: "Every book is hand-picked by our editorial team for quality and significance." },
  { icon: Shield, title: "Verified Editions", desc: "Authenticated first editions and rare prints with provenance guarantees." },
  { icon: Truck, title: "Swift Delivery", desc: "Carefully packaged and shipped within 24 hours of your order." },
  { icon: Search, title: "Expert Discovery", desc: "Find exactly what you are looking for with intelligent filtering and search." },
];

const TESTIMONIALS = [
  { name: "Sarah K.", role: "Literature Professor", text: "Odyssey has become my go-to source for academic texts and rare finds. The curation is exceptional.", rating: 5 },
  { name: "Marcus T.", role: "Avid Reader", text: "I have discovered authors I never would have found otherwise. The recommendations are eerily perfect.", rating: 5 },
  { name: "Elena R.", role: "Book Collector", text: "The condition of rare editions is always exactly as described. Trustworthy and beautifully presented.", rating: 5 },
];

const GENRES = [
  { label: "Fiction", emoji: "📖", count: "2,400+" },
  { label: "Science Fiction", emoji: "🚀", count: "890+" },
  { label: "Mystery", emoji: "🔍", count: "1,100+" },
  { label: "Biography", emoji: "👤", count: "650+" },
  { label: "History", emoji: "🏛️", count: "780+" },
  { label: "Fantasy", emoji: "✨", count: "960+" },
  { label: "Self-Help", emoji: "💡", count: "420+" },
  { label: "Romance", emoji: "❤️", count: "1,300+" },
];

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", background: "var(--bg2)", padding: "100px 0 80px", borderBottom: "1px solid var(--border)" }}>
        <div className="hero-noise" />
        {/* Decorative lines */}
        <div style={{ position: "absolute", top: 0, left: "50%", width: 1, height: "100%", background: "var(--border)", opacity: 0.4 }} />
        <div style={{ position: "absolute", top: "30%", left: 0, right: 0, height: 1, background: "var(--border)", opacity: 0.3 }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 640 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", background: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.25)", borderRadius: 2, marginBottom: 24 }}>
              <Star size={12} color="var(--accent)" fill="var(--accent)" />
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>
                Curated Marketplace
              </span>
            </div>

            <h1 className="animate-fade-up" style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 24, color: "var(--text)" }}>
              Every Great Book<br />
              <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Finds Its Reader</em>
            </h1>

            <p className="animate-fade-up stagger-1" style={{ fontSize: 18, color: "var(--text2)", lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
              Discover rare, curated, and extraordinary books from around the world. Built for readers who believe a book can change everything.
            </p>

            <div className="animate-fade-up stagger-2" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/items" className="btn btn-primary" style={{ fontSize: 15, padding: "12px 28px" }}>
                Browse Collection <ArrowRight size={16} />
              </Link>
              <Link href="/register" className="btn btn-secondary" style={{ fontSize: 15, padding: "12px 28px" }}>
                Start Selling
              </Link>
            </div>

            <div className="animate-fade-up stagger-3" style={{ display: "flex", gap: 32, marginTop: 48, flexWrap: "wrap" }}>
              {[["10,000+", "Books"], ["4.8★", "Avg Rating"], ["50K+", "Readers"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "var(--text)" }}>{n}</div>
                  <div style={{ fontSize: 13, color: "var(--text3)", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero book grid - right side */}
          <div style={{ position: "absolute", right: 0, top: -20, width: "45%", bottom: -20, overflow: "hidden" }} className="hero-books-panel">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "20px 24px", height: "100%", transform: "rotate(-2deg) translateY(-10px)" }}>
              {FEATURED_BOOKS.map((b, i) => (
                <div key={i} style={{
                  borderRadius: 8, overflow: "hidden", border: "1px solid var(--border2)",
                  opacity: 0.7, transform: `translateY(${i % 2 === 0 ? -8 : 8}px)`,
                  transition: "opacity 0.3s",
                }}>
                  <Image src={b.img} alt={b.title} width={150} height={200} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              ))}
            </div>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, var(--bg2) 0%, transparent 30%, transparent 70%, var(--bg2) 100%)" }} />
          </div>
        </div>
        <style>{`@media(max-width:768px){.hero-books-panel{display:none!important;}}`}</style>
      </section>

      {/* FEATURES */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, marginBottom: 16 }}>Why Odyssey?</h2>
            <p style={{ fontSize: 16, color: "var(--text3)", maxWidth: 480, margin: "0 auto" }}>
              We built the marketplace we always wanted. One that treats books — and readers — with the respect they deserve.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="card" style={{ padding: 28 }}>
                <div style={{ width: 44, height: 44, background: "rgba(212,168,83,0.12)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <f.icon size={20} color="var(--accent)" />
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text3)", lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED BOOKS */}
      <section className="section" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>Editorial Picks</p>
              <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 700 }}>Featured Books</h2>
            </div>
            <Link href="/items" className="btn btn-secondary" style={{ gap: 8 }}>
              View All <ArrowRight size={15} />
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
            {FEATURED_BOOKS.map((book, i) => (
              <Link key={i} href="/items" style={{ textDecoration: "none" }}>
                <div className="card" style={{ overflow: "hidden" }}>
                  <div style={{ aspectRatio: "3/4", overflow: "hidden", position: "relative" }}>
                    <Image src={book.img} alt={book.title} fill style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                    sizes="220px"
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.06)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }} />
                    <div style={{ position: "absolute", bottom: 10, left: 10 }}>
                      <span className="badge badge-gray">{book.category}</span>
                    </div>
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{book.title}</h3>
                    <p style={{ fontSize: 12, color: "var(--text3)", fontStyle: "italic", marginBottom: 8 }}>{book.author}</p>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: "var(--accent)" }}>{book.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GENRES */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>Explore</p>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 700, marginBottom: 12 }}>Browse by Genre</h2>
            <p style={{ fontSize: 15, color: "var(--text3)" }}>Whatever you are looking for, we have it covered.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
            {GENRES.map((g, i) => (
              <Link key={i} href={`/items?category=${g.label}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{ padding: 24, textAlign: "center", cursor: "pointer" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{g.emoji}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{g.label}</div>
                  <div style={{ fontSize: 12, color: "var(--text3)" }}>{g.count} books</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>Readers Say</p>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 700 }}>Trusted by Book Lovers</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card" style={{ padding: 28 }}>
                <Quote size={24} color="var(--accent)" style={{ opacity: 0.4, marginBottom: 16 }} />
                <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>
                  "{t.text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "var(--bg)" }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text3)" }}>{t.role}</div>
                  </div>
                  <div style={{ marginLeft: "auto", fontSize: 13, color: "var(--accent)" }}>
                    {"★".repeat(t.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ background: "var(--accent)", padding: "56px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 900, color: "var(--bg)", marginBottom: 16 }}>
            Ready to Find Your Next Obsession?
          </h2>
          <p style={{ fontSize: 16, color: "rgba(10,10,8,0.7)", marginBottom: 28 }}>
            Join over 50,000 readers who trust Odyssey for their most important reads.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/register" className="btn" style={{ background: "var(--bg)", color: "var(--text)", fontSize: 15, padding: "12px 28px" }}>
              Create Account
            </Link>
            <Link href="/items" className="btn" style={{ background: "transparent", color: "var(--bg)", border: "2px solid var(--bg)", fontSize: 15, padding: "12px 28px" }}>
              Browse First
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
