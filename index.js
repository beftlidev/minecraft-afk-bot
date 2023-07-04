const Discord = require("discord.js");
const { EmbedBuilder, GatewayIntentBits, ButtonStyle} = require("discord.js");
const INTENTS = Object.entries(Discord.IntentsBitField.Flags).filter(([K]) => ![].includes(K)).reduce((t, [, V]) => t | V, 0)
const client = new Discord.Client({intents: INTENTS}) 
const Util = require('util') 
const {Collection} = require("discord.js"),
      {readdirSync} = require("fs")
const { ActionRowBuilder, ButtonBuilder, MessageAttachment } = require("discord.js");
const got = require("got");
const express = require('express')
const app = express()
const Canvas = require('canvas') 
const fetch = ("node-fetch");
const fs = require("fs");
const ws = require("ws")
const ms = require("ms")
const moment = require('moment');
client.setMaxListeners(50)
require("./utils/slash-loader.js")(client);

client.token = ""
client.login("")

const db = require("croxydb")

const prefix = db.fetch("prefix")

const {
  JsonDatabase,
  YamlDatabase
} = require("wio.db");

const db2 = new JsonDatabase({
  databasePath:"./databases/data.json" 
});

client.db2 = db2

var isDigging = false;

require("./plugins/at.js")(client)
require("./plugins/bak.js")(client)
require("./plugins/envanter.js")(client)
require("./plugins/kapat.js")(client)
require("./plugins/kazi.js")(client)
require("./plugins/komut.js")(client)
require("./plugins/oyuncular.js")(client)
require("./plugins/prefix.js")(client)
require("./plugins/tikla.js")(client)
require("./plugins/yardim.js")(client)
require("./plugins/yazi.js")(client)

client.on('messageCreate', async(message) => {

  if (message.content.startsWith("!eval")) {
        var args = message.content.split(" ").slice(1)
    if (message.author.id !== "389071682649849868") return
    let arguman = args.join(" ");
    if (!arguman) return
    let executedIn = process.hrtime();
    function clean(msg) {
      if (typeof msg !== "string")
        msg = Util.inspect(msg, { depth: 0 });
      msg = msg
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
      executedIn = process.hrtime(executedIn);
      executedIn = executedIn[0] * Math.pow(10, 3) + executedIn[1] / Math.pow(10, 6);
      return msg
    }
    try {
      const evaled = clean(await eval(arguman));
      const embddddd = new Discord.EmbedBuilder()
     .setTitle("🥳 Kod başarıyla çalıştırıldı")
        .setDescription(`
  > Kod parçacığı \`${executedIn.toFixed(3)} ms\` de **çalıştırıldı.**
        \`\`\`js\n${evaled}\`\`\`
        `)
       message.channel.send({embeds: [embddddd]});
    } catch(err) {
      console.log(err)
      message.channel.send({embeds: [
        new Discord.EmbedBuilder()
        .setTitle("🤯 Bir hata ile karşılaşıldı")
        .setDescription(`
        \`\`\`js\n${err}\`\`\`
        `)
        .setTimestamp()
                           ]});
    }
      }
  
  })

