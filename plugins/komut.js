const Discord = require('discord.js')
const {Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActivityType} = require("discord.js")
const db = require("croxydb")
module.exports = async(client) => {
    const prefix = db.fetch("prefix")
    client.on("messageCreate", async(msg) => {
        const args = msg.content.slice(0).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(msg.content.startsWith(`${prefix}komut`)) {
        const yazi = msg.content.split(' ').slice(1).join(' ');
        const embed = new Discord.EmbedBuilder()
        .setDescription(`**${yazi}** komutunu kullandım.`)
        .setColor("Green")
        msg.channel.send({
          embeds: [embed]
        })
        client.bot.chat("/" + yazi)
    }

    })

}
