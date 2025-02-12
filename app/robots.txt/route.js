export async function GET() {
    const robotsTxt = `
      User-agent: *
      Allow: /
      Disallow: /dashboard
  
      Sitemap: https://dele-site.vercel.app/sitemap.xml
    `;
  
    return new Response(robotsTxt.trim(), {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
  