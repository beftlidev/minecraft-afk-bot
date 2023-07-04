const Discord = require('discord.js')
const {Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActivityType} = require("discord.js")
const db = require("croxydb")
module.exports = async(client) => {
    const prefix = db.fetch("prefix")
    client.on("messageCreate", async(msg) => {
        const args = msg.content.slice(0).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (msg.content.startsWith(`${prefix}tıkla`)) {
        const window = client.bot.currentWindow
        if(!window) {
        const embed = new Discord.EmbedBuilder()
        .setDescription(`Herhangi bir pencere açık değil.`)
        .setColor("Red")
        msg.channel.send({
          embeds: [embed]
        })
    } else {
            if(isNaN(args[0])) {
                const embed = new Discord.EmbedBuilder()
                .setDescription(`Bir slota tıklamak için sayı girmen gerekiyor.`)
                .setColor("Red")
                msg.channel.send({
                  embeds: [embed]
                })
    } else {
        
        client.bot.clickWindow(args[0] - 1, 0, 0);
        console.log(`BOT | ${args[0]}. slota tıkladım.`)
        const embed = new Discord.EmbedBuilder()
        .setDescription(`${args[0]}. slota tıkladım.`)
        .setColor("Green")
        msg.channel.send({
          embeds: [embed]
        })
    }

    }
    }

    })

}
