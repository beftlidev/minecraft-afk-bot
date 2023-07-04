const Discord = require('discord.js')
const moment = require('moment')
const {Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActivityType} = require("discord.js"),
      {readdirSync} = require("fs")
const fs = require("fs")
      const db = require("croxydb") 
      const Util = require('util')
        const { REST } = require("@discordjs/rest");
  const { Routes } = require("discord-api-types/v9");
module.exports = async(client, interaction) => {
  
  client.commands = new Collection()
    let commandPath = "./commands"
    for (const file of fs
      .readdirSync(commandPath)
      .filter((file) => file.endsWith(".js"))) {
      console.log(`Loaded command ${file}`);
      const command = require(`../commands/${file}`);
      client.commands.set(command.data.name, command);
    }

client.on('ready', async() => {

setInterval(async() => { 
client.user.setPresence({ activities: [{ name: `Prefix: (${await db.fetch("prefix")})`, type: ActivityType.Playing }] });
},60000) 

console.log("[BOT] | The status was set successfully.") 

      const globalCommands = Array.from(
          client.commands.filter((cmd) => cmd.global === true).values()
        ).map((m) => m.data);
    
        const rest = new REST({ version: "10" }).setToken(client.token);
    
        await rest
          .put(Routes.applicationCommands(client.user.id), { body: globalCommands })
          .catch(console.error);
  

console.log("[BOT] | Slash command loaded for " + client.guilds.cache.size + ".")
    
console.log(`[BOT] | ${client.user.tag} is online.`);

})

client.on("guildCreate", async(guild) => {
  console.log("added new server" + " Total servers:" + client.guilds.cache.size)
})



  client.on('interactionCreate', async(interaction) => {
  
    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) return
    var cmd;
    interaction.selectedValue = (interaction.options._hoistedOptions[0]) ? interaction.options._hoistedOptions[0].value : undefined

      command.run(client, interaction)
      
  })
}
