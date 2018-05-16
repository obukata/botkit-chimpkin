//=========================================================
//
// chimpkin 家計簿
//
//=========================================================

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