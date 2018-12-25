//=========================================================
//
// slack button 返答集
//
//=========================================================
'use strict'
module.exports = controller => {

	controller.on('interactive_message_callback', function(bot, message) {
		if (message.callback_id == 'info_orientalZodiac') {
			bot.reply(message, '押したよ')
			orientalZodiac()
		}
	})


}