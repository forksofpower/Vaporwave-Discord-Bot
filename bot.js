const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config.js");

client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
});

client.on("message", async message => {
    // This event will run on every single message received, from any channel or DM.

    // Ignore other bots and avoid "botception"
    if(message.author.bot) return;

    // Ignore messages that do not start with bot prefix
    if (message.content.indexOf(config.prefix) !== 0) return;

    // separate command and args
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "vape") {
        // Get message by joining args
        const messageText = args.join(" ");
        const style = Math.floor((Math.random() * 3) + 1);
        const vaporMessage = translate(messageText, style);

        console.log(`Translated "${messageText}" to "${vaporMessage}" `);
        // delete the command message
        message.delete().catch(_=>{});
        // send
        message.channel.send(vaporMessage);

    }
});

function translate(text, style) {
    const wideText = {" ":"　", "`" : "`","1" : "１","2" : "２","3" : "３","4" : "４","5" : "５","6" : "６","7" : "７","8" : "８","9" : "９","0" : "０","-" : "－","=" : "＝","~" : "~","!" : "！","@" : "＠","#" : "＃","$" : "＄","%" : "％","^" : "^","&" : "＆","*" : "＊","(" : "（",")" : "）","_" : "_","+" : "＋","q" : "ｑ","w" : "ｗ","e" : "ｅ","r" : "ｒ","t" : "ｔ","y" : "ｙ","u" : "ｕ","i" : "ｉ","o" : "ｏ","p" : "ｐ","[" : "[","]" : "]","\\" : "\\","Q" : "Ｑ","W" : "Ｗ","E" : "Ｅ","R" : "Ｒ","T" : "Ｔ","Y" : "Ｙ","U" : "Ｕ","I" : "Ｉ","O" : "Ｏ","P" : "Ｐ","{" : "{","}" : "}","|" : "|","a" : "ａ","s" : "ｓ","d" : "ｄ","f" : "ｆ","g" : "ｇ","h" : "ｈ","j" : "ｊ","k" : "ｋ","l" : "ｌ",";" : "；","'" : "＇","A" : "Ａ","S" : "Ｓ","D" : "Ｄ","F" : "Ｆ","G" : "Ｇ","H" : "Ｈ","J" : "Ｊ","K" : "Ｋ","L" : "Ｌ",":" : "：","\"" : "\"","z" : "ｚ","x" : "ｘ","c" : "ｃ","v" : "ｖ","b" : "ｂ","n" : "ｎ","m" : "ｍ","," : "，","." : "．","/" : "／","Z" : "Ｚ","X" : "Ｘ","C" : "Ｃ","V" : "Ｖ","B" : "Ｂ","N" : "Ｎ","M" : "Ｍ","<" : "<",">" : ">","?" : "？"};
    let charArray = text.split("");

    // replace text with wide text characters
    for(let i = 0; i < charArray.length; i++) {
        if( wideText[charArray[i].toLowerCase()] ) {
            charArray[i] = wideText[charArray[i]];
        }
    }
    let numSpaces = text.split(" ").length;
    text = charArray.join("");

    // generate faux asian text
    let asianChars = getAsianChars(Math.max(3,numSpaces));
    if (numSpaces > 6) asianChars = asianChars.split("").map(c => c+["","　"][Math.round(Math.random()*0.6)]).join("");

    switch (style) {
        case 1:
            return text + "　" + asianChars;
        case 2:
            return text.replace(/　/g, "░").replace(/ａｅ/, "æ").replace(/Ａ/g, "Λ").replace(/Ｅ/g, function () {
                return Math.random() > 0.5 ? "Ξ" : "Σ";
            }).replace(/Ｏ/g, "♢") + "　（" + asianChars + "）";
        case 3:
            return "【﻿" + text + "】";
        default:
            break;
    }
}

function getAsianChars(n) {
    if(!n) n = 1;
    var chars = "リサフランク現代のコンピュ竹内 まりや若者が履く流行のスニーカー真夜中のドアホットドッグマスターストライカーソニーブギ新しい日の誕生ライフ - ヒスイ蒸気波 無線゠ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶヷヸヹヺ・ーヽヾヿぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんゔゕゖ゙゚゛゜ゝゞゟ亜哀挨愛曖悪握圧扱宛嵐安案暗以衣位囲医依委威為畏胃尉異移萎偉椅彙意違維慰遺緯域育壱逸茨芋引印因咽姻員院淫陰飲隠韻右宇羽雨唄鬱畝浦運雲永泳英映栄営詠影鋭衛易疫益液駅悦越謁閲円延沿炎怨宴媛援園煙猿遠鉛塩演縁艶汚王凹央応往押旺欧殴桜翁奥横岡屋億憶臆虞乙俺卸音恩温穏下化火加可仮何花佳価果河苛科";
    var str = "";
    for(var i = 0; i < n; i++) {
        str += chars[Math.floor(Math.random()*chars.length)];
    }
    return str;
}

client.login(config.token);