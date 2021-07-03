const config = require("../../data/config.json");
const util = require("util");

exports.run = async (client, message, args) => {
  if (message.author.id !== config.bot.admin) return;
  if (!args[0])
    return message.channel.send("Kod ?").then(x => x.delete({ timeout: 5000 }));

  try {
    let code = eval(args.join(" "));
    if (typeof code !== "string") code = util.inspect(code, { depth: 0 });
    message.channel.send(`\`\`\`js\n${code}\n\`\`\``);
  } catch (e) {
    message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ev"],
};

exports.help = {
  name: "eval",
};
