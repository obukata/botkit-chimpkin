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
controller.hears('チンプキン',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
    bot.reply(message,'何か呼んだ？:chipmunk:');
});

controller.hears('疲れた',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
    bot.reply(message,'ひまわりの種でも食べる？');
});

controller.hears('お腹すいた',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
    bot.reply(message,'食べる？これ。');
});

controller.hears('柏',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
    bot.reply(message,'田舎の事？:thinking_face:');
});

controller.hears('頑張って',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
    bot.reply(message,'頑張るよー！:smiley:');
});

controller.hears('車運転',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
    bot.reply(message,'気をつけてね:slightly_smiling_face:');
});

controller.hears('到着',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
    bot.reply(message,'いえーい');
});
