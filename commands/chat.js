const Discord = require('discord.js');
const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require("discord.js") 
const db = require('croxydb') 

const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
    data: new SlashCommandBuilder()
    .setName("yazı")
    .setDescription("au")
	.addStringOption(option =>
		option.setName('ne')
			.setDescription('Ne yazsın')
			.setRequired(true)),
    global: true,
    run: async (client, interaction) => {

        const yazi = interaction.options.getString("ne")
        client.bot.chat(yazi)
        interaction.reply({ content: yazi, ephemeral: true })
} 
}