import fs from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';

const BASE_URL = 'https://mynirdeshak.com'; 
const routes = [
  '/',
  '/about',
  '/how-it-works',
  '/scholarships',
  '/register',
  '/exam-info',
  '/contact',
  '/login',
  '/forgot-password',
  '/signup',
  '/dashboard/student',
  '/terms',
  '/rules',
  '/privacy',
  '/refund',
  '/disclaimer',
  '/global',
];

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: BASE_URL });
  const writeStream = fs.createWriteStream('./public/sitemap.xml');

  sitemap.pipe(writeStream);

  routes.forEach((route) => {
    sitemap.write({ url: route, changefreq: 'weekly', priority: 0.8 });
  });

  sitemap.end();

  await streamToPromise(sitemap);

  console.log('✅ sitemap.xml generated in /public folder.');
}

generateSitemap().catch(console.error);
