const Botkit = require('botkit');

if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

const controller = Botkit.slackbot({
    debug: false
});

controller.spawn({
    token: process.env.token
}).startRTM(function(err){
    if (err) {
        throw new Error(err);
    }
});

// say hi
controller.hears('やあ',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
    bot.reply(message,'なんだよ');
});

controller.hears('疲れた',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
    bot.reply(message,'このひまわりの種でも食べる？');
});