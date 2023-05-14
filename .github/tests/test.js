const http = require('https');
const cheerio = require('cheerio');
const updateSheet = require('./.github/workflows/update-sheet/js');

const url = `https://${process.env.GITHUB_ACTOR}.github.io`; // Replace with the URL of the page you want to test

http.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const $ = cheerio.load(data);
    const head = $('head');
    const body = $('body');
    const script = $('script');
    const link = $('link');
    let testCasesPassed = 0;
    if (head.length > 0) {
      testCasesPassed++;
    }
    if (body.length > 0) {
      testCasesPassed++;
    }
    if (script.length > 0) {
      testCasesPassed++;
    }
    if (link.length > 0) {
      testCasesPassed++;
    }
    process.env.TEST_CASES_PASSED = testCasesPassed;
    updateSheet(testCasesPassed);
    console.log(`Test cases passed: ${testCasesPassed}`);
  });
}).on('error', (err) => {
  console.error(`Error: ${err.message}`);
});
