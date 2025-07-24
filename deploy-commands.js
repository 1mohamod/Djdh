const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const commands = [];

// تحميل جميع الأوامر من مجلد commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
        console.log(`تم تحميل الأمر: ${command.data.name}`);
    } else {
        console.log(`[تحذير] الأمر في ${filePath} مفقود خاصية "data" أو "execute" المطلوبة.`);
    }
}

// إنشاء REST instance
const rest = new REST().setToken(config.token);

// تسجيل الأوامر
(async () => {
    try {
        console.log(`بدء تسجيل ${commands.length} أمر slash.`);

        // تسجيل الأوامر في السيرفر المحدد (للاختبار السريع)
        if (config.guildId) {
            const data = await rest.put(
                Routes.applicationGuildCommands(config.clientId, config.guildId),
                { body: commands },
            );
            console.log(`تم تسجيل ${data.length} أمر slash بنجاح في السيرفر.`);
        } else {
            // تسجيل الأوامر عالمياً (يستغرق وقت أطول)
            const data = await rest.put(
                Routes.applicationCommands(config.clientId),
                { body: commands },
            );
            console.log(`تم تسجيل ${data.length} أمر slash بنجاح عالمياً.`);
        }
    } catch (error) {
        console.error('خطأ في تسجيل الأوامر:', error);
    }
})();

