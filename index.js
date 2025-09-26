const Telegrambot = require('node-telegram-bot-api');

const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config();

// TOKEN fetch using @BotFather to create a new bot
const TOKEN = process.env.BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new Telegrambot(TOKEN, { polling: true });

bot.on('message', (msg) => {
    const text = msg.text;

    console.log("Message received: ", text);

    bot.sendMessage(msg.chat.id, "You said: " + text);
});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome to TeleBot! How can I assist you today?");
});

bot.onText(/\/joke/, async (msg) => {
    const joke = await axios.get('https://official-joke-api.appspot.com/random_joke');

    const setup = joke.data.setup;
    const punchline = joke.data.punchline;

    bot.sendMessage(msg.chat.id, "Here's a joke for you:\n" + setup + "\n" + punchline);
});