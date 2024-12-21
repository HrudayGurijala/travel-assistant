import axios from 'axios';
import readline from 'readline';
import dotenv from 'dotenv';

dotenv.config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const apiKey = process.env.API_KEY; 

async function getChatGPTResponse(prompt) {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: prompt}],
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

function askQuestion() {
    rl.question('You: ', async (question) => {
        if (question.toLowerCase() === 'exit') {
            rl.close();
            return;
        }

        const response = await getChatGPTResponse(question);
        if (response) {
            console.log(`lio: ${response}`);
        }

        askQuestion();
    });
}

console.log(' Type "exit" to quit');
askQuestion();
