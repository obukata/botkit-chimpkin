//=========================================================
//
// chimpkin お題！
//
//=========================================================
'use strict'
module.exports = controller => {

	controller.hears('theme 動物',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		let theme_animal = getRandom([
			'イヌ',
			'ネコ',
			'シマリス',
			'ライオン',
			'トラ',
			'チーター',
			'ヒョウ',
			'パンダ',
			'タヌキ',
			'ゾウ',
			'コアラ',
			'ブタ',
			'カバ',
			'コアラ',
			'クマ',
			'フェレット',
			'モルモット',
			'ハムスター',
			'ウサギ',
			'ワニ',
			'チンチラ',
			'ロバ',
			'ネズミ',
			'デグー',
			'フラミンゴ',
			'スズメ',
			'ハト',
			'イルカ',
			'クジラ',
			'サル',
			'サメ',
			'サイ',
			'オランウータン',
			'アシカ',
			'カメ',
			'アゲハチョウ',
			'カブトムシ',
			'クワガタムシ',
			'イカ',
			'タコ',
		])
		bot.reply(message, '「' + theme_animal + '」です！')
	})

	// controller.hears('お題中級',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	// 	let theme_action = getRandom([
	// 		'ご飯を食べてる',
	// 		'',
	// 	])
	// 	let theme_who = getRandom([
	// 		'',
	// 	])
	// 	bot.reply(message, theme_action + theme_who + 'を描いて下さいー。')
	// })

}