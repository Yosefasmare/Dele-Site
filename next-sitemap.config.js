/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.SITE_URL || 'https://dele-site.vercel.app', // Replace with your website's URL
    generateRobotsTxt: true, // (Optional) Generate a robots.txt file
    changefreq: 'daily', // (Optional) Frequency of page updates
    priority: 0.7, // (Optional) Priority for pages
    sitemapSize: 5000, // (Optional) Maximum number of entries per sitemap file
  };
  
  export default config;
  