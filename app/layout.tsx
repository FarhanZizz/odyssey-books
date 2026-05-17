import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Odyssey Books — Rare & Curated Reads",
  description: "Discover and collect extraordinary books. A curated marketplace for readers who demand more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: "#1e1e1b",
                color: "#f0ede6",
                border: "1px solid #333330",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
              },
              success: { iconTheme: { primary: "#d4a853", secondary: "#0a0a08" } },
              error: { iconTheme: { primary: "#c94040", secondary: "#0a0a08" } },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
