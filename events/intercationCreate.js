const { Events, EmbedBuilder } = require('discord.js');
const { isAdmin, isDeveloper, isModerator } = require('../utils/permissions');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        // التعامل مع أوامر الـ Slash
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`لم يتم العثور على الأمر ${interaction.commandName}.`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(`خطأ في تنفيذ الأمر ${interaction.commandName}:`, error);
                
                const errorMessage = 'حدث خطأ أثناء تنفيذ هذا الأمر!';
                
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: errorMessage, ephemeral: true });
                } else {
                    await interaction.reply({ content: errorMessage, ephemeral: true });
                }
            }
        }
        
        // التعامل مع الأزرار
        else if (interaction.isButton()) {
            const { customId } = interaction;
            
            // أزرار التقييم
            if (customId === 'start_evaluation') {
                if (!isModerator(interaction.member)) {
                    return await interaction.reply({
                        content: '❌ ليس لديك صلاحية لاستخدام هذا الزر!',
                        ephemeral: true
                    });
                }
                const modal = require('../utils/modals').evaluationModal;
                await interaction.showModal(modal);
            }
            else if (customId === 'start_vote_evaluation') {
                if (!isModerator(interaction.member)) {
                    return await interaction.reply({
                        content: '❌ ليس لديك صلاحية لاستخدام هذا الزر!',
                        ephemeral: true
                    });
                }
                const modal = require('../utils/modals').voteEvaluationModal;
                await interaction.showModal(modal);
            }
            else if (customId === 'end_evaluation') {
                if (!isModerator(interaction.member)) {
                    return await interaction.reply({
                        content: '❌ ليس لديك صلاحية لاستخدام هذا الزر!',
                        ephemeral: true
                    });
                }
                await interaction.reply({
                    content: '🔴 تم إنهاء التقييم بنجاح!',
                    ephemeral: true
                });
            }
            
            // أزرار الإدارة
            else if (customId === 'admin_stats') {
                if (!isAdmin(interaction.member)) {
                    return await interaction.reply({
                        content: '❌ ليس لديك صلاحية لاستخدام هذا الزر!',
                        ephemeral: true
                    });
                }
                
                const guild = interaction.guild;
                const statsEmbed = new EmbedBuilder()
                    .setTitle('📊 إحصائيات السيرفر')
                    .setColor('#0099ff')
                    .addFields(
                        { name: '👥 عدد الأعضاء', value: `${guild.memberCount}`, inline: true },
                        { name: '📝 عدد القنوات', value: `${guild.channels.cache.size}`, inline: true },
                        { name: '🎭 عدد الرتب', value: `${guild.roles.cache.size}`, inline: true },
                        { name: '📅 تاريخ الإنشاء', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, inline: false }
                    )
                    .setTimestamp();
                    
                await interaction.reply({ embeds: [statsEmbed], ephemeral: true });
            }
            else if (customId === 'admin_members') {
                if (!isAdmin(interaction.member)) {
                    return await interaction.reply({
                        content: '❌ ليس لديك صلاحية لاستخدام هذا الزر!',
                        ephemeral: true
                    });
                }
                await interaction.reply({
                    content: '👥 تم فتح لوحة إدارة الأعضاء...',
                    ephemeral: true
                });
            }
            else if (customId === 'admin_settings') {
                if (!isAdmin(interaction.member)) {
                    return await interaction.reply({
                        content: '❌ ليس لديك صلاحية لاستخدام هذا الزر!',
                        ephemeral: true
                    });
                }
                await interaction.reply({
                    content: '⚙️ تم فتح إعدادات البوت...',
                    ephemeral: true
                });
            }
            
            // أزرار المطور
            else if (customId === 'dev_bot_control') {
                if (!isDeveloper(interaction.member)) {
                    return await interaction.reply({
                        content: '❌ ليس لديك صلاحية لاستخدام هذا الزر!',
                        ephemeral: true
                    });
                }
                await interaction.reply({
                    content: '🔧 تم فتح لوحة تحكم البوت...',
                    ephemeral: true
                });
            }
            else if (customId === 'dev_server_control') {
                if (!isDeveloper(interaction.member)) {
                    return await interaction.reply({
                        content: '❌ ليس لديك صلاحية لاستخدام هذا الزر!',
                        ephemeral: true
                    });
                }
                await interaction.reply({
                    content: '🌐 تم فتح لوحة تحكم السيرفرات...',
                    ephemeral: true
                });
            }
            else if (customId === 'dev_advanced_stats') {
                if (!isDeveloper(interaction.member)) {
                    return await interaction.reply({
                        content: '❌ ليس لديك صلاحية لاستخدام هذا الزر!',
                        ephemeral: true
                    });
                }
                
                const client = interaction.client;
                const advancedStatsEmbed = new EmbedBuilder()
                    .setTitle('📊 إحصائيات متقدمة')
                    .setColor('#ff0000')
                    .addFields(
                        { name: '🤖 عدد السيرفرات', value: `${client.guilds.cache.size}`, inline: true },
                        { name: '👥 إجمالي المستخدمين', value: `${client.users.cache.size}`, inline: true },
                        { name: '⏱️ زمن التشغيل', value: `${Math.floor(client.uptime / 1000 / 60)} دقيقة`, inline: true },
                        { name: '💾 استخدام الذاكرة', value: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`, inline: true }
                    )
                    .setTimestamp();
                    
                await interaction.reply({ embeds: [advancedStatsEmbed], ephemeral: true });
            }
            else if (customId === 'dev_shutdown_servers') {
                if (!isDeveloper(interaction.member)) {
                    return await interaction.reply({
                        content: '❌ ليس لديك صلاحية لاستخدام هذا الزر!',
                        ephemeral: true
                    });
                }
                await interaction.reply({
                    content: '🔒 تم فتح لوحة إغلاق السيرفرات...\n⚠️ تحذير: هذا الإجراء خطير!',
                    ephemeral: true
                });
            }
            else if (customId === 'dev_advanced_settings') {
                if (!isDeveloper(interaction.member)) {
                    return await interaction.reply({
                        content: '❌ ليس لديك صلاحية لاستخدام هذا الزر!',
                        ephemeral: true
                    });
                }
                await interaction.reply({
                    content: '⚙️ تم فتح الإعدادات المتقدمة...',
                    ephemeral: true
                });
            }
            else if (customId === 'dev_database') {
                if (!isDeveloper(interaction.member)) {
                    return await interaction.reply({
                        content: '❌ ليس لديك صلاحية لاستخدام هذا الزر!',
                        ephemeral: true
                    });
                }
                await interaction.reply({
                    content: '🗃️ تم فتح لوحة إدارة قاعدة البيانات...',
                    ephemeral: true
                });
            }
        }
        
        // التعامل مع النماذج
        else if (interaction.isModalSubmit()) {
            if (interaction.customId === 'evaluation_modal') {
                const serverName = interaction.fields.getTextInputValue('server_name');
                const serverCode = interaction.fields.getTextInputValue('server_code');
                const serverLink = interaction.fields.getTextInputValue('server_link');
                const additionalInfo = interaction.fields.getTextInputValue('additional_info') || 'لا توجد معلومات إضافية';
                
                const evaluationEmbed = new EmbedBuilder()
                    .setTitle('✅ تم استلام طلب التقييم')
                    .setColor('#00ff00')
                    .addFields(
                        { name: '🏷️ اسم السيرفر', value: serverName, inline: true },
                        { name: '🔢 كود السيرفر', value: serverCode, inline: true },
                        { name: '🔗 رابط السيرفر', value: serverLink, inline: false },
                        { name: '📝 معلومات إضافية', value: additionalInfo, inline: false }
                    )
                    .setFooter({ text: `طلب من: ${interaction.user.tag}` })
                    .setTimestamp();
                
                await interaction.reply({
                    embeds: [evaluationEmbed],
                    ephemeral: true
                });
            }
            else if (interaction.customId === 'vote_evaluation_modal') {
                const serverName = interaction.fields.getTextInputValue('vote_server_name');
                const serverCode = interaction.fields.getTextInputValue('vote_server_code');
                const serverLink = interaction.fields.getTextInputValue('vote_server_link');
                const description = interaction.fields.getTextInputValue('vote_description');
                
                const voteEmbed = new EmbedBuilder()
                    .setTitle('🗳️ تم استلام طلب تصويت التقييم')
                    .setColor('#0099ff')
                    .addFields(
                        { name: '🏷️ اسم السيرفر', value: serverName, inline: true },
                        { name: '🔢 كود السيرفر', value: serverCode, inline: true },
                        { name: '🔗 رابط السيرفر', value: serverLink, inline: false },
                        { name: '📋 وصف التصويت', value: description, inline: false }
                    )
                    .setFooter({ text: `طلب من: ${interaction.user.tag}` })
                    .setTimestamp();
                
                await interaction.reply({
                    embeds: [voteEmbed],
                    ephemeral: true
                });
            }
        }
    },
};
