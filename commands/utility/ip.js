const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { blue } = require('../../colors.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ip')
        .setDescription('Provides the IP address of the Server.'),
    async execute(interaction) {
            const ipEmbed = new EmbedBuilder()
                .setTitle('Servers IP Address')
                .setDescription("**The Server IP:** __johnfries.net__")
                .setColor(blue)
                .setTimestamp()
                .setThumbnail(interaction.guild.iconURL());
            interaction.reply({ embeds: [ipEmbed] });
        }
    }