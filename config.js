require('dotenv').config();

module.exports = {
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.CLIENT_ID,
    guildId: process.env.GUILD_ID,
    
    // Role IDs
    roles: {
        admin: process.env.ADMIN_ROLE_ID,
        moderator: process.env.MODERATOR_ROLE_ID,
        developer: process.env.DEVELOPER_ROLE_ID
    },
    
    // Bot settings
    prefix: '!',
    embedColor: '#0099ff'
};

