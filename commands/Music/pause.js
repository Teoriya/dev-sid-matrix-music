const {
	MessageEmbed,
	Message,
    CommandInteractionOptionResolver
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
	name: "pause", //the command name for the Slash Command

	category: "Music",
	aliases: ["pause", "resume"],
	usage: "play",

	description: "Pause / Resume", //the command description for Slash Command Overview
	cooldown: 2,
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	run: async (client, message, args) => {
		try {
			//console.log(interaction, StringOption)

			//things u can directly access in an interaction!
			const {
				member,
				channelId,
				guildId,
				applicationId,
				commandName,
				deferred,
				replied,
				ephemeral,
				options,
				id,
				createdTimestamp
			} = message;
			const {
				guild
			} = member;
			const {
				channel
			} = member.voice;
			if (!channel) return message.reply({
				embeds: [
					new MessageEmbed().setColor(ee.wrongcolor).setTitle(`${client.allEmojis.x} **Please join ${guild.me.voice.channel ? "__my__" : "a"} VoiceChannel First!**`)
				],
			})
			if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id != channel.id) {
				return message.reply({
					embeds: [new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`${client.allEmojis.x} I am connected somewhere else.`)
					],
				});
			}


			let newQueue = client.distube.getQueue(guildId);
			if (newQueue.paused && message.content.includes("resume")) {
				newQueue.resume();
				message.reply({
				  embeds: [new MessageEmbed()
					.setColor(ee.color)
					.setTimestamp()
					.setTitle(`▶️ **Resumed!**`)
					.setFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
					  dynamic: true
					}))
				  ]
				})
			  } else {
				//pause the player
				await newQueue.pause();
	
				message.reply({
				  embeds: [new MessageEmbed()
					.setColor(ee.color)
					.setTimestamp()
					.setTitle(`⏸ **Paused!**`)
					.setFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
					  dynamic: true
					}))
				  ]
				})
			  }

			
		} catch (e) {
			console.log(String(e.stack).bgRed)
		}
	}
}

