const ytdl  = require('ytdl-core');
const { getInfo } = require('ytdl-core');

exports.run = async (client, message, args, ops) => {

    if(!message.member.voice.channel) return message.channel.send("Please connect to a voice channel.");
    if(!args[0]) return message.channel.send("Sorry, please in put a url following the command.");
    
    
    let validate = await ytdl.validateURL(args[0]);
    
    if(!validate) return message.channel.send("Sorry, please input a **valid** url following the command.");

    let info = await ytdl.getInfo(args[0]);

    let data = ops.active.get(message.guild.id) || {};

    if(!data.connection) data.connection = await message.member.voice.channel.join();
    if(!data.queue) data.queue = []; 

    data.guildID = message.guild.id;

    data.queue.push({
        songTitle: info.videoDetails.title,
        requester: message.author.username,
        url: args[0],
        annouceChannel: message.channel.id
    })

    if(!data.dispatcher) play(client, ops, data);
    else message.channel.send(`__**Added to queue:**__\n**${info.videoDetails.title} —— Requested by:** *${message.author.username}*`);

    ops.active.set(message.guild.id, data);
}

async function play(client, ops, data) {
    data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, {filter:'audioonly'}));
    data.dispatcher.guildID = data.guildID;

    client.channels.cache.get(data.queue[0].annouceChannel).send(`__**Now playing:**__\n**${data.queue[0].songTitle} —— Requested by:** *${data.queue[0].requester}*`);

    data.dispatcher.once('finish', function() {
        finish(client, ops, this)
    }); 
}

function finish(client, ops, dispatcher) {
    let fetched = ops.active.get(dispatcher.guildID);

    fetched.queue.shift();

    if(fetched.queue.length > 0) {
        ops.active.set(dispatcher.guildID, fetched);
        play(client, ops, fetched)
    
    } else {
        ops.active.delete(dispatcher.guildID);

        let vc = client.guilds.get(dispatcher.guildID).me.voice.channel;
        if(vc) vc.leave();
    }
}