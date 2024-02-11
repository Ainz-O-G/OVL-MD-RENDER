const { bot,/* repondre, image, video, nomAuteurMessage,*/ mybotpic } = require('../fonctions');
    
    //const conf = require('../set');
const commands = { 
    "Général": ["Info", "Menu", "Dev"],
    "NEOverse": ["North1", "North2", "North3", "East1", "East2", "East3", "West1", "West2", "West3", "Central1", "Central2", "Central3", "Fa1", "Fa2", "Dt1", "Dt2", "Zt1", "Zt2", "Nm1", "Nm2", "Uf1", "Uf2", "Nba1", "Nba2"]
};
bot.onText(/*new RegExp(`${conf.PREFIXE}menu`)*//\/menu/, (msg) => {
        const chatId = msg.chat.id;
        const nomAuteurMessage = msg.pushName;
        let infomsg = `╔═════ •✧✧• ════╗
┃   Préfixe : /
┃   Owner : Fatao
┃   Commandes  : ${Object.keys(commands).length}
┃   Développeurs : FATAO & WHITE KÏNGS
╚═════ •✧✧• ════╝

👋 salut ${nomAuteurMessage} 👋
Je suis NEOverse-Md, un bot développé par la Ns.

Voici la liste de mes commandes :\n`;

        for (const cat in commands) {
            infomsg += `*╔══✵* *${cat}*  *✵ ══╗*`;
            for (const cmd of commands[cat]) {
                infomsg += `
*✗✪* ${cmd}`;
            }
            infomsg += `╚════ ✵ ✵ ═══╝\n`;
        }

        const lien = mybotpic();

        if (lien.match(/\.(mp4|gif)$/i)) {
            try {
                bot.sendVideo(chatId, lien, { caption: infomsg});
            } catch (e) {
                console.log("🥵🥵 Menu erreur " + e);
                bot.sendMessage(chatId, "🥵🥵 Menu erreur " + e);
            }
        }
        // Vérification pour .jpeg ou .png
        else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
            try {
               bot.sendPhoto(chatId, lien, { caption: infomsg });
            } catch (e) {
                console.log("🥵🥵 Menu erreur " + e);
                bot.sendMessage(chatId, "🥵🥵 Menu erreur " + e);
            }
        }
    });
