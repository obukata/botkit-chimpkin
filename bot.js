const Botkit = require('botkit');
const http = require('http');
const request = require('superagent');
const Twitter = require('twitter');

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
var chimpkinDateNow = chimpkinDate.getTime();
var chimpkinDate_Y = chimpkinDate.getFullYear();
var chimpkinDate_M = ('0'+ (parseInt(chimpkinDate.getMonth()) + 1)).slice(-2);
var chimpkinDate_D = ('0'+ (chimpkinDate.getDate())).slice(-2);


//=========================================================
// chimpkin ヘルプ
//=========================================================
controller.hears('何が出来る',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	var helpText =
		'*■ 今何年？後何日？*\n' +
		'> 今が西暦何年で、平成何年か教えるよー。\n' +
		'```今(.*)何年```\n' +
		'\n' +
		'> 日付のカウントダウンするよー\n' +
		'```(.*)年(.*)月(.*)日```\n' +
		'\n' +
		'*■ 干支教えてー*\n' +
		'> 干支教えるよ！\n' +
		'```干支教えて```\n' +
		'```(.*)年の干支```\n' +
		'\n' +
		'*■ ご当地キャラ*\n' +
		'> ご当地キャラを調べるよ！\n' +
		'```(.*)のご当地キャラ```\n' +
		'\n' +
		'*■ おみくじ*\n' +
		'> おみくじ出来るよ！\n' +
		'```おみくじ```\n' +
		'\n' +
		'*■ 星座占い*\n' +
		'> 占うよ！\n' +
		'```(.*)の運勢```\n' +
		'\n' +
		'*■ カウントダウン*\n' +
		'> カウントダウンでどかーん！\n' +
		'```カウントダウン(.*)秒前```\n'
		'\n' +
		'*■ wikipedia*\n' +
		'> wikipediaで調べてくるよ！\n' +
		'```(.*)って何```\n';
	bot.reply(message, helpText);
});


//=========================================================
// chimpkin 会話集
//=========================================================
controller.hears('チンプキン',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	var helloTalk01 = [
		'はーいー:hand::skin-tone-2:',
		'何か呼んだ？:chipmunk:',
		'私がチンプキンですよー:stuck_out_tongue_closed_eyes:',
		'なーにー？',
		'ほい',
	];
	var selectHelloTalk01 = helloTalk01[Math.floor(Math.random() * helloTalk01.length)];
	bot.reply(message, selectHelloTalk01);
});

controller.hears('お腹すいた',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	var helloTalk02 = [
		'食べる？これ！:apple:',
		'今日は何を食べましょうー:fork_and_knife:',
		'ご飯ご飯！:yum:',
		'ぺこぺこ。ぺこぺこー。',
	];
	var selectHelloTalk02 = helloTalk02[Math.floor(Math.random() * helloTalk02.length)];
	bot.reply(message, selectHelloTalk02);
});

controller.hears('疲れた',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	var helloTalk03 = [
		'ひまわりの種でも食べる？',
		'一休みしましょー:slightly_smiling_face:',
		'無理しないでね:frowning:',
		'深呼吸してみてー。どう？',
		'ストレッチしてみよー',
		'早く帰ろうよー',
	];
	var selectHelloTalk03 = helloTalk03[Math.floor(Math.random() * helloTalk03.length)];
	bot.reply(message, selectHelloTalk03);
});

controller.hears(['おはよう','おはよー'], ['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	var helloTalk04 = [
		'後5分寝かせてー…',
		'おはようー！:sunny:',
		'今日の天気はどうでしょー。\n<@guinea> さん、天気教えて下さいー。',
	];
	var selectHelloTalk04 = helloTalk04[Math.floor(Math.random() * helloTalk04.length)];
	bot.reply(message, selectHelloTalk04);
});

controller.hears('休憩',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	var helloTalk05 = [
		'一休み一休み♪',
		'ごろごろしたいよー',
		'甘い物が食べたいなー',
		'きゅうけい！きゅうけい！',
	];
	var selectHelloTalk05 = helloTalk05[Math.floor(Math.random() * helloTalk05.length)];
	bot.reply(message, selectHelloTalk05);
});

