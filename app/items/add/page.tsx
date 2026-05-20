"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { addBook, CATEGORIES } from "@/lib/books";
import toast from "react-hot-toast";
import { Plus, BookOpen, Image as ImageIcon } from "lucide-react";

interface FormData {
  title: string; author: string; shortDescription: string; fullDescription: string;
  price: string; category: string; image: string; pages: string; language: string;
  publishedYear: string; isbn: string; inStock: boolean;
}

const INIT: FormData = {
  title: "", author: "", shortDescription: "", fullDescription: "",
  price: "", category: "Fiction", image: "", pages: "", language: "English",
  publishedYear: "", isbn: "", inStock: true,
};

export default function AddBookPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState<FormData>(INIT);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);

  const set = (k: keyof FormData, v: string | boolean) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.author.trim()) e.author = "Author is required";
    if (!form.shortDescription.trim()) e.shortDescription = "Short description is required";
    if (!form.fullDescription.trim()) e.fullDescription = "Full description is required";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) e.price = "Valid price required";
    if (!form.pages || isNaN(Number(form.pages))) e.pages = "Valid page count required";
    if (!form.publishedYear || isNaN(Number(form.publishedYear))) e.publishedYear = "Valid year required";
    return e;
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setLoading(true);
    try {
      addBook({
        title: form.title, author: form.author,
        shortDescription: form.shortDescription, fullDescription: form.fullDescription,
        price: Number(form.price), category: form.category,
        image: form.image || "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
        pages: Number(form.pages), language: form.language,
        publishedYear: Number(form.publishedYear), isbn: form.isbn,
        inStock: form.inStock, rating: 4.0,
        addedBy: user?.email || "Unknown",
        addedAt: new Date().toISOString(),
      });
      toast.success("Book listed successfully!");
      router.push("/items/manage");
    } catch {
      toast.error("Failed to add book");
    } finally { setLoading(false); }
  };

  const Field = ({ label, k, type = "text", placeholder = "", as = "input" }: { label: string; k: keyof FormData; type?: string; placeholder?: string; as?: string }) => (
    <div className="form-group">
      <label className="label">{label}</label>
      {as === "textarea" ? (
        <textarea className={`input ${errors[k] ? "error" : ""}`} placeholder={placeholder}
          value={form[k] as string} onChange={e => set(k, e.target.value)} />
      ) : (
        <input type={type} className={`input ${errors[k] ? "error" : ""}`} placeholder={placeholder}
          value={form[k] as string} onChange={e => set(k, e.target.value)} />
      )}
      {errors[k] && <p className="form-error">{errors[k]}</p>}
    </div>
  );

  return (
    <ProtectedRoute>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />

        <div className="page-header">
          <div className="container">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, background: "rgba(212,168,83,0.12)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Plus size={18} color="var(--accent)" />
              </div>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>New Listing</p>
            </div>
            <h1 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 700, marginBottom: 6 }}>Add a Book</h1>
            <p style={{ fontSize: 15, color: "var(--text3)" }}>List your book for thousands of readers to discover</p>
          </div>
        </div>

        <div className="container" style={{ flex: 1, padding: "40px 24px", maxWidth: 840 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="add-grid">
            {/* Left col */}
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid var(--border)" }}>
                Basic Information
              </h2>
              <Field label="Book Title *" k="title" placeholder="e.g. The Great Gatsby" />
              <Field label="Author *" k="author" placeholder="e.g. F. Scott Fitzgerald" />
              <Field label="Short Description *" k="shortDescription" placeholder="1–2 sentence summary..." as="textarea" />
              <Field label="Full Description *" k="fullDescription" placeholder="Detailed description of the book..." as="textarea" />

              <div className="form-group">
                <label className="label">Category</label>
                <select className="input" value={form.category} onChange={e => set("category", e.target.value)}>
                  {CATEGORIES.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Right col */}
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid var(--border)" }}>
                Details & Pricing
              </h2>
              <Field label="Price (USD) *" k="price" type="number" placeholder="e.g. 14.99" />
              <Field label="Number of Pages *" k="pages" type="number" placeholder="e.g. 320" />
              <Field label="Published Year *" k="publishedYear" type="number" placeholder="e.g. 1925" />
              <Field label="ISBN" k="isbn" placeholder="e.g. 978-0743273565" />

              <div className="form-group">
                <label className="label">Language</label>
                <select className="input" value={form.language} onChange={e => set("language", e.target.value)}>
                  {["English", "French", "Spanish", "German", "Arabic", "Chinese", "Japanese"].map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="label" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input type="checkbox" checked={form.inStock} onChange={e => set("inStock", e.target.checked)}
                    style={{ width: 16, height: 16, accentColor: "var(--accent)" }} />
                  Available In Stock
                </label>
              </div>

              {/* Image URL */}
              <div className="form-group">
                <label className="label"><ImageIcon size={13} style={{ display: "inline", marginRight: 4 }} />Cover Image URL (optional)</label>
                <input type="url" className="input" placeholder="https://..." value={form.image} onChange={e => set("image", e.target.value)} />
                <p style={{ fontSize: 12, color: "var(--text3)", marginTop: 4 }}>Leave blank to use a default image</p>
              </div>

              {/* Image preview */}
              {form.image && (
                <div style={{ marginBottom: 20, borderRadius: "var(--radius)", overflow: "hidden", height: 160, position: "relative", border: "1px solid var(--border)" }}>
                  <img src={form.image} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=160&fit=crop"; }} />
                  <div style={{ position: "absolute", bottom: 8, left: 8 }}>
                    <span className="badge badge-gray" style={{ fontSize: 10 }}>Preview</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 12, marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--border)", justifyContent: "flex-end" }}>
            <button onClick={() => router.back()} className="btn btn-secondary">Cancel</button>
            <button onClick={submit} disabled={loading} className="btn btn-primary" style={{ minWidth: 140, justifyContent: "center" }}>
              {loading ? <><div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> Adding...</> : <><Plus size={16} /> List Book</>}
            </button>
          </div>
        </div>

        <Footer />
        <style>{`@media(max-width:640px){.add-grid{grid-template-columns:1fr!important;}}`}</style>
      </div>
    </ProtectedRoute>
  );
}
