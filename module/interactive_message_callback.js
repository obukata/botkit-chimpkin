//=========================================================
//
// slack button 返答集
//
//=========================================================
'use strict'
module.exports = controller => {

	controller.on('interactive_message_callback', function(bot, message) {
		data.bot = bot
		data.message = message
		if (message.callback_id == 'info') {
			if(message.actions.name == 'info_orientalZodiac') {
				orientalZodiacNow(data)
			}else if(message.actions.name == 'info_paperFortune') {
				if(message.user == maccoto.id) {
					paperFortuneMaccoto(data)
				}else {
					paperFortuneKichi(data)
				}
			}
		}
	})

}