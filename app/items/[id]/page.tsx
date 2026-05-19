"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { getBooks, getBookById, Book } from "@/lib/books";
import { ArrowLeft, BookOpen, Star, Hash, Globe, Calendar, Layers } from "lucide-react";

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [related, setRelated] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = getBookById(id);
    if (!found) { router.push("/items"); return; }
    setBook(found);
    const all = getBooks();
    setRelated(all.filter(b => b.id !== id && b.category === found.category).slice(0, 3));
    setLoading(false);
  }, [id, router]);

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <div className="spinner" style={{ width: 40, height: 40 }} />
    </div>
  );

  if (!book) return null;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Breadcrumb */}
      <div style={{ background: "var(--bg2)", borderBottom: "1px solid var(--border)", padding: "16px 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/items" className="btn btn-ghost" style={{ padding: "6px 10px", fontSize: 13, gap: 6 }}>
            <ArrowLeft size={14} /> Back to Browse
          </Link>
          <span style={{ color: "var(--text3)" }}>/</span>
          <span style={{ fontSize: 13, color: "var(--text3)" }}>{book.category}</span>
          <span style={{ color: "var(--text3)" }}>/</span>
          <span style={{ fontSize: 13, color: "var(--text2)", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{book.title}</span>
        </div>
      </div>

      <div className="container" style={{ flex: 1, padding: "48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 56, alignItems: "start" }} className="book-detail-grid">
          {/* Book cover */}
          <div>
            <div style={{ position: "relative", borderRadius: "var(--radius2)", overflow: "hidden", aspectRatio: "3/4", boxShadow: "0 24px 64px rgba(0,0,0,0.6)", border: "1px solid var(--border2)" }}>
              <Image src={book.image} alt={book.title} fill style={{ objectFit: "cover" }} sizes="320px" priority />
            </div>
            {/* Price + CTA */}
            <div style={{ marginTop: 24, padding: 20, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius2)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: "var(--accent)" }}>
                  ${book.price.toFixed(2)}
                </span>
                <span className={`badge ${book.inStock ? "badge-green" : "badge-red"}`}>
                  {book.inStock ? "In Stock" : "Sold Out"}
                </span>
              </div>
              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "12px 0" }} disabled={!book.inStock}>
                {book.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
              <button className="btn btn-secondary" style={{ width: "100%", justifyContent: "center", marginTop: 10 }}>
                Add to Wishlist
              </button>
            </div>
          </div>

          {/* Details */}
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              <span className="badge badge-accent">{book.category}</span>
              {book.addedBy && <span className="badge badge-gray">Listed by seller</span>}
            </div>

            <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, marginBottom: 8, lineHeight: 1.15 }}>{book.title}</h1>
            <p style={{ fontSize: 18, color: "var(--text3)", fontStyle: "italic", marginBottom: 20 }}>by {book.author}</p>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, padding: "12px 16px", background: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)", width: "fit-content" }}>
              <span style={{ fontSize: 18, color: "var(--accent)" }}>{"★".repeat(Math.floor(book.rating))}{"☆".repeat(5 - Math.floor(book.rating))}</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "var(--text)" }}>{book.rating.toFixed(1)}</span>
              <span style={{ fontSize: 14, color: "var(--text3)" }}>/ 5.0</span>
            </div>

            <div className="divider" />

            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, marginBottom: 14 }}>About this Book</h2>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8, marginBottom: 32 }}>{book.fullDescription}</p>

            {/* Specs */}
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Specifications</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { icon: Layers, label: "Pages", value: book.pages },
                { icon: Globe, label: "Language", value: book.language },
                { icon: Calendar, label: "Published", value: book.publishedYear },
                { icon: Hash, label: "ISBN", value: book.isbn },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}>
                  <Icon size={16} color="var(--accent)" />
                  <div>
                    <div style={{ fontSize: 11, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related books */}
        {related.length > 0 && (
          <div style={{ marginTop: 72 }}>
            <div className="divider" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, marginBottom: 8 }}>You Might Also Like</h2>
            <p style={{ fontSize: 14, color: "var(--text3)", marginBottom: 28 }}>More {book.category} books from our collection</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
              {related.map(b => <BookCard key={b.id} book={b} />)}
            </div>
          </div>
        )}
      </div>

      <Footer />
      <style>{`@media(max-width:768px){.book-detail-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
