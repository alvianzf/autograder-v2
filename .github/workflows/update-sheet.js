const { GoogleSpreadsheet } = require('google-spreadsheet');
const moment = require('moment-timezone');

async function updateSheet() {
  const doc = new GoogleSpreadsheet('1S_51UI9RW3s5rB13TXlppAjabUDZouGM4ERFz_e-1v4');
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SHEETS_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
  });
  await doc.loadInfo();
  const sheet = doc.sheetsById['1S_51UI9RW3s5rB13TXlppAjabUDZouGM4ERFz_e-1v4'];
  const row = await sheet.addRow({
    Username: process.env.GITHUB_ACTOR,
    Email: process.env.GITHUB_EMAIL,
    'Successful Test Cases': parseInt(process.env.TEST_CASES_PASSED),
    'Date and Time (GMT+7)': moment().tz('Asia/Jakarta').format(),
  });
  console.log(`Added row ${row.rowNumber} to the sheet.`);
}

updateSheet();
