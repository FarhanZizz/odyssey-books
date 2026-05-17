"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, Menu, X, ChevronDown, Plus, Settings, LogOut, User } from "lucide-react";
import toast from "react-hot-toast";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/items", label: "Browse" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    setMobileOpen(false);
    toast.success("Logged out successfully");
    router.push("/");
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: scrolled ? "rgba(10,10,8,0.95)" : "var(--bg)",
          borderBottom: `1px solid ${scrolled ? "var(--border2)" : "var(--border)"}`,
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", height: 64, gap: 32 }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
            <div style={{
              width: 32, height: 32, background: "var(--accent)", borderRadius: 4,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <BookOpen size={18} color="var(--bg)" />
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "var(--text)" }}>
              Odyssey
            </span>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: "flex", gap: 4, flex: 1 }} className="desktop-nav">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} style={{
                padding: "6px 14px",
                fontSize: 14,
                fontWeight: 500,
                color: isActive(l.href) ? "var(--accent)" : "var(--text2)",
                textDecoration: "none",
                borderRadius: "var(--radius)",
                transition: "color 0.2s",
                background: isActive(l.href) ? "rgba(212,168,83,0.08)" : "transparent",
              }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
            {user ? (
              <div style={{ position: "relative" }} ref={dropRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="btn btn-secondary"
                  style={{ padding: "7px 14px", gap: 8 }}
                >
                  <div style={{
                    width: 24, height: 24, borderRadius: "50%",
                    background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, color: "var(--bg)",
                  }}>
                    {(user.displayName || user.email || "U")[0].toUpperCase()}
                  </div>
                  <span style={{ fontSize: 14, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {user.displayName || user.email?.split("@")[0]}
                  </span>
                  <ChevronDown size={14} style={{ transition: "transform 0.2s", transform: dropdownOpen ? "rotate(180deg)" : "none" }} />
                </button>

                {dropdownOpen && (
                  <div className="dropdown">
                    <div style={{ padding: "8px 12px 12px", borderBottom: "1px solid var(--border)", marginBottom: 8 }}>
                      <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 2 }}>Signed in as</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {user.email}
                      </div>
                    </div>
                    <Link href="/items/add" onClick={() => setDropdownOpen(false)} style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
                      fontSize: 14, color: "var(--text2)", textDecoration: "none", borderRadius: "var(--radius)",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--surface2)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text2)"; }}
                    >
                      <Plus size={15} /> Add Book
                    </Link>
                    <Link href="/items/manage" onClick={() => setDropdownOpen(false)} style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
                      fontSize: 14, color: "var(--text2)", textDecoration: "none", borderRadius: "var(--radius)",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--surface2)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text2)"; }}
                    >
                      <Settings size={15} /> Manage Books
                    </Link>
                    <div style={{ borderTop: "1px solid var(--border)", marginTop: 8, paddingTop: 8 }}>
                      <button onClick={handleLogout} style={{
                        display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
                        fontSize: 14, color: "var(--red)", background: "none", border: "none",
                        cursor: "pointer", width: "100%", borderRadius: "var(--radius)", transition: "all 0.15s",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(201,64,64,0.08)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                      >
                        <LogOut size={15} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: "flex", gap: 8 }} className="desktop-nav">
                <Link href="/login" className="btn btn-ghost" style={{ fontSize: 14 }}>Sign In</Link>
                <Link href="/register" className="btn btn-primary" style={{ fontSize: 14, padding: "8px 18px" }}>Register</Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="btn btn-ghost mobile-menu-btn"
              style={{ padding: 8 }}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <>
          <div className="nav-mobile-overlay" onClick={() => setMobileOpen(false)} />
          <div className="nav-mobile-menu">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "var(--text)" }}>Menu</span>
              <button onClick={() => setMobileOpen(false)} className="btn btn-ghost" style={{ padding: 6 }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
                  padding: "12px 16px", fontSize: 15, fontWeight: 500,
                  color: isActive(l.href) ? "var(--accent)" : "var(--text2)",
                  textDecoration: "none", borderRadius: "var(--radius)",
                  background: isActive(l.href) ? "rgba(212,168,83,0.08)" : "transparent",
                }}>
                  {l.label}
                </Link>
              ))}

              {user ? (
                <>
                  <div style={{ margin: "16px 0 8px", height: 1, background: "var(--border)" }} />
                  <div style={{ padding: "8px 16px", fontSize: 12, color: "var(--text3)" }}>
                    {user.email}
                  </div>
                  <Link href="/items/add" onClick={() => setMobileOpen(false)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", fontSize: 15, color: "var(--text2)", textDecoration: "none" }}>
                    <Plus size={16} /> Add Book
                  </Link>
                  <Link href="/items/manage" onClick={() => setMobileOpen(false)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", fontSize: 15, color: "var(--text2)", textDecoration: "none" }}>
                    <Settings size={16} /> Manage Books
                  </Link>
                  <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", fontSize: 15, color: "var(--red)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                    <LogOut size={16} /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <div style={{ margin: "16px 0 8px", height: 1, background: "var(--border)" }} />
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="btn btn-secondary" style={{ margin: "4px 0" }}>Sign In</Link>
                  <Link href="/register" onClick={() => setMobileOpen(false)} className="btn btn-primary" style={{ margin: "4px 0", justifyContent: "center" }}>Register</Link>
                </>
              )}
            </div>
          </div>
        </>
      )}

      <style>{`
        .desktop-nav { display: flex; }
        .mobile-menu-btn { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
