const Discord = require("discord.js");
const ayar = require("../../data/config.json");
const db = require("quick.db");

exports.run = (client, message, args) => {
  const uye11 = new Discord.MessageEmbed()
    .setColor(ayar.renk.hata)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setDescription(`
Kullanıcının isimlerini sıfırlamam için öncelikle **etiketlemen** gerek.

Örnek: \`${ayar.settings.prefix}isim-temizle @biaxe/ID\`
`);

  const yetki11 = new Discord.MessageEmbed()
    .setColor(ayar.renk.hata)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setDescription(
      "Kullanıcının isimlerini sıfırlamam için öncelikle <@&" +
        ayar.settings.kayitci +
        "> veya <@&" +
        ayar.settings.fullROL +
        "> rolünün olması gerekmekte."
    );

  if (
    ![ayar.settings.kayitci, ayar.settings.fullROL].some((role) =>
      message.member.roles.cache.get(role)
    ) &&
    !message.member.hasPermission("ADMINISTRATOR")
  )
    return message.channel
      .send(yetki11)
      .then((x) => x.delete({ timeout: 5000 }));

  let member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
  if (!member)
    return message.channel
      .send(uye11)
      .then((x) => x.delete({ timeout: 30000 }));

  db.delete(`isimler.${member.id}`);
  message.channel
    .send(
      new Discord.MessageEmbed()
        .setColor(ayar.renk.basarili)
        .setDescription(`${member} Adlı kullanıcı isim geçmişi sıfırlandı.`)
    )
    .then((e) => e.delete({ timeout: 6000 }));
};

exports.conf = {
  aliases: ["isimlertemizle", "itemizle", "isim-temizle"],
};

exports.help = {
  name: "isimlertemizle",
};
