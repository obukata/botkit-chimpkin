//=========================================================
//
// chimpkin 星座占い
//
//=========================================================
'use strict'
module.exports = controller => {


	// Dataset
	//=========================================================
	const asterism = {
		'牡羊座':		0,
		'牡牛座':		1,
		'双子座':		2,
		'蟹座':			3,
		'獅子座':		4,
		'乙女座':		5,
		'天秤座':		6,
		'蠍座':			7,
		'射手座':		8,
		'山羊座':		9,
		'水瓶座':		10,
		'魚座':			11
	}
	const asterismLuck = {
		5: '★★★★★',
		4: '★★★★☆',
		3: '★★★☆☆',
		2: '★★☆☆☆',
		1: '★☆☆☆☆',
		0: '☆☆☆☆☆'
	}


	// Controller
	//=========================================================
	controller.hears(['(.*)の運勢'],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
		data.bot = bot
		data.message = message
		const augurySign = message.match[1]
		const auguryNum = asterism[augurySign]
		horoscopes(data, auguryNum)
	})


	// Model
	//=========================================================
	global.horoscopes = function(data, auguryNum) {
		if(auguryNum == "none") {
			horoscopesError(data)
		}else {
			const auguryDate = new Date()
			const auguryNowDate_Y = auguryDate.getFullYear()
			const auguryNowDate_M = ('0'+ (parseInt(auguryDate.getMonth()) + 1)).slice(-2)
			const auguryNowDate_D = ('0'+ (auguryDate.getDate())).slice(-2)
			const auguryNowDate = auguryNowDate_Y + "/" + auguryNowDate_M + "/" + auguryNowDate_D
			http.get("http://api.jugemkey.jp/api/horoscope/free/"+ auguryNowDate, (response) => {
				let body = ''
				response.setEncoding('utf8').on('data', (chunk) => {  body += chunk  })
				response.on('end', () => {
					let current = JSON.parse(body)
					let text =
					':crown:' + current['horoscope'][auguryNowDate][0]['rank'] + '位：' + current['horoscope'][auguryNowDate][0]['sign'] + 'の今日の運勢\n' +
					current['horoscope'][auguryNowDate][0]['content'] + '\n' +
					'> :moneybag:金運　：' + asterismLuck[current['horoscope'][auguryNowDate][0]['money']] + '\n' +
					'> :briefcase:仕事運：' + asterismLuck[current['horoscope'][auguryNowDate][0]['job']] + '\n' +
					'> :heart:恋愛運：' + asterismLuck[current['horoscope'][auguryNowDate][0]['love']]
					horoscopesView(data, text)
				})
			})
		}
	}


	// View
	//=========================================================
	global.horoscopesView = function(data, text) {
		data.bot.replyWithTyping(data.message, text)
	}
	global.horoscopesError = function(data) {
		data.bot.replyWithTyping(data.message, 'その星座知らない…:droplet:')
	}


}