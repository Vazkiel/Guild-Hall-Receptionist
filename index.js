// Required Packages — 
const Discord = require('discord.js');
const client = new Discord.Client({disableEveryone: true});

// Constant Vriables —
const config = require('./config.json');
const token = config.token;
const prefix = config.prefix;

// Ready Event —
client.on('ready', () => {
    console.log(`${client.user.username} is online`);
    client.user.setActivity("Prefix is '>'", {type: 'STREAMING'});
});

// Listen Events —
client.on('message', message => {

    // Variables — 
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    if(message.author.bot) 
        return;
    if(!message.content.startsWith(prefix)) 
        return;

    try {
        delete require.cache[require.resolve(`./commands/${cmd}.js`)];

        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args);
    } 
    catch (e) {
        console.log(e.stack);
    }
});

//Discord Login — 
client.login(config.token);