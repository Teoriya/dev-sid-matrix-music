const {
    MessageEmbed
} = require("discord.js");
var ee = require("../../botconfig/embed.json");
let cpuStat = require("cpu-stat");
let moment = require("moment")
module.exports = {
    name: "bsl", //the command name for execution & for helpcmd [OPTIONAL]
    category: "Info",
    usage: "botinfo",
    aliases: ["botserverlist"],
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

                        const botinfo = new MessageEmbed()
                            .setTitle("Bot Server List")
                            .setDescription("To be set")

                        let guilds = client.guilds.cache.map((guild) => guild);

                        for (let i = 0; i < guilds.length; i++) {
                            // if (guilds[i]) botinfo.addField(`${guilds[i]}`, `${moment.utc(guilds[1].me.joinedAt).format('D MMMM YYYY HH:mm')}`);
                            if (guilds[i]) botinfo.addField(`${guilds[i]} -> **${guilds[i].id}**`, `${guilds[i].memberCount}`);
                        }

                        message.reply({
                            embeds: [botinfo]
                        });

                    } catch (e) {
                        const botinfo = new MessageEmbed()
                            .setTitle("Bot Server List")
                            .setDescription("To be set")

                        let guilds = client.guilds.cache.map((guild) => guild);

                        for (let i = 0; i < guilds.length; i++) {
                            // if (guilds[i]) botinfo.addField(`${guilds[i]}`, `${moment.utc(guilds[1].me.joinedAt).format('D MMMM YYYY HH:mm')}`);
                            if (guilds[i]) botinfo.addField(`${guilds[i]} -> **${guilds[i].id}**`, `${guilds[i].memberCount}`);
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