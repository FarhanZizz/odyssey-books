"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getBooks, deleteBook, Book } from "@/lib/books";
import toast from "react-hot-toast";
import { Plus, Eye, Trash2, Settings, Package, BookOpen } from "lucide-react";

export default function ManagePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [delId, setDelId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setBooks(getBooks()); setLoading(false); }, []);

  const handleDelete = (id: string) => {
    deleteBook(id);
    setBooks(getBooks());
    setDelId(null);
    toast.success("Book removed from listing");
  };

  return (
    <ProtectedRoute>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />

        <div className="page-header">
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <div style={{ width: 36, height: 36, background: "rgba(212,168,83,0.12)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Settings size={18} color="var(--accent)" />
                  </div>
                  <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>Management</p>
                </div>
                <h1 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 700, marginBottom: 6 }}>Manage Books</h1>
                <p style={{ fontSize: 15, color: "var(--text3)" }}>{books.length} total listings</p>
              </div>
              <Link href="/items/add" className="btn btn-primary" style={{ gap: 8 }}>
                <Plus size={16} /> Add New Book
              </Link>
            </div>
          </div>
        </div>

        <div className="container" style={{ flex: 1, padding: "32px 24px" }}>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
            {[
              { label: "Total Books", value: books.length, icon: BookOpen, color: "var(--accent)" },
              { label: "In Stock", value: books.filter(b => b.inStock).length, icon: Package, color: "var(--green)" },
              { label: "Sold Out", value: books.filter(b => !b.inStock).length, icon: Package, color: "var(--red)" },
            ].map((s, i) => (
              <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius2)", padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 40, height: 40, background: `${s.color}18`, borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <s.icon size={18} color={s.color} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700 }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "var(--text3)" }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: 60 }}><div className="spinner" style={{ width: 36, height: 36 }} /></div>
          ) : books.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 8 }}>No books listed</h3>
              <p style={{ color: "var(--text3)", marginBottom: 20 }}>Start by adding your first book</p>
              <Link href="/items/add" className="btn btn-primary"><Plus size={16} /> Add Book</Link>
            </div>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Book</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map(book => (
                    <tr key={book.id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 40, height: 54, borderRadius: 4, overflow: "hidden", flexShrink: 0, background: "var(--bg3)", position: "relative" }}>
                            <Image src={book.image} alt={book.title} fill style={{ objectFit: "cover" }} sizes="40px" />
                          </div>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{book.title}</div>
                            <div style={{ fontSize: 12, color: "var(--text3)", fontStyle: "italic" }}>{book.author}</div>
                          </div>
                        </div>
                      </td>
                      <td><span className="badge badge-gray">{book.category}</span></td>
                      <td style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: "var(--accent)" }}>${book.price.toFixed(2)}</td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <span style={{ color: "var(--accent)", fontSize: 13 }}>★</span>
                          <span style={{ fontSize: 13 }}>{book.rating.toFixed(1)}</span>
                        </div>
                      </td>
                      <td><span className={`badge ${book.inStock ? "badge-green" : "badge-red"}`}>{book.inStock ? "In Stock" : "Sold Out"}</span></td>
                      <td>
                        <div style={{ display: "flex", gap: 8 }}>
                          <Link href={`/items/${book.id}`} className="btn btn-ghost" style={{ padding: "6px 10px", gap: 6, fontSize: 13 }}>
                            <Eye size={14} /> View
                          </Link>
                          <button onClick={() => setDelId(book.id)} className="btn btn-danger" style={{ padding: "6px 10px", gap: 6, fontSize: 13 }}>
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Confirm delete modal */}
        {delId && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 24 }} onClick={() => setDelId(null)}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: "var(--radius2)", padding: 32, maxWidth: 400, width: "100%" }} onClick={e => e.stopPropagation()}>
              <div style={{ width: 48, height: 48, background: "rgba(201,64,64,0.1)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <Trash2 size={22} color="var(--red)" />
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Remove Book?</h3>
              <p style={{ fontSize: 14, color: "var(--text3)", marginBottom: 24, lineHeight: 1.6 }}>
                This will permanently remove <strong style={{ color: "var(--text)" }}>"{books.find(b => b.id === delId)?.title}"</strong> from your listings.
              </p>
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <button onClick={() => setDelId(null)} className="btn btn-secondary">Cancel</button>
                <button onClick={() => handleDelete(delId)} className="btn btn-danger" style={{ background: "var(--red)", color: "white", border: "none" }}>Delete</button>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
