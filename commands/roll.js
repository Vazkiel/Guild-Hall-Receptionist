module.exports = {
    name: 'roll',
    description: "rolls a dice.",
    execute(message, args) {
        console.log("Roll command error.");
        if(!args[0])
            return message.channel.send("Please input text.");
    }
}