const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = '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';

async function rateJSWithChatGPT() {
    try {
        const scriptCode = await getCodeAsString();
        if (scriptCode) {
            const prompt = `You: Please rate my script:\n\`\`\`javascript\n${scriptCode}\n\`\`\``;
            const payload = {
                messages: [{ role: 'system', content: prompt }],
            };

            const response = await axios.post(API_URL, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
            });

            const chatGPTResult = response.data.choices[0].message.content;
            console.log(`ChatGPT: ${chatGPTResult}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function getCodeAsString() {
    const filePath = path.join(__dirname, 'script.js');

    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (error, data) => {
            if (error) {
                console.error('Error reading file:', error.message);
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

rateJSWithChatGPT();
