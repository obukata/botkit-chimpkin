const Botkit = require('botkit')
const http = require('http')
const request = require('superagent')
const Twitter = require('twitter')

if (!process.env.token) {
	console.log('Error: Specify token in environment')
	process.exit(1)
}

const controller = Botkit.slackbot({
	debug: false,
	json_file_store: 'storage_bot_db'
})

controller.spawn({
	token: process.env.token
}).startRTM(function(err){
	if (err) {
		throw new Error(err)
	}
})

//=========================================================
// いろんなセット
//=========================================================
const chimpkinDate = new Date()
const chimpkinDateNow = chimpkinDate.getTime()
const chimpkinDate_Y = chimpkinDate.getFullYear()
const chimpkinDate_M = ('0'+ (parseInt(chimpkinDate.getMonth()) + 1)).slice(-2)
const chimpkinDate_D = ('0'+ (chimpkinDate.getDate())).slice(-2)


//=========================================================
// ユーザーデータ
//=========================================================
let maccoto = {
	id: 'U5MPH15RU',
	name: 'ご主人',
	likeRamen: function() {
		return getRandom(['河童ラーメン', '天下一品', '中華そば 葛', 'ふく流ラパス 分家 ワダチ', '鶏Soba 座銀'])
	}
}

let kichi = {
	id: 'U5M2E7GTW',
	name: function() {
		return getRandom(['みゆきち', 'あきお', 'きっち', 'きち子', 'きちみゆ', 'こーきちろう', 'きち', 'きっちゃん'])
	}
}


//=========================================================
// 汎用メソッド
//=========================================================
// 配列をランダムで返す。 返答パターンなどに使用。
function getRandom(array) {
	if(!array) {
		return
	} else {
		return array[Math.floor(Math.random() * array.length)]
	}
}

//=========================================================
// chimpkin ヘルプ
//=========================================================
controller.hears('何が出来る',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,
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
		'```カウントダウン(.*)秒前```\n' +
		'\n' +
		'*■ wikipedia*\n' +
		'> wikipediaで調べてくるよ！\n' +
		'```(.*)って何```\n'
	)
})


//=========================================================
// chimpkin 会話集
//=========================================================
controller.hears('チンプキン',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message, getRandom([
		'はーいー:hand::skin-tone-2:',
		'何か呼んだ？:chipmunk:',
		'私がチンプキンですよー:stuck_out_tongue_closed_eyes:',
		'なーにー？',
		'ほい'
	]))
})

controller.hears('お腹すいた',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	if(message.user == maccoto.id) {
		bot.reply(message, getRandom([
			'食べる？これ！:apple:',
			'今日は何を食べましょうー:fork_and_knife:',
			'ご飯ご飯！:yum:',
			'ぺこぺこ。ぺこぺこー。',
			maccoto.name + '！' + maccoto.likeRamen() + 'なんていかがでしょう！！',
		]))
	}else {
		bot.reply(message, getRandom([
			'食べる？これ！:apple:',
			'今日は何を食べましょうー:fork_and_knife:',
			'ご飯ご飯！:yum:',
			'ぺこぺこ。ぺこぺこー。',
		]))
	}
})

controller.hears('疲れた',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message, getRandom([
		'ひまわりの種でも食べる？',
		'一休みしましょー:slightly_smiling_face:',
		'無理しないでね:frowning:',
		'深呼吸してみてー。どう？',
		'ストレッチしてみよー',
		'早く帰ろうよー',
	]))
})

controller.hears(['おはよう','おはよー'], ['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message, getRandom([
		'後5分寝かせてー…',
		'おはようー！:sunny:',
		'今日の天気はどうでしょー。\n<@guinea> さん、天気教えて下さいー。',
	]))
})

controller.hears('休憩',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message, getRandom([
		'一休み一休み♪',
		'ごろごろしたいよー',
		'甘い物が食べたいなー',
		'きゅうけい！きゅうけい！',
	]))
})

