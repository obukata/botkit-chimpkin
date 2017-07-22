const Botkit = require('botkit');
const http = require('http');
const request = require('superagent');

if (!process.env.token) {
	console.log('Error: Specify token in environment');
	process.exit(1);
}

const controller = Botkit.slackbot({
	debug: false,
	json_file_store: 'storage_bot_db'
});

controller.spawn({
	token: process.env.token
}).startRTM(function(err){
	if (err) {
		throw new Error(err);
	}
});

var chimpkinDate = new Date();
var chimpkinDate_Y = chimpkinDate.getFullYear();
var chimpkinDate_M = ('0'+ (parseInt(chimpkinDate.getMonth()) + 1)).slice(-2);
var chimpkinDate_D = ('0'+ (chimpkinDate.getDate())).slice(-2);


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

controller.hears(['おはよう','おはよー'], ['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	var helloTalk04 = [
		'後5分寝かせてー…',
		'おはようー！:sunny:',
		'今日の天気はどうでしょー。\n<@ryu> 大阪の天気教えて下さいー。',
	];
	var selectHelloTalk04 = helloTalk04[Math.floor(Math.random() * helloTalk04.length)];
	bot.reply(message, selectHelloTalk04);
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

controller.hears('好き',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'Chimpkinもー:heart_eyes:');
});

controller.hears('仕事',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'フレーフレー:crossed_flags:');
});

controller.hears('お寿司',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'お寿司！\nお寿司いいな！:sushi:');
});

controller.hears('休憩',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'一休み一休み♪');
});

controller.hears('先に寝て',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'え？うん。わかっ…:zzz:');
});

controller.hears('眠たい',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'起きて起きて！:clap::skin-tone-2:');
});

controller.hears('頑張ろ',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'おー！:fist::skin-tone-2:');
});

controller.hears('助けて',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'待ってて！すぐ行くー！:dash::dash:');
});

controller.hears('ただいま',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'おかえりー:raised_hand_with_fingers_splayed::skin-tone-2:');
});

controller.hears('パルミジャーノ',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'*レッジャーノ!!*:spaghetti:');
});


//=========================================================
// chimpkin 今何年？
//=========================================================
controller.hears('今(.*)何年',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'今は' + chimpkinDate_Y + '年で\n平成' + (chimpkinDate_Y - 1988) + '年だよー。');
});


//=========================================================
// chimpkin クイズ
//=========================================================
// controller.hears('クイズ',['direct_message','direct_mention','mention'],function(bot,message) {
// 	bot.startConversation(message, function (err, convo) {
// 		http.get("http://api.quizken.jp/api/captcha/format/json", (response) => {
// 			let body = '';
// 			response.setEncoding('utf8').on('data', (chunk) => {  body += chunk;  });
// 			response.on('end', () => {
// 				let current = JSON.parse(body);
// 				var chimpkinQuiz = current['correctAnswerIndex'];
// 				var chimpkinQuizAnsers = current['answers'][chimpkinQuiz];
// 				var chimpkinAnswers =  0  + ' : ' + current['answers'][0] + '\n'; 
// 				for(var i = 1; i < current['answers'].length; i++) {
// 					chimpkinAnswers = chimpkinAnswers + i  + ' : ' + current['answers'][i] + '\n'; 
// 				}
// 				let text =
// 				'問題！\n' + current['question'] + '\n' +
// 				'```' +
// 				chimpkinAnswers +
// 				'```';
// 				// convo.ask() で質問をします。
// 				convo.ask(text, [{
// 					pattern: ['(.*)'],
// 					callback: function (response, convo) {
// 					var chimpkinChoice = message.match[1];
// 						if(chimpkinChoice == chimpkinQuiz) {
// 							convo.say(message, '正解ー！:o:');
// 						}else {
// 							convo.say(message, '不正解ー！:x:\n正解は' + chimpkinQuizAnsers + 'でしたー！');
// 						}
// 					}
// 					// convo.next(); // 会話を次に進めます。この場合、最初の質問にも戻ります。
// 				}, {
// 					default: true,
// 					callback: function (response, convo) {
// 						// ▼ どのパターンにもマッチしない時の処理 ▼
// 						convo.say('不正解ー！:x:\n正解は' + chimpkinQuizAnsers + 'でしたー！');
// 						convo.next(); // 会話を次に進めます。この場合、最初の質問にも戻ります。
// 					}
// 				}]);
// 			});
// 		// controller.hears(['(.*)'],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
// 		// 		var chimpkinChoice = message.match[1];
// 		// 		console.log(chimpkinChoice);
// 		// 		console.log(chimpkinQuiz);
// 		// 		if(chimpkinChoice == chimpkinQuiz) {
// 		// 			bot.reply(message, '正解ー！:o:');
// 		// 		}else {
// 		// 			bot.reply(message, '不正解ー！:x:\n正解は' + chimpkinQuizAnsers + 'でしたー！');
// 		// 		}
// 		// 	});
// 		});
// 	});
// });



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
// chimpkin 星座占い
//=========================================================
controller.hears(['(.*)の運勢'],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
	var augurySign = message.match[1];
	var auguryNum = replaceSign(augurySign);
	if(auguryNum == "none") {
		bot.replyWithTyping(message, 'その星座知らない…:droplet:');
	}else {
		var auguryDate = new Date();
		var auguryNowDate_Y = auguryDate.getFullYear();
		var auguryNowDate_M = ('0'+ (parseInt(auguryDate.getMonth()) + 1)).slice(-2);
		var auguryNowDate_D = ('0'+ (auguryDate.getDate())).slice(-2);
		var auguryNowDate = auguryNowDate_Y + "/" + auguryNowDate_M + "/" + auguryNowDate_D;
		http.get("http://api.jugemkey.jp/api/horoscope/free/"+ auguryNowDate, (response) => {
			let body = '';
			response.setEncoding('utf8').on('data', (chunk) => {  body += chunk;  });
			response.on('end', () => {
				let current = JSON.parse(body);
				console.log(current['horoscope'][auguryNowDate][auguryNum]);
				let text =
				':crown:' + current['horoscope'][auguryNowDate][auguryNum]['rank'] + '位：' + current['horoscope'][auguryNowDate][auguryNum]['sign'] + 'の今日の運勢\n' +
				current['horoscope'][auguryNowDate][auguryNum]['content'] + '\n' +
				'> :moneybag:金運　：' + replaceLuck(current['horoscope'][auguryNowDate][auguryNum]['money']) + '\n' +
				'> :briefcase:仕事運：' + replaceLuck(current['horoscope'][auguryNowDate][auguryNum]['job']) + '\n' +
				'> :heart:恋愛運：' + replaceLuck(current['horoscope'][auguryNowDate][auguryNum]['love']);
				bot.replyWithTyping(message, text);
			});
		});
	}
});

