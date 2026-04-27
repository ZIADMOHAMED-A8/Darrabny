import { NextResponse } from "next/server";
import { getToken } from "@/lib/utils/get-token.util";

const USER_ENDPOINT = "http://localhost:5000/user/getLoginUser";
const SKILLS_ENDPOINT = "http://localhost:5000/student/skills";
const RESUME_ENDPOINT = "http://localhost:5000/student/resume";

export async function GET() {
  const token = await getToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const accessToken = (token as any)?.token?.accessToken;
  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `user ${accessToken}`,
  };

  const [userRes, skillsRes, resumeRes] = await Promise.all([
    fetch(USER_ENDPOINT, { method: "GET", headers, cache: "no-store" }),
    fetch(SKILLS_ENDPOINT, { method: "GET", headers, cache: "no-store" }),
    fetch(RESUME_ENDPOINT, { method: "GET", headers, cache: "no-store" }),
  ]);

  if (!userRes.ok) {
    const message = await userRes.text().catch(() => "");
    return NextResponse.json(
      { message: message || "Failed to load user" },
      { status: userRes.status }
    );
  }

  if (!skillsRes.ok) {
    const message = await skillsRes.text().catch(() => "");
    return NextResponse.json(
      { message: message || "Failed to load skills" },
      { status: skillsRes.status }
    );
  }

  const user = await userRes.json();
  const skills = await skillsRes.json();

  let resume: unknown = null;
  if (resumeRes.ok) {
    const contentType = resumeRes.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      resume = await resumeRes.json();
    }
  } else if (resumeRes.status !== 404) {
    const message = await resumeRes.text().catch(() => "");
    return NextResponse.json(
      { message: message || "Failed to load resume" },
      { status: resumeRes.status }
    );
  }

  return NextResponse.json({ user, skills, resume });
}

