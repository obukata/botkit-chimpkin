//=========================================================
//
// chimpkin ご当地キャラ
//
//=========================================================
'use strict'
module.exports = controller => {

	controller.hears(['(.*)のご当地キャラ'],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
		const charaApi = "59c9c29565db8"
		const charaKeyword = message.match[1]
		const charaKeywordEncode = encodeURIComponent(charaKeyword)
		http.get("http://localchara.jp/services/api/search/query/character?api_key="+ charaApi + "&keyword=" + charaKeywordEncode, (response) => {
			let body = ''
			response.setEncoding('utf8').on('data', (chunk) => {  body += chunk  })
			response.on('end', () => {
				let current = JSON.parse(body)
				if(current['error'] == true) {
					bot.replyWithTyping(message, 'うーん、わかんない…:droplet:')
				}else {
					const charaRand = Math.floor(Math.random() * current['total'])
					let text =
					current['result'][charaRand]['image'] + '\n' +
					current['result'][charaRand]['name'] + '\n' +
					':memo:' + current['result'][charaRand]['profile'] + '\n' +
					'> ' + charaKeyword + "のご当地キャラ総数：" + current['total'] + "体"
					bot.replyWithTyping(message, text)
				}
			})
		})
	})

}