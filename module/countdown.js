//=========================================================
//
// chimpkin カウントダウン
//
//=========================================================
'use strict'
module.exports = controller => {

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

}