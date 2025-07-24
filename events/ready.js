const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`البوت جاهز! تم تسجيل الدخول باسم ${client.user.tag}`);
        
        // تعيين حالة البوت
        client.user.setActivity('إدارة السيرفر', { type: 'WATCHING' });
    },
};

