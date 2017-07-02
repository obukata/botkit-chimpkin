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

//=========================================================
// chimpkin 会話集
//=========================================================

controller.hears('チンプキン',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	var helloTalk = [
		'はーいー:hand::skin-tone-2:',
		'何か呼んだ？:chipmunk:',
		'私がチンプキンですよー:stuck_out_tongue_closed_eyes:',
	];
	var selectHelloTalk = helloTalk[Math.floor(Math.random() * helloTalk.length)];
	bot.reply(message, selectHelloTalk);
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

controller.hears('おやすみ',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'おやすみー:chipmunk::zzz:');
});

controller.hears('好き',['direct_message','direct_mention','mention'],function(bot,message) {
	bot.reply(message,'Chimpkinもー:heart_eyes:');
});


//=========================================================
// chimpkin家計簿
//=========================================================

// controller.hears(['ラーメン'], 'direct_message,direct_mention,mention,ambient', function (bot, message) {
// 	// 会話を開始します。
// 	bot.startConversation(message, function (err, convo) {
// 		// convo.ask() で質問をします。
// 		convo.ask('ラーメン食べたの？', [{
// 		pattern: 'yes',
// 		callback: function (response, convo) {
// 			// ▼ マッチした時の処理 ▼
// 			convo.say('いくらしたの！');

// 			controller.hears(['(.*)円'], 'direct_message,direct_mention,mention,ambient', function (bot, message) {
// 				var value_ramen = message.match[1];
// 				console.log(value_ramen);
// 			});
// 		},
// 		{
// 			default: true,
// 			callback: function (response, convo) {
// 				// ▼ どのパターンにもマッチしない時の処理 ▼
// 				convo.say('節約だよー');
// 			}
// 		}]);
// 	})
// });

// controller.hears(['ラーメン'], 'direct_message,direct_mention,mention,ambient', function (bot, message) {
// 	bot.reply(message,'ラーメン食べたの！？');
// 	convo.ask('ラーメン食べたの？', [{
// 		pattern: 'yes',
// 		callback: function(response, convo) {
// 			// bot.reply(message,'いくらしたの？');
// 		}
// 	}]);

// });


//=========================================================
// 名前を覚える(データを保存する)
//=========================================================

// Botが、シャットダウン/再起動するまでの間、データを保持する事ができます。
// 保存、取得、削除、すべて削除 の4つの操作ができます。

//  [例]
//    controller.storage.users.save({id: message.user, foo:'bar'}, function(err) { ... });
//    controller.storage.users.get(id, function(err, user_data) {...});
//    controller.storage.users.delete(id, function(err) {...});
//    controller.storage.users.all(function(err, all_user_data) {...});


// Botkitは、「ユーザー」「チャンネル」「チーム」ごとにデータを保持できます。
// それぞれ、下記のように呼び出せます。

//  [例]
//    controller.storage.users.***
//    controller.storage.channels.***
//    controller.storage.teams.***


// controller.hears(['ラーメン食べた'], 'direct_message,direct_mention,mention','ambient' function (bot, message) {
//     // 「◯◯って呼んで」の、◯◯の部分を取り出します。
//     // message.match[1] には、hearsの正規表現にマッチした単語が入っています。

//     var name_from_msg = message.match[1];


//     // まず、controller.storage.users.getで、ユーザーデータを取得します。

//     // message.userには、ユーザーIDが入っています。
//     // ユーザーデータは、ユーザーIDと紐付けていますので、第一引数には、必ずmessage.userを入れます。

//     controller.storage.users.get(message.user, function (err, user_info) {

//         // ▼ データ取得後の処理 ▼

//         // ユーザーデータが存在しているかどうか調べる
//         // ※第二引数で指定した変数(ここでは'user_info')に、ユーザーデータが入っています。
//         if (!user_info) {

//             // ▼ ユーザーデータがなかった場合の処理 ▼

//             // ユーザーidとユーザー名 のオブジェクトを、user_infoとして作成します。
//             user_info = {
//                 id: message.user,
//                 name: name_from_msg
//             };

//         }

//         // user_infoを保存します。
//         controller.storage.users.save(user_info, function (err, id) {

//             // ▼ 保存完了後の処理▼

//             bot.reply(message, 'あなたのお名前は *' + user_info.name + '* さんですね！覚えました！');

//         });

//     });

// });