function createBot () {

const mf = require('mineflayer');

const bot = mf.createBot({
	host: db.fetch("server_ip"),
	port: db.fetch("port"),
	username: db.fetch("username"),
    version: db.fetch("version")
});

client.bot = bot

  bot.on('message', (message) => {
    if(db.fetch("console_last_message") == message.toString()) return;
    console.log(message.toString())

      if(db.fetch("console_channel")[0] == "true") {
        setTimeout(async() => {
          try {
    if(db.fetch("console_last_message") == message.toString()) return;
    client.channels.cache.get(db.fetch("console_channel")[1]).send({
      content: `${message.toString()}`,
    }).catch(async(error) => {return;})
    db.set("console_last_message", message.toString())
  } catch(err) {return;}
      }, 1000)
    }

  })

  

  bot.on('login', () => {
  if(db.fetch("log_channel")[0] == "true") {
    console.log("Bağlandı!")
    setTimeout(async() => {
    const embed = new Discord.EmbedBuilder()
    .setTitle("Bağlantı Kuruldu.")
    .setDescription(`[**${db.fetch("server_ip")}**] ip' li sunucuya [**${db.fetch("port")}**] port' u, [**${db.fetch("version")}**] minecraft sürümü, [**${db.fetch("username")}**] isimiyle bağlanıldı.
    > Kazma Ayarları
    Eline hep [**${db.fetch("which_pickaxe")}**] alınacak.
    Otomatik kazma durdurma: [**${db.fetch("auto_stop_dig")}**]
    Kazmanın canı azalınca durdurulacak can seviyesi: [**${db.fetch("auto_stop_dig_lowdamage")}**]
    > Başlangıç Komutları
    Startup Command (1): [**${db.fetch("startup_command1")[0]}**, **${db.fetch("startup_command1")[1]}**, **${db.fetch("startup_command1")[2]}**]  
    Startup Command (2): [**${db.fetch("startup_command2")[0]}**, **${db.fetch("startup_command2")[1]}**, **${db.fetch("startup_command2")[2]}**]
    Startup Command (3): [**${db.fetch("startup_command3")[0]}**, **${db.fetch("startup_command3")[1]}**, **${db.fetch("startup_command3")[2]}**]  
    > Kanal Ayarları
    Console Channel: [**${db.fetch("console_channel")[0]}**, <#${db.fetch("console_channel")[1]}>]
    Log Channel: [**${db.fetch("log_channel")[0]}**, <#${db.fetch("log_channel")[1]}>] `)
    .setColor("Green")
    client.channels.cache.get(db.fetch("log_channel")[1]).send({
      embeds: [embed]
    }).catch(async(error) => {return;})
  }, 1000)
      }

    if(db.fetch("startup_command1")[0] == "true") {
    setTimeout(async() => {
      if(db.fetch("log_channel")[0] === "true") {
        const embed = new Discord.EmbedBuilder()
        .setDescription("Başlangıç komutu (1) kullanıldı.")
        .setColor("Green")
        client.channels.cache.get(db.fetch("log_channel")[1]).send({
          embeds: [embed]
        }).catch(async(error) => {return;})
          }
        client.bot.chat(await db.fetch("startup_command1")[1])
    }, db.fetch("startup_command1")[2])
    }

    if(db.fetch("startup_command2")[0] == "true") {
    setTimeout(async() => {
      if(db.fetch("log_channel")[0] === "true") {
        const embed = new Discord.EmbedBuilder()
        .setDescription("Başlangıç komutu (2) kullanıldı.")
        .setColor("Green")
        client.channels.cache.get(db.fetch("log_channel")[1]).send({
          embeds: [embed]
        }).catch(async(error) => {return;})
          }
        client.bot.chat(await db.fetch("startup_command2")[1])
    }, db.fetch("startup_command2")[2])
    }

    if(db.fetch("startup_command3")[0] == "true") {
    setTimeout(async() => {
      if(db.fetch("log_channel")[0] === "true") {
        const embed = new Discord.EmbedBuilder()
        .setDescription("Başlangıç komutu (3) kullanıldı.")
        .setColor("Green")
        client.channels.cache.get(db.fetch("log_channel")[1]).send({
          embeds: [embed]
        }).catch(async(error) => {return;})
          }
        client.bot.chat(await db.fetch("startup_command3")[1])
    }, db.fetch("startup_command3")[2])
    }

    setInterval(async() => {
    const heldItem = bot.inventory.slots[bot.getEquipmentDestSlot('hand')];
    try {
    if (heldItem.name !== db.fetch("which_pickaxe")) {
        let pickaxe = bot.inventory.items().filter(item => item.name == db.fetch("which_pickaxe"))[0];
        await bot.equip(pickaxe, 'hand');
        console.log(`BOT | Eline ${db.fetch("which_pickaxe")} alındı`)
        if(db.fetch("log_channel")[0] === "true") {
          const embed = new Discord.EmbedBuilder()
          .setDescription(`Eline ${db.fetch("which_pickaxe")} alındı`)
          .setColor("Green")
          client.channels.cache.get(db.fetch("log_channel")[1]).send({
            embeds: [embed]
          }).catch(async(error) => {return;})
            }
    } else {
    }
  } catch(err) {
    try {
    let pickaxe = bot.inventory.items().filter(item => item.name == db.fetch("which_pickaxe"))[0];
    await bot.equip(pickaxe, 'hand');
    console.log(`BOT | Eline ${db.fetch("which_pickaxe")} alındı`)
    if(db.fetch("log_channel")[0] === "true") {
      const embed = new Discord.EmbedBuilder()
      .setDescription(`Eline ${db.fetch("which_pickaxe")} alındı`)
      .setColor("Green")
      client.channels.cache.get(db.fetch("log_channel")[1]).send({
        embeds: [embed]
      }).catch(async(error) => {return;})
        }
      } catch(err) {return;}
  }
    }, 15000)

});

bot.once('resourcePack', () => {
  bot.acceptResourcePack()
})

bot.on('kicked', console.log)
bot.on('error', console.log)
bot.on('end', createBot)

}

createBot()

process.on("unhandledRejection", (reason, promise) => {
    return console.log(reason)
    }); 
    