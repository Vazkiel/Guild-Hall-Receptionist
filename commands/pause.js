exports.run = (client, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);

    if(!fetched) return message.channel.send("There currently isn\'t any music playing in this guild.")

    if(message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send("Sorry, you aren\'t in the same channel as the bot.");

    if(fetched.dispatcher.paused) return message.channel.send("This music is already paused.");

    fetched.dispatcher.pause();

    message.channel.send(`Sucessfully paused ${fetched.queue[0].songTitle}`);
}