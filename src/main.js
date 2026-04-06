import { Actor } from 'apify';

await Actor.init();

const input = await Actor.getInput();

const {
  linkedinCompanyUrl,
  resultsFileName = 'competitors-followers-output',
  followersCount = 5000,
} = input;

if (!linkedinCompanyUrl) {
  throw new Error('LinkedIn Company URL is required.');
}

console.log(`▶ Starting scrape for: ${linkedinCompanyUrl}`);
console.log(`▶ Target followers count: ${followersCount}`);
console.log(`▶ Output file name: ${resultsFileName}`);

// ─── Your scraping logic goes here ───────────────────────────────────────────
// Pass linkedinCompanyUrl + followersCount to your scraper
// Push results to dataset
// ─────────────────────────────────────────────────────────────────────────────

const results = [
  // Example structure - replace with actual scraped data
  {
    companyName: 'Example Company',
    linkedinUrl: linkedinCompanyUrl,
    followers: followersCount,
    scrapedAt: new Date().toISOString(),
  },
];

// Push to Apify dataset
await Actor.pushData(results);

// Also save as named KV store file
const kvStore = await Actor.openKeyValueStore();
await kvStore.setValue(resultsFileName, results, { contentType: 'application/json' });

console.log(`✅ Done. Results saved as: ${resultsFileName}`);

await Actor.exit();
