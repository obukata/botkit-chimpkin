//=========================================================
//
// 犬の画像をランダム表示！ cronで毎朝癒し画像を…が希望
//
//=========================================================
'use strict'
module.exports = controller => {


	controller.hears(['犬'],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
		http.get('http://shibe.online/api/shibes?count=1', (response) => {
			let body = ''
			response.setEncoding('utf8').on('data', (chunk) => {  body += chunk  })
			response.on('end', () => {
				let current = JSON.parse(body)
				bot.reply(message, 'いぬー。\n' + current[0])
			})
		})
	})

	controller.hears(['猫'],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
		http.get('http://shibe.online/api/cats?count=1', (response) => {
			let body = ''
			response.setEncoding('utf8').on('data', (chunk) => {  body += chunk  })
			response.on('end', () => {
				let current = JSON.parse(body)
				bot.reply(message, 'ねこー。\n' + current[0])
			})
		})
	})

	controller.hears(['鳥'],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
		http.get('http://shibe.online/api/birds?count=1', (response) => {
			let body = ''
			response.setEncoding('utf8').on('data', (chunk) => {  body += chunk  })
			response.on('end', () => {
				let current = JSON.parse(body)
				bot.reply(message, 'とりー。\n' + current[0])
			})
		})
	})
}