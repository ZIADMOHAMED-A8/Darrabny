import HomeBg from "./home-bg";

export default function StudentTopBar() {
  return (
    <header className="h-[72px] px-6 z-50 border-b overflow-hidden border-[#7da8f4] bg-[linear-gradient(110deg,#1f67e7_0%,#6ea2f5_56%,#8ab6ff_100%)] flex items-center justify-between">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-3 text-white">
          <div className="w-9 h-9 rounded-lg bg-white/20 border border-white/40 flex items-center justify-center">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
              <path d="M6 6h12v12H6V6Zm0 4h12M9 4v2m6-2v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-[34px] z-50 font-semibold leading-none">Darrabny</p>
        </div>


      </div>
              <nav className="hidden md:flex items-center rounded-full bg-white/15 border border-white/30 text-white">
          <button className="px-6 py-2 text-[17px] font-medium">Home</button>
          <button className="px-6 py-2 text-[17px] font-medium">Internships</button>
          <button className="px-6 py-2 text-[17px] font-medium">Companies</button>
          <button className="px-6 py-2 text-[17px] font-medium">Career Counseling</button>
        </nav>

      <div className="flex items-center gap-5 text-white">
        <button className="w-8 h-8 rounded-full bg-white/20 border border-white/35 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M8 7h8M8 12h8M8 17h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button className="w-8 h-8 rounded-full bg-white/20 border border-white/35 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 21a2.2 2.2 0 0 0 2.2-2.2H9.8A2.2 2.2 0 0 0 12 21Zm7-4.4H5.1l1.7-2.4v-4a5.2 5.2 0 1 1 10.4 0v4l1.8 2.4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="w-10 h-10 rounded-full border-2 border-white/70 bg-[linear-gradient(145deg,#f6c8a2,#9b6d4a)]" />
      </div>
    </header>
  );
}
