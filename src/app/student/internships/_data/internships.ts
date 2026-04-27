export type Internship = {
  id: string;
  company: string;
  title: string;
  workMode: "Remote" | "On-site" | "Hybrid";
  type: "Full-time" | "Part-time";
  duration: string;
  posted: string;
  image: string;

  about: string;
  responsibilities: string[];
  requirements: string[];
  companyInfo: string;
  benefits: string[];
};

export const INTERNSHIPS: Internship[] = [
  {
    id: "1",
    company: "Acme Corp",
    title: "Software Engineering Intern",
    workMode: "Remote",
    type: "Full-time",
    duration: "3 months",
    posted: "Posted 2 days ago",
    image: "/home/featured-internships/Img-1.png",
    about:
      "Join our dynamic team at Acme Corp as a Software Engineering Intern and contribute to cutting-edge projects. You'll work alongside experienced engineers, gaining hands-on experience in developing and maintaining software applications. This internship offers a unique opportunity to learn from industry experts and make a real impact on our products.",
    responsibilities: [
      "Develop and test software components",
      "Participate in code reviews and contribute to best practices",
      "Collaborate with team members on design and implementation",
      "Assist in troubleshooting and resolving software defects",
    ],
    requirements: [
      "Currently enrolled in a Bachelor's or Master's degree program in Computer Science or related field",
      "Familiarity with software development methodologies and tools",
      "Strong programming skills in Java, Python, or C++",
      "Excellent problem-solving and communication skills",
    ],
    companyInfo:
      "Acme Corp is a leading technology company specializing in innovative software solutions. We foster a collaborative and inclusive work environment, encouraging creativity and professional growth. Our mission is to empower businesses through technology, and we are committed to providing exceptional products and services.",
    benefits: [
      "Competitive internship stipend",
      "Opportunity for full-time employment upon graduation",
      "Mentorship from experienced engineers",
    ],
  },
];
