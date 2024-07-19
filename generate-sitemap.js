
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

// Create a sitemap stream
const sitemap = new SitemapStream({ hostname: 'http://localhost:3000' });

// Add URLs to the sitemap
sitemap.write({ url: '/submit_obituary_form', changefreq: 'monthly', priority: 0.8 });
sitemap.write({ url: '/view_obituaries', changefreq: 'daily', priority: 1.0 });

// Close the sitemap stream
sitemap.end();

// Write sitemap to file
streamToPromise(sitemap).then((data) => {
    createWriteStream('./public/sitemap.xml').write(data);
}).catch((err) => {
    console.error('Error generating sitemap:', err);
});