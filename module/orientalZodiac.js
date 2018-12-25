//=========================================================
//
// chimpkin 干支教えてー
//
//=========================================================
'use strict'
module.exports = controller => {

	const zodiacList = {
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


	function orientalZodiac() {
		let zodiac = new Object()
		zodiac.Name = zodiacList[chimpkinDate_Y % 12]
		zodiac.Year = message.match[1]
		bot.reply(message,'今年は *' + zodiac.Name + '* だよー。\n> 干支の順番：子・丑・寅・卯・辰・巳・午・未・申・酉・戌・亥')
	}

	function orientalZodiacYear(zodiacYear) {
		let zodiac = new Object()
		zodiac.Name = zodiacList[zodiacYear % 12]
		bot.reply(message, zodiac.Year + '年の干支は *' + zodiac.Name + '* だよー。')
	}


	controller.hears('干支教えて',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		orientalZodiac()
	})
	controller.hears('(.*)年の干支',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		orientalZodiacYear(message.match[1])
	})


}