const ytdl  = require('ytdl-core');

exports.run = async (client, message, args, ops) =>{
    if(!message.member.voiceChannel)  
        return message.channel.send("Please connect to a voice channel.");
    if(message.guild.me.voiceChannel)
        return message.channel.send("Sorry, the bot is already connected to the guild.");
};