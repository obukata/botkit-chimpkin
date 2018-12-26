//=========================================================
//
// slack button 返答集
//
//=========================================================
'use strict'
module.exports = controller => {

	require('./orientalZodiac.js')(controller)

	controller.on('interactive_message_callback', function(bot, message) {
		if (message.callback_id == 'info') {
			data.bot = bot
			data.message = message
			orientalZodiacNow(data)
			buttonSend(data)
		}
	})

	function buttonSend(data) {
		data.bot.reply(data.message, '押したよ！')
	}

}