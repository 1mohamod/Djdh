const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { isDeveloper } = require('../utils/permissions');
const config = require('../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('مطور')
        .setDescription('أوامر المطور - للمطورين فقط'),
        
    async execute(interaction) {
        // التحقق من الصلاحيات
        if (!isDeveloper(interaction.member)) {
            return await interaction.reply({
                content: '❌ ليس لديك صلاحية لاستخدام هذا الأمر!',
                ephemeral: true
            });
        }

        // إنشاء Embed للمطور
        const developerEmbed = new EmbedBuilder()
            .setTitle('⚡ لوحة المطور')
            .setDescription('مرحباً بك في لوحة تحكم المطور\nيمكنك إدارة البوت والسيرفرات من هنا')
            .setColor('#ff0000')
            .addFields(
                { name: '🔧 إدارة البوت', value: 'إعادة تشغيل وإدارة البوت', inline: true },
                { name: '🌐 إدارة السيرفرات', value: 'إدارة جميع السيرفرات', inline: true },
                { name: '📊 إحصائيات شاملة', value: 'عرض إحصائيات مفصلة', inline: true },
                { name: '🔒 إغلاق السيرفرات', value: 'إغلاق أو تعطيل السيرفرات', inline: true },
                { name: '⚙️ إعدادات متقدمة', value: 'تعديل الإعدادات المتقدمة', inline: true },
                { name: '🗃️ قاعدة البيانات', value: 'إدارة قاعدة البيانات', inline: true }
            )
            .setFooter({ text: 'لوحة المطور - أعلى مستوى صلاحية' })
            .setTimestamp();

        // إنشاء الأزرار
        const developerButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('dev_bot_control')
                    .setLabel('🔧 تحكم البوت')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('dev_server_control')
                    .setLabel('🌐 تحكم السيرفرات')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('dev_advanced_stats')
                    .setLabel('📊 إحصائيات متقدمة')
                    .setStyle(ButtonStyle.Secondary)
            );

        const developerButtons2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('dev_shutdown_servers')
                    .setLabel('🔒 إغلاق السيرفرات')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('dev_advanced_settings')
                    .setLabel('⚙️ إعدادات متقدمة')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('dev_database')
                    .setLabel('🗃️ قاعدة البيانات')
                    .setStyle(ButtonStyle.Secondary)
            );

        await interaction.reply({
            embeds: [developerEmbed],
            components: [developerButtons, developerButtons2],
            ephemeral: true
        });
    },
};

