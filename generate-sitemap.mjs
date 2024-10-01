import { SitemapStream } from 'sitemap';
import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define your routes
const routes = [
  '/',
  '/feature/Learn-Finance',
  '/About',
  '/Contact',
  '/GoldLeasing',
  '/feature/Goal-based-Investing',
  '/Insights/DailyReports',
  '/Insights/KnowledgeSeries',
  '/Insights/Media',
  '/Insights/NewsandUpdate',
  '/Insights/WeeklyBlog',
  '/Privacy-Policy',
  '/Delete-Account',
  '/Blogs',
  '/feature/Systematic-Investment-Plan',
  '/feature/Micro-Investing',
  '/feature/Digital-Gold',
  '/feature/Mutual-Funds',
  '/feature/Credit-Score',
  '/feature/Virtual-Asset',
  '/Blogs/DifferenceinSIPvsMutualFund',
  '/Blogs/DirectvsRegularMutualFund',
  '/Blogs/ULIPvsMutuaFund',
  '/Blogs/UnderstandingELSSMutualFunds',
  '/Blogs/PPFvsMutualFund',
  '/Blogs/CanaraBankGold',
  '/Blogs/CDeductions',
  '/terms_condition',
];

// Function to create sitemap
async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: 'https://www.fiydaa.in' });

  const writeStream = createWriteStream(resolve(__dirname, 'dist', 'sitemap.xml'));

  for (const route of routes) {
    sitemap.write({ url: route, changefreq: 'weekly', priority: 0.8 });
  }

  sitemap.end();

  await pipelineAsync(sitemap, writeStream);
  console.log('Sitemap created at:', resolve(__dirname, 'dist', 'sitemap.xml'));
}

generateSitemap().catch(console.error);
