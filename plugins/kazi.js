const Discord = require('discord.js')
const {Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActivityType} = require("discord.js")
const db = require("croxydb")
module.exports = async(client) => {
    const prefix = db.fetch("prefix")
    client.on("messageCreate", async(msg) => {
        const args = msg.content.slice(0).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (msg.content.startsWith(`${prefix}kazı`)) {
        if(args[0] === "başlat") {
            console.log("BOT | Kazıyı başlattım")
            const embed = new Discord.EmbedBuilder()
            .setDescription("Kazıyı başlattım")
            .setColor("Green")
            msg.channel.send({
              embeds: [embed]
            })
        isDigging = true;
        dig();
    } else if (args[0] === "durdur") {
        const embed = new Discord.EmbedBuilder()
        .setDescription("Kazıyı durdurdum")
        .setColor("Orange")
        msg.channel.send({
          embeds: [embed]
        })
        console.log("BOT | Kazıyı durdurdum")
        isDigging = false;
    } else if (args[0] === "durum") {
      let kaziDurum;
      try {
      const heldItem = client.bot.inventory.slots[client.bot.getEquipmentDestSlot('hand')];
      if (heldItem.name == db.fetch("which_pickaxe")) {
        let pickaxeDamage = await client.db2.fetch(`${heldItem.name}_durability`)
        let damage = pickaxeDamage - heldItem.nbt.value.Damage.value
        kaziDurum = `${db.fetch("which_pickaxe")} - ${damage} / ${pickaxeDamage}`
      } else {
        kaziDurum = `Elinde kazma yok.`
      }
      const embed = new Discord.EmbedBuilder()
      .setTitle("Kazı durumu")
      .setDescription(`${kaziDurum}`)
      .setColor("Orange")
      msg.channel.send({
        embeds: [embed]
      })
    } catch(err) {
      const embed = new Discord.EmbedBuilder()
      .setTitle("Kazı durumu")
      .setDescription(`Elinde kazma yok.`)
      .setColor("Orange")
      msg.channel.send({
        embeds: [embed]
      })
    }
  } else {
        const embed = new Discord.EmbedBuilder()
        .setDescription("başlat / durdur / durum yazabilirsin sadece.")
        .setColor("Red")
        msg.channel.send({
          embeds: [embed]
        })
    }
}

    })

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function dig() {
    if (!isDigging) return
    const block = client.bot.blockAtCursor(5);
        if(db.fetch("auto_stop_dig") !== "false") {
        const heldItem = client.bot.inventory.slots[client.bot.getEquipmentDestSlot('hand')];
        let pickaxeDamage = await client.db2.fetch(`${heldItem.name}_durability`)
          let damage =  pickaxeDamage - heldItem.nbt.value.Damage.value
          let lowDamage = db.fetch("auto_stop_dig_lowdamage")
          if(damage < lowDamage) {
            console.log(`BOT | ${db.fetch("which_pickaxe")} Canı ${lowDamage} dan az olduğu için otomatik olarak kazıyı durdurdum.`)
            isDigging = false;
            if(db.fetch("log_channel")[0] === "true") {
              const embed = new Discord.EmbedBuilder()
              .setDescription(`[**${db.fetch("which_pickaxe")}**] Canı [**${lowDamage}**] dan az olduğu için otomatik olarak kazıyı durdurdum.`)
              .setColor("Red")
              client.channels.cache.get(db.fetch("log_channel")[1]).send({
                embeds: [embed]
              }).catch(async(error) => {return;})
                }
              } else {
              }
    } else {
    }

    if (!block) {
        await sleep(100);
    } else {
        await client.bot.dig(block, "ignore", "raycast");
    }
    
    dig()
}


}
