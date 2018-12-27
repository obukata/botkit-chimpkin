//=========================================================
//
// chimpkin カウントダウン
//
//=========================================================
'use strict'
module.exports = controller => {


	// Controller
	//=========================================================
	controller.hears('カウントダウン(.*)秒前',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		data.bot = bot
		data.message = message
		let countDownNum = parseInt(message.match[1])
		countdown(data, countDownNum)
	})


	// Model
	//=========================================================
	global.countdown = function(data, countDownNum) {
		if(1 <= countDownNum && countDownNum <= 3600) {
			countdownStartView(data)
			const countDownTimer = setInterval(function() {
				if(1 <= countDownNum && countDownNum <= 5) {
					countdownSecondsView(data, countDownNum)
					countDownNum--
				}else if(6 <= countDownNum && countDownNum <= 60) {
					if(countDownNum % 10) {
						countDownNum--
					}else {
						countdownSecondsView(data, countDownNum)
						countDownNum--
					}
				}else if(61 <= countDownNum && countDownNum <= 3600) {
					if(countDownNum % (60 * 10)) {
						countDownNum--
					}else {
						countdownMinitsView(data, countDownNum)
						countDownNum--
					}
				}else {
					countdownView(data)
					clearInterval(countDownTimer)
				}
			}, 1000)
		}else if(3600 <= countDownNum) {
			countdownErrorView(data)
		}else {
			countdownLongErrorView(data)
		}
	}


	// View
	//=========================================================
	global.countdownStartView = function(data) {
		data.bot.reply(data.message, 'おっけー！')
	}
	global.countdownSecondsView = function(data, countDownNum) {
		data.bot.reply(data.message, countDownNum + '秒前！')
	}
	global.countdownMinitsView = function(data, countDownNum) {
		data.bot.reply(data.message, countDownNum / 60 + '分前！')
	}
	global.countdownView = function(data) {
		data.bot.reply(data.message, ':boom:どかーん！:boom:')
	}
	global.countdownErrorView = function(data) {
		data.bot.reply(data.message, '何かおかしーよー')
	}
	global.countdownLongErrorView = function(data) {
		data.bot.reply(data.message, '長くないー？:expressionless:')
	}


}