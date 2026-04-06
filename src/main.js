import { Actor } from 'apify';

await Actor.init();

const input = await Actor.getInput();

const {
  linkedinCompanyUrl,
  resultsFileName = 'competitors-followers-output',
  followersCount: followersCountRaw = '5000',
} = input;

const followersCount = parseInt(followersCountRaw, 10);

if (!linkedinCompanyUrl) {
  throw new Error('LinkedIn Company URL is required.');
}

console.log(`▶ Starting scrape for: ${linkedinCompanyUrl}`);
console.log(`▶ Target followers count: ${followersCount}`);
console.log(`▶ Output file name: ${resultsFileName}`);

// ─── Your scraping logic goes here ───────────────────────────────────────────
// Use linkedinCompanyUrl and followersCount to drive your scraper
// ─────────────────────────────────────────────────────────────────────────────

const results = [
  {
    companyName: 'Example Company',
    linkedinUrl: linkedinCompanyUrl,
    followers: followersCount,
    scrapedAt: new Date().toISOString(),
  },
];

// Push to Apify dataset
await Actor.pushData(results);

// Save as named file in Key-Value Store
const kvStore = await Actor.openKeyValueStore();
await kvStore.setValue(resultsFileName, results, { contentType: 'application/json' });

console.log(`✅ Done. Results saved as: ${resultsFileName}`);

await Actor.exit();