controller.hears('仕事',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	var helloTalk06 = [
		'フレーフレー:crossed_flags:',
		'Chimpkinのご飯代に為に頑張ってーー！',
		'いつも大変だねー',
		'がんばれがんばれがんばれがんばれー！',
	];
	var selectHelloTalk06 = helloTalk06[Math.floor(Math.random() * helloTalk06.length)];
	bot.reply(message, selectHelloTalk06);
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

controller.hears('お寿司',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'お寿司！\nお寿司いいな！:sushi:');
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
// chimpkin 今何年？後何日？
//=========================================================
controller.hears('今(.*)何年',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'今は' + chimpkinDate_Y + '年で\n平成' + (chimpkinDate_Y - 1988) + '年だよー。');
});
controller.hears('(.*)年(.*)月(.*)日',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	var targetDay = new Date(message.match[1], message.match[2]-1, message.match[3])
	var nowTargetDay = targetDay.getTime();
	var diffSec = nowTargetDay - chimpkinDateNow;
	var diffDay = diffSec / (1000 * 60 * 60 * 24);
	var showDay = Math.ceil(diffDay);
	if(showDay >= 0) {
		bot.reply(message, '後' + showDay + '日だよー。');
	}else {
		bot.reply(message, (showDay * -1) + '日たったよー。');
	}
});
//=========================================================
// chimpkin 干支教えてー
//=========================================================
controller.hears('干支教えて',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	var zodiacName = replaceZodiac(chimpkinDate_Y % 12);
	bot.reply(message,'今年は *' + zodiacName + '* だよー。\n> 干支の順番：子・丑・寅・卯・辰・巳・午・未・申・酉・戌・亥');
});
controller.hears('(.*)年の干支',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	var zodiacYear = message.match[1];
	var zodiacName = replaceZodiac(message.match[1] % 12);
	bot.reply(message, zodiacYear + '年の干支は *' + zodiacName + '* だよー。');
});

function replaceZodiac(target) {
	if(target == 0) {
		target = "申年[さる]";
	}else if(target == 1) {
		target = "酉年[とり]";
	}else if(target == 2) {
		target = "戌年[いぬ]";
	}else if(target == 3) {
		target = "亥年[いのしし]";
	}else if(target == 4) {
		target = "子年[ねずみ]";
	}else if(target == 5) {
		target = "丑年[うし]";
	}else if(target == 6) {
		target = "寅年[とら]";
	}else if(target == 7) {
		target = "卯年[うさぎ]";
	}else if(target == 8) {
		target = "辰年[たつ]";
	}else if(target == 9) {
		target = "巳年[へび]";
	}else if(target == 10) {
		target = "午年[うま]";
	}else if(target == 11) {
		target = "未年[ひつじ]";
	}
	return target;
}


//=========================================================
// chimpkin ご当地キャラ
//=========================================================
controller.hears(['(.*)のご当地キャラ'],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
	var charaApi = "59c9c29565db8";
	var charaKeyword = message.match[1];
	var charaKeywordEncode = encodeURIComponent(charaKeyword);
	http.get("http://localchara.jp/services/api/search/query/character?api_key="+ charaApi + "&keyword=" + charaKeywordEncode, (response) => {
		let body = '';
		response.setEncoding('utf8').on('data', (chunk) => {  body += chunk;  });
		response.on('end', () => {
			let current = JSON.parse(body);
			if(current['error'] == true) {
				bot.replyWithTyping(message, 'うーん、わかんない…:droplet:');
			}else {
				var charaRand = Math.floor(Math.random() * current['total']);
				let text =
				current['result'][charaRand]['image'] + '\n' +
				current['result'][charaRand]['name'] + '\n' +
				':memo:' + current['result'][charaRand]['profile'] + '\n' +
				'> ' + charaKeyword + "のご当地キャラ総数：" + current['total'] + "体";
				bot.replyWithTyping(message, text);
			}
		});
	});
});


