import { getServerToken } from "@/lib/utils/get-token";
import Cta from "./_components/cta";
import HowItWorks from "./_components/how-it-works";
import Hero from "./_components/hero";
import FeaturedInternships from "./_components/featured-internships";

export default async function Home() {
  const token = await getServerToken();
  console.log("token from page.tsx", token);
  function slugify(s: string) {
    return s
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "")
      .replace(/\-+/g, "-")
      .replace(/^\-+|\-+$/g, "");
  }

  // const session = await getServerSession(authOptions);

  return (
    <div className="grid W-full  min-h-screen ">
      <main className="flex flex-col w-full">
        <div className="mx-auto w-full py-0">
          <section>
            {/* Header bar لو عندك */}
            {/* <HeaderBar /> */}

            {/* ===== Hero Section ===== */}
            <Hero />

            {/* ===== Featured Internships Section ===== */}
            <FeaturedInternships />
            {/* ===== How It Works Section ===== */}
            <HowItWorks />

            {/* ===== Call To Action Section ===== */}
            <Cta />
          </section>
        </div>
      </main>
    </div>
  );
}
