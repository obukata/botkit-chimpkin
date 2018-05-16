//=========================================================
//
// 対話テスト
//
//=========================================================

// controller.hears(['選んで'], 'direct_message,direct_mention,mention', function (bot, message) {
// 	bot.reply(message, 'かしこまった！');
// 	// 会話を開始します。
// 	bot.startConversation(message, function (err, convo) {
// 		// convo.ask() で質問をします。
// 		convo.ask('どれから選びましょー。\n`A,B,C`みたいに、`,`で区切って教えてちょ', [
// 			{
// 				pattern: '醤油', // マッチさせる単語
// 				callback: function (response, convo) {
// 					// ▼ マッチした時の処理 ▼
// 					convo.say('正解！:ok_woman:\n醤油！これぞ王道！:+1:'); // convo.say()で発言をします。
// 					convo.next(); // convo.next()で、会話を次に進めます。通常は、会話が終了します。
// 				}
// 			},{
// 				pattern: '味噌',
// 				callback: function (response, convo) {
// 					convo.say('正解！:ok_woman:\n寒いと味噌たべたくなります！:+1:');
// 					convo.next();
// 				}
// 			},{
// 				default: true,
// 				callback: function (response, convo) {
// 					// ▼ どのパターンにもマッチしない時の処理 ▼
// 					convo.say('うーん、おしいです！:no_good:');
// 					convo.repeat(); // convo.repeat()で、質問を繰り返します。
// 					convo.next(); // 会話を次に進めます。この場合、最初の質問にも戻ります。
// 				}
// 			}
// 		]);
// 	})
// });