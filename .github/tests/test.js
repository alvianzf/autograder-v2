const http = require('https');
const cheerio = require('cheerio');

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

//  Test if the html page has the required element tag
    if (head.length > 0 && body.length > 0 && script.length > 0 && link.length > 0) {
      testCasesPassed++;
    }
    process.env.TEST_CASES_PASSED = testCasesPassed;
    console.log(`${testCasesPassed}`);
  });
}).on('error', (err) => {
  console.error(`Error: ${err.message}`);
});
