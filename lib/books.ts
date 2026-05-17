export interface Book {
  id: string;
  title: string;
  author: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  pages: number;
  language: string;
  publishedYear: number;
  isbn: string;
  inStock: boolean;
  addedBy?: string;
  addedAt?: string;
}

export const CATEGORIES = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Mystery",
  "Biography",
  "History",
  "Fantasy",
  "Self-Help",
  "Romance",
];

export const INITIAL_BOOKS: Book[] = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    shortDescription: "Between life and death there is a library where every book represents a different life you could have lived.",
    fullDescription: "Somewhere out beyond the edge of the universe there is a library that contains an infinite number of books, each one the story of another reality. One tells the story of your life as it is, along with another book for the other life you could have lived if you had made a different choice at any point in your life. While we all wonder how our lives might have been, what if you had the chance to go to the library and see for yourself? Would any of these other lives truly be better? In The Midnight Library, Matt Haig's enchanting bestseller, Nora Seed finds herself faced with this decision. Faced with the possibility of changing her life for a new one, following a different career, undoing old breakups, realizing her dreams of becoming a glaciologist; she must search within herself as she travels through the Midnight Library to decide what is truly fulfilling in life, and what makes it worth living in the first place.",
    price: 14.99,
    category: "Fiction",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    pages: 304,
    language: "English",
    publishedYear: 2020,
    isbn: "978-0525559474",
    inStock: true,
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    shortDescription: "An easy and proven way to build good habits and break bad ones.",
    fullDescription: "No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you. The problem is your system. Bad habits repeat themselves again and again not because you don't want to change, but because you have the wrong system for change. You do not rise to the level of your goals. You fall to the level of your systems. Here, you'll get a proven system that can take you to new heights.",
    price: 16.99,
    category: "Self-Help",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    pages: 320,
    language: "English",
    publishedYear: 2018,
    isbn: "978-0735211292",
    inStock: true,
  },
  {
    id: "3",
    title: "Dune",
    author: "Frank Herbert",
    shortDescription: "The epic science-fiction masterwork set in a distant future amidst a feudal interstellar society.",
    fullDescription: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the 'spice' melange, a drug capable of extending life and enhancing consciousness. Coveted across the known universe, melange is a prize worth killing for. When House Atreides is betrayed, the destruction of Paul's family will set the boy on a journey toward a destiny greater than he could ever have imagined. And as he evolves into the mysterious man known as Muad'Dib, he will bring to fruition humankind's most ancient and unattainable dream.",
    price: 12.99,
    category: "Science Fiction",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1490633874781-1c63cc424610?w=400&h=600&fit=crop",
    pages: 412,
    language: "English",
    publishedYear: 1965,
    isbn: "978-0441013593",
    inStock: true,
  },
  {
    id: "4",
    title: "Gone Girl",
    author: "Gillian Flynn",
    shortDescription: "On the morning of Nick and Amy Dunne's fifth wedding anniversary, Amy goes missing.",
    fullDescription: "Marriage can be a real killer. On a warm summer morning in North Carthage, Missouri, it is Nick and Amy Dunne's fifth wedding anniversary. Presents are being wrapped and reservations are being made when Nick's clever and beautiful wife disappears from their rented McMansion on the Mississippi River. Under mounting pressure from the police and the media—as well as Amy's fiercely doting parents—the town golden boy parades an endless series of lies, deceits, and inappropriate behavior. Nick is oddly evasive, and he is definitely bitter—but is he really a killer?",
    price: 13.99,
    category: "Mystery",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=400&h=600&fit=crop",
    pages: 432,
    language: "English",
    publishedYear: 2012,
    isbn: "978-0307588371",
    inStock: true,
  },
  {
    id: "5",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    shortDescription: "A brief history of humankind, exploring the cognitive, agricultural, and scientific revolutions.",
    fullDescription: "One hundred thousand years ago, at least six different species of humans inhabited Earth. Yet today there is only one—homo sapiens. What happened to the others? And what may happen to us? Most books about the history of humanity pursue either a historical or a biological approach, but Dr. Yuval Noah Harari breaks the mold with this highly original book that begins about 70,000 years ago with the appearance of modern cognition. From examining the role evolving humans have played in the global ecosystem to charting the rise of empires, Sapiens integrates history and science to reconsider accepted narratives, connect past developments with contemporary concerns, and examine specific events within the context of larger ideas.",
    price: 15.99,
    category: "History",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=600&fit=crop",
    pages: 464,
    language: "English",
    publishedYear: 2011,
    isbn: "978-0062316097",
    inStock: false,
  },
  {
    id: "6",
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    shortDescription: "The intimate, epic tale of a man who grew up to be the most notorious wizard his world has ever seen.",
    fullDescription: "My name is Kvothe. I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep. You may have heard of me. So begins a tale unequaled in fantasy literature—the story of a hero told in his own voice. It is a tale of sorrow, a tale of survival, a tale of one man's search for meaning in his universe.",
    price: 11.99,
    category: "Fantasy",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=600&fit=crop",
    pages: 662,
    language: "English",
    publishedYear: 2007,
    isbn: "978-0756404079",
    inStock: true,
  },
  {
    id: "7",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    shortDescription: "The exclusive biography of Steve Jobs based on more than forty interviews with Jobs conducted over two years.",
    fullDescription: "Based on more than forty interviews with Steve Jobs conducted over two years—as well as interviews with more than a hundred family members, friends, adversaries, competitors, and colleagues—Walter Isaacson has written a riveting story of the roller-coaster life and searingly intense personality of a creative entrepreneur whose passion for perfection and ferocious drive revolutionized six industries: personal computers, animated movies, music, phones, tablet computing, and digital publishing.",
    price: 17.99,
    category: "Biography",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=600&fit=crop",
    pages: 630,
    language: "English",
    publishedYear: 2011,
    isbn: "978-1451648539",
    inStock: true,
  },
  {
    id: "8",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    shortDescription: "A romantic novel of manners written by Jane Austen, one of the greatest works in English literature.",
    fullDescription: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. So begins Pride and Prejudice, Jane Austen's witty comedy of manners—one of the most popular novels of all time—that features splendidly civilized sparring between the proud Mr. Darcy and the prejudiced Elizabeth Bennet as they play out their spirited courtship in a series of eighteenth-century drawing-room intrigues. Renowned literary critic and historian George Saintsbury in 1894 declared it the most perfect, the most artistic, the most brilliant, the most purely satisfying of all her works.",
    price: 9.99,
    category: "Romance",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    pages: 368,
    language: "English",
    publishedYear: 1813,
    isbn: "978-0141439518",
    inStock: true,
  },
];

export function getBooks(): Book[] {
  if (typeof window === "undefined") return INITIAL_BOOKS;
  const stored = localStorage.getItem("odyssey_books");
  if (!stored) {
    localStorage.setItem("odyssey_books", JSON.stringify(INITIAL_BOOKS));
    return INITIAL_BOOKS;
  }
  return JSON.parse(stored);
}

export function saveBooks(books: Book[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("odyssey_books", JSON.stringify(books));
}

export function addBook(book: Omit<Book, "id">): Book {
  const books = getBooks();
  const newBook: Book = {
    ...book,
    id: Date.now().toString(),
  };
  saveBooks([...books, newBook]);
  return newBook;
}

export function deleteBook(id: string): void {
  const books = getBooks();
  saveBooks(books.filter((b) => b.id !== id));
}

export function getBookById(id: string): Book | undefined {
  return getBooks().find((b) => b.id === id);
}
