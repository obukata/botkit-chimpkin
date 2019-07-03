//=========================================================
//
// チンプキン 対話
//
//=========================================================
'use strict'
module.exports = controller => {


/**
 * 調査事項
 * ・conversationを始めた人とbot間でしか反応しない？
 * 　（ユーザAが始動させたconvoはユーザBでは回答出来ない？）
 * ・convo.repeatに変数持たす事できる？
 * 　（repeat時にまたランダム動いて、次の問題出されたら困る。）
 * 　→特に気にしなくても問題なかったっす。
 * 
 * 第一フェーズ（最低限本番）
 * ・手動で作ったjsonファイルを用意する。
 * ・リザルトUI作成
 * ・問題の重複させない
 * ・問題リスト出し尽くしたら自動で終了処理
 * ・一定時間答えないと終了処理
 * 
 * 第二フェーズ（希望的要件）
 * ・spreadSheetをAPIがわりに使用する。
 * ・最初に出題数を選べるようにしてみる。
 * 
 * 第三フェーズ（過剰型要件）
 * ・spreadSheetにリザルトと日付をデータ化するべし
 * 
 **/

	let exampleQuizList = [
		{
			"question": "ミッキーのガールフレンドで頭にリボンをつけている女の子は？",
			"choice": [
				"ミニー",
				"デイジー",
				"マリー"
			],
			"correct": 1
		},
		{
			"question": "ミッキーの飼っている犬の名前は？",
			"choice": [
				"ジョン",
				"プルート",
				"ダニエル"
			],
			"correct": 2
		},
		{
			"question": "デイジーという恋人がいる青い服を着た鳥のキャラクターは？",
			"choice": [
				"ロナウドダック",
				"トランプダック",
				"ドナルドダック"
			],
			"correct": 3
		},
		{
			"question": "茶色いリスの二人組のキャラクターは？",
			"choice": [
				"チャップ&デール",
				"チップ&デール",
				"チップ&ディール",
			],
			"correct": 2
		}
	]
	let result = {
		"totalQuestion": 0,
		"totalCorrect": 0,
	}

	const quizFunc = (bot, message, result) => {
		bot.startConversation(message, (err, convo) => {
			let number = Math.floor(Math.random()*(exampleQuizList.length - 1))
			console.log(number)
			result.totalQuestion++
			convo.say('デデン！')
			convo.ask(
				'第' + result.totalQuestion + '問：\n' + 
				exampleQuizList[number].question + '\n' + 
				'1: ' + exampleQuizList[number].choice[0] + '\n' + 
				'2: ' + exampleQuizList[number].choice[1] + '\n' + 
				'3: ' + exampleQuizList[number].choice[2], 
				[{
					pattern: '1',
					callback: (response, convo) => {
						if(exampleQuizList[number].correct == response.text) {
							convo.say('正解ー！')
							result.totalCorrect++
						}else {
							convo.say('不正解ー！')
						}
						convo.next()
						quizFunc(bot, message, result)
					}
				}, {
					pattern: '2',
					callback: (response, convo) => {
						if(exampleQuizList[number].correct == response.text) {
							convo.say('正解ー！')
							result.totalCorrect++
						}else {
							convo.say('不正解ー！')
						}
						convo.next()
						quizFunc(bot, message, result)
					}
				}, {
					pattern: '3',
					callback: (response, convo) => {
						if(exampleQuizList[number].correct == response.text) {
							convo.say('正解ー！')
							result.totalCorrect++
						}else {
							convo.say('不正解ー！')
						}
						convo.next()
						quizFunc(bot, message, result)
					}
				}, {
					pattern: 'ストップ',
					callback: (response, convo) => {
						if(0 < result.totalQuestion - 1) {
						convo.say('結果発表ー！')
						convo.say(
							'正解数：' + result.totalCorrect + ' / ' + (result.totalQuestion - 1) + '\n' + 
							'正解率：' + Math.round(result.totalCorrect / (result.totalQuestion - 1) * 100) + '%'
						)
					}else {
						convo.say('やらんのかーい')
					}
						convo.next()
						result.totalQuestion = 0
						result.totalCorrect = 0
					}
				}, {
					default: true,
					callback: (response, convo) => {
						convo.say('半角の1〜3で答えるのだ。')
						convo.repeat()
						convo.next()
					}
				}]
			)
		})
	}


	controller.hears('クイズ', ['direct_message','direct_mention','mention','ambient'], (bot, message) => {
		bot.reply(message, 'おっけー、クイズ出すよ！')
		quizFunc(bot, message, result)
	})
}