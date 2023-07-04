const Discord = require('discord.js')
const {Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActivityType} = require("discord.js")
const db = require("croxydb")
module.exports = async(client) => {
    const prefix = db.fetch("prefix")
    client.on("messageCreate", async(msg) => {
        const args = msg.content.slice(0).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (msg.content.startsWith(`${prefix}kapat`)) {
        try {
        client.bot.closeWindow(client.bot.currentWindow.id)
        console.log("BOT | Açık pencereyi kapattım")
        const embed = new Discord.EmbedBuilder()
        .setDescription(`Açık pencereyi kapattım`)
        .setColor("Green")
        msg.channel.send({
          embeds: [embed]
        })
    } catch(err) {
        const embed = new Discord.EmbedBuilder()
        .setDescription("Bir pencere açık değil.")
        .setColor("Red")
        msg.channel.send({
          embeds: [embed]
        })
    }
    }

    })

}
