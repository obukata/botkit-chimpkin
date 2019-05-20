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
 * 	（ユーザAが始動させたconvoはユーザBでは回答出来ない？）
 * ・convo.repeatに変数持たす事できる？
 * 	（repeat時にまたランダム動いて、次の問題出されたら困る。）
 * 
 * 第一フェーズ
 * ・手動で作ったjsonファイルを用意する。
 * ・リザルトUI作成
 * 
 * 第二フェーズ
 * ・spreadSheetをAPIがわりに使用する。
 * ・最初に出題数を選べるようにしてみる。
 * 
 * 第三フェーズ
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
	// let inputCorrect = 1
	// const quizInit = (list, result) => {
		// result.totalQuestion++
		// console.log(list[0].question)
		// console.log(list[0].choice[0])
		// console.log(list[0].choice[1])
		// console.log(list[0].choice[2])
		// console.log(list[0].choice[3])
		// console.log(result.totalCorrect + '/' + result.totalQuestion)
		// console.log(result.totalCorrect / result.totalQuestion * 100 + '%')
		// return list
	// }

	const quizFunc = (list, result) => {
		if(list[0].correct == inputCorrect) {
			result.totalCorrect++
			console.log("あなたの回答:" + inputCorrect + "\n正解回答:" + list[0].correct + "\n\n正解!\nまだやる？y/n")
			inputCorrect++
			quizInit(exampleQuizList, result)
		}else {
			console.log("あなたの回答:" + inputCorrect + "\n正解回答:" + list[0].correct + "\n\n不正解!\nまだやる？y/n")
		}
	}


	controller.hears('クイズ', ['direct_message','direct_mention','mention','ambient'], (bot, message) => {
		bot.startConversation(message, (err, convo) => {
			convo.say('おっけー、クイズ出すよ！')
			convo.say('では、問題！')
			convo.ask(exampleQuizList[0].question + '\n1: ' + exampleQuizList[0].choice[0] + '\n2: ' + exampleQuizList[0].choice[1] + '\n3: ' + exampleQuizList[0].choice[2], [{
				pattern: '1',
				callback: (response, convo) => {
					if(exampleQuizList[0].correct == response.text) {
						convo.say('正解ー！')
						result.totalCorrect++
					}else {
						convo.say('不正解ー！')
					}
					result.totalQuestion++
					convo.next()
				}
			}, {
				pattern: '2',
				callback: (response, convo) => {
					if(exampleQuizList[0].correct == response.text) {
						convo.say('正解ー！')
						result.totalCorrect++
					}else {
						convo.say('不正解ー！')
					}
					result.totalQuestion++
					convo.next()
				}
			}, {
				pattern: '3',
				callback: (response, convo) => {
					if(exampleQuizList[0].correct == response.text) {
						convo.say('正解ー！')
						result.totalCorrect++
					}else {
						convo.say('不正解ー！')
					}
					result.totalQuestion++
					convo.next()
				}
			}, {
				pattern: 'ストップ',
				callback: (response, convo) => {
					convo.say('はーい、終了！')
					convo.next()
				}
			}, {
				default: true,
				callback: (response, convo) => {
					convo.say('半角の1〜3で答えるのだ。')
					convo.repeat()
					convo.next()
				}
			}])
		})
	})
}