import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function FeaturedInternships() {

  // Featured Internships section (static data for now)
  const featuredInternships = [
    {
      title: "Software Engineering Intern",
      description: "Develop cutting-edge software solutions.",
      imageSrc: "/home/featured-internships/img-1.png",
    },
    {
      title: "Marketing Intern",
      description: "Drive marketing campaigns and strategies.",
      imageSrc: "/home/featured-internships/img-2.png",
    },
    {
      title: "Product Management Intern",
      description: "Shape the future of our products.",
      imageSrc: "/home/featured-internships/img-3.png",
    },
  ];

  return (
    <section className="mx-auto py-14">
      <h2 className="text-center text-3xl font-semibold">
        Featured Internships
      </h2>

      <div className="mt-10 rounded-2xl bg-[#d7e4ff]/20 p-12">
        <div className="grid gap-6 md:grid-cols-3">
          {featuredInternships.map((item) => (
            <Card
              key={item.title}
              className="overflow-hidden bg-white text-slate-900 shadow-lg"
            >
              {/* Card image */}
              <div className="relative h-40 w-full">
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <CardContent className="p-5">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  {item.description}
                </p>

                {/* Placeholder link */}
                <Link
                  href="#"
                  className="mt-4 inline-block text-sm font-medium text-blue-700"
                >
                  Learn More
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