controller.hears('仕事',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message, getRandom([
		'フレーフレー:crossed_flags:',
		'Chimpkinのご飯代に為に頑張ってーー！',
		'いつも大変だねー',
		'がんばれがんばれがんばれがんばれー！',
	]))
})

controller.hears(['どう思う','どう？','どっちがいい','何がいい','どれに'],['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message, getRandom([
		'ちょっと待ってね。',
		'うーんとねー',
		'考える！'
	]))
	setTimeout(function() {
		bot.reply(message, getRandom([
			'I=∫Xh(x)r(x)dx=Er[h(x)]',
			'I=∫Xh(x)r(x)q(x)q(x)dx=Eq[h(x)r(x)q(x)]',
			'P(xn+1=en+1|x0=e0,x1=e1,…,xn=en)=P(xn+1=en+1|xn=en)',
			'pijpji=rjri⟺qijα(i→j)qjiα(j→i)=rjri⟺α(i→j)α(j→i)=rjqjiriqij',
			'limN→∞P(min(f(x1),f(x2),…,f(xN))=f(x∗))=1',
			'∑i∈Xripij=rj∑i∈Xpji=rj'
		]))
		setTimeout(function() {
			bot.reply(message, getRandom([
				'わかんない。',
				'いーんじゃない。',
				'悪くはないよ。',
				'いいね！',
				'そうだね。',
				'...Zzz'
			]))
		}, 1000)
	}, 5000)
})

controller.hears('柏',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message, getRandom([
		'田舎の事？:thinking_face:',
		'わーしか！',
		'ベイブ都会へ行く'
	]))
})

controller.hears('頑張って',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message, getRandom([
		'頑張るよー！:smiley:',
		'任せなさい！:sunglasses:',
		'頑張れ頑張れー力の限りがんばれー'
	]))
	bot.reply(message,'')
})

controller.hears('車運転',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'気をつけてね:slightly_smiling_face:')
})

controller.hears('到着',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'いえーい')
})

controller.hears('おやすみ',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'おやすみー:chipmunk::zzz:')
})

controller.hears('好き',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'Chimpkinもー:heart_eyes:')
})

controller.hears('お寿司',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'お寿司！\nお寿司いいな！:sushi:')
})

controller.hears('先に寝て',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'え？うん。わかっ…:zzz:')
})

controller.hears('眠たい',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'起きて起きて！:clap::skin-tone-2:')
})

controller.hears('頑張ろ',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'おー！:fist::skin-tone-2:')
})

controller.hears('助けて',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'待ってて！すぐ行くー！:dash::dash:')
})

controller.hears('ただいま',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'おかえりー:raised_hand_with_fingers_splayed::skin-tone-2:')
})

controller.hears('パルミジャーノ',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'*レッジャーノ!!*:spaghetti:')
})


//=========================================================
// chimpkin 今何年？後何日？
//=========================================================
controller.hears('今(.*)何年',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message,'今は' + chimpkinDate_Y + '年で\n平成' + (chimpkinDate_Y - 1988) + '年だよー。')
})
controller.hears('(.*)年(.*)月(.*)日',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	const targetDay = new Date(message.match[1], message.match[2]-1, message.match[3])
	const nowTargetDay = targetDay.getTime()
	const diffSec = nowTargetDay - chimpkinDateNow
	const diffDay = diffSec / (1000 * 60 * 60 * 24)
	const showDay = Math.ceil(diffDay)
	if(showDay >= 0) {
		bot.reply(message, '後' + showDay + '日だよー。')
	}else {
		bot.reply(message, (showDay * -1) + '日たったよー。')
	}
})
//=========================================================
// chimpkin 干支教えてー
//=========================================================
controller.hears('干支教えて',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	const zodiacName = zodiac[chimpkinDate_Y % 12]
	bot.reply(message,'今年は *' + zodiacName + '* だよー。\n> 干支の順番：子・丑・寅・卯・辰・巳・午・未・申・酉・戌・亥')
})
controller.hears('(.*)年の干支',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	const zodiacYear = message.match[1]
	const zodiacName = zodiac[message.match[1] % 12]
	bot.reply(message, zodiacYear + '年の干支は *' + zodiacName + '* だよー。')
})

