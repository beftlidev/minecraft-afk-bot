const Discord = require('discord.js')
const {Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActivityType} = require("discord.js")
const db = require("croxydb")
module.exports = async(client) => {
    const prefix = db.fetch("prefix")
    client.on("messageCreate", async(msg) => {
        const args = msg.content.slice(0).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (msg.content.startsWith(`${prefix}bak`)) {
        if(args[0]) {
          let oyuncu = args[0]
          const player = client.bot.players[oyuncu];
      
          if (!player) {
            const embed = new Discord.EmbedBuilder()
            .setDescription('Oyuncu çevrimiçi değil.')
            .setColor("Green")
            msg.channel.send({
              embeds: [embed]
            })
          } else {
            await client.bot.lookAt(player.entity.position.offset(0, player.entity.height, 0));
            console.log(`BOT | ${player.username} Adlı oyuncuya baktım.`)
            const embed = new Discord.EmbedBuilder()
            .setDescription(`[**${player.username}**] Adlı oyuncuya baktım.`)
            .setColor("Green")
            msg.channel.send({
              embeds: [embed]
            })
      }
      } else {
        const embed = new Discord.EmbedBuilder()
        .setDescription("Bir oyuncu ismi yazmalısın")
        .setColor("Orange")
        msg.channel.send({
          embeds: [embed]
        })
        console.log("BOT | Bir oyuncu ismi yazmalısın")
      }
      }

    })

}
