const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client({disableEveryone: true});

const fs = require('fs');
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}

bot.on('ready', () => {
    console.log(`${bot.user.username} is online`);
    bot.user.setActivity("Prefix is '>'", {type: "STREAMING"});
});

bot.on('message', message => {
    let args = message.content.substring(config.prefix.length).split(" ");

    switch (args[0]) {
        case "ping":
            bot.commands.get('ping').execute(message, args);
        break;
    }
});

bot.login(config.token);