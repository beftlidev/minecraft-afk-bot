const Discord = require('discord.js')
const {Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActivityType} = require("discord.js")
const db = require("croxydb")
module.exports = async(client) => {
    const prefix = db.fetch("prefix")
    client.on("messageCreate", async(msg) => {
        const args = msg.content.slice(0).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(msg.content.startsWith(`${prefix}envanter`)) {
      const window = client.bot.currentWindow
      if(!window) {
        function itemToString (item) {
          if (item) {
            return `[${item.slot + 1}] - ${item.displayName}`
          } else {
            return '(nothing)'
          }
        }
      const items = client.bot.inventory.items()
      const data = items.map(itemToString).join(', \n')
      if (data) {
      
          const itemCount = 36;
          const itemsPerLine = 3;
          const lines = itemCount / itemsPerLine;
          const items = data.split(',').map(item => item.trim());
          let output = '';
          for (let i = 0; i < lines; i++) {
            let line = '';
            for (let j = 0; j < itemsPerLine; j++) {
              const itemIndex = i * itemsPerLine + j;
              if (itemIndex >= items.length) {
                line += 'BOŞ, ';
              } else {
                line += items[itemIndex] + ', ';
              }
            }
            output += line.trim() + '\n';
          }
          const Canvas = require("canvas")
          const canvas = Canvas.createCanvas(950, 400);
          const context = canvas.getContext('2d');
          context.strokeStyle = '#0099ff';
          context.strokeRect(0, 0, canvas.width, canvas.height);
          context.font = '18px sans-serif';
          context.fillStyle = '#ffffff';    
          context.fillText(`ENVANTER`, 375, 35);
          context.fillText(`${output}`, 10, 65);
          const attachment = new Discord.AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'inventory.png' });
          const embed = new Discord.EmbedBuilder()
          .setTitle(`${db.fetch("username")} envanteri`)
          .setImage("attachment://inventory.png")
          .setColor("Blurple")
          msg.channel.send({
              embeds: [embed], 
              files: [attachment]
          })
      
      } else {
        const embed = new Discord.EmbedBuilder()
        .setDescription("Envanter Boş.")
        .setColor("Orange")
        msg.channel.send({
          embeds: [embed]
        })
      }    
      } else {

        function itemToString (item) {
          if (item) {
            return `[${item.slot + 1}] - ${item.displayName}`
          } else {
            return '(nothing)'
          }
        }
      
      const data = window.slots.map(itemToString).join(', \n')
      if (data) {
      
          const itemCount = 36;
          const itemsPerLine = 3;
          const lines = itemCount / itemsPerLine;
          const items = data.split(',').map(item => item.trim());
          let output = '';
          for (let i = 0; i < lines; i++) {
            let line = '';
            for (let j = 0; j < itemsPerLine; j++) {
              const itemIndex = i * itemsPerLine + j;
              if (itemIndex >= items.length) {
                line += 'BOŞ, ';
              } else {
                line += items[itemIndex] + ', ';
              }
            }
            output += line.trim() + '\n';
          }
          const Canvas = require("canvas")
          const canvas = Canvas.createCanvas(950, 400);
          const context = canvas.getContext('2d');
          context.strokeStyle = '#0099ff';
          context.strokeRect(0, 0, canvas.width, canvas.height);
          context.font = '18px sans-serif';
          context.fillStyle = '#ffffff';    
          context.fillText(`ENVANTER`, 375, 35);
          context.fillText(`${output}`, 10, 65);
          const attachment = new Discord.AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'inventory.png' });
          const embed = new Discord.EmbedBuilder()
          .setTitle(`${db.fetch("username")} envanteri`)
          .setImage("attachment://inventory.png")
          .setColor("Blurple")
          msg.channel.send({
              embeds: [embed], 
              files: [attachment]
          })
      
      } else {
        const embed = new Discord.EmbedBuilder()
        .setDescription("Envanter Boş.")
        .setColor("Orange")
        msg.channel.send({
          embeds: [embed]
        })
      }    

      }

    }

    })

}
