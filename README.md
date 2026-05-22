# Odyssey Books

A curated book marketplace with a dark editorial aesthetic. Browse rare titles, filter by genre and price, and list your own books after signing in.

![Odyssey Books](https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&h=400&fit=crop)

---

## Features

- Browse and search a curated book catalogue
- Filter by genre, price range, rating, and stock status
- Detailed book pages with specs and related titles
- Email/password and Google sign-in via Firebase
- Add and manage your own book listings (protected)
- Smooth scroll powered by Lenis
- Fully responsive across mobile, tablet, and desktop

---

## Pages

| Route           | Description                             |
| --------------- | --------------------------------------- |
| `/`             | Landing page                            |
| `/items`        | Browse with search and filters          |
| `/items/[id]`   | Book detail page                        |
| `/about`        | About page                              |
| `/login`        | Sign in                                 |
| `/register`     | Create account                          |
| `/items/add`    | Add a book (sign in required)           |
| `/items/manage` | Manage your listings (sign in required) |

---

## Built With

- [Next.js 16](https://nextjs.org) — App Router
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Firebase](https://firebase.google.com) — Authentication
- [Lenis](https://lenis.darkroom.engineering) — Smooth scroll
- [Lucide React](https://lucide.dev) — Icons

---

## Getting Started

**1. Clone the repo**

```bash
git clone https://github.com/FarhanZizz/odyssey-books.git
cd odyssey-books
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up Firebase**

Create a project at [firebase.google.com](https://firebase.google.com), enable Email/Password and Google authentication, then copy your config into a `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

**4. Run**

```bash
npm run dev
```
