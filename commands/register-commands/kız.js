const Discord = require("discord.js");
const db = require("quick.db");
const kdb = new db.table("kullanici");
const ayar = require("../../data/config.json");

exports.run = async (client, message, args) => {
  const isim11 = new Discord.MessageEmbed()
    .setColor(ayar.renk.hata)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setDescription(`
Kullanıcıyı kayıt etmem için öncelikle **isim** yazmalısın.

Örnek: \`${ayar.settings.prefix}kız @kullanıcı Berke 18\`
`);

  const uye11 = new Discord.MessageEmbed()
    .setColor(ayar.renk.hata)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setDescription(`
Kullanıcıyı kayıt etmem için öncelikle **etiketlemen** gerek.

Örnek: \`${ayar.settings.prefix}kız @kullanıcı Berke 18\`
`);

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

  let member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
  if (!member)
    return message.channel
      .send(uye11)
      .then((x) => x.delete({ timeout: 30000 }));
  let clasus = message.guild.member(member);
  let isim = args[1];
  let yas = Number(args[2]);
  if (!isim)
    return message.channel
      .send(isim11)
      .then((x) => x.delete({ timeout: 30000 }));
  if (!yas)
    return message.channel
      .send(yas11)
      .then((x) => x.delete({ timeout: 30000 }));

  clasus.setNickname(`• ${isim} | ${yas}`);

  clasus.roles.add(ayar.settings.kizROL);
  clasus.roles.remove(ayar.settings.kayitsizROL);

  clasus.roles.add(ayar.settings.kizROL);
  clasus.roles.remove(ayar.settings.kayitsizROL);

  clasus.roles.add(ayar.settings.kizROL);
  clasus.roles.remove(ayar.settings.kayitsizROL);

  let data = kdb.get(`isimler.${member.id}`) || [
    "Botun veri tabanında kullanıcıya ait isim bulamadım.",
  ];

  db.add(`kayıtSayi.${message.author.id}`, 1);
  db.add(`kizUye.${message.author.id}`, 1);

  kdb.push(`isimler.${member.id}`, {
    guildName: `• \`${isim} | ${yas}\``,
    Name: isim,
    Age: yas,
    Zaman: Date.now(),
    Yetkili: message.author.id,
    Role: `(<@&${ayar.settings.kizROL}>)`,
  });

  let listedData =
    data.length > 0
      ? data.map(
          (value) =>
            `${
              value.guildName + value.Role ||
              "`Botun veri tabanında kullanıcıya ait isim bulamadım.`"
            } `
        )
      : "Botun veri tabanında kullanıcıya ait isim bulamadım.";

  if (data == undefined) {
    ("Botun veri tabanında kullanıcıya ait isim bulamadım.");
  }

  const embed = new Discord.MessageEmbed().setDescription(`
<@${
    member.id
  }> kişisinin ismi başarıyla \`• ${isim} | ${yas}\` olarak değiştirildi.

Bu üye daha önce şu isimlerde kayıt olmuş;
${listedData.join("\n")}

Kullanıcıların önceki isimlerine bakmak için \`.isimler @biaxe/ID\` şeklinde komutu kullanabilirsiniz.
  `);

  message.channel.send(embed).then((x) => x.delete({ timeout: 30000 }));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["k", "bayan"],
  permLevel: 0,
};

exports.help = {
  name: "kız",
};
