// Required Packages — 
const Discord = require('discord.js');
const client = new Discord.Client({disableEveryone: true});

// Constant Vriables —
const config = require('./config.json');
const token = config.token;
const prefix = config.prefix;
const ownerID = config.ownerID;

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
        // Options —
        let ops = {
            ownerID: ownerID
        }

        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args, ops);
    } 
    catch (e) {
        console.log(e.stack);
    }
});

//Discord Login — 
client.login(config.token);