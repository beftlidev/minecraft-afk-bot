const Discord = require('discord.js')
const {Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActivityType} = require("discord.js")
const db = require("croxydb")
module.exports = async(client) => {
    const prefix = db.fetch("prefix")
    client.on("messageCreate", async(msg) => {
        const args = msg.content.slice(0).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(msg.content.startsWith(`${prefix}oyuncular`)) {
        const players = Object.values(client.bot.players);
        let message = 'Sunucuda ' + players.length + ' oyuncu var. \n\n'; 
        players.forEach(player => {
          message += `${player.username}** - **${player.ping}** \n`;
    });
    const embed = new Discord.EmbedBuilder()
    .setDescription(`${message}`)
    .setColor("Green")
    msg.channel.send({
      embeds: [embed]
    })
    }

    })

}
