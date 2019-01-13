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

// if (!process.env.token) {
// 	console.log('Error: Specify token in environment')
// 	process.exit(1)
// }else if(!process.env.port) {
// 	console.log('Error: Specify port in environment')
// 	process.exit(1)
// }
if (!process.env.clientId || !process.env.clientSecret || !process.env.port) {
	console.log('Error: Specify clientId clientSecret and port in environment')
	process.exit(1)
}

controller = Botkit.slackbot({
	// interactive_replies: true, // tells botkit to send button clicks into conversations
	// json_file_store: './storage_bot_db/',
}).configureSlackApp({
	clientId: process.env.clientId,
	clientSecret: process.env.clientSecret,
	scopes: ['bot'],
})

controller.setupWebserver(process.env.port,function(err,webserver) {
	controller.createWebhookEndpoints(controller.webserver)
	controller.createOauthEndpoints(controller.webserver,function(err,req,res) {
		if (err) {
			res.status(500).send('ERROR: ' + err)
		}else {
			res.send('Success!')
		}
	})
})

// just a simple way to make sure we don't
// connect to the RTM twice for the same team
var _bots = {}
function trackBot(bot) {
	_bots[bot.config.token] = bot
}

controller.on('create_bot',function(bot,config) {
	if (_bots[bot.config.token]) {
	// already online! do nothing.
	} else {
		bot.startRTM(function(err) {
			if (!err) {
				trackBot(bot)
			}
			bot.startPrivateConversation({user: config.createdBy},function(err,convo) {
				if (err) {
					console.log(err)
				} else {
					convo.say('やあ')
				}
			})
		})
	}
})

// Handle events related to the websocket connection to Slack
controller.on('rtm_open',function(bot) {
	console.log('** The RTM api just connected!')
	console.log('** チンプキン起動！')
})
controller.on('rtm_close',function(bot) {
	console.log('** The RTM api just closed')
	console.log('** チンプキン寝たかも？')
	// you may want to attempt to re-open
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