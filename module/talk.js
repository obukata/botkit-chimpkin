//=========================================================
//
// チンプキン 簡易会話
//
//=========================================================

'use strict';
module.exports = controller => {

//=========================================================
// 会話の振り分け1つにしちゃう？
//=========================================================
// controller.hears('(.*)？',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
// 	const pickMessage = message.match[1]
// 	if(str.match('誕生日')) {

// 	}
// })


	controller.hears('チンプキン',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		bot.reply(message, getRandom([
			'はーいー:hand::skin-tone-2:',
			'何か呼んだ？:chipmunk:',
			'私がチンプキンですよー:stuck_out_tongue_closed_eyes:',
			'なーにー？',
			'ほい'
		]))
	})

	controller.hears('お腹すいた',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		if(message.user == maccoto.id) {
			bot.reply(message, getRandom([
				maccoto.name + '食べる？:apple:',
				'500kcal以内だよー、絶対だよー。',
				'ご飯ご飯！:yum:',
				'ぺこぺこ。ぺこぺこー。',
				maccoto.name + '！' + getRandom(maccoto.like.ramen) + 'なんていかがでしょう！！',
			]))
		}else {
			bot.reply(message, getRandom([
				getRandom(kichi.name) + 'も食べる？:apple:',
				'減塩だよ！' + getRandom(kichi.name),
				'食べて帰るー？:yum:',
				'ぺこぺこ。ぺこぺこー。',
			]))
		}
	})

	controller.hears('佐貫で食べ',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		if(message.user == maccoto.id) {

		}else {
			bot.reply(message, getRandom([
				getRandom(kichi.like.sanuki.dinner) + 'なんてどう？？',
				'んー、' + getRandom(kichi.like.sanuki.dinner) + 'は？',
				'じゃあ、' + getRandom(kichi.like.sanuki.dinner) + 'とかどうどう？',
				'なら、' + getRandom(kichi.like.sanuki.dinner) + 'でしょ！' + getRandom(kichi.name)
			]))
		}
	})

	controller.hears('疲れた',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		bot.reply(message, getRandom([
			'ひまわりの種でも食べる？',
			'一休みしましょー:slightly_smiling_face:',
			'無理しないでね:frowning:',
			'深呼吸してみてー。どう？',
			'ストレッチしてみよー',
			'早く帰ろうよー',
		]))
	})

	controller.hears(['おはよう','おはよー'], ['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		bot.reply(message, getRandom([
			'後5分寝かせてー…',
			'おはようー！:sunny:',
			'今日の天気はどうでしょー。\n<@guinea> さん、天気教えて下さいー。',
		]))
	})

	controller.hears('休憩',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		bot.reply(message, getRandom([
			'一休み一休み♪',
			'ごろごろしたいよー',
			'甘い物が食べたいなー',
			'きゅうけい！きゅうけい！',
		]))
	})

	controller.hears('仕事',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		bot.reply(message, getRandom([
			'フレーフレー:crossed_flags:',
			'Chimpkinのご飯代に為に頑張ってーー！',
			'いつも大変だねー',
			'がんばれがんばれがんばれがんばれー！',
		]))
	})

	controller.hears(['どう思う','どう？','どっちがいい','何がいい','どれに'],['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		bot.reply(message, getRandom([
			'ちょっと待ってね。',
			'うーんとねー',
			'考える！'
		]))
		setTimeout(function() {
			bot.reply(message, getRandom([
				'I=∫Xh(x)r(x)dx=Er[h(x)]',
				'I=∫Xh(x)r(x)q(x)q(x)dx=Eq[h(x)r(x)q(x)]',
				'P(xn+1=en+1|x0=e0,x1=e1,…,xn=en)=P(xn+1=en+1|xn=en)',
				'pijpji=rjri⟺qijα(i→j)qjiα(j→i)=rjri⟺α(i→j)α(j→i)=rjqjiriqij',
				'limN→∞P(min(f(x1),f(x2),…,f(xN))=f(x∗))=1',
				'∑i∈Xripij=rj∑i∈Xpji=rj'
			]))
			setTimeout(function() {
				bot.reply(message, getRandom([
					'わかんない。',
					'いーんじゃない。',
					'悪くはないよ。',
					'いいね！',
					'そうだね。',
					'...Zzz'
				]))
			}, 1000)
		}, 5000)
	})

	controller.hears('柏',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		bot.reply(message, getRandom([
			'田舎の事？:thinking_face:',
			'わーしか！',
			'ベイブ都会へ行く'
		]))
	})

	controller.hears('頑張って',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		bot.reply(message, getRandom([
			'頑張るよー！:smiley:',
			'任せなさい！:sunglasses:',
			'頑張れ頑張れー力の限りがんばれー'
		]))
	})

	controller.hears('車運転',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		bot.reply(message,'気をつけてね:slightly_smiling_face:')
	})

	controller.hears('到着',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		bot.reply(message,'いえーい')
	})

	controller.hears('おやすみ',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		bot.reply(message,'おやすみー:chipmunk::zzz:')
	})

	controller.hears('好き',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		bot.reply(message,'Chimpkinもー:heart_eyes:')
	})

	controller.hears('お寿司',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		bot.reply(message,'お寿司！\nお寿司いいな！:sushi:')
	})

	controller.hears('先に寝て',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		bot.reply(message,'え？うん。わかっ…:zzz:')
	})

	controller.hears('眠たい',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		bot.reply(message,'起きて起きて！:clap::skin-tone-2:')
	})

	controller.hears('頑張ろ',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		bot.reply(message,'おー！:fist::skin-tone-2:')
	})

	controller.hears('助けて',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		bot.reply(message,'待ってて！すぐ行くー！:dash::dash:')
	})

	controller.hears('ただいま',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		bot.reply(message,'おかえりー:raised_hand_with_fingers_splayed::skin-tone-2:')
	})

	controller.hears('パルミジャーノ',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		bot.reply(message,'*レッジャーノ!!*:spaghetti:')
	})

	controller.hears('ねずみ食べる',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		bot.reply(message,'僕…ねずみじゃないよ:fearful:')
	})

	controller.hears('！！',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		bot.reply(message,'！！')
	})

}