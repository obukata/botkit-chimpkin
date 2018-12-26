//=========================================================
//
// chimpkin 干支教えてー
//
//=========================================================
'use strict'
module.exports = controller => {


	// Dataset
	//=========================================================
	let zodiac = {
		0: '申年[さる]',
		1: '酉年[とり]',
		2: '戌年[いぬ]',
		3: '亥年[いのしし]',
		4: '子年[ねずみ]',
		5: '丑年[うし]',
		6: '寅年[とら]',
		7: '卯年[うさぎ]',
		8: '辰年[たつ]',
		9: '巳年[へび]',
		10: '午年[うま]',
		11: '未年[ひつじ]'
	}


	// Controller
	//=========================================================
	controller.hears('干支教えて',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		data.bot = bot
		data.message = message
		orientalZodiacNow(data)
	})
	controller.hears('(.*)年の干支',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		data.bot = bot
		data.message = message
		orientalZodiacYear(data)
	})


	// Model
	//=========================================================
	function orientalZodiacNow(data) {
		const zodiacName = zodiac[chimpkinDate_Y % 12]
		orientalZodiacNowView(data, zodiacName)
	}
	function orientalZodiacYear(data) {
		const zodiacYear = message.match[1]
		const zodiacName = zodiac[data.message.match[1] % 12]
		orientalZodiacYearView(data, zodiacYear, zodiacName)
	}


	// View
	//=========================================================
	function orientalZodiacNowView(data, zodiacName) {
		data.bot.reply(data.message,'今年は *' + zodiacName + '* だよー。\n> 干支の順番：子・丑・寅・卯・辰・巳・午・未・申・酉・戌・亥')
	}
	function orientalZodiacYearView(data, zodiacYear, zodiacName) {
		data.bot.reply(data.message, zodiacYear + '年の干支は *' + zodiacName + '* だよー。')
	}


}