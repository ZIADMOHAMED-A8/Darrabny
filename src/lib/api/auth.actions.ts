export async function loginWithGmailAction(idToken: string) {
    console.log("idToken",idToken);
    
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/auth/loginWithGmail`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });
  console.log(res);
  
  if (!res.ok) {
    throw new Error("Login with Gmail failed");
  }

  return res.json();
}
