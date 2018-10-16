//=========================================================
//
// chimpkin おみくじ
//
//=========================================================
'use strict'
module.exports = controller => {

	controller.hears('おみくじ',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		if(message.user == maccoto.id) {
			bot.reply(message, mtRandom([
				// '*大吉* 今日はダブルエリアルがよく来まるぜ:sunglasses:',
				'*大吉* ' + getRandom(kichi.name) + 'が' + maccoto.name + 'に美味しいもの食べさせてくれるぜ！ :sunglasses:',
				'*大吉* ' + maccoto.name + '、今日も最高だぜ:sunglasses:',
				'*大吉* どれだけ食べても太らない気がするぜ:sunglasses:',
				// '*大吉* 今日のラッキーラーメンは' + getRandom(maccoto.like.ramen) + 'だぜ:sunglasses:',
				'*大吉* どれだけごろごろしても怒られないぜ:sunglasses:',
				'*大吉* 今日は最高の日だぜ:sunglasses:',
				'*大吉* 素晴らしい日になりそうだぜ:sunglasses:',
				'*大吉* awesomeだぜ:sunglasses:',
				'*大吉* 何事もうまく行くんだぜ:sunglasses:',
				'*大吉* ラーメン食べたつもり貯金で、家が買えるようになるんだぜ:sunglasses:',
				'*中吉* 常人の2倍運がいいんだぜ:sunglasses:',
				'*中吉* 無くしたものも2倍になって帰ってくるぜ:sunglasses:',
				// '*小吉* 今日は対戦で勝ちまくれるぜ:sunglasses:',
				// '*吉* 対戦は止めた方がいいかも。トレーニングモードで精度を上げよー。',
				'*吉* お腹はすくけど、ナッツ食べて頑張ろう！…少し分けてね:drooling_face:',
				'*輪* 自転車乗らないと！乗らないとダメだよ！',
				'*輪* 今日は、' + getRandom(['20km', '30km', '40km', '50km']) + 'ぐらい走ってみるのはどう？',
			], chimpkinDate_Y + chimpkinDate_M + chimpkinDate_D))
		}else {
			bot.reply(message, mtRandom([
				'*大吉* いい日になるよいいねー',
				'*大吉* 美味しいご飯屋さんが見つかるかも！新規開拓してみるのだー:drooling_face:',
				'*大吉* とっても成長出来る日。積極的に挑戦するのだ',
				'*中吉* 芸術日和だよ！たまには本とか映画とか見てみるのもいいよー',
				'*中吉* 今日は甘ーいものを食べるとよいよい',
				'*中吉* まぁまぁな日もあるよねー',
				'*中吉* 新しい趣味を作ってみよう！んーとね、オススメは' + getRandom(maccoto.hobby) + 'だよ。',
				'*中吉* 料理上達デー！たまには料理を練習するのだ:male-cook::skin-tone-2:',
				'*小吉* ちょっとくらいの幸せが心地いいもんだよねー',
				'*小吉* ピリっとしたものを食べて元気出していきましょう！',
				'*小吉* 気分転換にお散歩してみましょー。何か見つかるかも？',
				// '*小吉* 待ち人は来ないけど元気だして！',
				'*吉* ' + getRandom(kichi.name) + 'が出たら大当たりー！パフパフ♪',
				// '*吉* 自転車に乗ろう！いっぱい乗ろう！',
				'*吉* 無駄遣いには気をつければ吉だよ！',
				// '*吉* 何か失敗した時は、心の中で「やらかしてもうたーー！」と叫んでみましょう。',
				'*吉* 目を閉じて深く深呼吸。少し楽になるかもよー',
				'*吉* 太陽の光に当たりましょう。気持ちいいよー',
				// '*吉* 今日は格ゲーの練習してみましょー！',
				// '*半吉* @guinea さんとお喋りするとパワー回復するよ！',
				'*半吉* ' + getRandom(kichi.name) + '半人前パワー',
				// '*末吉* ' + getRandom(kichi.name) + 'の末の姿。おばあちゃん。',
				'*凶* :scream:',
				'*欲* お肉が食べたくなーる。美味しいお肉が食べたくなーる。',
				'ちょっと、今忙しい！:risu::dash:',
			], chimpkinDate_Y + chimpkinDate_M + chimpkinDate_D))
		}
	})

}