console.log('Beep Beep! 🤖 🐼 💚 ');

require ('dotenv').config();

const fetch = require ('node-fetch');
const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.BOTTOKEN);

//"http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5"

client.on('ready', readyDiscord);

function readyDiscord(){
    console.log(`${client.user.tag} Im online  🐼 💚 `);
}

const replies = [
    'Beep Beep! hi there! 🐼 💚',
    'Hi im a pandabot, be cool! 🐼 💚',
    'I am a bot, that only lives for Bambu! 🐼',
    'Soy bilingüe! 🤩',
    'Soy un panda, pero me gustan las 🍔 !',
    'Hello you!',
    'Quiero ser libre! 🐼'
]

client.on('message', gotMessage);

async function gotMessage(msg){
     if (msg.channel.id == (process.env.CHANNELIDTEST)){
        let token = msg.content.split(" ");
        if (token[0] === '!bambu') {
            const index = Math.floor(Math.random() * replies.length);
            msg.channel.send(`${msg.author} ${replies[index]} `);
        } else if (token[0] == '!gif') {
            let Keywords = 'panda';
            if (token.length > 1) {
                // !gif cute cat
                // [!gif,cute,cat].slice
                // [cute,cat].join
                // cute" "cat
                Keywords = token.slice(1,token.length).join (" ");
              
            }
            let url = `http://api.giphy.com/v1/gifs/search?q=${Keywords}&api_key=${process.env.GIPHYKEY}&rating=g`;
            let response = await fetch(url);
            let json = await response.json();
            const index = Math.floor(Math.random() * json.data.length);
            msg.channel.send(`${msg.author} just look for ${Keywords} 🐼`);
            msg.channel.send(json.data[index].url);
            msg.channel.send("Powered By GIPHY 😎 ");
        } 
    }

}