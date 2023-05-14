const https = require('https');
const cheerio = require('cheerio');

const url = `https://${process.env.GITHUB_ACTOR}.github.io`;

const requiredElements = [
  {
    name: 'head',
    test: ($) => $('head').length > 0
  },
  {
    name: 'body',
    test: ($) => $('body').length > 0
  },
  {
    name: 'script',
    test: ($) => $('script').length > 0
  },
  {
    name: 'link',
    test: ($) => $('link[rel="stylesheet"][href]').length > 0
  },
  {
    name: 'script.js',
    test: ($) => $('script[src="js/scripts.js"]').length > 0
  },
  {
    name: 'form',
    test: ($) => {
      const $form = $('form');
      if ($form.length === 0) {
        return false;
      }
      const $inputs = $form.find('input[type="text"]');
      if ($inputs.length < 3) {
        return false;
      }
      const weight = parseFloat($inputs.eq(0).val());
      const height = parseFloat($inputs.eq(2).val());
      if (isNaN(weight) || isNaN(height)) {
        return false;
      }
      const bmi = weight / (height * height);
      const $output = $form.find('#bmi_output');
      if ($output.length === 0) {
        return false;
      }
      $output.val(bmi);
      return true;
    }
  }
];

function testElements($) {
  let testCasesPassed = 0;
  requiredElements.forEach((element) => {
    if (element.test($)) {
      testCasesPassed++;
    }
  });
  process.env.TEST_CASES_PASSED = testCasesPassed;
  console.log(`${testCasesPassed}`);
}

function testPage() {
  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      const $ = cheerio.load(data);
      testElements($);
    });
  }).on('error', (err) => {
    console.error(`Error: ${err.message}`);
  });
}

testPage();
