"use client";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { getBooks, CATEGORIES, Book } from "@/lib/books";
import { Search, Filter, X, SlidersHorizontal } from "lucide-react";

function BooksContent() {
  const searchParams = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [sort, setSort] = useState("default");
  const [priceMax, setPriceMax] = useState(100);
  const [stockOnly, setStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => { setBooks(getBooks()); }, []);

  const filtered = useMemo(() => {
    let list = [...books];
    if (search) list = list.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()));
    if (category !== "All") list = list.filter(b => b.category === category);
    list = list.filter(b => b.price <= priceMax);
    if (stockOnly) list = list.filter(b => b.inStock);
    if (minRating > 0) list = list.filter(b => b.rating >= minRating);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sort === "title") list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [books, search, category, sort, priceMax, stockOnly, minRating]);

  const activeFilters = [
    category !== "All" && category,
    priceMax < 100 && `Under $${priceMax}`,
    stockOnly && "In Stock",
    minRating > 0 && `${minRating}+ Stars`,
  ].filter(Boolean);

  const clearFilters = () => { setCategory("All"); setPriceMax(100); setStockOnly(false); setMinRating(0); setSearch(""); };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>Library</p>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, marginBottom: 8 }}>Browse Books</h1>
          <p style={{ fontSize: 15, color: "var(--text3)" }}>
            {filtered.length} {filtered.length === 1 ? "book" : "books"} available
          </p>
        </div>
      </div>

      <div className="container" style={{ flex: 1, padding: "32px 24px" }}>
        {/* Search + filter bar */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 240 }}>
            <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text3)" }} />
            <input
              className="input"
              style={{ paddingLeft: 40 }}
              placeholder="Search by title or author..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="input" style={{ width: "auto", minWidth: 160 }} value={sort} onChange={e => setSort(e.target.value)}>
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="title">Title A–Z</option>
          </select>
          <button onClick={() => setFilterOpen(!filterOpen)} className="btn btn-secondary" style={{ gap: 8 }}>
            <SlidersHorizontal size={15} /> Filters {activeFilters.length > 0 && <span style={{ background: "var(--accent)", color: "var(--bg)", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{activeFilters.length}</span>}
          </button>
        </div>

        {/* Filter panel */}
        {filterOpen && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: "var(--radius2)", padding: 24, marginBottom: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
              {/* Category */}
              <div>
                <label className="label">Category</label>
                <select className="input" value={category} onChange={e => setCategory(e.target.value)}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              {/* Price */}
              <div>
                <label className="label">Max Price: ${priceMax}</label>
                <input type="range" min={5} max={100} step={5} value={priceMax} onChange={e => setPriceMax(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--accent)", marginTop: 8 }} />
              </div>
              {/* Rating */}
              <div>
                <label className="label">Min Rating</label>
                <select className="input" value={minRating} onChange={e => setMinRating(Number(e.target.value))}>
                  <option value={0}>Any Rating</option>
                  <option value={3}>3+ Stars</option>
                  <option value={4}>4+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                </select>
              </div>
              {/* Stock */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 20 }}>
                <input type="checkbox" id="stock" checked={stockOnly} onChange={e => setStockOnly(e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: "var(--accent)" }} />
                <label htmlFor="stock" style={{ fontSize: 14, color: "var(--text2)", cursor: "pointer" }}>In Stock Only</label>
              </div>
            </div>
            {activeFilters.length > 0 && (
              <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, color: "var(--text3)" }}>Active:</span>
                {activeFilters.map((f, i) => (
                  <span key={i} className="badge badge-accent">{f}</span>
                ))}
                <button onClick={clearFilters} className="btn btn-ghost" style={{ padding: "4px 10px", fontSize: 12, gap: 4 }}>
                  <X size={12} /> Clear All
                </button>
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📚</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 8 }}>No books found</h3>
            <p style={{ color: "var(--text3)", marginBottom: 20 }}>Try adjusting your filters or search terms</p>
            <button onClick={clearFilters} className="btn btn-primary">Clear Filters</button>
          </div>
        ) : (
          <div className="books-grid">
            {filtered.map(book => <BookCard key={book.id} book={book} />)}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default function ItemsPage() {
  return <Suspense fallback={<div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh"}}><div className="spinner" style={{width:36,height:36}} /></div>}>
    <BooksContent />
  </Suspense>;
}
