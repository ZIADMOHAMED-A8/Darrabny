export type Company = {
  id: string;
  name: string;
  desc: string;
  location: string;
  rating: number;
  reviews: number;
  cover: string;
  featured?: boolean;
  industry?: string;
  tagline?: string;
};

export const COMPANIES: Company[] = [
  {
    id: "1",
    name: "Tech Innovators Inc.",
    desc: "Leading tech company focused on cutting-edge software solutions and hardware innovation.",
    location: "San Francisco, CA",
    rating: 4.8,
    reviews: 251,
    cover: "/images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80",
    featured: true,
  },
  {
    id: "2",
    name: "Global Solutions Ltd.",
    desc: "Global consulting firm providing strategic advice and innovative solutions to a diverse client base.",
    location: "New York, NY",
    rating: 4.7,
    reviews: 189,
    cover: "/images.unsplash.com/photo-1524758631624-e2822e304c36?w=1400&q=80",
    featured: true,
  },
  {
    id: "3",
    name: "Creative Minds Co.",
    desc: "Innovative design agency specializing in brand identity, digital experiences, and creative content.",
    location: "Los Angeles, CA",
    rating: 4.9,
    reviews: 302,
    cover: "/images.unsplash.com/photo-1526481280695-3c687fd5432c?w=1400&q=80",
    featured: true,
  },
  {
    id: "4",
    name: "Data Dynamics Corp.",
    desc: "Data science and analytics solutions for modern businesses.",
    location: "Chicago, IL",
    rating: 4.6,
    reviews: 150,
    cover: "/images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
  },
  {
    id: "5",
    name: "Software Solutions Inc.",
    desc: "Building scalable software platforms for enterprises and startups.",
    location: "Austin, TX",
    rating: 4.8,
    reviews: 210,
    cover: "/images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&q=80",
  },
  {
    id: "6",
    name: "Finance First Group",
    desc: "Financial services and investment advisory with global reach.",
    location: "London, UK",
    rating: 4.7,
    reviews: 199,
    cover: "/images.unsplash.com/photo-1559526324-593bc073d938?w=1400&q=80",
  },
  {
    id: "7",
    name: "Health Innovations LLC",
    desc: "Healthcare products & services with a focus on innovation and R&D.",
    location: "Boston, MA",
    rating: 4.5,
    reviews: 120,
    cover: "/images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400&q=80",
  },
  {
    id: "8",
    name: "Green Energy Corp.",
    desc: "Renewable energy solutions for a sustainable future.",
    location: "Denver, CO",
    rating: 4.9,
    reviews: 350,
    cover: "/images.unsplash.com/photo-1509395176047-4a66953fd231?w=1400&q=80",
  },
  {
    id: "9",
    name: "Future Foods Inc.",
    desc: "Food & beverage innovation driven by data and research.",
    location: "Seattle, WA",
    rating: 4.2,
    reviews: 90,
    cover: "/images.unsplash.com/photo-1542838132-92c53300491e?w=1400&q=80",
  },
];
