"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, Mail, Lock, User } from "lucide-react";
import toast from "react-hot-toast";

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24">
    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

export default function RegisterPage() {
  const { register, loginWithGoogle } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", password: "", confirm: "", general: "" });

  const validate = () => {
    const e = { name: "", email: "", password: "", confirm: "", general: "" };
    if (!name.trim()) e.name = "Name is required";
    if (!email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Invalid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Password must be at least 6 characters";
    if (password !== confirm) e.confirm = "Passwords do not match";
    setErrors(e);
    return !e.name && !e.email && !e.password && !e.confirm;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await register(email, password, name);
      toast.success("Account created! Welcome to Odyssey.");
      router.push("/");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("email-already-in-use")) setErrors(e => ({ ...e, general: "An account with this email already exists" }));
      else setErrors(e => ({ ...e, general: "Registration failed. Please try again." }));
    } finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Account created with Google!");
      router.push("/");
    } catch {
      toast.error("Google sign-in failed");
    } finally { setGoogleLoading(false); }
  };

  type FieldKey = "name" | "email" | "password" | "confirm";
  const fields: Array<{ label: string; icon: typeof User; type: string; val: string; setVal: (v: string) => void; err: string; key: FieldKey; placeholder: string }> = [
    { label: "Full Name", icon: User, type: "text", val: name, setVal: setName, err: errors.name, key: "name", placeholder: "Jane Austen" },
    { label: "Email", icon: Mail, type: "email", val: email, setVal: setEmail, err: errors.email, key: "email", placeholder: "you@example.com" },
    { label: "Password", icon: Lock, type: "password", val: password, setVal: setPassword, err: errors.password, key: "password", placeholder: "••••••••" },
    { label: "Confirm Password", icon: Lock, type: "password", val: confirm, setVal: setConfirm, err: errors.confirm, key: "confirm", placeholder: "••••••••" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "var(--bg)" }}>
      <div style={{ flex: 1, display: "none", background: "var(--bg2)", borderRight: "1px solid var(--border)", padding: 48, flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }} className="auth-panel">
        <div className="hero-noise" />
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", position: "relative", zIndex: 1 }}>
          <div style={{ width: 32, height: 32, background: "var(--accent)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BookOpen size={18} color="var(--bg)" />
          </div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "var(--text)" }}>Odyssey</span>
        </Link>
        <div style={{ position: "relative", zIndex: 1 }}>
          <blockquote style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, lineHeight: 1.3, color: "var(--text)", marginBottom: 16 }}>
            {"\"There is no friend as loyal as a book.\""}
          </blockquote>
          <p style={{ fontSize: 14, color: "var(--text3)" }}>— Ernest Hemingway</p>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: 400 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 40, justifyContent: "center" }} className="mobile-logo">
            <div style={{ width: 32, height: 32, background: "var(--accent)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BookOpen size={18} color="var(--bg)" />
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700 }}>Odyssey</span>
          </Link>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, marginBottom: 8 }}>Create account</h1>
          <p style={{ fontSize: 14, color: "var(--text3)", marginBottom: 32 }}>
            Already have one?{" "}<Link href="/login" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 500 }}>Sign in</Link>
          </p>

          {errors.general && (
            <div style={{ padding: "12px 16px", background: "rgba(201,64,64,0.1)", border: "1px solid rgba(201,64,64,0.3)", borderRadius: "var(--radius)", marginBottom: 20, fontSize: 14, color: "var(--red)" }}>
              {errors.general}
            </div>
          )}

          <button onClick={handleGoogle} disabled={googleLoading} className="btn btn-secondary" style={{ width: "100%", justifyContent: "center", marginBottom: 20, padding: "11px", gap: 10 }}>
            {googleLoading ? <div className="spinner" style={{ width: 16, height: 16 }} /> : <GoogleIcon />}
            Continue with Google
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: "var(--border2)" }} />
            <span style={{ fontSize: 12, color: "var(--text3)" }}>OR</span>
            <div style={{ flex: 1, height: 1, background: "var(--border2)" }} />
          </div>

          <form onSubmit={handleSubmit}>
            {fields.map(({ label, icon: Icon, type, val, setVal, err, key, placeholder }) => (
              <div className="form-group" key={key}>
                <label className="label">{label}</label>
                <div style={{ position: "relative" }}>
                  <Icon size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text3)" }} />
                  <input type={type} className={`input ${err ? "error" : ""}`} style={{ paddingLeft: 38 }}
                    placeholder={placeholder} value={val} onChange={e => { setVal(e.target.value); setErrors(ev => ({ ...ev, [key]: "" })); }} />
                </div>
                {err && <p className="form-error">{err}</p>}
              </div>
            ))}

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px", fontSize: 15, marginTop: 8 }}>
              {loading ? <><div className="spinner" style={{ width: 16, height: 16 }} /> Creating...</> : "Create Account"}
            </button>
          </form>

          <p style={{ fontSize: 13, color: "var(--text3)", textAlign: "center", marginTop: 28 }}>
            By registering, you agree to our{" "}
            <a href="#" style={{ color: "var(--text2)", textDecoration: "underline" }}>Terms</a> and{" "}
            <a href="#" style={{ color: "var(--text2)", textDecoration: "underline" }}>Privacy Policy</a>
          </p>
        </div>
      </div>

      <style>{`@media(min-width:768px){.auth-panel{display:flex!important;}.mobile-logo{display:none!important;}}`}</style>
    </div>
  );
}
