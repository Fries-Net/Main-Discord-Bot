const { memberID } = require('../config.json');

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
        const channelID = "1271431712383045703";
        const channel = guild.channels.cache.get(channelID);
        try{
            channel.send(`Welcome to the server, ${member}!`);
        }
        catch (error){
            console.log(error);
        }
    },
};