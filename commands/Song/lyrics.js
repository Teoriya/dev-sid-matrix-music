
const {
	MessageEmbed,
	Message
	} = require("discord.js");
	const config = require(`../../botconfig/config.json`);
	const ee = require("../../botconfig/embed.json");
	const settings = require("../../botconfig/settings.json");
	const {
	lyricsEmbed,
	check_if_dj
	} = require("../../handlers/functions");
	const fetch = require("node-fetch");

	module.exports = {
	name: "lyrics", //the command name for the Slash Command
	category: "Song",
	usage: "lyrics",
	aliases: ["ly", "songtext"],
	description: "Sends the Song Lyrics", //the command description for Slash Command Overview
	cooldown: 25,
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	run: async (client, message, args) => {
		try {
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
						.setTitle(`${client.allEmojis.x} Join __my__ Voice Channel!`)
						.setDescription(`<#${guild.me.voice.channel.id}>`)
					],
				});
			}
			try {
				
				let newQueue = client.distube.getQueue(guildId);
				if (!newQueue || !newQueue.songs || newQueue.songs.length == 0) return message.reply({
					embeds: [
						new MessageEmbed().setColor(ee.wrongcolor).setTitle(`${client.allEmojis.x} **I am nothing Playing right now!**`)
					],
				})
				// let newQueue = client.distube.getQueue(guildId);
				let currentSong = newQueue.songs[0].name
				const data = await fetch(
					`https://some-random-api.ml/lyrics?title=${encodeURIComponent(currentSong)}`
				  ).then((res) => res.json())
				  console.log(currentSong)
				  console.log(`https://some-random-api.ml/lyrics?title=${encodeURIComponent(currentSong)}`)
				  console.log(data)
				  if (!data) return message.channel.send({ content: "Song not found." });
				  const embed = new MessageEmbed()
					.setTitle(`${data.title} - ${data.author}`)
					.setDescription(data.lyrics)
					.setThumbnail(data.thumbnail.genius);
				return message.reply({embeds: [embed]});
			} catch (e) {
				console.log(e.stack ? e.stack : e)
				message.reply({
					content: `${client.allEmojis.x} | Error: `,
					embeds: [
						new MessageEmbed().setColor(ee.wrongcolor)
						.setDescription(`\`\`\`${e}\`\`\``)
					],
				})
			}
		} catch (e) {
			console.log(String(e.stack).bgRed)
		}
	}
	}