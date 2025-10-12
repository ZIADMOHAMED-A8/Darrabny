// app/api/exams/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken as getNextAuthToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const subjectId = searchParams.get("subjectId");
  if (!subjectId) {
    return NextResponse.json({ error: "Missing subjectId" }, { status: 400 });
  }

  const jwt = await getNextAuthToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const accessToken = (jwt as any)?.accessToken;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log("subjectId",subjectId);
  
  const upstream = await fetch(
    `https://exam.elevateegy.com/api/v1/exams?subject=${subjectId}`,
    {
      headers: { token: `${accessToken}` }, 
      cache: "no-store",
    }
  );
  console.log("upstream",upstream);
  
  if (!upstream.ok) {
    return NextResponse.json({ error: "Upstream error" }, { status: upstream.status });
  }

  const data = await upstream.json();
  console.log("data",data);
  
  return NextResponse.json(data);
}
