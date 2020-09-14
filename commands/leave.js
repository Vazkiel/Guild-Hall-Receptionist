exports.run = async (client, message, args, ops) => {
    if(!message.member.voice.channel)
        return message.channel.send("Please connect to a voice channel.");
    if(!message.guild.me.voice.channel)
        return message.channel.send("Sorry, the bot isn\'t connected to the guild.");
    if(message.guild.me.voice.channel.id !== message.member.voice.channel.id) 
        return message.channel.send('Sorry, you aren\'t connected to the same voice channel.');
    
        message.guild.me.voice.channel.leave();

        message.channel.send("Leaving Channel...");
}