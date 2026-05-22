"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Users, Globe, Award, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

const TEAM = [
  { name: "Eleanor Voss", role: "Founder & Editor", emoji: "👩‍💼", bio: "Literature PhD. 15 years curating exceptional reads." },
  { name: "Marcus Chen", role: "Head of Curation", emoji: "👨‍🎨", bio: "Former bookseller. Expert in rare and first editions." },
  { name: "Priya Nair", role: "UX & Design", emoji: "👩‍💻", bio: "Designing experiences that celebrate the written word." },
  { name: "Tobias Hill", role: "Community Lead", emoji: "👨‍🤝‍👨", bio: "Building the most thoughtful reader community online." },
];

const MILESTONES = [
  { year: "2019", event: "Odyssey founded with 100 curated titles" },
  { year: "2020", event: "Reached 10,000 registered readers" },
  { year: "2021", event: "Launched rare editions program" },
  { year: "2022", event: "50,000 books sold worldwide" },
  { year: "2023", event: "Opened seller marketplace" },
  { year: "2024", event: "100K+ active readers globally" },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Header */}
      <div style={{ background: "var(--bg2)", borderBottom: "1px solid var(--border)", padding: "72px 0 56px", position: "relative", overflow: "hidden" }}>
        <div className="hero-noise" />
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 640 }}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>Our Story</p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, marginBottom: 20, lineHeight: 1.1 }}>
            Books Changed Our Lives.<br /><em style={{ color: "var(--accent)" }}>We Built a Place</em><br />to Change Yours.
          </h1>
          <p style={{ fontSize: 17, color: "var(--text2)", lineHeight: 1.75 }}>
            Odyssey was born from a simple frustration: great books were hard to find, and great marketplaces were non-existent. We decided to build both.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="about-grid">
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>Mission</p>
              <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 700, marginBottom: 20 }}>We Believe Every Book Deserves the Right Reader</h2>
              <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8, marginBottom: 16 }}>
                Most marketplaces treat books like any other product. We treat them like what they are: vessels of human experience, wisdom, and imagination. Our curation process is rigorous, our standards are high, and our community is everything.
              </p>
              <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8 }}>
                Whether you are a first-time reader looking for a gateway novel, or a seasoned collector hunting a specific 1940s first edition, Odyssey is your home.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { icon: BookOpen, label: "10,000+", sub: "Curated Titles", color: "var(--accent)" },
                { icon: Users, label: "100K+", sub: "Active Readers", color: "var(--green)" },
                { icon: Globe, label: "40+", sub: "Countries", color: "#6b8fd4" },
                { icon: Award, label: "4.8★", sub: "Avg Rating", color: "var(--accent)" },
              ].map(({ icon: Icon, label, sub, color }) => (
                <div key={sub} style={{ padding: 24, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius2)", textAlign: "center" }}>
                  <div style={{ width: 40, height: 40, background: `${color}18`, borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                    <Icon size={18} color={color} />
                  </div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color }}>{label}</div>
                  <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 4 }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>The People</p>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 700, marginBottom: 12 }}>Meet the Team</h2>
            <p style={{ fontSize: 15, color: "var(--text3)", maxWidth: 400, margin: "0 auto" }}>Four obsessive readers who quit their jobs to build Odyssey.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {TEAM.map((m, i) => (
              <div key={i} className="card" style={{ padding: 28, textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>{m.emoji}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{m.name}</h3>
                <p style={{ fontSize: 12, color: "var(--accent)", marginBottom: 12, fontWeight: 600, letterSpacing: "0.05em" }}>{m.role}</p>
                <p style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.6 }}>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>History</p>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 700 }}>Our Journey</h2>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 16, top: 0, bottom: 0, width: 1, background: "var(--border2)" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {MILESTONES.map((m, i) => (
                <div key={i} style={{ display: "flex", gap: 32, paddingLeft: 48, paddingBottom: 32, position: "relative" }}>
                  <div style={{ position: "absolute", left: 8, top: 4, width: 16, height: 16, borderRadius: "50%", background: "var(--accent)", border: "3px solid var(--bg)", zIndex: 1 }} />
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: "var(--accent)", minWidth: 48 }}>{m.year}</div>
                  <div style={{ fontSize: 15, color: "var(--text2)", paddingTop: 2 }}>{m.event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <Heart size={28} color="var(--accent)" style={{ marginBottom: 16 }} />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 700, marginBottom: 12 }}>Join the Community</h2>
          <p style={{ fontSize: 15, color: "var(--text3)", marginBottom: 24, maxWidth: 400, margin: "0 auto 24px" }}>
            Thousands of readers are waiting to share their next great discovery with you.
          </p>
          <Link href="/register" className="btn btn-primary" style={{ fontSize: 15, padding: "12px 28px" }}>
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
      <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important;gap:40px!important;}}`}</style>
    </div>
  );
}
