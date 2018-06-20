var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./data/discord-auth.json');

var serverID = "325181137829756928";

// Roles
var roleAdmin = "325182644516290561";
var roleModLagger = "325182958279327745";
var roleLagadinhos = "407632962289532938";

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info(bot.username + ' - (' + bot.id + ')');    
});

bot.on('any', function (evt) {
    logger.info(evt);    
});

bot.on('guildMemberAdd', function(member){    
    bot.addToRole({serverID: serverID, userID: member.id, roleID: roleLagadinhos}, function(err, response) {
        if (err){
            logger.error(err);
        }else{
            logger.info(response);
        }
    });
});

bot.on('message', function (user, userID, channelID, message, event) {
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd){            
            case 'comando':
                bot.sendMessage({
                    to: channelID,
                    message: "Você executou o seguinte comando: " + cmd
                });
                break; 

            case 'event':
                bot.sendMessage({
                    to: channelID,
                    message: "Você executou o seguinte comando: "
                });
                break; 

            default:
                bot.sendMessage({
                    to: channelID,
                    message: "Comando não reconhecido."
                });                
        }
    }
});