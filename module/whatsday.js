//=========================================================
//
// chimpkin 今何年？後何日？
//
//=========================================================
'use strict';
module.exports = controller => {

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

}