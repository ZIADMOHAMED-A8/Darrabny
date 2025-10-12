import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const page = req.nextUrl.searchParams.get("page") || "1";
  const limit = req.nextUrl.searchParams.get("limit") || "6";

  const upstreamUrl = `https://exam.elevateegy.com/api/v1/subjects?page=${page}&limit=${limit}`;

  const upstream = await fetch(upstreamUrl, {
    headers: { token: `${token.accessToken}` },
  });

  if (!upstream.ok) {
    return NextResponse.json({ error: "Upstream error" }, { status: upstream.status });
  }

  const data = await upstream.json();
  return NextResponse.json(data);
}