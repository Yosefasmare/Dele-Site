// app/robots.txt/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const content = `
    User-agent: *
    Allow: /
    Sitemap: https://dele-site.vercel.app/sitemap.xml
  `;

  return new NextResponse(content.trim(), {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
