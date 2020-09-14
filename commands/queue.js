exports.run = async (client, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);

    if(!fetched) return message.channel.send("There currently isn\'t any music playing in this guild.");

    let queue = fetched.queue;
    let nowPlaying = queue[0];
    
    let resp = `__**Now playing:**__\n**${nowPlaying.songTitle}** —— **Requested by:** *${nowPlaying.requester}*\n\n__**Queue**__\n`;

    for(var i = 1; i < queue.length; i++) {
        resp += `${i}. **${queue[i].songTitle}** —— **Requested by:** *${queue[i].requester}*\n`;
    }

    message.channel.send(resp);
}