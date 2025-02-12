export async function GET() {
  const pages = [
    { loc: 'https://dele-site.vercel.app/', lastmod: '2025-02-12' },
    { loc: 'https://dele-site.vercel.app/properties', lastmod: '2025-02-10' },
    { loc: 'https://dele-site.vercel.app/about', lastmod: '2025-02-08' },
  ];

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          (page) => `
        <url>
          <loc>${page.loc}</loc>
          <lastmod>${page.lastmod}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `
        )
        .join('')}
    </urlset>
  `;

  return new Response(sitemap.trim(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
