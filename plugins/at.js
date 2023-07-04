const Discord = require('discord.js')
const {Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActivityType} = require("discord.js")
const db = require("croxydb")
module.exports = async(client) => {
    const prefix = db.fetch("prefix")
    client.on("messageCreate", async(msg) => {
        const args = msg.content.slice(0).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(msg.content.startsWith(`${prefix}at`)) {
        if(args[0] !== "hepsi") {
            function itemByName (name) {
              const items = client.bot.inventory.items()
              if (client.bot.registry.isNewerOrEqualTo('1.9') && client.bot.inventory.slots[45]) items.push(client.bot.inventory.slots[45])
              return items.filter(item => item.name === name)[0]
            }
            const a = args[0]
            const b = args[1]
            const c = args[2] || 1
            console.log(a,b,c)
            const d = b * c
            async function tossItem (name, amount) {
              amount = parseInt(amount, 10)
              const item = itemByName(name)
              if (!item) {
                  msg.channel.send(`I have no ${name}`)
              } else {
                try {
                  if (amount) {
                    await client.bot.toss(item.type, null, amount)
                    const embed = new Discord.EmbedBuilder()
                    .setDescription(`[**${amount}**] adet, [**${name}**] attım.`)
                    .setColor("Green")
                    msg.channel.send({
                      embeds: [embed]
                    })
                  } else {
                    await client.bot.tossStack(item)
                    const embed = new Discord.EmbedBuilder()
                    .setDescription(`[**${name}**] attım.`)
                    .setColor("Green")
                    msg.channel.send({
                      embeds: [embed]
                    })
                  }
                } catch (err) {
                  const embed = new Discord.EmbedBuilder()
                  .setDescription(`bir sebepten atamadım: ${err.message}`)
                  .setColor("Red")
                  msg.channel.send({
                    embeds: [embed]
                  })
                }
              }
            }
            tossItem(a,d)
          } else {
            if(args[1]) {
              try {
                const cobblestoneId = args[1]
                let cobblestoneCount = 0;
  
                let it = itemByName(cobblestoneId)
  
                client.bot.inventory.items().filter(item => item.name === cobblestoneId)
                  .forEach((item) => {
                    cobblestoneCount += item.count;
                  });
  
                function itemByName (name) {
                  const items = client.bot.inventory.items()
                  if (client.bot.registry.isNewerOrEqualTo('1.9') && client.bot.inventory.slots[45]) items.push(client.bot.inventory.slots[45])
                  return items.filter(item => item.name === name)[0]
                }
  
                client.bot.toss(it.type, null, cobblestoneCount)
  
                const embed = new Discord.EmbedBuilder()
                .setDescription(`Envanterden [**${cobblestoneId}**] adlı eşyanın hepsini attım.`)
                .setColor("Green")
                msg.channel.send({
                  embeds: [embed]
                })
  
          } catch(err) {
            const embed = new Discord.EmbedBuilder()
            .setDescription(`her şeyi doğru yazdığına emin misin?: ${err.message}`)
            .setColor("Red")
            msg.channel.send({
              embeds: [embed]
            })
          }
            } else {
            async function tossAllExceptDiamondPickaxe() {
              const itemsToToss = client.bot.inventory.items().filter(item => item.name !== db.fetch("which_pickaxe"));
              for (const item of itemsToToss) {
                if (item.name !== db.fetch("which_pickaxe")) {
                  try {
                    await client.bot.tossStack(item);
                    const embed = new Discord.EmbedBuilder()
                    .setDescription(`[**${item.count}**] adet, [**${item.name}**] attım.`)
                    .setColor("Green")
                    msg.channel.send({
                      embeds: [embed]
                    })
                  } catch (err) {
                    const embed = new Discord.EmbedBuilder()
                    .setDescription(`Unable to toss [**${item.name}**]: ${err.message}`)
                    .setColor("Red")
                    msg.channel.send({
                      embeds: [embed]
                    })
                  }
                }
              }
            }
              tossAllExceptDiamondPickaxe();
          }
          }
      }

    })

}