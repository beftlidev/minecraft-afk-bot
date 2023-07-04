const Discord = require('discord.js')
const {Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActivityType} = require("discord.js")
const db = require("croxydb")
module.exports = async(client) => {
  const prefix = db.fetch("prefix")
    client.on("messageCreate", async(msg) => {
        const args = msg.content.slice(0).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (msg.content.startsWith(`${prefix}yardım`)) {

        const word = [
          "Bakalım burda neler varmış?",
          "Bir şeylerimi unuttun UwU",
          "Discord sunucuma gelmeyi unutma :D",
          "Kazı ile skyblock da zengin olma şansın varmı!!",
          "Yeni güncellemeleri artık ucuza alabilirsin.",
          "Ucuza aldın ama yeni güncelleme ile pahalımı oldu dert etme! Sana artık özel olarak ucuz sunuluyor.",
          "Şuraya bi göz atalım...",
          "Hıhı aynen gelişmişim canım iltifatlara lüzum yok.",
        ]
      
        const randomWord = word[Math.floor(Math.random() * word.length)];
      
        const embed = new Discord.EmbedBuilder()
        .setTitle("Yardım menüsüne hoşgeldin.")
        .setDescription(`> **${randomWord}**

        \`${prefix}\`yazı [yazı] 
        Sunucuda yazı yazmanı sağlar.
      
        \`${prefix}\`komut [komut] 
        Sunucuda komut kullanmanı sağlar. (istersen yazı komutu ilede yapabilirsin sadece / yazmaman için yaptım)
      
        \`${prefix}\`tıkla [slot] 
        Belirli bir slota tıklar. (Görev komutları falan için tasarlandı)
      
        \`${prefix}\`kapat 
        Açtığın sayfayı kapatır. (Yine görev komutu vs için kapatmanı sağlar, kapatmaz isen kazı yaparken garip duruyor :D)
      
        \`${prefix}\`envanter 
        Hesabın envanterini gösterir.
      
        \`${prefix}\`at [eşya] [sayı] [stek] / [hepsi] (eşya) 
        Belirli eşyayı belirli sayıda belirli stek te atarsın. Veya envanterdeki herşeyi atabilirsin.
      
        \`${prefix}\`kazı [başlat/durdur/durum] 
        Önündeki 4 bloğu her zaman kırar sen durduruna kadar. 

        \`${prefix}\`bak [player_name] 
        Yazdığın oyuncuya bakar.`)
        .setFooter({text: "[] - Zorunlu | () - İsteğe bağlı"})
        .setColor("Random")
        const row = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
          .setLabel("Discord")
          .setURL("https://discord.gg/euQeAkB524")
          .setStyle(Discord.ButtonStyle.Link)
        )
        msg.channel.send({
          embeds: [embed], 
          components: [row]
        })
      
      }

    })

}
