 
/* Discord API Information */
const Discord = require('discord.js');
const token = "NjkyNTU4NDEwNjA4MDE3NDEw.XnwSHQ.AiQ09OXM3VMFK8BNx9PK6i-m6LE";
//const Game = require('./game.js');
const client = new Discord.Client();

let playersName = []; // tracks each chara in the game
let name = "";
let userJoined = false; 
let inBattle = false; 
let session_id;
let currentUser;
const prefix = 'pp!';
let args = [];
let command = '';
var maxCapacity = 20;

/* User sends message */
client.on('message', (msg) => {
    //making sure prefixis right
    if (!msg.content.startsWith(prefix) || msg.author.bot) {
        return;
    } else {
        //if it's correct, get the command (ex. 'str' and user inputs)
        args = msg.content.slice(prefix.length).split(' ');
        command = args.shift().toLowerCase();
    }

    //create chara command
    if (command === 'create' && command !== 'display') {
        if (!args.length) {
            msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
        } else {
            for(var d = 0; d < playersName.length; d++){
                if (playersName[d].playerName === msg.author.username) {
                    for (var i = 0; i < args.length; i++) {
                        name = args.join(' ');
                    }
                }
            }
            msg.channel.send(`success!`);
            playersName.push({
                "playerName": msg.author.username,
                "charaName": args.join(' '),
                "health": 0,
                "strength": 0,
                "wisdom" : 0,
                "intelligence": 0,
                "charisma": 0,
                "agility": 0,
                "inventory": []
            });  
        }
    }
    //change stats manually
    if (command === 'str'||command ==='wis'||command ==='agi'||command ==='cha'||
        command ==='intel'||command === 'hp' && command !== 'display') {
        if (!args.length) {
            msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
        } else {
            if (isNaN(args[1])) {
                msg.channel.send(`no number, try again, ${msg.author}!`);
            } else {
                for(var d = 0; d < playersName.length; d++){
                    if (playersName[d].playerName === msg.author.username && playersName[d].charaName === args[0]
                        && command === 'str') {
                        playersName[d].strength = args[1];
                        msg.channel.send(`changed strength!`);
                    } else if (playersName[d].playerName === msg.author.username && playersName[d].charaName === args[0] 
                        && command === 'wis'){
                        playersName[d].wisdom = args[1];
                        msg.channel.send(`changed wisdom!`);
                    } else if (playersName[d].playerName === msg.author.username && playersName[d].charaName === args[0]
                        && command === 'agi'){
                        playersName[d].agility = args[1];
                        msg.channel.send(`changed agility!`);
                    } else if (playersName[d].playerName === msg.author.username && playersName[d].charaName === args[0]
                        && command === 'cha'){
                        playersName[d].charisma = args[1];
                        msg.channel.send(`changed charisma!`);
                    } else if (playersName[d].playerName === msg.author.username && playersName[d].charaName === args[0]
                        && command === 'intel'){
                        playersName[d].intelligence = args[1];
                        msg.channel.send(`changed intelligence!`);
                    } else if (playersName[d].playerName === msg.author.username && playersName[d].charaName === args[0]
                        && command === 'hp'){
                        playersName[d].health = args[1];
                        msg.channel.send(`changed hp!`);
                    }
                }
            }
        }
    }

    //remove a chara by name
    if (command === 'remove') {
        if (!args.length) {
            msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
        } else {
            for(var d = 0; d < playersName.length; d++){
                    if (playersName[d].playerName === msg.author.username && playersName[d].charaName === args[0]) {
                        playersName.splice(d, 1);
                        msg.channel.send(`removed chara!`);
                    }
                }
            }
        }
             
    //change name of current chara
    if (command === 'name') {
        if (!args.length) {
            msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
        } else {
            for(var d = 0; d < playersName.length; d++){
                if (playersName[d].playerName === msg.author.username && playersName[d].charaName === args[0]) {
                    var newName = [args.length];
                    for (var i = 1; i < args.length; i++) {
                        newName[i-1] = args[i];
                    }
                    playersName[d].charaName = newName.join(' ');
                    msg.channel.send(`changed name!`);
                }
            }
             
        }
    }

    //display all charas
    if (command === 'display') {
            for(var d = 0; d < playersName.length; d++){
                if (playersName[d].playerName === msg.author.username) {
                        msg.channel.send(`Your stats are: \n
                    Name: ${playersName[d].charaName}\n
                    HP: ${playersName[d].health}\n
                    Strength: ${playersName[d].strength}\n
                    Wisdom: ${playersName[d].wisdom}\n
                    Agility: ${playersName[d].agility}\n
                    Charisma: ${playersName[d].charisma}\n
                    Intelligence: ${playersName[d].intelligence}\n
                    Inventory: ${playersName[d].inventory}`);
                    
                }
            }       
        }

    //add to chara inventory (current chara)
    if (command === 'additem') {
        if (!args.length) {
            msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
        } else {
            for(var d = 0; d < playersName.length; d++){
                if (playersName[d].playerName === msg.author.username && args[0] == playersName[d].charaName) {
                    var playerInventory = playersName[d].inventory;
                    for (var m = 1; m < args.length; m++) {
                        if (playerInventory.length >= maxCapacity) {
                            msg.channel.send(`Hit max capacity!`); 
                        } else {
                            playerInventory.push(args[m]);
                        }
                    }
                    msg.channel.send(`added item(s)!`); 
                }
            }       
        
        }
    }
});

//let programmer know bot has started
client.on('ready', () => {
    console.log('Bot is now connected');
});

client.login(token);