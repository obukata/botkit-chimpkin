//=========================================================
//
// chimpkin infogram
//
//=========================================================

// https://developers.infogr.am/rest/
// できそうでできない。あとはまかせた。みらいのぼく。


// controller.hears('グラフ',['direct_message','direct_mention','mention','ambient'],function(bot,message) {
// 	const infogram = new InfogramAPI('ctMfRb1kWqbQX87hN4dq5V7Og8xmFZH6', '2bCt8E9SVGh73uPIWqvx0emyoZKxVgq4');
// 	// infogram.updateProject(project_id, 2525).then(function(data) {

// 	infogram.getProject('7f798e4a-84e4-4c02-af1f-20e99c6f9bf5', { format: 'json' }).then(function(data) {
// 	  fs.writeFile('graph.txt', data, function(err) {
// 	    if(err) {
// 	      return console.log(err);
// 	    }

// 	    console.log('The file was saved!');
// 	  });
// 	}, function(err) {
// 	  console.error(err);
// 	});

// 	// infogram.getProject('7f798e4a-84e4-4c02-af1f-20e99c6f9bf5').then(function(data) {
// 	//   console.log(data);
// 	// }, function(err) {
// 	//   console.error(err);
// 	// });
// 	// infogram.getLibrary().then(function(data) {
// 	// 	console.log(data);
// 	// 	bot.replyWithTyping(message, data[0]['thumbnail_url']);
// 	// }, function(err) {
// 	// 	bot.replyWithTyping(message, 'あれ？何かおかしいー。\n> ' + err );
// 	// });
// });