//=========================================================
// chimpkin おみくじ
//=========================================================
controller.hears('おみくじ',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	console.log(message);
	if(message.user == 'U5MPH15RU') {
		var omikujiArray = [
			'*大吉* 今日は最高の日だぜ:sunglasses:',
			'*大吉* 素晴らしい日になりそうだぜ:sunglasses:',
			'*大吉* awesomeだぜ:sunglasses:',
			'*大吉* 何事もうまく行くんだぜ:sunglasses:',
			'*中吉* 常人の2倍運がいいんだぜ:sunglasses:',
			'*中吉* 無くしたものも2倍になって帰ってくるぜ:sunglasses:',
			'*小吉* 今日は対戦で勝ちまくれるぜ:sunglasses:',
			];
		var omikujiResult = omikujiArray[Math.floor(Math.random() * omikujiArray.length)];
		bot.reply(message, omikujiResult);
	}else {
		var omikujiArray = [
			'*大吉* いい日になるよいいねー',
			'*中吉* 今日は甘ーいものを食べるとよいよい',
			'*中吉* まぁまぁな日もあるよねー',
			'*小吉* ちょっとくらいの幸せが心地いいもんだよねー',
			'*小吉* ピリっとしたものを食べて元気出していきましょう！',
			'*小吉* 待ち人は来ないけど元気だして！',
			'*吉* みゆきちが出たら大当たりー！パフパフ♪',
			'*吉* 自転車に乗ろう！いっぱい乗ろう！',
			'*吉* 無駄遣いには気をつければ吉だよ！',
			'*吉* 何か失敗した時は、心の中で「やらかしてもうたーー！」と叫んでみましょう。',
			'*吉* 目を閉じて深く深呼吸。少し楽になるかもよー',
			'*吉* 太陽の光に当たりましょう。気持ちいいよー',
			'*半吉* @guinea さんとお喋りするとパワー回復するよ！',
			'*半吉* みゆきち半人前パワー',
			'*末吉* みゆきちの末の姿。おばあちゃん。',
			'*凶* :scream:',
			'*罰* 今日、自転車25kmね。絶対だよ？',
			];
		var omikujiResult = omikujiArray[Math.floor(Math.random() * omikujiArray.length)];
		bot.reply(message, omikujiResult);
	}
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
	if(countDownNum >= 0 && countDownNum <= 10) {
		var countDownTimer = setInterval(function() {
			if(countDownNum <= 0) {
				bot.reply(message, ':boom:どかーん！:boom:');
				clearInterval(countDownTimer);
			}else {
				bot.reply(message, countDownNum + '秒前！');
				countDownNum--;
			}
		}, 1000);
	}else if(countDownNum >= 20) {
		bot.reply(message, '長くないー？:expressionless:');
	}else {
		bot.reply(message, '何かおかしーよー');
	}
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
// chimpkin twitter
//=========================================================
var client = new Twitter({
	consumer_key: 'asvFVimT2yR3Aj4kyb8OmwtF9',
	consumer_secret: 's8Bi3oNArXmxo1sG6lteP226Aa3s0X1oL1Bie1QhiIpLsksJQu',
	access_token_key: '216266592-Zhx4yi9XSb2QUSbwZvepj94O1LPTN95AL1sC9TQ9',
	access_token_secret: 'B1z66Bn6CEJ68nqVYrTgrc126VycbdeZkuN9v1w9dKJoG'
});


// controller.hears(['twitter'], 'direct_message,direct_mention,mention,ambient', function (bot, message) {
// 		bot.say({
// 			text: 'twitter監視開始！',
// 			channel: "#dev_botkit"
// 		});

// 	client.stream( 'statuses/filter', { track : 'グラブル' }, function( stream ) {
// 		stream.on( 'data', function( data ) {
// 			console.log(data);
// 			console.log("before text");
// 			var text = data.text;
// 			console.log(text);
// 			bot.say({
// 				text: '> ' + text,
// 				channel: "#dev_botkit"
// 			});
// 		});
// 	});
// });



// controller.hears(['twitter'], 'direct_message,direct_mention,mention,ambient', function (bot, message) {
// 	client.get('search/tweets', {q: 'node.js'}, (error, tweets, response) => {
// 		const text = tweets.statuses[0].text; //検索して引っかかった1件目のツイート本文
// 		console.log(text);
// 		// client.post('statuses/update', {status: text}, (error, tw) => { //パクツイ
// 		// 	if (error) {
// 		// 		console.log(error);
// 		// 		return;
// 		// 	}
// 		// 	console.log(`id: ${tw.id}, text: ${tw.text}`);
// 		// });
// 	});
// });

// client.get('search/tweets', {q: 'ジャパンカップ'}, function(error, tweets, response) {
// 	var twitterText =
// 	''
// });

// //=========================================================
// // chimpkin 家計簿
// //=========================================================
// controller.hears(['家計簿'], 'direct_message,direct_mention,mention,ambient', function (bot, message) {
// 	bot.reply(message, 'おっけー！メモ取るよ！:memo:\nいくら使ったのー？');
// 	controller.hears(['(.*)円'], 'direct_message,direct_mention,mention,ambient', function (bot, message) {
// 		var costValue = message.match[1];
// 		var costDate = new Date();
// 		var costNowDate_M = parseInt(costDate.getMonth()) + 1;
// 		var costNowDate = costDate.getFullYear() + '/' + costNowDate_M;
// 		console.log(costNowDate);
// 		controller.storage.users.get(message.user, function(err, getData) {
// 			if(getData) {
// 				if (getData.date.costFood) {
// 					var tempValue = parseInt(getData.date.costFood) + parseInt(costValue);
// 					controller.storage.users.save({id: message.user, date:{data: costNowDate, costFood: tempValue}}, function(err) {
// 						bot.reply(message, costValue + '円だね、覚えた！\n```\n今月の支出：' + tempValue + '円\n```');
// 					});
// 				}else {
// 					controller.storage.users.save({id: message.user, date:{data: costNowDate, costFood: costValue}}, function(err) {
// 						bot.reply(message, costValue + '円だね、覚えた！\n```\n今月の支出：' + costValue + '円\n```');
// 					});
// 				};
// 			}else {
// 				controller.storage.users.save({id: message.user, date:{data: costNowDate, costFood: costValue}}, function(err) {
// 					bot.reply(message, costValue + '円だね、覚えた！\n```\n今月の支出：' + costValue + '円\n```');
// 				});
// 			}
// 		});
// 	});
// });


//=========================================================
// chimpkin infogram
//=========================================================
// https://developers.infogr.am/rest/
// できそうでできない。あとはまかせた。みらいのぼく。


// controller.hears('グラフ',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
// 	var infogram = new InfogramAPI('ctMfRb1kWqbQX87hN4dq5V7Og8xmFZH6', '2bCt8E9SVGh73uPIWqvx0emyoZKxVgq4');
// 	// infogram.updateProject(project_id, 2525).then(function(data) {

// 	infogram.getProject('7f798e4a-84e4-4c02-af1f-20e99c6f9bf5', { format: 'json' }).then(function(data) {
// 	  fs.writeFile('graph.txt', data, function(err) {
// 	    if(err) {
// 	      return console.log(err);
// 	    }

// 	    console.log('The file was saved!');
// 	  });
// 	}, function(err) {
// 	  console.error(err);
// 	});

// 	// infogram.getProject('7f798e4a-84e4-4c02-af1f-20e99c6f9bf5').then(function(data) {
// 	//   console.log(data);
// 	// }, function(err) {
// 	//   console.error(err);
// 	// });
// 	// infogram.getLibrary().then(function(data) {
// 	// 	console.log(data);
// 	// 	bot.replyWithTyping(message, data[0]['thumbnail_url']);
// 	// }, function(err) {
// 	// 	bot.replyWithTyping(message, 'あれ？何かおかしいー。\n> ' + err );
// 	// });
// });


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
