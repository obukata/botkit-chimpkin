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
	var helloTalk01 = [
		'はーいー:hand::skin-tone-2:',
		'何か呼んだ？:chipmunk:',
		'私がチンプキンですよー:stuck_out_tongue_closed_eyes:',
	];
	var selectHelloTalk01 = helloTalk01[Math.floor(Math.random() * helloTalk01.length)];
	bot.reply(message, selectHelloTalk01);
});

controller.hears('お腹すいた',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	var helloTalk02 = [
		'食べる？これ！:apple:',
		'今日は何を食べましょうー:fork_and_knife:',
		'ご飯ご飯！:yum:',
	];
	var selectHelloTalk02 = helloTalk02[Math.floor(Math.random() * helloTalk02.length)];
	bot.reply(message, selectHelloTalk02);
});

controller.hears('疲れた',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	var helloTalk03 = [
		'ひまわりの種でも食べる？',
		'一休みしましょー:slightly_smiling_face:',
		'無理しないでね:frowning:',
	];
	var selectHelloTalk03 = helloTalk03[Math.floor(Math.random() * helloTalk03.length)];
	bot.reply(message, selectHelloTalk03);
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

controller.hears('仕事',['direct_message','direct_mention','mention'],function(bot,message) {
	bot.reply(message,'フレーフレー:crossed_flags:');
});

controller.hears('お寿司',['direct_message','direct_mention','mention'],function(bot,message) {
	bot.reply(message,'お寿司！\nお寿司いいな！:sushi:');
});



//=========================================================
// chimpkin おみくじ
//=========================================================
controller.hears('おみくじ',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	var omikujiArray = [
		'*大吉* いい日になるよいいねー',
		'*中吉* まぁまぁな日もあるよねー',
		'*小吉* ちょっとくらいの幸せが心地いいもんだよねー',
		'*吉* みゆきちが出たら大当たりー！パフパフ♪',
		'*半吉* みゆきち半人前パワー',
		'*末吉* みゆきちの末の姿。おばあちゃん。',
		'*凶* :scream:',
		];
	var omikujiResult = omikujiArray[Math.floor(Math.random() * omikujiArray.length)];
	bot.reply(message, omikujiResult);
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
