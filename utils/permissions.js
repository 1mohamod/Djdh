const config = require('../config');

/**
 * التحقق من صلاحيات المستخدم
 * @param {GuildMember} member - عضو السيرفر
 * @param {string} requiredRole - الرتبة المطلوبة
 * @returns {boolean} - هل المستخدم لديه الصلاحية أم لا
 */
function hasPermission(member, requiredRole) {
    if (!member || !member.roles) return false;
    
    // التحقق من رتبة المطور (أعلى صلاحية)
    if (config.roles.developer && member.roles.cache.has(config.roles.developer)) {
        return true;
    }
    
    // التحقق من الرتبة المطلوبة
    switch (requiredRole) {
        case 'developer':
            return member.roles.cache.has(config.roles.developer);
            
        case 'admin':
            return member.roles.cache.has(config.roles.admin) || 
                   member.roles.cache.has(config.roles.developer);
                   
        case 'moderator':
            return member.roles.cache.has(config.roles.moderator) || 
                   member.roles.cache.has(config.roles.admin) || 
                   member.roles.cache.has(config.roles.developer);
                   
        default:
            return false;
    }
}

/**
 * التحقق من صلاحيات الإدارة
 * @param {GuildMember} member - عضو السيرفر
 * @returns {boolean}
 */
function isAdmin(member) {
    return hasPermission(member, 'admin');
}

/**
 * التحقق من صلاحيات المطور
 * @param {GuildMember} member - عضو السيرفر
 * @returns {boolean}
 */
function isDeveloper(member) {
    return hasPermission(member, 'developer');
}

/**
 * التحقق من صلاحيات المشرف
 * @param {GuildMember} member - عضو السيرفر
 * @returns {boolean}
 */
function isModerator(member) {
    return hasPermission(member, 'moderator');
}

module.exports = {
    hasPermission,
    isAdmin,
    isDeveloper,
    isModerator
};