const zodiac = {
	0: '申年[さる]',
	1: '酉年[とり]',
	2: '戌年[いぬ]',
	3: '亥年[いのしし]',
	4: '子年[ねずみ]',
	5: '丑年[うし]',
	6: '寅年[とら]',
	7: '卯年[うさぎ]',
	8: '辰年[たつ]',
	9: '巳年[へび]',
	10: '午年[うま]',
	11: '未年[ひつじ]'
}



//=========================================================
// chimpkin ご当地キャラ
//=========================================================
controller.hears(['(.*)のご当地キャラ'],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
	const charaApi = "59c9c29565db8"
	const charaKeyword = message.match[1]
	const charaKeywordEncode = encodeURIComponent(charaKeyword)
	http.get("http://localchara.jp/services/api/search/query/character?api_key="+ charaApi + "&keyword=" + charaKeywordEncode, (response) => {
		let body = ''
		response.setEncoding('utf8').on('data', (chunk) => {  body += chunk  })
		response.on('end', () => {
			let current = JSON.parse(body)
			if(current['error'] == true) {
				bot.replyWithTyping(message, 'うーん、わかんない…:droplet:')
			}else {
				const charaRand = Math.floor(Math.random() * current['total'])
				let text =
				current['result'][charaRand]['image'] + '\n' +
				current['result'][charaRand]['name'] + '\n' +
				':memo:' + current['result'][charaRand]['profile'] + '\n' +
				'> ' + charaKeyword + "のご当地キャラ総数：" + current['total'] + "体"
				bot.replyWithTyping(message, text)
			}
		})
	})
})


//=========================================================
// chimpkin おみくじ
//=========================================================
controller.hears('おみくじ',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	if(message.user == maccoto.id) {
		bot.reply(message, getRandom([
			'*大吉* 今日はダブルエリアルがよく来まるぜ:sunglasses:',
			'*大吉* ' + kichi.name() + 'が' + maccoto.name + 'に美味しいもの食べさせてくれるぜ！ :sunglasses:',
			'*大吉* ' + maccoto.name + '、今日も最高だぜ:sunglasses:',
			'*大吉* どれだけ食べても太らない気がするぜ:sunglasses:',
			'*大吉* 今日のラッキーラーメンは' + maccoto.likeRamen() + 'だぜ:sunglasses:',
			'*大吉* どれだけごろごろしても怒られないぜ:sunglasses:',
			'*大吉* 今日は最高の日だぜ:sunglasses:',
			'*大吉* 素晴らしい日になりそうだぜ:sunglasses:',
			'*大吉* awesomeだぜ:sunglasses:',
			'*大吉* 何事もうまく行くんだぜ:sunglasses:',
			'*中吉* 常人の2倍運がいいんだぜ:sunglasses:',
			'*中吉* 無くしたものも2倍になって帰ってくるぜ:sunglasses:',
			'*小吉* 今日は対戦で勝ちまくれるぜ:sunglasses:',
		]))
	}else {
		bot.reply(message, getRandom([
			'*大吉* いい日になるよいいねー',
			'*中吉* 今日は甘ーいものを食べるとよいよい',
			'*中吉* まぁまぁな日もあるよねー',
			'*小吉* ちょっとくらいの幸せが心地いいもんだよねー',
			'*小吉* ピリっとしたものを食べて元気出していきましょう！',
			'*小吉* 待ち人は来ないけど元気だして！',
			'*吉* ' + kichi.name() + 'が出たら大当たりー！パフパフ♪',
			'*吉* 自転車に乗ろう！いっぱい乗ろう！',
			'*吉* 無駄遣いには気をつければ吉だよ！',
			'*吉* 何か失敗した時は、心の中で「やらかしてもうたーー！」と叫んでみましょう。',
			'*吉* 目を閉じて深く深呼吸。少し楽になるかもよー',
			'*吉* 太陽の光に当たりましょう。気持ちいいよー',
			'*半吉* @guinea さんとお喋りするとパワー回復するよ！',
			'*半吉* ' + kichi.name() + '半人前パワー',
			'*末吉* ' + kichi.name() + 'の末の姿。おばあちゃん。',
			'*凶* :scream:',
			'*欲* お肉が食べたくなーる。美味しいお肉が食べたくなーる。',
			'*吉* 今日は格ゲーの練習してみましょー！',
		]))
	}
})

