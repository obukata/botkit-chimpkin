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
						'actions': [{
							'name': 'horoscopes_list',
							'text': '選ぶのだ',
							'type': 'select',
							'options': [
								{'text': '牡羊座', 'value': 0},
								{'text': '牡牛座', 'value': 1},
								{'text': '双子座', 'value': 2},
								{'text': '蟹座', 'value': 3},
								{'text': '獅子座', 'value': 4},
								{'text': '乙女座', 'value': 5},
								{'text': '天秤座', 'value': 6},
								{'text': '蠍座', 'value': 7},
								{'text': '射手座', 'value': 8},
								{'text': '山羊座', 'value': 9},
								{'text': '水瓶座', 'value': 10},
								{'text': '魚座', 'value': 11},
							]
						}]
					}]
				})
			}else if(message.actions[0].name == 'horoscopes_list') {
				const auguryNum = message.actions[0].selected_options[0].value
				horoscopes(data, auguryNum)
			}
		}
	})

}