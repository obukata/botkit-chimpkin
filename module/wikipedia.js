//=========================================================
//
// chimpkin pedia
//
//=========================================================
'use strict';
module.exports = controller => {

	const WIKIPEDIA_URL = 'https://ja.wikipedia.org/wiki/'

	controller.hears(['(.*)って何'], 'direct_message,direct_mention,mention,ambient', function (bot, message) {
		const word = message.match[1]
		request
		.get('https://ja.wikipedia.org/w/api.php')
		.query({
			format : 'json',
			action : 'query',
			prop   : 'extracts',
			exintro: '',
			explaintext: '',
			titles : word
		})
		.end(function (err, res) {
			const query = res.body.query
			if (query && query.pages) {
				for (let p in query.pages) {
					let content = query.pages[p].extract
					if (content) {
						// slackで引用スタイルを適用するために`>` をつける
						content = '> ' + content.replace(/\n/g, '\n> ')
					}
					else {
						content = '見つからなかった'
					}
					bot.reply(message, [
						content,
						WIKIPEDIA_URL + word
					].join('\r\n'))
					return
				}
			}
		})
	})

}