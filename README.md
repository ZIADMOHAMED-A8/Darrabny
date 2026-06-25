# Darrabny 🎓

> An AI-powered internship platform connecting students, companies, and universities in one unified ecosystem.

Darrabny is a full-stack web application built as a graduation project. It streamlines the internship journey — from discovery and application to supervision and progress tracking — across three distinct user roles.

---

## ✨ Features

### For Students
- Browse and filter available internship listings
- Apply to internships with a streamlined application flow
- Receive AI-powered personalized internship recommendations based on profile and skills
- Track application status in real time

### For Companies
- Post and manage internship opportunities
- Review applicant profiles
- AI-assisted candidate ranking to surface the most relevant applicants

### For Universities
- Monitor enrolled students' internship progress
- View real-time status updates and reports on student placements

### General
- Role-based access control via Next.js middleware (student, company, university roles)
- Google OAuth authentication via NextAuth.js
- OTP-based verification flow
- Protected routes with automatic role-based redirection
- Form validation with React Hook Form + Zod
- Toast notifications (react-hot-toast + Sonner)
- Data charts and analytics (Recharts)
- Countdown timers and progress indicators

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui, Radix UI, Tabler Icons, Lucide React |
| Auth | NextAuth.js, Google OAuth |
| Data Fetching | TanStack React Query (v5) |
| Forms | React Hook Form + Zod |
| HTTP Client | Axios |
| Charts | Recharts |
| Notifications | react-hot-toast, Sonner |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
git clone https://github.com/ZIADMOHAMED-A8/Darrabny.git
cd Darrabny
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_API_URL=your_backend_api_url
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/           # Login, signup, OTP, password reset
│   ├── student/          # Student dashboard & internship pages
│   ├── company/          # Company dashboard & listings
│   ├── university/       # University monitoring dashboard
│   ├── _components/      # Shared page-level components
│   └── page.tsx          # Public landing page
├── middleware.ts          # Role-based route protection
└── lib/                  # Utilities and helpers
```

---

## 👥 Team

Built collaboratively as a graduation project with multiple contributors across 132+ commits.

---

## 📄 License

This project is for educational purposes.
