//=========================================================
//
// chimpkin おみくじ
//
//=========================================================
'use strict';
module.exports = controller => {

	controller.hears('おみくじ',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		if(message.user == maccoto.id) {
			bot.reply(message, getRandom([
				'*大吉* 今日はダブルエリアルがよく来まるぜ:sunglasses:',
				'*大吉* ' + getRandom(kichi.name) + 'が' + maccoto.name + 'に美味しいもの食べさせてくれるぜ！ :sunglasses:',
				'*大吉* ' + maccoto.name + '、今日も最高だぜ:sunglasses:',
				'*大吉* どれだけ食べても太らない気がするぜ:sunglasses:',
				'*大吉* 今日のラッキーラーメンは' + getRandom(maccoto.like.ramen) + 'だぜ:sunglasses:',
				'*大吉* どれだけごろごろしても怒られないぜ:sunglasses:',
				'*大吉* 今日は最高の日だぜ:sunglasses:',
				'*大吉* 素晴らしい日になりそうだぜ:sunglasses:',
				'*大吉* awesomeだぜ:sunglasses:',
				'*大吉* 何事もうまく行くんだぜ:sunglasses:',
				'*中吉* 常人の2倍運がいいんだぜ:sunglasses:',
				'*中吉* 無くしたものも2倍になって帰ってくるぜ:sunglasses:',
				'*小吉* 今日は対戦で勝ちまくれるぜ:sunglasses:',
			]))
		}else {
			bot.reply(message, getRandom([
				'*大吉* いい日になるよいいねー',
				'*中吉* 今日は甘ーいものを食べるとよいよい',
				'*中吉* まぁまぁな日もあるよねー',
				'*小吉* ちょっとくらいの幸せが心地いいもんだよねー',
				'*小吉* ピリっとしたものを食べて元気出していきましょう！',
				'*小吉* 待ち人は来ないけど元気だして！',
				'*吉* ' + getRandom(kichi.name) + 'が出たら大当たりー！パフパフ♪',
				'*吉* 自転車に乗ろう！いっぱい乗ろう！',
				'*吉* 無駄遣いには気をつければ吉だよ！',
				'*吉* 何か失敗した時は、心の中で「やらかしてもうたーー！」と叫んでみましょう。',
				'*吉* 目を閉じて深く深呼吸。少し楽になるかもよー',
				'*吉* 太陽の光に当たりましょう。気持ちいいよー',
				'*半吉* @guinea さんとお喋りするとパワー回復するよ！',
				'*半吉* ' + getRandom(kichi.name) + '半人前パワー',
				'*末吉* ' + getRandom(kichi.name) + 'の末の姿。おばあちゃん。',
				'*凶* :scream:',
				'*欲* お肉が食べたくなーる。美味しいお肉が食べたくなーる。',
				'*吉* 今日は格ゲーの練習してみましょー！',
			]))
		}
	})

}