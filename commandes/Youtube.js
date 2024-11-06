const { ovlcmd } = require("../framework/ovlcmd"); 
const axios = require("axios");

ovlcmd(
    {
        nom_cmd: "song",
        classe: "Téléchargement",
        react: "🎵",
        desc: "Télécharge une chanson depuis YouTube avec un terme de recherche",
        alias: ["aud"],
    },
    async (ms_org, ovl, cmd_options) => {
        const { repondre, arg, ms } = cmd_options;
        try {
            const query = arg.join(" ");
            if (!query) {
                return await ovl.sendMessage(ms_org, { text: "Veuillez spécifier un titre de chanson." });
            }

            // Recherche de la chanson
            const searchResponse = await axios.get(`https://api.giftedtech.my.id/api/search/yts?apikey=gifted&query=${query}`);
            const song = searchResponse.data.result[0];  // Prend le premier résultat de la recherche

            if (!song) {
                return await ovl.sendMessage(ms_org, { text: "Aucun résultat trouvé pour cette recherche." });
            }

            const name = song.title;
            const url = song.url;
            const duration = song.duration.timestamp;
            const lien = song.thumbnail;

            const caption = `╭──── 〔 OVL-MD SONG 〕 ─⬣
⬡ Titre: ${name}
⬡ Durée: ${duration}
⬡ Lien: ${url}
╰────────⬣`;

            // Envoie l'image avec la description
            await ovl.sendMessage(ms_org, {
                image: { url: lien },
                caption: caption,
            });

            // Téléchargement de l'audio
            const downloadResponse = await axios.get(`https://api.giftedtech.my.id/api/download/ytaudio?apikey=gifted&url=${url}`);
            const link = downloadResponse.data.result.download_url;

            if (link) {
                const doc = {
                    audio: { url: link },
                    mimetype: 'audio/mp4',
                    fileName: `${name}.mp3`,
                };

                await ovl.sendMessage(ms_org, doc, { quoted: ms });
            } else {
                await ovl.sendMessage(ms_org, { text: "Aucun lien audio trouvé." });
            }
        } catch (error) {
            console.error("Erreur lors du téléchargement de la chanson :", error.message || error);
            await ovl.sendMessage(ms_org, { text: "Erreur lors du téléchargement de la chanson." });
        }
    }
);

/*ovlcmd(
    {
        nom_cmd: "video",
        classe: "Téléchargement",
        react: "🎥",
        desc: "Télécharge une vidéo depuis YouTube avec un terme de recherche",
        alias: ["vid"],
    },
    async (ms_org, ovl, cmd_options) => {
        const { repondre, arg, ms } = cmd_options;
        try {
            const query = arg.join(" ");
            if (!query) {
                return await ovl.sendMessage(ms_org, { text: "Veuillez spécifier un titre de vidéo." });
            }

            const searchResults = await ytsr(query, { limit: 1 });
            const video = searchResults.items[0];

            if (!video || !video.url) {
                return await ovl.sendMessage(ms_org, { text: "Aucun résultat trouvé pour la recherche." });
            }

            const name = video.name;
            const url = video.url;
            const duration = video.duration;
            const lien = video.thumbnail;
            const caption = `╭──── 〔 OVL-MD VIDEO 〕 ─⬣
⬡ Titre: ${name}
⬡ Durée: ${duration}
⬡ Lien: ${url}
╰────────⬣`;

            await ovl.sendMessage(ms_org, {
                image: { url: lien },
                caption: caption,
            });

            const yt = await youtubedl(url);
            const link = await yt.resultUrl.video[0].download();
            let doc = {
                video: { url: link },
                mimetype: 'video/mp4',
                fileName: `${name}.mp4`,
            };
            ovl.sendMessage(ms_org, doc, { quoted: ms });
        } catch (error) {
            console.error("Erreur lors du téléchargement de la vidéo :", error.message || error);
            await ovl.sendMessage(ms_org, { text: "Erreur lors du téléchargement de la vidéo." });
        }
    }
);

ovlcmd(
    {
        nom_cmd: "yt_mp4",
        classe: "Téléchargement",
        react: "📹",
        desc: "Télécharger une vidéo depuis YouTube avec un lien",
        alias: ["vid_dl", "yt_vid"],
    },
    async (ms_org, ovl, cmd_options) => {
        const { repondre, arg, ms } = cmd_options;
        try {
            const url = arg[0];
            const yt = await youtubedl(url);
            if (!yt) {
                return await ovl.sendMessage(ms_org, { text: "Lien YouTube invalide." });
            }
            const caption = `╭──── 〔 OVL-MD VIDEO 〕 ─⬣
⬡ Titre: ${yt.result.title}
⬡ Durée: ${yt.result.duration}
⬡ Lien: ${url}
╰────────⬣`;

            await ovl.sendMessage(ms_org, {
                image: { url: yt.result.thumbnail },
                caption: caption,
            });

            const link = await yt.resultUrl.video[0].download();
            let doc = {
                video: { url: link },
                mimetype: 'video/mp4',
                fileName: `${yt.result.title}.mp4`,
            };
            ovl.sendMessage(ms_org, doc, { quoted: ms });
        } catch (error) {
            console.error("Erreur lors du téléchargement de la vidéo :", error.message || error);
            await ovl.sendMessage(ms_org, { text: "Erreur lors du téléchargement de la vidéo." });
        }
    }
);

ovlcmd(
    {
        nom_cmd: "yt_mp3",
        classe: "Téléchargement",
        react: "🎶",
        desc: "Télécharger une chanson depuis YouTube avec un lien",
        alias: ["song_dl", "yt_song"],
    },
    async (ms_org, ovl, cmd_options) => {
        const { repondre, arg, ms } = cmd_options;
        try {
            const url = arg[0];
            const yt = await youtubedl(url);
            if (!yt) {
                return await ovl.sendMessage(ms_org, { text: "Lien YouTube invalide." });
            }
            const caption = `╭──── 〔 OVL-MD SONG 〕 ─⬣
⬡ Titre: ${yt.result.title}
⬡ Durée: ${yt.result.duration}
⬡ Lien: ${url}
╰────────⬣`;

            await ovl.sendMessage(ms_org, {
                image: { url: yt.result.thumbnail },
                caption: caption,
            });

            const link = await yt.resultUrl.audio[0].download();
            let doc = {
                audio: { url: link },
                mimetype: 'audio/mp4',
                fileName: `${yt.result.title}.mp3`,
            };
            ovl.sendMessage(ms_org, doc, { quoted: ms });
        } catch (error) {
            console.error("Erreur lors du téléchargement de la chanson :", error.message || error);
            await ovl.sendMessage(ms_org, { text: "Erreur lors du téléchargement de la chanson." });
        }
    }
);*/
