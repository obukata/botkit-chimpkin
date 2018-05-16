//=========================================================
//
// chimpkin クイズ
//
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