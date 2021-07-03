const { MessageEmbed } = require("discord.js");
const datab = require("quick.db");
const ayarlar = require("../../data/config.json");
const moment = require("moment");
const ms = require("ms");

exports.run = async (client, message, args) => {
  if (
    !message.member.roles.cache.has(ayarlar.settings.kayitci) &&
    !message.member.roles.cache.has(ayarlar.settings.fullROL) &&
    !message.author.hasPermission("ADMINISTRATOR")
  )
    return message.channel
      .send(
        new MessageEmbed()
          .setDescription(
            "Kullanıcıyı kayıt etmem için öncelikle <@&" +
              ayar.settings.kayitci +
              "> veya <@&" +
              ayar.settings.fullROL +
              "> rolünün olması gerekmekte."
          )
          .setAuthor(
            message.author.tag,
            message.author.avatarURL({ dynamic: true })
          )
          .setColor(ayar.renk.hata)
          .setTimestamp()
      )
      .then((x) => x.delete({ timeout: 5000 }));
  if (!ayarlar.settings.kayitsiz)
    return message.channel
      .send(
        new MessageEmbed()
          .setDescription(`( \`Kayıtsız\` ) Rolünü bulamıyorum!`)
          .setAuthor(
            message.member.displayName,
            message.author.avatarURL({ dynamic: true })
          )
          .setColor(ayar.renk.hata)
          .setTimestamp()
      )
      .then((x) => x.delete({ timeout: 10000 }));

  const kullanici = message.guild.member(
    message.mentions.members.first() || message.guild.members.cache.get(args[0])
  );

  if (!kullanici)
    return message.channel
      .send(
        new MessageEmbed()
          .setDescription(
            `
          Kullanıcıyı kayıtsıza atabilmem için öncelikle **etiketlemen** gerek.

            Örnek: \`${ayar.settings.prefix}kayıtsız @biaxe/ID\`
            `
          )
          .setAuthor(
            message.member.displayName,
            message.author.avatarURL({ dynamic: true })
          )
          .setColor(ayar.renk.hata)
          .setTimestamp()
      )
      .then((x) => x.delete({ timeout: 5000 }));
  if (kullanici.id === message.author.id)
    return message.channel
      .send(
        new MessageEmbed()
          .setDescription(
            `Kayıtsıza atmaya çalıştığın kişi ile aynı pozisyondasın yada senden üst yetkide.`
          )
          .setAuthor(
            message.member.displayName,
            message.author.avatarURL({ dynamic: true })
          )
          .setColor(ayar.renk.hata)
          .setTimestamp()
      )
      .then((x) => x.delete({ timeout: 5000 }));
  if (ayarlar.ownerRolü)
    return message.channel
      .send(
        new MessageEmbed()
          .setDescription(
            `Kayıtsıza atmaya çalıştığın kişi ile aynı pozisyondasın yada senden üst yetkide.`
          )
          .setAuthor(
            message.member.displayName,
            message.author.avatarURL({ dynamic: true })
          )
          .setColor(ayar.renk.hata)
          .setTimestamp()
      )
      .then((x) => x.delete({ timeout: 5000 }));
  if (kullanici.roles.highest.position >= message.member.roles.highest.position)
    return message.channel
      .send(
        new MessageEmbed()
          .setDescription(
            `Kayıtsıza atmaya çalıştığın kişi ile aynı pozisyondasın yada senden üst yetkide.`
          )
          .setAuthor(
            message.member.displayName,
            message.author.avatarURL({ dynamic: true })
          )
          .setColor(ayar.renk.hata)
          .setTimestamp()
      )
      .then((x) => x.delete({ timeout: 5000 }));

  const embed = new MessageEmbed()
    .setDescription(
      `**${kullanici} kişisi başarılı bir şekilde kayıtsıza atıldı.**`
    )
    .setAuthor(
      message.member.displayName,
      message.author.avatarURL({ dynamic: true })
    )
    .setColor(ayarlar.renk.basarili)
    .setTimestamp();
  message.channel.send(embed).then((x) => x.delete({ timeout: 10000 }));

  kullanici.setNickname(`İsim | Yaş`);
  kullanici.roles.add(ayarlar.settings.kayitsizROL);
  kullanici.roles.cache.forEach((r) => {
    kullanici.roles.remove(r.id);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["unregister"],
  permLevel: 0,
};

exports.help = {
  name: "kayıtsız",
};
