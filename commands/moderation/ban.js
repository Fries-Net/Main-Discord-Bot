const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { red } = require('../../colors.json');
const { modRole } = require('../../config.json');
const mysql = require('../../mysql'); 

function parseDuration(durationString) {
    const regex = /^(\d+)([smhd])$/;
    const match = durationString.match(regex);
    if (!match) return NaN;

    const [, num, unit] = match;
    const seconds = parseInt(num, 10) * {
        's': 1000,
        'm': 60 * 1000,
        'h': 60 * 60 * 1000,
        'd': 24 * 60 * 60 * 1000
    }[unit];

    return seconds;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user from the server')
        .setDMPermission(false)
        .addUserOption(option => option.setName('user').setDescription('The user to ban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the ban'))
        .addStringOption(option => option.setName('duration').setDescription('The duration of the ban (e.g., 1d, 1h)').setRequired(false)),
    async execute(interaction) {
        if (!interaction.member.roles.cache.has(modRole)) {
            return await interaction.reply({ content: 'You do not have permission to use this command', ephemeral: true });
        }
        
        const user = interaction.options.getUser('user');
        const userId = user.id;

        const reason = interaction.options.getString('reason') || 'No reason provided';
        const duration = interaction.options.getString('duration');

        const embed = new EmbedBuilder()
            .setTitle('User Banned')
            .setDescription(`You have been banned from the server${reason ? ` for the following reason: ${reason}` : ''}`)
            .setTimestamp()
            .setColor(red);

        try {
            await interaction.guild.members.ban(userId, { reason: reason });
            await interaction.reply({ content: `User ${user.tag} has been banned from the server for ${reason}`, ephemeral: true });

            if (duration) {
                const durationInMillis = parseDuration(duration);
                if (!isNaN(durationInMillis) && durationInMillis > 0) {
                    setTimeout(async () => {
                        try {
                            await interaction.guild.members.unban(userId, 'Automatic unban after specified duration');
                        } catch (error) {
                            console.error('Error during automatic unban:', error);
                        }
                    }, durationInMillis);
                }
            }

            const sql = 'INSERT INTO punishments (type, user_tag, user_id, punished_by_tag, punished_by_id, reason, length) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const values = ['Ban', user.tag, user.id, interaction.user.tag, interaction.user.id, reason, duration || 'Permanent'];
            
            try {
                await mysql.query(sql, values);
            } catch (error) {
                console.error('Error saving ban punishment to database:', error);
            }
        } catch (error) {
            console.error('Failed to ban user:', error);
            await interaction.reply({ content: 'Failed to ban the user', ephemeral: true });
        }
    },
};
