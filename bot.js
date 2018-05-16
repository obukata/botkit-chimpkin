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


var load = function(path, file) {
	var ext = Path.extname(file)
	var full = Path.join(path, Path.basename(file, ext))

	try {
		var script = require(full)
		if (typeof script === 'function') {
			script(this)
		}
	}catch(error) {
		console.log(error)
		process.exit(1)
	}
}

var path = Path.resolve('.', 'module')

Fs.readdirSync(path).sort().forEach(function(file) {
	load(path, file)
})