const Discord = require("discord.js");
const db = require("quick.db");
const ayar = require("../../data/config.json");

exports.run = async (client, message, args) => {
  const yetki11 = new Discord.MessageEmbed()
    .setColor(ayar.renk.hata)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setDescription(
      "Kullanıcıyı kayıt etmem için öncelikle <@&" +
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

  let kullanıcı = message.mentions.users.first();
  if (!kullanıcı) {
    let erkek = db.fetch(`erkekUye.${message.author.id}`);
    let kadın = db.fetch(`kizUye.${message.author.id}`);
    let kayıtlar = db.fetch(`kayıtSayi.${message.author.id}`);
    if (erkek === null) erkek = "0";
    if (erkek === undefined) erkek = "0";
    if (kadın === null) kadın = "0";
    if (kadın === undefined) kadın = "0";
    if (kayıtlar === null) kayıtlar = "0";
    if (kayıtlar === undefined) kayıtlar = "0";

    message.channel
      .send(
        new Discord.MessageEmbed()
          .setColor(ayar.renk.basarili)
          .setDescription(
            `${message.author} **Adlı üyenin kayıt sorgusu** \`\`\`Erkek | ${erkek} \n \nKız | ${kadın} \n \nToplam | ${kayıtlar}\`\`\`  `
          )
      )
      .then((x) => x.delete({ timeout: 30000 }));
  }

  if (kullanıcı) {
    let erkek1 = db.fetch(`erkekUye.${kullanıcı.id}`);
    let kadın1 = db.fetch(`kizUye.${kullanıcı.id}`);
    let kayıtlar1 = db.fetch(`kayıtSayi.${kullanıcı.id}`);
    if (erkek1 === null) erkek1 = "0";
    if (erkek1 === undefined) erkek1 = "0";
    if (kadın1 === null) kadın1 = "0";
    if (kadın1 === undefined) kadın1 = "0";
    if (kayıtlar1 === null) kayıtlar1 = "0";
    if (kayıtlar1 === undefined) kayıtlar1 = "0";

    message.channel
      .send(
        new Discord.MessageEmbed()
          .setColor(ayar.renk.basarili)
          .setDescription(
            `${kullanıcı} **Adlı üyenin kayıt sorgusu** \`\`\`Erkek | ${erkek1} \n \nKız | ${kadın1} \n \nToplam | ${kayıtlar1}\`\`\`  `
          )
      )
      .then((x) => x.delete({ timeout: 30000 }));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kayıtstat", "kayıtlar", "kayıt-kontrol", "mernis"],
  permLvl: 0,
};

exports.help = {
  name: "sorgu",
};
