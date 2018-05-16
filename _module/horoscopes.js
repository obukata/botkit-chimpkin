//=========================================================
//
// chimpkin 星座占い
//
//=========================================================

controller.hears(['(.*)の運勢'],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
	const augurySign = message.match[1]
	const auguryNum = asterism[augurySign]
	if(auguryNum == "none") {
		bot.replyWithTyping(message, 'その星座知らない…:droplet:')
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
				':crown:' + current['horoscope'][auguryNowDate][auguryNum]['rank'] + '位：' + current['horoscope'][auguryNowDate][auguryNum]['sign'] + 'の今日の運勢\n' +
				current['horoscope'][auguryNowDate][auguryNum]['content'] + '\n' +
				'> :moneybag:金運　：' + asterismLuck[current['horoscope'][auguryNowDate][auguryNum]['money']] + '\n' +
				'> :briefcase:仕事運：' + asterismLuck[current['horoscope'][auguryNowDate][auguryNum]['job']] + '\n' +
				'> :heart:恋愛運：' + asterismLuck[current['horoscope'][auguryNowDate][auguryNum]['love']]
				bot.replyWithTyping(message, text)
			})
		})
	}
})

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