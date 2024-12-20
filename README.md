<br/>
<p align="center">
  <a href="https://github.com/Fries-Net/Main-Discord-Bot">
    <img src="https://i.johnfries.net/images/logos/logo1.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">The Fries Net discord bot</h3>

# About The Project

This bot is made with for the Fries Net discord to ensure players can create suggestions and tickets and ensure that the staff have the adequate commands to punish rulebreakers and moderate the discord. Eventually this will have full intergration with https://johnfries.net (nameless) and ingame (also via nameless) so if someone needs a "global ban" it can be handled via the bot. We'll also use this to help staff members when creating tickets and making reports ingame. Might require people to verify when joining but we cross that bridge when we get there.

Index: <br>
<a href="#Commands"> Command List</a> <br>
<a href="#GettingStarted"> Getting Started With the bot</a> <br>
<a href="#Config"> Config Setup and Explanation</a><br>


# GettingStarted

Download all the dependacies using ``npm i`` I'm using node v18.12.1 <br>
Now fill out the exampleconfig.json config. For more details check <a href="#config">here!</a> <br>
Make sure to change your config filename to config.json or YOUR FILE WILL NOT WORK.<br>
Once all your dependancies are downloaded type either ``npm run run`` or ``node index.js`` <br>


# Commands:

Moderation
* `/ban [user] [reason] [duration]` - "Bans a user from the server can also have a duration on the ban"
* `/unban [user]` - "Unbans a user from the server using their discord ID"
* `/mute [user] [duration] [reason]` - "Mutes a user in the server with the timeout feature."
* `/unmute [user]` - "Unmutes the user"
* `/purge [amount]` - "Purges the specified amount of messages"

Utility
* `/ping` - "Gets the ping of the bot"
* `/user` - "Provides information about the user"
* `/server` - "Provides information about the server"
* `/avatar` - "Provides the users avatar or selected user"
* `/help [Optionally can specify the command you want more detail on]` - "Provides a list of the commands the bot has." 

Ticket
* `/ticket [embedMessageChannel] [supportRole] [ticketCategory]` - "Initiates the ticket system and sends the embed through." - need to save message ID in database and check on startup rather than hoping for the best lmfao.
* `/close` - "Closes the ticket. Allows the support role to still see the channel but disables the ticket owner from seeing the channel"
* `/delete` - "Deletes the ticket channel. Looks for any channel with the name "closed-" so be careful."
<br> <br>

# Config <br>

<br>
    "token":"", This is your discord bot token. Find it <a href="https://discord.com/developers/applications/"> here</a>  under Bot <br>
    "devs":["630070645874622494"], This is your discord ID by default its mine but you can change it out and put yours in there. If you want to put multiple you should seperate it out like an array like follows: ["630070645874622494", "464107754198663168"] <br>
    "logChannel":"", This is currently where all the bots logs go whenever someone runs a command. Eventually this will be swapped out at a later version. **NO LONGER NEEDED IF THERE IS A CHANNEL CALLED "logs" BUT CAN STILL BE USED**<br>
    "suggestChannel":"" this is the channel you want the suggestions to be sent to. <br>
    "statusName": "Bot Status", This is what the bot is "playing" I recomend something like. "/help" but its entirely up to you <br>
    "clientId": "", This is the bots client ID found <a href="https://discord.com/developers/applications/">here</a> under OAuth2 <br>
    "memberID": "1271432007616041012", this is for the auto roles. This is the role id for the role you would like to give to a new member when they join.<br>
	  "guildId": "" This is the parent servers ID. This is currently how commands are distrabuted to the server and is required as I'm not creating global commands due to the bot only being in one server. <br>
        "mcserver": { <br>
        "ip": "johnfries.net",<br>
        "port": 25565,<br>
        "type": "java",<br>
        "name": "FriesNet",<br>
        "version": "1.9.x - 1.21",<br>
        "icon": "https://cdn.discordapp.com/icons/1271431711389122663/2c50b85387919da5d541e51699d16d32.webp?size=96",<br>
        "site": "https://friesnet.net"<br>
    },
        "mysql": { <br>
        "host": "localhost",<br>
        "user": "root",<br>
        "password": "root",<br>
        "database": "discord_bot",<br>
        "insecureAuth": true<br>
    }<br>
    <br>
    this is for the the /ip command and displays the status of the server.

  <br>
<br>
 
<br>
<br>

## Authors

* **John Fries** - *Developer* - [John Fries](https://github.com/John-Fries-J/) - *Made everything*