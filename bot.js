//=========================================================
//
// チンプキン今後の方向性
//
// ---
// 
// 1.会話。何かを聞いてきて、それに答えるとどうこう。
//   （ん？対話する事で何したいの？具体的な案でるまで保留）
// 
// 2.googleの各種apiとの連携
//   やっぱこれっしょ。
//
// 3.ユーザーデータを「google spreadsheet」にて管理
//
// 4.controller.hears 何回も呼び出したほうがいいのか、
//   1回でいろんなifを通したほうがいいのか…。
//
//=========================================================

Botkit = require('botkit')
http = require('http')
request = require('superagent')
Twitter = require('twitter')
Fs = require('fs')
Path = require('path')
GoogleSpreadsheet = require('google-spreadsheet')
async = require('async')

if (!process.env.token) {
	console.log('Error: Specify token in environment')
	process.exit(1)
}else if(!process.env.port) {
	console.log('Error: Specify port in environment')
	process.exit(1)
}

controller = Botkit.slackbot({
	debug: false,
	json_file_store: 'storage_bot_db'
}).configureSlackApp(
	{
		clientId: process.env.clientId,
		clientSecret: process.env.clientSecret,
		scopes: ['bot'],
	}
)

controller.spawn({
	token: process.env.token
}).startRTM(function(err){
	if (err) {
		throw new Error(err)
	}
})

controller.setupWebserver(process.env.port,function(err,webserver) {
	controller.createHomepageEndpoint(controller.webserver)
	controller.createOauthEndpoints(controller.webserver,function(err,req,res) {
		if (err) {
			res.status(500).send('ERROR: ' + err);
		} else {
			res.send('Success!')
		}
	})
	controller.createWebhookEndpoints(controller.webserver)
})



const libraryPath = Path.resolve(__dirname, 'library')
Fs.readdir(libraryPath, (err, list) => {
	for (const file of list) {
		if(file.match('.js')) {
			const pluginPath = Path.resolve(libraryPath, file)
			require(pluginPath)(controller)
		}
	}
})

const modulePath = Path.resolve(__dirname, 'module')
Fs.readdir(modulePath, (err, list) => {
	for (const file of list) {
		if(file.match('.js')) {
			const pluginPath = Path.resolve(modulePath, file)
			require(pluginPath)(controller)
		}
	}
})

controller.hears('button', ['direct_message'],function(bot,message) {
	var reply = {
		"text": "Would you like to play a game?",
		"attachments": [
			{
				"text": "Choose a game to play",
				"fallback": "You are unable to choose a game",
				"callback_id": "wopr_game",
				"color": "#3AA3E3",
				"attachment_type": "default",
				"actions": [
					{
						"name": "game",
						"text": "Chess",
						"type": "button",
						"value": "chess"
					},
					{
						"name": "game",
						"text": "Falken's Maze",
						"type": "button",
						"value": "maze"
					},
					{
						"name": "game",
						"text": "Thermonuclear War",
						"style": "danger",
						"type": "button",
						"value": "war",
						"confirm": {
							"title": "Are you sure?",
							"text": "Wouldn't you prefer a good game of chess?",
							"ok_text": "Yes",
							"dismiss_text": "No"
						}
					}
				]
			}
		]
	}
	bot.reply(message, reply);
})
controller.hears('ローカル？', ['direct_message','direct_mention','mention','ambient'],function(bot,message) {
	bot.reply(message, 'ローカライゼーション！')
})
controller.on('interactive_message_callback', function(bot, message) {
	console.log('test')
	bot.reply(message, 'ボタン押した！')
	var users_answer = message.actions[0].name;
	if (message.callback_id == "test_button") {
		bot.replyInteractive(message, "あなたは「" + users_answer + "」を押しました");
	}
})