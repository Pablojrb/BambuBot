console.log('Beep Beep! π€ πΌ π ');

require('dotenv').config();

const fetch = require('node-fetch');
const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.BOTTOKEN);

//"http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5"

client.on('ready', readyDiscord);

function readyDiscord() {
    console.log(`Im online  πΌ π `);
}

const replies = [
    'Beep Beep! hi there! πΌ π',
    'Hi im a pandabot, be cool! πΌ π',
    'I am a bot, that only lives for Bambu! πΌ',
    'Soy bilingΓΌe! π€©',
    'Soy un panda, pero me gustan las π !',
    'Hello!',
    'Hi',
    'π',
    'Quiero ser libre! πΌ',
    'ππ  πΌ  ππ me encanta el bambu ΒΏlo sabias?',
    'βοΈ',
    'bambu!',
    'πΌ hola'
]

client.on('message', gotMessage);

async function gotMessage(msg) {
    try{
        if (msg.author.bot) return;
        if (msg.channel.id == (process.env.CHANNELIDTEST)) {
            let token = msg.content.split(/\s+/);
            if (token[0] === '!bambu') {
                const index = Math.floor(Math.random() * replies.length);
                msg.channel.send(`${replies[index]}, ${msg.author}`);
            } else if (token[0] == '!gif') {
                let Keywords = 'panda';
                if (token.length > 1) {
                    // !gif cute cat
                    // [!gif,cute,cat].slice
                    // [cute,cat].join
                    // cute" "cat
                    Keywords = token.slice(1, token.length).join(" ");
                }
                
                let url = `http://api.giphy.com/v1/gifs/search?q=${Keywords}&api_key=${process.env.GIPHYKEY}&rating=g`;
                let response = await fetch(url);
                let json = await response.json();

                const index = Math.floor(Math.random() * json.data.length);

                msg.reply(`just look for "${Keywords}" GIFS - πΌ`);
                msg.channel.send(json.data[index].url);
                msg.channel.send("Powered By GIPHY π ");
                
            } 
        }
    } catch (err) {
        msg.channel.send("try another keyword  πΌ");
        console.error(err);
        
        
    }
      

}