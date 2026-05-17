"use client";
import Link from "next/link";
import Image from "next/image";
import { Book } from "@/lib/books";
import { Star, ArrowRight } from "lucide-react";

interface BookCardProps {
  book: Book;
  variant?: "default" | "compact";
}

export default function BookCard({ book, variant = "default" }: BookCardProps) {
  const stars = "★".repeat(Math.floor(book.rating)) + (book.rating % 1 >= 0.5 ? "½" : "") + "☆".repeat(5 - Math.ceil(book.rating));

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column" }}>
      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "var(--bg3)" }}>
        <Image
          src={book.image}
          alt={book.title}
          fill
          style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
        />
        {/* Stock badge */}
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          <span className={`badge ${book.inStock ? "badge-green" : "badge-red"}`}>
            {book.inStock ? "In Stock" : "Sold Out"}
          </span>
        </div>
        {/* Category */}
        <div style={{ position: "absolute", bottom: 10, left: 10 }}>
          <span className="badge badge-gray">{book.category}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 16, display: "flex", flexDirection: "column", flex: 1, gap: 8 }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 15,
          fontWeight: 600,
          color: "var(--text)",
          lineHeight: 1.3,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {book.title}
        </h3>

        <p style={{ fontSize: 12, color: "var(--text3)", fontStyle: "italic" }}>{book.author}</p>

        <p style={{
          fontSize: 13, color: "var(--text3)", lineHeight: 1.5,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {book.shortDescription}
        </p>

        {/* Rating */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, color: "var(--accent)", letterSpacing: 1 }}>
            {"★".repeat(Math.floor(book.rating))}{"☆".repeat(5 - Math.floor(book.rating))}
          </span>
          <span style={{ fontSize: 12, color: "var(--text3)" }}>{book.rating.toFixed(1)}</span>
        </div>

        {/* Bottom: price + button */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 8 }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "var(--accent)" }}>
            ${book.price.toFixed(2)}
          </span>
          <Link href={`/items/${book.id}`} className="btn btn-secondary" style={{ padding: "6px 14px", fontSize: 13, gap: 6 }}>
            View Details <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
