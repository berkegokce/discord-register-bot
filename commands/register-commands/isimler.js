const Discord = require("discord.js");
const db = require("quick.db");
const kdb = new db.table("kullanici");
const ayar = require("../../data/config.json");

exports.run = async (client, message, args) => {
  const uye11 = new Discord.MessageEmbed().setAuthor(
    message.author.tag,
    message.author.displayAvatarURL()
  ).setDescription(`
Kullanıcıyı kayıt etmem için öncelikle **etiketlemen** gerek.

Örnek: \`${ayar.settings.prefix}isimler @biaxe\`
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

  let data = kdb.get(`isimler.${member.id}`) || [
    "Botun veri tabanında kullanıcıya ait isim bulamadım.",
  ];

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
${member} bu kullanıcı daha önce şu isimlerde kayıt olmuş;

${listedData.join("\n")}
`);

  message.channel.send(embed).then((x) => x.delete({ timeout: 30000 }));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["isimler", "isimler", "nicks", "nickler"],
  permLevel: 0,
};

exports.help = {
  name: "isimler",
};
