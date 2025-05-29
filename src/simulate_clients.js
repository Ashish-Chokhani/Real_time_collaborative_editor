// puppeteer-script.js
const puppeteer = require('puppeteer');

const CLIENT_COUNT = parseInt(process.argv[2] || '20');
const ROOM_ID = '/test-room';  // Adjust as needed
const SERVER_URL = 'http://localhost:3000'; // Replace with your local server

(async () => {
  const clients = [];

  for (let i = 0; i < CLIENT_COUNT; i++) {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(`${SERVER_URL}${ROOM_ID}`);
    clients.push(browser);
  }

  console.log(`${CLIENT_COUNT} clients connected.`);
  await new Promise(res => setTimeout(res, 10000)); // Let it run for 10 seconds

  for (const browser of clients) {
    await browser.close();
  }

  console.log("Test completed.");
})();