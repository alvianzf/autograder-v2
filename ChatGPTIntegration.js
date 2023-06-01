const axios = require('axios');
const fs = require('fs');
const path = require('path');

const gptUrl = "https://api.openai.com/v1/completions";
const gptKey = '';
const gptMachine = "text-davinci-003"

const client = axios.create({
  headers: {
    Authorization: "Bearer " + gptKey,
  },
});

async function sendToGPT() {
  const prompt = "please rate my javascript code from 1-10 " + getCodeAsString();
    console.log(prompt)
  const result = await generateChatResponseWith(prompt);

  if (result) {
    console.log(result);
  } else {
    console.log('Failed to receive a response.');
  }
}

async function generateChatResponseWith(message) {
    try {
      const params = {
        prompt: message,
        model: gptMachine,
        max_tokens: 10,
        temperature: 0,
      };
  
      const response = await client.post(gptUrl, params);
  
      return response.data.choices[0].text;
    } catch (error) {
      console.log('Error:', error.message);
      return null;
    }
  }

function getCodeAsString() {
    const filePath = path.join(__dirname, 'script.js');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data;
    } catch (error) {
        console.error('Error reading file:', error.message);
        return null;
    }
}

sendToGPT();
 
