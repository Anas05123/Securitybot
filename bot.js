const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "$";

client.on('ready',  () => {
  console.log('ImReady');
});

client.on('message', message => { 
        var prefix = '$'; 
	var command = message.content.split(" ")[0];
	if(command == prefix + 'bc') { 
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don`t have **MANAGE_MESSAGES** permission!");
		var args = message.content.split(' ').slice(1).join(' ');
		if(message.author.bot) return;
		if(!args) return message.channel.send(`**➥ Useage:** ${prefix}bc كلامك`);
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don`t have **MANAGE_MESSAGES** permission!");
		
		let bcSure = new Discord.RichEmbed()
		.setTitle(`:mailbox_with_mail: **هل انت متأكد انك تريد ارسال رسالتك الى** ${message.guild.memberCount} **عضو**`)
		.setThumbnail(client.user.avatarURL)
		.setColor('RANDOM')
		.setDescription(`**\n:envelope: ➥ رسالتك**\n\n${args}`)
		.setTimestamp()
		.setFooter(message.author.tag, message.author.avatarURL)
		
		message.channel.send(bcSure).then(msg => {
			msg.react('✅').then(() => msg.react('❎'));
			message.delete();
			
			
			let yesEmoji = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
			let noEmoji = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
			
			let sendBC = msg.createReactionCollector(yesEmoji);
			let dontSendBC = msg.createReactionCollector(noEmoji);
			
			sendBC.on('collect', r => {
				        message.guild.members.forEach(m => {
   if(!message.member.hasPermission('ADMINISTRATOR')) return;
            var bc = new Discord.RichEmbed()
            .addField('» السيرفر :', `${message.guild.name}`)
            .addField('» المرسل : ', `${message.author.username}#${message.author.discriminator}`)
            .addField(' » الرسالة : ', args)
            .setColor('#ff0000')
            // m.send(`[${m}]`);
            m.send(`${m}`,{embed: bc});
        });
				message.channel.send(`:timer: **يتم الان الارسال الى** \`\`${message.guild.memberCount}\`\` **عضو**`).then(msg => msg.delete(5000));
				msg.delete();
			})
			dontSendBC.on('collect', r => {
				msg.delete();
				message.reply(':white_check_mark: **تم الغاء ارسال رسالتك بنجاح**').then(msg => msg.delete(5000));

		
			});
		})
	}
});

client.on("message", (message) => {
    if (message.author.bot) return;
    if (!prefix) {
        var prefix = "$";
    }
    if (!message.content.startsWith(prefix)) return;
    var args = message.content.split(" ")
    var command = args[0].slice(prefix.length);
    switch (command) {
        case "set-voice":
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            message.reply("** أنت لا تملك صلاحية للإتمام ** | ❌");
            return {};
        }
        if (message.guild.channels.find(channel => channel.name.includes("sweetie online:"))) {
            message.reply("** There is a sweetie online ** | ❌");
            return {};
        }
        message.guild.createChannel(`sweetie online: [${message.guild.members.filter(member => member.voiceChannel).size}]`, "voice").then(channel => {
            channel.setPosition(1);
            channel.overwritePermissions(message.guild.id, {
                CONNECT: false
            });
            data[channel.id] = true;
        });
        message.channel.send("** Done **");
        break;
    }
})
.on("ready", () => {
    client.guilds.forEach(guild => {
        var channel = guild.channels.find(channel => channel.name.includes("sweetie online:"))
        if (channel) {
            data[channel.id] = true;
        }
    })
})
.on("voiceStateUpdate", (oldMember, newMember) => {
    newMember.guild.channels.forEach(channel => {
        if (data[channel.id]) {
            channel.edit({
                name: `sweetie online: [${channel.guild.members.filter(member => member.voiceChannel).size}]`
            });
        }
    });
})

client.login("NTYwMzQ4MDEwODgyNjYyNDA1.D30OyA.BDNLTG4fwpZRwRMSxx53QZIxnoE");
