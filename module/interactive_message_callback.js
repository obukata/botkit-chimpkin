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
			if(message.actions[0].name == 'info_orientalZodiac') {
				orientalZodiacNow(data)
			}else if(message.actions[0].name == 'info_paperFortune') {
				if(message.user == maccoto.id) {
					paperFortuneMaccoto(data)
				}else {
					paperFortuneKichi(data)
				}
			}else if(message.actions[0].name == 'info_horoscopes') {
				bot.reply(message, {
				'text': 'どの星座？',
					'attachments': [{
						'fallback': ':thinking_face:？',
						'callback_id': 'info',
						'color': '#6c4317',
						'actions': [
							{'type': 'button', 'name': 'info_horoscopes_00', 'text': '牡羊座'},
							{'type': 'button', 'name': 'info_horoscopes_01', 'text': '牡牛座'},
							{'type': 'button', 'name': 'info_horoscopes_02', 'text': '双子座'},
							{'type': 'button', 'name': 'info_horoscopes_03', 'text': '蟹座'},
							{'type': 'button', 'name': 'info_horoscopes_04', 'text': '獅子座'},
							{'type': 'button', 'name': 'info_horoscopes_05', 'text': '乙女座'},
							{'type': 'button', 'name': 'info_horoscopes_06', 'text': '天秤座'},
							{'type': 'button', 'name': 'info_horoscopes_07', 'text': '蠍座'},
							{'type': 'button', 'name': 'info_horoscopes_08', 'text': '射手座'},
							{'type': 'button', 'name': 'info_horoscopes_09', 'text': '山羊座'},
							{'type': 'button', 'name': 'info_horoscopes_10', 'text': '水瓶座'},
							{'type': 'button', 'name': 'info_horoscopes_11', 'text': '魚座'}
						]
					}]
				})
			}else if(message.actions[0].name == 'info_horoscopes_00') {
				const augurySign = 0
				horoscopes(data, augurySign)
			}else if(message.actions[0].name == 'info_horoscopes_01') {
				const augurySign = 1
				horoscopes(data, augurySign)
			}else if(message.actions[0].name == 'info_horoscopes_02') {
				const augurySign = 2
				horoscopes(data, augurySign)
			}else if(message.actions[0].name == 'info_horoscopes_03') {
				const augurySign = 3
				horoscopes(data, augurySign)
			}else if(message.actions[0].name == 'info_horoscopes_04') {
				const augurySign = 4
				horoscopes(data, augurySign)
			}else if(message.actions[0].name == 'info_horoscopes_05') {
				const augurySign = 5
				horoscopes(data, augurySign)
			}else if(message.actions[0].name == 'info_horoscopes_06') {
				const augurySign = 6
				horoscopes(data, augurySign)
			}else if(message.actions[0].name == 'info_horoscopes_07') {
				const augurySign = 7
				horoscopes(data, augurySign)
			}else if(message.actions[0].name == 'info_horoscopes_08') {
				const augurySign = 8
				horoscopes(data, augurySign)
			}else if(message.actions[0].name == 'info_horoscopes_09') {
				const augurySign = 9
				horoscopes(data, augurySign)
			}else if(message.actions[0].name == 'info_horoscopes_10') {
				const augurySign = 10
				horoscopes(data, augurySign)
			}else if(message.actions[0].name == 'info_horoscopes_11') {
				const augurySign = 11
				horoscopes(data, augurySign)
			}
		}
	})

}