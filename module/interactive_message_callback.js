//=========================================================
//
// slack button 返答集
//
//=========================================================
'use strict'
module.exports = controller => {

	controller.on('interactive_message_callback', function(bot, message) {
		if (message.callback_id == 'info') {
			data.bot = bot
			data.message = message
			orientalZodiacNow(data)
		}
	})


}