//=========================================================
// chimpkin 星座占い
//=========================================================
controller.hears(['(.*)の運勢'],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
	const augurySign = message.match[1]
	const auguryNum = asterism[augurySign]
	if(auguryNum == "none") {
		bot.replyWithTyping(message, 'その星座知らない…:droplet:')
	}else {
		const auguryDate = new Date()
		const auguryNowDate_Y = auguryDate.getFullYear()
		const auguryNowDate_M = ('0'+ (parseInt(auguryDate.getMonth()) + 1)).slice(-2)
		const auguryNowDate_D = ('0'+ (auguryDate.getDate())).slice(-2)
		const auguryNowDate = auguryNowDate_Y + "/" + auguryNowDate_M + "/" + auguryNowDate_D
		http.get("http://api.jugemkey.jp/api/horoscope/free/"+ auguryNowDate, (response) => {
			let body = ''
			response.setEncoding('utf8').on('data', (chunk) => {  body += chunk  })
			response.on('end', () => {
				let current = JSON.parse(body)
				let text =
				':crown:' + current['horoscope'][auguryNowDate][auguryNum]['rank'] + '位：' + current['horoscope'][auguryNowDate][auguryNum]['sign'] + 'の今日の運勢\n' +
				current['horoscope'][auguryNowDate][auguryNum]['content'] + '\n' +
				'> :moneybag:金運　：' + asterismLuck[current['horoscope'][auguryNowDate][auguryNum]['money']] + '\n' +
				'> :briefcase:仕事運：' + asterismLuck[current['horoscope'][auguryNowDate][auguryNum]['job']] + '\n' +
				'> :heart:恋愛運：' + asterismLuck[current['horoscope'][auguryNowDate][auguryNum]['love']]
				bot.replyWithTyping(message, text)
			})
		})
	}
})

const asterism = {
	'牡羊座':		0,
	'牡牛座':		1,
	'双子座':		2,
	'蟹座':			3,
	'獅子座':		4,
	'乙女座':		5,
	'天秤座':		6,
	'蠍座':			7,
	'射手座':		8,
	'山羊座':		9,
	'水瓶座':		10,
	'魚座':			11
}
const asterismLuck = {
	5: '★★★★★',
	4: '★★★★☆',
	3: '★★★☆☆',
	2: '★★☆☆☆',
	1: '★☆☆☆☆',
	0: '☆☆☆☆☆'
}


//=========================================================
// chimpkin カウントダウン
//=========================================================
controller.hears('カウントダウン(.*)秒前',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	let countDownNum = parseInt(message.match[1])
	if(1 <= countDownNum && countDownNum <= 3600) {
		const countDownTimer = setInterval(function() {
			if(1 <= countDownNum && countDownNum <= 5) {
				bot.reply(message, countDownNum + '秒前！')
				countDownNum--
			}else if(6 <= countDownNum && countDownNum <= 60) {
				if(countDownNum % 10) {
					countDownNum--
				}else {
					bot.reply(message, countDownNum + '秒前！')
					countDownNum--
				}
			}else if(61 <= countDownNum && countDownNum <= 3600) {
				if(countDownNum % (60 * 10)) {
					countDownNum--
				}else {
					bot.reply(message, countDownNum / 60 + '分前！')
					countDownNum--
				}
			}else {
				bot.reply(message, ':boom:どかーん！:boom:')
				clearInterval(countDownTimer)
			}
		}, 1000)
	}else if(3600 <= countDownNum) {
		bot.reply(message, '長くないー？:expressionless:')
	}else {
		bot.reply(message, '何かおかしーよー')
	}
})


