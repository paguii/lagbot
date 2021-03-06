var Discord = require('discord.io');
var logger = require('winston');
//var auth = require('./data/auth/discord-auth.json');

var serverID = "325181137829756928";

// Roles
var roleAdmin = "458825119314477076";
var roleModLagger = "458827437527269387";
var roleLagadinhos = "458826173817028613";

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: process.env.DISCORD_AUTH,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info(bot.username + ' - (' + bot.id + ')');

});

bot.on('any', function (evt) {
    logger.info(evt);
});

// ADICIONA A ROLE LAGADINHOS QUANDO NOVO USUÁRIO
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
            default:
                bot.sendMessage({
                    to: channelID,
                    message: "Comando não reconhecido."
                });
        }
    }
});