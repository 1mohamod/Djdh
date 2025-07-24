const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

// نموذج التقييم العادي
const evaluationModal = new ModalBuilder()
    .setCustomId('evaluation_modal')
    .setTitle('📝 نموذج طلب التقييم');

const serverNameInput = new TextInputBuilder()
    .setCustomId('server_name')
    .setLabel('اسم السيرفر')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder('أدخل اسم السيرفر هنا...')
    .setRequired(true)
    .setMaxLength(100);

const serverCodeInput = new TextInputBuilder()
    .setCustomId('server_code')
    .setLabel('كود السيرفر')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder('أدخل كود السيرفر هنا...')
    .setRequired(true)
    .setMaxLength(50);

const serverLinkInput = new TextInputBuilder()
    .setCustomId('server_link')
    .setLabel('رابط السيرفر')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder('أدخل رابط السيرفر هنا...')
    .setRequired(true)
    .setMaxLength(200);

const additionalInfoInput = new TextInputBuilder()
    .setCustomId('additional_info')
    .setLabel('معلومات إضافية (اختياري)')
    .setStyle(TextInputStyle.Paragraph)
    .setPlaceholder('أي معلومات إضافية تريد إضافتها...')
    .setRequired(false)
    .setMaxLength(500);

// إضافة الحقول للنموذج
evaluationModal.addComponents(
    new ActionRowBuilder().addComponents(serverNameInput),
    new ActionRowBuilder().addComponents(serverCodeInput),
    new ActionRowBuilder().addComponents(serverLinkInput),
    new ActionRowBuilder().addComponents(additionalInfoInput)
);

// نموذج تصويت التقييم
const voteEvaluationModal = new ModalBuilder()
    .setCustomId('vote_evaluation_modal')
    .setTitle('🗳️ نموذج طلب تصويت التقييم');

const voteServerNameInput = new TextInputBuilder()
    .setCustomId('vote_server_name')
    .setLabel('اسم السيرفر للتصويت')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder('أدخل اسم السيرفر للتصويت...')
    .setRequired(true)
    .setMaxLength(100);

const voteServerCodeInput = new TextInputBuilder()
    .setCustomId('vote_server_code')
    .setLabel('كود السيرفر')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder('أدخل كود السيرفر...')
    .setRequired(true)
    .setMaxLength(50);

const voteServerLinkInput = new TextInputBuilder()
    .setCustomId('vote_server_link')
    .setLabel('رابط السيرفر')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder('أدخل رابط السيرفر...')
    .setRequired(true)
    .setMaxLength(200);

const voteDescriptionInput = new TextInputBuilder()
    .setCustomId('vote_description')
    .setLabel('وصف التصويت')
    .setStyle(TextInputStyle.Paragraph)
    .setPlaceholder('اكتب وصفاً مختصراً عن سبب طلب التصويت...')
    .setRequired(true)
    .setMaxLength(300);

// إضافة الحقول لنموذج التصويت
voteEvaluationModal.addComponents(
    new ActionRowBuilder().addComponents(voteServerNameInput),
    new ActionRowBuilder().addComponents(voteServerCodeInput),
    new ActionRowBuilder().addComponents(voteServerLinkInput),
    new ActionRowBuilder().addComponents(voteDescriptionInput)
);

module.exports = {
    evaluationModal,
    voteEvaluationModal
};

