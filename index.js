app.get('/', (req, res) => {
  res.send('Bot is running 24/7');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const express = require('express');
const app = express();

// إنشاء عميل البوت
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// مجموعة الأوامر
client.commands = new Collection();

// تحميل الأوامر
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        console.log(`تم تحميل الأمر: ${command.data.name}`);
    } else {
        console.log(`[تحذير] الأمر في ${filePath} مفقود خاصية "data" أو "execute" المطلوبة.`);
    }
}

// تحميل الأحداث
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
    console.log(`تم تحميل الحدث: ${event.name}`);
}

// تسجيل الدخول
client.login(config.token);

