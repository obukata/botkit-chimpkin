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
Spreadsheet = require('edit-google-spreadsheet')
Fs = require('fs')
Path = require('path')

if (!process.env.token) {
	console.log('Error: Specify token in environment')
	process.exit(1)
}

controller = Botkit.slackbot({
	debug: false,
	json_file_store: 'storage_bot_db'
})

controller.spawn({
	token: process.env.token
}).startRTM(function(err){
	if (err) {
		throw new Error(err)
	}
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