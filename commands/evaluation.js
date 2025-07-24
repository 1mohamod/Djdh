const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { isModerator } = require('../utils/permissions');
const config = require('../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('اقيام')
        .setDescription('نظام التقييم - للمشرفين والإدارة'),
        
    async execute(interaction) {
        // التحقق من الصلاحيات
        if (!isModerator(interaction.member)) {
            return await interaction.reply({
                content: '❌ ليس لديك صلاحية لاستخدام هذا الأمر!',
                ephemeral: true
            });
        }

        // إنشاء Embed للتقييم
        const evaluationEmbed = new EmbedBuilder()
            .setTitle('🎮 نظام التقييم')
            .setDescription('مرحباً بك في نظام تقييم السيرفرات\nاستخدم الأزرار أدناه لإدارة التقييمات')
            .setColor('#00ff00')
            .addFields(
                { name: '🟢 بدء تقييم', value: 'ابدأ تقييم جديد للسيرفر', inline: true },
                { name: '🗳️ بدء تصويت تقييم', value: 'ابدأ تصويت تقييم جماعي', inline: true },
                { name: '🔴 إنهاء تقييم', value: 'أنهي التقييم الحالي', inline: true }
            )
            .setThumbnail('https://cdn.discordapp.com/attachments/123456789/evaluation-icon.png')
            .setFooter({ text: 'نظام التقييم - Eagles City Server' })
            .setTimestamp();

        // إنشاء الأزرار
        const evaluationButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('start_evaluation')
                    .setLabel('🟢 بدء قيم')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('start_vote_evaluation')
                    .setLabel('🗳️ بدء تصويت قيم')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('end_evaluation')
                    .setLabel('🔴 إنهاء قيم')
                    .setStyle(ButtonStyle.Danger)
            );

        await interaction.reply({
            embeds: [evaluationEmbed],
            components: [evaluationButtons]
        });
    },
};
