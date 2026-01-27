import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.findmygenie.com';
const pages = [
    '',
    '/vendor',
    '/legal',
    '/about',
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
        .map((page) => {
            return `
  <url>
    <loc>${BASE_URL}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
        })
        .join('')}
</urlset>`;

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap.trim());
console.log('✅ sitemap.xml generated in public/ directory');
