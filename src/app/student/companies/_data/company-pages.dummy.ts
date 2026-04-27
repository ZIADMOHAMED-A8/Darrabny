export type CompanyReview = {
  id: string;
  name: string;
  date: string;
  rating: number;
  text: string;
  likes: number;
  comments: number;
};

export type CompanyInternship = {
  id: string;
  title: string;
  location: string;
  duration: string;
  paid: "Paid" | "Unpaid";
  tags: string[];
};

export type CompanyProfile = {
  id: string;
  name: string;
  tagline: string;
  location: string;
  size: string;
  followers: string;
  founded: string;
  website: string;
  headquarters: string;
  sectors: string[];
  about: string;
  logo: string;
  reviewsScore: number;
  reviewsCount: number;
  reviewBars: Array<{ star: number; percent: number }>;
  internships: CompanyInternship[];
  reviews: CompanyReview[];
};

export const COMPANY_PROFILES: Record<string, CompanyProfile> = {
  "1": {
    id: "1",
    name: "Tech Nova Solutions",
    tagline: "Innovating the future of Fintech",
    location: "San Francisco, CA",
    size: "500 - 1000 employees",
    followers: "48k",
    founded: "2015",
    website: "technova-solutions.com",
    headquarters: "100 Innovation Dr, San Francisco, CA 94103",
    sectors: ["FinTech", "Artificial Intelligence", "Software Development", "Data Analytics"],
    about:
      "TechNova Solutions is a leading fintech firm dedicated to revolutionizing digital banking. We foster a culture of innovation and learning, providing a platform for bright minds to shape the future of finance. Founded in 2015, we have grown from a small startup to a global player, serving millions of customers worldwide.",
    logo: "/home/featured-internships/Img-1.png",
    reviewsScore: 4.5,
    reviewsCount: 125,
    reviewBars: [
      { star: 5, percent: 40 },
      { star: 4, percent: 30 },
      { star: 3, percent: 15 },
      { star: 2, percent: 10 },
      { star: 1, percent: 5 },
    ],
    internships: [
      {
        id: "i-1",
        title: "Frontend Developer Intern",
        location: "Remote",
        duration: "3 Months",
        paid: "Paid",
        tags: ["React", "TypeScript", "Tailwind CSS"],
      },
      {
        id: "i-2",
        title: "Data Analyst Intern",
        location: "New York, NY",
        duration: "6 Months",
        paid: "Paid",
        tags: ["Python", "SQL", "Tableau"],
      },
    ],
    reviews: [
      {
        id: "r-1",
        name: "Sophia Carter",
        date: "July 15, 2023",
        rating: 5,
        text: "My internship at TechNova Solutions was an incredible experience. The team was supportive, and I learned a lot about software development.",
        likes: 25,
        comments: 5,
      },
      {
        id: "r-2",
        name: "Ethan Miller",
        date: "June 21, 2023",
        rating: 4,
        text: "I had a positive experience at Global Marketing. The projects were challenging, and I gained valuable insights into the industry.",
        likes: 18,
        comments: 3,
      },
    ],
  },
};

export const CONTACT_TOPICS = [
  "Request Interview",
  "Ask about Salary",
  "Clarify Requirements",
  "Hybrid Policy",
  "Start Date",
];
