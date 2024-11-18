const { memberID, welcomeID } = require('../config.json');

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    execute(member) {
        const guild = member.guild;
        const role = guild.roles.cache.get(memberID);
        if (!role) {
            console.log('Role not found');
            return;
        }
        member.roles.add(role)
        const channelID = welcomeID;
        const channel = guild.channels.cache.get(channelID);
            channel.send(`Welcome to the server, ${member}!`);
    },
};