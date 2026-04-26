"use client";

const openSidebar = () => {
  window.dispatchEvent(new Event("student-sidebar:open"));
};

export default function StudentTopBar() {
  return (
    <header className="z-50 border-b border-[#7da8f4] bg-[linear-gradient(110deg,#1f67e7_0%,#6ea2f5_56%,#8ab6ff_100%)]">
      <div className=" flex min-h-[64px] w-full px-8 items-center justify-between gap-2  py-3 sm:min-h-[72px]  ">
        <div className="flex items-center text-white">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/40 bg-white/20 sm:h-9 sm:w-9">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
              <path d="M6 6h12v12H6V6Zm0 4h12M9 4v2m6-2v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-xl font-semibold leading-none sm:text-2xl md:text-[30px]">
              Darrabny
            </p>
          </div>
        </div>

        <nav className="hidden items-center rounded-full border border-white/30 bg-white/15 text-white md:flex">
          <button className="px-3 py-2 text-sm font-medium lg:px-5 lg:text-base">
            Home
          </button>
          <button className="px-3 py-2 text-sm font-medium lg:px-5 lg:text-base">
            Internships
          </button>
          <button className="px-3 py-2 text-sm font-medium lg:px-5 lg:text-base">
            Companies
          </button>
          <button className="px-3 py-2 text-sm font-medium lg:px-5 lg:text-base">
            Career Counseling
          </button>
        </nav>

        <div className="flex items-center gap-2 text-white sm:gap-3 md:gap-4">
          <button
            type="button"
            aria-label="Open sidebar"
            onClick={openSidebar}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/35 bg-white/20 md:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M8 7h8M8 12h8M8 17h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full border border-white/35 bg-white/20">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 21a2.2 2.2 0 0 0 2.2-2.2H9.8A2.2 2.2 0 0 0 12 21Zm7-4.4H5.1l1.7-2.4v-4a5.2 5.2 0 1 1 10.4 0v4l1.8 2.4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="h-8 w-8 rounded-full border-2 border-white/70 bg-[linear-gradient(145deg,#f6c8a2,#9b6d4a)] sm:h-9 sm:w-9 md:h-10 md:w-10" />
        </div>
      </div>
    </header>
  );
}
