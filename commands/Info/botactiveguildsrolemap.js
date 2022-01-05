const {
    MessageEmbed
} = require("discord.js");
var ee = require("../../botconfig/embed.json");
let cpuStat = require("cpu-stat");
module.exports = {
    name: "bagm", //the command name for execution & for helpcmd [OPTIONAL]
    category: "Info",
    usage: "botinfo",
    aliases: ["botallguildmap"],
    cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
    description: "Shows Information about the Bot", //the command description for helpcmd [OPTIONAL]
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    run: async (client, message, args) => {
        if (message.author.id === "547002950481084426" || message.author.id === "721661681666883614" || message.author.id === "318465045422145536" || message.author.id === "718135262143840285") {

            try {

                cpuStat.usagePercent(function (e, percent, seconds) {
                    try {
                        if (e) return console.log(String(e.stack).red);

                        let connectedchannelsamount = 0;
                        let guilds = client.guilds.cache.map((guild) => guild);
                        for (let i = 0; i < guilds.length; i++) {
                            if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
                        }
                        if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;

                        const botinfo = new MessageEmbed()
                            .setAuthor(client.user.username, client.user.displayAvatarURL())
                            .setTitle("__**Bot Connections Status**__")
                            .setDescription("🔊 Connections", `\`${connectedchannelsamount} Connections\``, true)
                            .setColor(ee.color)

                        for (let i = 0; i < guilds.length; i++) {
                            if (guilds[i].me.voice.channel) botinfo.addField(`${guilds[i]}`, `${guilds[i].me.voice.channel}`);
                        }
                        message.reply({
                            embeds: [botinfo]
                        });

                    } catch (e) {
                        if (e) return console.log(String(e.stack).red);

                        let connectedchannelsamount = 0;
                        let guilds = client.guilds.cache.map((guild) => guild);
                        for (let i = 0; i < guilds.length; i++) {
                            if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
                        }
                        if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;

                        const botinfo = new MessageEmbed()
                            .setAuthor(client.user.username, client.user.displayAvatarURL())
                            .setTitle("__**Bot Connections Status**__")
                            .setDescription("🔊 Connections", `\`${connectedchannelsamount} Connections\``, true)
                            .setColor(ee.color)

                        for (let i = 0; i < guilds.length; i++) {
                            if (guilds[i].me.voice.channel) botinfo.addField(`${guilds[i]}`, `${guilds[i].me.voice.channel}`);
                        }
                        message.reply({
                            embeds: [botinfo]
                        });
                    }
                })

                return;
            } catch (e) {
                console.log(String(e.stack).bgRed)
            }
        }
    }
}
