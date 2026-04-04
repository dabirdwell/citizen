const GITHUB_API =
  "https://api.github.com/repos/dabirdwell/humanity-and-ai/discussions";

export async function GET() {
  try {
    const res = await fetch(
      `${GITHUB_API}?category_id=DIC_kwDONR9U0s4CljCj`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 900 },
      }
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const data = await res.json();
    return Response.json(data);
  } catch {
    return Response.json([], { status: 502 });
  }
}
