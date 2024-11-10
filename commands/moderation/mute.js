const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { orange } = require('../../colors.json');
const { modRole } = require('../../config.json'); 
const mysql = require('../../mysql'); 

function parseDuration(durationString) {
    const regex = /(\d+)(s|m|h|d|w)/;
    const matches = durationString.match(regex);
    if (!matches) return null;
    const [, time, unit] = matches;
    const timeInMs = parseInt(time);
    switch (unit) {
        case 's':
            return timeInMs * 1000;
        case 'm':
            return timeInMs * 60 * 1000;
        case 'h':
            return timeInMs * 60 * 60 * 1000;
        case 'd':
            return timeInMs * 24 * 60 * 60 * 1000;
        case 'w':
            return timeInMs * 7 * 24 * 60 * 60 * 1000;
        default:
            return null;
    }
}

const savePunishment = async (punishment) => {
    const sql = 'INSERT INTO punishments (type, user_tag, user_id, punished_by_tag, punished_by_id, reason, length) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [
        punishment.type,
        punishment.userTag,
        punishment.userId,
        punishment.punishedByTag,
        punishment.punishedById,
        punishment.reason,
        punishment.length
    ];

    try {
        await mysql.query(sql, values);
    } catch (error) {
        console.error('Error saving punishment to database:', error);
        throw error; 
    }
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mutes a user from the server.')
        .setDMPermission(false)
        .addUserOption(option => option.setName('user').setDescription('The user to mute').setRequired(true))
        .addStringOption(option => option.setName('duration').setDescription('The duration of the mute e.g., 1s, 5m, 2h, 3d, 1w').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the mute').setRequired(false)),
        async execute(interaction) {
            if (!interaction.member.roles.cache.has(modRole)) {
                return await interaction.reply({ content: 'You do not have permission to use this command', ephemeral: true });
            }
        
            const user = interaction.options.getUser('user');
            const reason = interaction.options.getString('reason') || 'No reason provided.';
            const durationString = interaction.options.getString('duration') || '0';
        
            try {
                const member = await interaction.guild.members.fetch(user);
                
                if (!member) {
                    return await interaction.reply({ content: 'User not found in the server.', ephemeral: true });
                }
        
                const durationInMs = parseDuration(durationString);
                if (!durationInMs) {
                    return interaction.reply('Invalid duration format. Please use a valid format (e.g., 1s, 5m, 2h, 3d, 1w).');
                }
        
                await member.timeout(durationInMs, reason);
        
                const embed = new EmbedBuilder()
                    .setTitle('User Muted')
                    .setDescription(`**${member.user.tag}** has been muted for ${durationString}.\n**Reason:** ${reason}`)
                    .setColor(orange)
                    .setTimestamp();
        
                await interaction.reply({ embeds: [embed] });
        
                const dmEmbed = new EmbedBuilder()
                    .setTitle('User Muted')
                    .setDescription(`You have been muted in **${interaction.guild.name}** for ${durationString}.\n**Reason:** ${reason}`)
                    .setColor(orange)
                    .setTimestamp();
        
                await member.send({ embeds: [dmEmbed] });
        
                const punishment = {
                    type: 'Mute',
                    userTag: user.tag,
                    userId: user.id,
                    punishedByTag: interaction.user.tag,
                    punishedById: interaction.user.id,
                    reason: reason,
                    length: durationString,
                    date: new Date().toISOString()
                };
                await savePunishment(punishment); 
            } catch (error) {
                console.error('Failed to mute user:', error);
                await interaction.reply({ content: 'Failed to mute the user', ephemeral: true });
            }
        },        
};