//=========================================================
// chimpkin pedia
//=========================================================
const WIKIPEDIA_URL = 'https://ja.wikipedia.org/wiki/'

controller.hears(['(.*)って何'], 'direct_message,direct_mention,mention,ambient', function (bot, message) {
	const word = message.match[1]
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
		const query = res.body.query
		if (query && query.pages) {
			for (let p in query.pages) {
				let content = query.pages[p].extract
				if (content) {
					// slackで引用スタイルを適用するために`>` をつける
					content = '> ' + content.replace(/\n/g, '\n> ')
				}
				else {
					content = '見つからなかった'
				}
				bot.reply(message, [
					content,
					WIKIPEDIA_URL + word
				].join('\r\n'))
				return
			}
		}
	})
})


//=========================================================
// chimpkin twitter
//=========================================================
const client = new Twitter({
	consumer_key: 'asvFVimT2yR3Aj4kyb8OmwtF9',
	consumer_secret: 's8Bi3oNArXmxo1sG6lteP226Aa3s0X1oL1Bie1QhiIpLsksJQu',
	access_token_key: '216266592-Zhx4yi9XSb2QUSbwZvepj94O1LPTN95AL1sC9TQ9',
	access_token_secret: 'B1z66Bn6CEJ68nqVYrTgrc126VycbdeZkuN9v1w9dKJoG'
})


// controller.hears(['twitter'], 'direct_message,direct_mention,mention,ambient', function (bot, message) {
// 		bot.say({
// 			text: 'twitter監視開始！',
// 			channel: "#dev_botkit"
// 		});

// 	client.stream( 'statuses/filter', { track : 'グラブル' }, function( stream ) {
// 		stream.on( 'data', function( data ) {
// 			console.log(data);
// 			console.log("before text");
// 			const text = data.text;
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
// 	const twitterText =
// 	''
// });

// //=========================================================
// // chimpkin 家計簿
// //=========================================================
// controller.hears(['家計簿'], 'direct_message,direct_mention,mention,ambient', function (bot, message) {
// 	bot.reply(message, 'おっけー！メモ取るよ！:memo:\nいくら使ったのー？');
// 	controller.hears(['(.*)円'], 'direct_message,direct_mention,mention,ambient', function (bot, message) {
// 		const costValue = message.match[1];
// 		const costDate = new Date();
// 		const costNowDate_M = parseInt(costDate.getMonth()) + 1;
// 		const costNowDate = costDate.getFullYear() + '/' + costNowDate_M;
// 		console.log(costNowDate);
// 		controller.storage.users.get(message.user, function(err, getData) {
// 			if(getData) {
// 				if (getData.date.costFood) {
// 					const tempValue = parseInt(getData.date.costFood) + parseInt(costValue);
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
// 	const infogram = new InfogramAPI('ctMfRb1kWqbQX87hN4dq5V7Og8xmFZH6', '2bCt8E9SVGh73uPIWqvx0emyoZKxVgq4');
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
// 				const chimpkinQuiz = current['correctAnswerIndex'];
// 				const chimpkinQuizAnsers = current['answers'][chimpkinQuiz];
// 				const chimpkinAnswers =  0  + ' : ' + current['answers'][0] + '\n'; 
// 				for(let i = 1; i < current['answers'].length; i++) {
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
// 					const chimpkinChoice = message.match[1];
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
// 		// 		const chimpkinChoice = message.match[1];
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

//     const name_from_msg = message.match[1];


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
