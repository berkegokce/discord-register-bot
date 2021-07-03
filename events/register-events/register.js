const ayar = require("../../data/config.json");
const { client } = require("../../index.js");
const moment = require("moment");

client.on("guildMemberAdd", (member) => {
  member.setNickname(`İsim | Yaş`);
  const kanal = member.guild.channels.cache.find(
    (r) => r.id === ayar.settings.kayitkanal
  );
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
  const kurulus = new Date().getTime() - user.createdAt.getTime();

  var takizaman;
  if (kurulus < 1209600000) {
    member.roles.add(ayar.settings.karantinaROL);
    member.roles.add(ayar.settings.karantinaROL);
    member.roles.remove(ayar.settings.kayitsizROL);
    member.roles.remove(ayar.settings.kayitsizROL);
    takizaman = "tarihinde oluşturulmuş, hesabın **şüpheli** gözüküyor.";
  } else {
    member.roles.add(ayar.settings.kayitsizROL);
    member.roles.add(ayar.settings.kayitsizROL);
    takizaman = "tarihinde oluşturulmuş, hesabın **güvenilir** gözüküyor.";
  }
  moment.locale("tr");
  kanal.send(`
  :tada: Sunucumuza Hoş Geldin! ${member}!
  
     Hesabın \`${moment(member.user.createdAt).format(
       "DD MMMM YYYY HH:mm"
     )}\` ${takizaman}
  
     Sunucu kurallarımız <#${
       ayar.settings.ruleskanal
     }> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayılıp gerçekleşecektir.
  
  Seninle beraber **${
    member.guild.memberCount
  }** kişiyiz! Kayıt olmak için \`V.Confirmation\` ses kanallarına geçip ses vermeniz gerekmekte.
  `);
});