function replaceSign(target) {
	if(target == "牡羊座") {
		target = 0;
	}else if(target == "牡牛座") {
		target = 1;
	}else if(target == "双子座") {
		target = 2;
	}else if(target == "蟹座") {
		target = 3;
	}else if(target == "獅子座") {
		target = 4;
	}else if(target == "乙女座") {
		target = 5;
	}else if(target == "天秤座") {
		target = 6;
	}else if(target == "蠍座") {
		target = 7;
	}else if(target == "射手座") {
		target = 8;
	}else if(target == "山羊座") {
		target = 9;
	}else if(target == "水瓶座") {
		target = 10;
	}else if(target == "魚座") {
		target = 11;
	}else {
		target = "none";
	}
	return target;
}

function replaceLuck(target) {
	if(target == 5) {
		target = "★★★★★";
	}else if(target == 4) {
		target = "★★★★☆";
	}else if(target == 3) {
		target = "★★★☆☆";
	}else if(target == 2) {
		target = "★★☆☆☆";
	}else if(target == 1) {
		target = "★☆☆☆☆";
	}else if(target == 0) {
		target = "☆☆☆☆☆";
	}
	return target;
}

//=========================================================
// chimpkin カウントダウン
//=========================================================
controller.hears('カウントダウン(.*)秒前',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	var countDownNum = message.match[1];
	if(countDownNum <= 0) {
		bot.reply(message, 'ん？何かおかしくない？:thinking_face:');
	}else if(countDownNum >= 20) {
		bot.reply(message, '長くないー？:expressionless:');
	}else {
		var countDownTimer = setInterval(function() {
			if(countDownNum <= 0) {
				bot.reply(message, ':boom:どかーん！:boom:');
				clearInterval(countDownTimer);
			}else {
				bot.reply(message, countDownNum + '秒前！');
				countDownNum--;
			}
		}, 1000);
	}
});

//=========================================================
// chimpkin 家計簿
//=========================================================
controller.hears(['家計簿'], 'direct_message,direct_mention,mention,ambient', function (bot, message) {
	bot.reply(message, 'おっけー！メモ取るよ！:memo:\nいくら使ったのー？');
	controller.hears(['(.*)円'], 'direct_message,direct_mention,mention,ambient', function (bot, message) {
		var costValue = message.match[1];
		var costDate = new Date();
		var costNowDate_M = parseInt(costDate.getMonth()) + 1;
		var costNowDate = costDate.getFullYear() + '/' + costNowDate_M;
		console.log(costNowDate);
		controller.storage.users.get(message.user, function(err, getData) {
			if(getData) {
				if (getData.date.costFood) {
					var tempValue = parseInt(getData.date.costFood) + parseInt(costValue);
					controller.storage.users.save({id: message.user, date:{data: costNowDate, costFood: tempValue}}, function(err) {
						bot.reply(message, costValue + '円だね、覚えた！\n```\n今月の支出：' + tempValue + '円\n```');
					});
				}else {
					controller.storage.users.save({id: message.user, date:{data: costNowDate, costFood: costValue}}, function(err) {
						bot.reply(message, costValue + '円だね、覚えた！\n```\n今月の支出：' + costValue + '円\n```');
					});
				};
			}else {
				controller.storage.users.save({id: message.user, date:{data: costNowDate, costFood: costValue}}, function(err) {
					bot.reply(message, costValue + '円だね、覚えた！\n```\n今月の支出：' + costValue + '円\n```');
				});
			}
		});
	});
});


//=========================================================
// chimpkin pedia
//=========================================================
var WIKIPEDIA_URL = 'https://ja.wikipedia.org/wiki/';

controller.hears(['(.*)って何'], 'direct_message,direct_mention,mention,ambient', function (bot, message) {
	var word = message.match[1];
	request
	.get('https://ja.wikipedia.org/w/api.php')
	.query({
		format : 'json',
		action : 'query',
		prop   : 'extracts',
		exintro: '',
		explaintext: '',
		titles : word
	})
	.end(function (err, res) {
		var query = res.body.query;
		if (query && query.pages) {
			for (var p in query.pages) {
				var content = query.pages[p].extract;
				if (content) {
					// slackで引用スタイルを適用するために`>` をつける
					content = '> ' + content.replace(/\n/g, '\n> ');
				}
				else {
					content = '見つからなかった';
				}
				bot.reply(message, [
					content,
					WIKIPEDIA_URL + word
				].join('\r\n'));
				return;
			}
		}
	});
});



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
