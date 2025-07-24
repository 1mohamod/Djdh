const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { isAdmin } = require('../utils/permissions');
const config = require('../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ادارة')
        .setDescription('أوامر الإدارة - للمديرين فقط'),
        
    async execute(interaction) {
        // التحقق من الصلاحيات
        if (!isAdmin(interaction.member)) {
            return await interaction.reply({
                content: '❌ ليس لديك صلاحية لاستخدام هذا الأمر!',
                ephemeral: true
            });
        }

        // إنشاء Embed للإدارة
        const adminEmbed = new EmbedBuilder()
            .setTitle('🛡️ لوحة الإدارة')
            .setDescription('مرحباً بك في لوحة الإدارة\nاختر الإجراء المطلوب من الأزرار أدناه')
            .setColor(config.embedColor)
            .addFields(
                { name: '📊 إحصائيات السيرفر', value: 'عرض إحصائيات مفصلة', inline: true },
                { name: '👥 إدارة الأعضاء', value: 'إدارة أعضاء السيرفر', inline: true },
                { name: '⚙️ إعدادات البوت', value: 'تعديل إعدادات البوت', inline: true }
            )
            .setFooter({ text: 'نظام الإدارة - Eagles City' })
            .setTimestamp();

        // إنشاء الأزرار
        const adminButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('admin_stats')
                    .setLabel('📊 الإحصائيات')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('admin_members')
                    .setLabel('👥 الأعضاء')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('admin_settings')
                    .setLabel('⚙️ الإعدادات')
                    .setStyle(ButtonStyle.Success)
            );

        await interaction.reply({
            embeds: [adminEmbed],
            components: [adminButtons],
            ephemeral: true
        });
    },
};
