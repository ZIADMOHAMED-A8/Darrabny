export const companyProfileDummy = {
  name: "Tech Nova Solutions",
  tagline: "Innovating the future of Fintech",
  location: "San Francisco, CA",
  size: "500-1000 employees",
  coverImage: "/company-profile/bg.png",
  logoImage: "/company-profile/Img.png",

  about:
    "TechNova Solutions is a leading fintech firm dedicated to revolutionizing digital banking. We foster a culture of innovation and learning, providing a platform for bright minds to shape the future of finance.Founded in 2015, we have grown from a small startup to a global player, serving millions of customers worldwide. Our mission is to make financial services accessible, transparent, and efficient for everyone. We believe in the power of technology to solve complex problems and create real-world impact. Join us on our journey to redefine the financial landscape and empower the next generation of innovators.",
  sectors: [
    "Fintech",
    "Artificial Intelligence",
    "Software Development",
    "Data Analytics",
  ],

  stats: {
    activeInternships: 12,
    newThisWeek: 2,
    totalHired: 45,
    completionRate: 92,
    avgRating: 4.8,
    reviewsCount: 38,
  },

  training: [
    {
      title: "Structured Learning",
      desc: "Weekly workshops on modern tech stacks and best practices",
      image: "/company-profile/structured-learning.svg",
    },
    {
      title: "1-on-1 Mentorship",
      desc: "Direct guidance from senior engineers and product managers",
      image: "/company-profile/mentorship.svg",
    },
    {
      title: "Real Projects",
      desc: "Work on production code that impacts real customers",
      image: "/company-profile/real-projects.svg",
    },
    {
      title: "Certification",
      desc: "Support for industry certifications and verified completion badges",
      image: "/company-profile/certification.svg",
    },
  ],

  activeInternships: [
    {
      id: "intern-1",
      title: "Frontend Developer Intern",
      meta: ["Remote", "3 Months", "Paid"],
      tags: ["React", "TypeScript", "Tailwind CSS"],
      logoImage: "/images/company/company-logo.png",
      actionText: "Apply Now",
    },
    {
      id: "intern-2",
      title: "Data Analyst Intern",
      meta: ["New York, NY", "6 Months", "Paid"],
      tags: ["Python", "SQL", "Tableau"],
      logoImage: "/images/company/company-logo.png",
      actionText: "Apply Now",
    },
  ],

  details: {
    website: "technova-solutions.com",
    headquarters: "100 Innovation Dr., San Francisco, CA 94103",
    size: "500-1000 employees",
    founded: "2015",
  },

  reviewsSummary: {
    rating: 4.5,
    total: 125,
    bars: [
      { star: 5, pct: 40 },
      { star: 4, pct: 30 },
      { star: 3, pct: 15 },
      { star: 2, pct: 10 },
      { star: 1, pct: 5 },
    ],
  },

  reviews: [
    {
      id: "r1",
      name: "Sophia Carter",
      date: "July 15, 2023",
      rating: 5,
      text: "My internship at TechNova Solutions was an incredible experience. The team was supportive, and I learned a lot.",
      likes: 25,
      replies: 5,
    },
    {
      id: "r2",
      name: "Ethan Miller",
      date: "June 20, 2023",
      rating: 4,
      text: "Positive experience and valuable insights. Sometimes the workload was demanding, but overall great.",
      likes: 18,
      replies: 3,
    },
  ],
} as const;
