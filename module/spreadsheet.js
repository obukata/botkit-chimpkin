//=========================================================
//
// chimpkin spreadSheet
//
//=========================================================

'use strict'
module.exports = controller => {

	// シートID。複数のシートも複数の変数に入れておけば上手く使えるかも。
	const todoSheet = new GoogleSpreadsheet('1alJOv1DxbBMtqdIkuJO3H2vwoRerfoikzysevr81OOg')
	// const creds = require('../api_google/client_secret.json')
	const creds_json = {
		client_email: 'botkit-chimpkin@botkit-chimpkin.iam.gserviceaccount.com',
		private_key: new Buffer(process.env.GOOGLE_PRIVATE_KEY, 'base64').toString('binary')
	}
	let sheet

	controller.hears('todo all',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		todoSheet.useServiceAccountAuth(creds_json, function(err) {
			console.log('Error: '+err)
			todoSheet.getInfo(function(err, info) {
				// console.log('Loaded doc: '+info.title+' by '+info.author.email)
				sheet = info.worksheets[0]
				// console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount)
				sheet.getCells({
					'min-row': 2,
					'max-row': 20,
					'min-col': 1,
					'max-col': 1,
					'return-empty': true
				}, function(err, cells) {
					var cell = cells[0]
					// console.log('Cell R'+cell.row+'C'+cell.col+' = '+cell.value)
					let text = 'やることリスト！\n'
					let i = 0
					for(i; cells[i].value; i++) {
						text += i + 1 + '. ' + cells[i].value + '\n'
					}
					// console.log(cells[i].value)
					cells[i].value = 'タスク' + (i + 1)
					// console.log(text)
					bot.reply(message, text)
					// sheet.bulkUpdateCells(cells) //async
				})
			})
		})
	})

	controller.hears('todo add (.*)',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		const todoAdd = message.match[1]
		todoSheet.useServiceAccountAuth(creds_json, function(err) {
			todoSheet.getInfo(function(err, info) {
				sheet = info.worksheets[0]
				sheet.getCells({
					'min-row': 2,
					'max-row': 20,
					'min-col': 1,
					'max-col': 1,
					'return-empty': true
				}, function(err, cells) {
					var cell = cells[0]
					let i = 0
					for(i; cells[i].value; i++) {}
					let maxCell = i
					cells[i].value = todoAdd
					cells[i].save()
					bot.reply(message, '「' + todoAdd + '」' + 'を追加したよー。')
				})
			})
		})
	})

	controller.hears('todo complete ((.*))',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
		let todoComplete = message.match[1]
		if(isFinite(todoComplete)) {
			todoComplete--
			todoSheet.useServiceAccountAuth(creds_json, function(err) {
				todoSheet.getInfo(function(err, info) {
					sheet = info.worksheets[0]
					sheet.getRows({
						'offset': 1,
						'limit': 20,
					}, function(err, rows) {
						todoSheet.getInfo(function(err, info) {
							sheet = info.worksheets[0]
							sheet.getCells({
								'min-row': 2,
								'max-row': 20,
								'min-col': 1,
								'max-col': 1,
								'return-empty': true
							}, function(err, cells) {
								var cell = cells[0]
								let todolist = []
								for(let i = 0; cells[i].value; i++) {
									todolist[i] = i + 1 + '. ' + cells[i].value
								}
								if((0 < todoComplete + 1) && (todoComplete + 1 < todolist.length + 1)) {
								console.log(todolist.length)
								console.log(todoComplete)
									bot.reply(message, todolist[todoComplete] + '完了ー！\n')
									rows[todoComplete].del()
								}else {
								console.log(todolist.length)
								console.log(todoComplete)
									bot.reply(message, 'その番号ないよー。')
								}
							})
						})
					})
				})
			})
		}else {
			bot.reply(message, 'todo complete (半角数字) で教えてねー。')
		}
	})

//=========================================================
//
// chimpkin spreadSheet document
//
//=========================================================

		// async.series([
		// 	function setAuth(step) {

		// 		// "credential" TOKENとかkeyとかそんなもん。
		// 		// heroku運用のために、ファイル読み込みじゃなくする必要あり！
		// 		const creds = require('../googleapi/client_secret.json')

		// 		todoSheet.useServiceAccountAuth(creds, step)
		// 	},
		// 	// sheet情報を表示出来る。（debug向け）
		// 	function getInfoAndWorksheets(step) {
		// 		todoSheet.getInfo(function(err, info) {
		// 			console.log('Loaded doc: '+info.title+' by '+info.author.email)
		// 			sheet = info.worksheets[0]
		// 			console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount)
		// 			step()
		// 		})
		// 	},
			// function workingWithRows(step) {
			// 	sheet.getRows({
			// 		offset: 5,
			// 		limit: 20,
			// 		orderby: 'col2'
			// 	}, function( err, rows ){
			// 		console.log('Read '+rows.length+' rows')

			// 		// the row is an object with keys set by the column headers
			// 		rows[0].colname = 'new val'
			// 		rows[0].save() // this is async

			// 		// deleting a row
			// 		rows[0].del()  // this is async

			// 		step()
			// 	})
			// },
			// function workingWithCells(step) {
			// 	sheet.getCells({
			// 		'min-row': 2,
			// 		'max-row': 20,
			// 		'min-col': 1,
			// 		'max-col': 1,
			// 		'return-empty': true
			// 	}, function(err, cells) {
			// 		var cell = cells[0]
			// 		console.log('Cell R'+cell.row+'C'+cell.col+' = '+cell.value)

			// 		// value = 文字列, nurmericVlue = 数値, formula = 関数
			// 		// cell.value == '1'
			// 		// cell.numericValue == 1
			// 		// cell.formula == '=ROW()'

			// 		// updating `value` is "smart" and generally handles things for you
			// 		// cell.value = 123
			// 		// cell.value = '=A1+B2'
			// 		// cell.save() //async

			// 		// bulk updates make it easy to update many cells at once
			// 		// cells[0].value = 'タスク'
			// 		// cells[1].value = '2018/06/08'

			// 		let text = 'やることリスト！\n'
			// 		for(let i = 0; cells[i].value; i++) {
			// 			console.log('on' + i)
			// 			text += i +'. ' + cells[i].value + '\n'
			// 		}
			// 		console.log(text)
			// 		sheet.bulkUpdateCells(cells) //async

			// 		step()
			// 	})
			// },
			// function managingSheets(step) {
			// 	todoSheet.addWorksheet({
			// 		title: 'my new sheet'
			// 	}, function(err, sheet) {

			// 		// change a sheet's title
			// 		sheet.setTitle('new title') //async

			// 		//resize a sheet
			// 		sheet.resize({rowCount: 50, colCount: 20}) //async

			// 		sheet.setHeaderRow(['name', 'age', 'phone']) //async

			// 		// removing a worksheet
			// 		// sheet.del() //async

			// 		step()
			// 	})
			// }
		// ], function(err){
		// 	if( err ) {
		// 		console.log('Error: '+err)
		// 	}
		// })













		// ここでGoogleのAPI関門を通過するらしい。
		// todoSheet.useServiceAccountAuth(creds, function(err) {

		// 	let test = todoSheet.getInfo()

			// console.log(test)


			// todoSheet.getRows(function(err) {
				
			// })


			// 特定のセルを呼び出す。
			// todoSheet.getCells(1, {
			// 	'min-row': 2,
			// 	'max-row': 4,
			// 	'min-col': 1,
			// 	'max-col': 1,
			// }, function(err, cells){
			// 	if(err) throw err
			// 	else bot.reply(message, cells[0].value)
			// })

		// })

}