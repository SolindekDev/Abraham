const Discord = require('discord.js');
const Voice = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const yt_sr = require('youtube-sr').default;
const search = require('youtube-search')

const Command = require("../../Structures/command")

const { MessageEmbed } = require("discord.js")

module.exports = new Command({
    name: "play",
    description: "Play",
    category: "Music",
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.reply('You need to be in a voice channel.');

        let queue = client.queue.get(message.guild.id);
    
        if (ytdl.validateURL(args[0])) {
            const data = ytdl.getInfo(args[0], { lang: 'en' }).then(async (info) => {
                // Getting Info
                message.channel.send("```Searching...```").then(async (m) => {
                    const stream = await ytdl(args[0], { highWaterMark: 1 << 25, quality: 'highestaudio', type: 'opus', filter: 'audioonly' });
                    let rawData = await ytdl.getBasicInfo(args[0], { 'lang': 'en' });
                    rawData = {
                        url: args[0],
                        title: rawData.videoDetails.title,
                        bestThumbnail: rawData.videoDetails.thumbnails[0],
                    };
            
                    // Joining
                    const channel = message.guild.channels.cache.get(message.member.voice.channel.id);
                    let connection = Voice.getVoiceConnection(message.guild.id);
                    if (!connection) {
                        connection = Voice.joinVoiceChannel({
                            'adapterCreator': message.guild.voiceAdapterCreator,
                            'channelId': channel.id,
                            'guildId': message.guild.id,
                            'selfDeaf': true,
                        });
                    }
            
                    // Playing
                    const player = Voice.createAudioPlayer();
                    const resource = Voice.createAudioResource(stream);

                    m.edit({
                        content: `\`\`\`Playing music..\n\nTitle: ${info.player_response.videoDetails.title}\nViews: ${info.player_response.videoDetails.viewCount}\nAuthor: ${info.player_response.videoDetails.author}\nLength seconds: ${info.player_response.videoDetails.lengthSeconds}\`\`\``,
                        files: [{
                            attachment: info.player_response.videoDetails.thumbnail.thumbnails[info.player_response.videoDetails.thumbnail.thumbnails.length-1].url,
                            name: 'thumbnail.png'
                        }],
                    })
    
                    player.play(resource);
            
                    // Queue system
                    const basequeue = {
                        id: message.guild.id,
                        startedAt: Date.now(),
                        voiceChannel: channel,
                        textChannel: message.channel,
                        player: player,
                        connection: connection,
                        songs: [],
                        playing: true,
                    };
                    if (!queue) {
                        queue = basequeue;
                        client.queue.set(message.guild.id, basequeue);
                    }
            
                    if (queue.songs.length === 0) {
                        queue.songs.push(rawData);
                        connection.subscribe(player);
                        player.on(Voice.AudioPlayerStatus.Idle, async () => {
                            const newqueue = client.queue.get(message.guild.id);
                            const removed = newqueue.songs.shift();
            
                            if (!newqueue.songs.length) {
                                newqueue.textChannel.send('The queue has ended!');
                                newqueue.connection.destroy();
                                player.stop();
                                newqueue.playing = false;
                            }
                            else {
                                if (!removed) return;
                                newqueue.textChannel.send({ allowedMentions: { roles: [], parse: [], users: [] }, content: `The song \`${removed.title}\` has ended! Next up \`${newqueue.songs[0].title}\`` });
                                const newresource = Voice.createAudioResource(await ytdl(newqueue.songs[0].url, { highWaterMark: 1 << 25, quality: 'highestaudio', type: 'opus', filter: 'audioonly' }));
                                player.play(newresource);
                            }
                        });
                    }
                    else {
                        queue.songs.push(rawData);
                        player.stop();
                    }
                })
            })
        }
        else {
            message.channel.send({ content: "```Searching...```" }).then(async (m) => {
                // Searching
                const info = await yt_sr.search(args.join(' '), { 'limit': 4, 'type': 'video' })

                const search = args.join(' ');
                if (!search || !search.length) return message.reply('Provide a query');
                const res = await yt_sr.search(search, { 'limit': 4, 'type': 'video' });
                const rawData = res[0];
                rawData.url = `https://youtube.com/watch?v=${rawData.id}`;
                if (!rawData) return message.reply('Unable to find that video.');
                const stream = await ytdl(rawData.url, { highWaterMark: 1 << 25, quality: 'highestaudio', type: 'opus', filter: 'audioonly' });
        
                // Joining
                const channel = message.guild.channels.cache.get(message.member.voice.channel.id);
                let connection = Voice.getVoiceConnection(message.guild.id);
                if (!connection) {
                    connection = Voice.joinVoiceChannel({
                        'adapterCreator': message.guild.voiceAdapterCreator,
                        'channelId': channel.id,
                        'guildId': message.guild.id,
                        'selfDeaf': true,
                    });
                }

                // Playing
                const player = Voice.createAudioPlayer();
                const resource = Voice.createAudioResource(stream);

                m.edit({
                    content: `\`\`\`Playing music..\n\nTitle: ${info[0].title}\nViews: ${info[0].views}\nAuthor: ${info[0].channel.name}\nUploaded: ${info[0].uploadedAt}\nLength: ${info[0].durationFormatted}\`\`\``,
                    files: [{
                        attachment: info[0].thumbnail.url,
                        name: 'thumbnail.png'
                    }],
                })

                player.play(resource);
        
                // Queue system
                const basequeue = {
                    id: message.guild.id,
                    startedAt: Date.now(),
                    voiceChannel: channel,
                    textChannel: message.channel,
                    player: player,
                    connection: connection,
                    songs: [],
                    playing: true,
                };
                if (!queue) {
                    queue = basequeue;
                    client.queue.set(message.guild.id, basequeue);
                }
        
                if (queue.songs.length === 0) {
                    queue.songs.push(rawData);
                    connection.subscribe(player);
                    player.on(Voice.AudioPlayerStatus.Idle, async () => {
                        const newqueue = client.queue.get(message.guild.id);
                        const removed = newqueue.songs.shift();
        
                        if (!newqueue.songs.length) {
                            newqueue.textChannel.send('The queue has ended!');
                            newqueue.connection.destroy();
                            player.stop();
                            newqueue.playing = false;
                        }
                        else {
                            if (!removed) return;
                            newqueue.textChannel.send({ allowedMentions: { roles: [], parse: [], users: [] }, content: `The song \`${removed.title}\` has ended! Next up \`${newqueue.songs[0].title}\`` });
                            const newresource = Voice.createAudioResource(await ytdl(newqueue.songs[0].url, { highWaterMark: 1 << 25, quality: 'highestaudio', type: 'opus', filter: 'audioonly' }));
                            player.play(newresource);
                        }
                    });
                }
                else {
                    queue.songs.push(rawData);
                    player.stop();
                }
        
            })
        }
    }
})