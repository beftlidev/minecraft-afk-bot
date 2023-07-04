const Discord = require('discord.js')
const {Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActivityType} = require("discord.js")
const db = require("croxydb")
module.exports = async(client) => {
    const prefix = db.fetch("prefix")
    client.on("messageCreate", async(msg) => {
        const args = msg.content.slice(0).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (msg.content.startsWith(`${prefix}prefix`)) {
        if(args[0]) {
            if(db.fetch("prefix") !== args[0]) {
        await db.set("prefix", args[0])
        const embed = new Discord.EmbedBuilder()
        .setDescription(`Prefix ${args[0]} ayarlandı. \nBir dahaki başlatmada uygulanacaktır.`)
        .setColor("Green")
        msg.channel.send({
          embeds: [embed]
        })
            } else {
                const embed = new Discord.EmbedBuilder()
                .setDescription(`Şuanki ve yazdığın prefix aynı. \nLütfen farklı bir prefix deneyin.`)
                .setColor("Orange")
                msg.channel.send({
                  embeds: [embed]
                })
            }
    } else {
        const embed = new Discord.EmbedBuilder()
        .setDescription("Bir prefix yazman gerekiyor.")
        .setColor("Red")
        msg.channel.send({
          embeds: [embed]
        })
    }
    }

    })

}
