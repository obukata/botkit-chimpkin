//=========================================================
//
// chimpkin twitter
//
//=========================================================
const Twitter = require('twitter')

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

