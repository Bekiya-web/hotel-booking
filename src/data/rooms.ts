import deluxe from "@/assets/room-deluxe.jpg";
import suite from "@/assets/room-suite.jpg";
import standard from "@/assets/room-standard.jpg";
import penthouse from "@/assets/room-penthouse.jpg";

export type Room = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: number;
  image: string;
  gallery: string[];
  bed: string;
  size: string;
  guests: number;
  rating: number;
  reviews: number;
  amenities: string[];
  available: number;
  view: string;
};

export const rooms: Room[] = [
  {
    id: "classic-king",
    name: "Classic King",
    tagline: "Timeless comfort",
    description: "A serene retreat with king bed, marble bath, and warm city tones.",
    longDescription:
      "Our Classic King rooms balance understated elegance with every modern comfort. Wake to soft natural light, sink into premium linens, and enjoy a curated minibar selected by our resident sommelier.",
    price: 189,
    image: standard,
    gallery: [standard, deluxe, suite],
    bed: "King bed",
    size: "38 m²",
    guests: 2,
    rating: 4.7,
    reviews: 412,
    amenities: ["Free WiFi", "Air conditioning", "Breakfast", "Smart TV", "Minibar", "Safe"],
    available: 8,
    view: "City view",
  },
  {
    id: "deluxe-skyline",
    name: "Deluxe Skyline",
    tagline: "Floor-to-ceiling views",
    description: "Panoramic windows frame the skyline at dusk. Walnut, brass, crisp linens.",
    longDescription:
      "Perched higher in the tower, the Deluxe Skyline pairs handcrafted walnut joinery with floor-to-ceiling windows. The sunset view alone is worth the booking.",
    price: 289,
    image: deluxe,
    gallery: [deluxe, suite, penthouse],
    bed: "King bed",
    size: "52 m²",
    guests: 2,
    rating: 4.9,
    reviews: 689,
    amenities: ["Free WiFi", "Air conditioning", "Breakfast", "Smart TV", "Espresso bar", "Rain shower", "Bathrobe"],
    available: 3,
    view: "Skyline view",
  },
  {
    id: "executive-suite",
    name: "Executive Suite",
    tagline: "A residence in the sky",
    description: "Velvet lounge, marble dining, fireplace. For celebrations and slow mornings.",
    longDescription:
      "A spacious one-bedroom suite with a separate velvet lounge, marble dining for four, and a working fireplace. Designed for guests who turn a stay into an occasion.",
    price: 489,
    image: suite,
    gallery: [suite, penthouse, deluxe],
    bed: "King bed + sofa",
    size: "92 m²",
    guests: 3,
    rating: 4.9,
    reviews: 234,
    amenities: ["Free WiFi", "Lounge area", "Fireplace", "Espresso bar", "Marble bath", "Butler service", "Welcome bottle"],
    available: 2,
    view: "Panoramic",
  },
  {
    id: "penthouse",
    name: "Penthouse Terrace",
    tagline: "Private pool & sunset",
    description: "Top-floor sanctuary with private plunge pool and 270° terrace.",
    longDescription:
      "The crown of Auréa Grand. A private terrace, plunge pool, outdoor lounge, and uninterrupted sunsets. Reserved for those who want the entire skyline to themselves.",
    price: 1290,
    image: penthouse,
    gallery: [penthouse, suite, deluxe],
    bed: "King bed",
    size: "180 m²",
    guests: 4,
    rating: 5.0,
    reviews: 88,
    amenities: ["Private pool", "Terrace", "Butler service", "Chef on request", "Champagne", "Fireplace", "Spa access"],
    available: 1,
    view: "270° skyline",
  },
];

export const getRoom = (id: string) => rooms.find((r) => r.id === id);