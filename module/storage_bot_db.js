//=========================================================
//
// chimpkin 名前を覚える(データを保存する)
//
//=========================================================

// Botが、シャットダウン/再起動するまでの間、データを保持する事ができます。
// 保存、取得、削除、すべて削除 の4つの操作ができます。

//  [例]
//    controller.storage.users.save({id: message.user, foo:'bar'}, function(err) { ... });
//    controller.storage.users.get(id, function(err, user_data) {...});
//    controller.storage.users.delete(id, function(err) {...});
//    controller.storage.users.all(function(err, all_user_data) {...});


// Botkitは、「ユーザー」「チャンネル」「チーム」ごとにデータを保持できます。
// それぞれ、下記のように呼び出せます。

//  [例]
//    controller.storage.users.***
//    controller.storage.channels.***
//    controller.storage.teams.***


// controller.hears(['ラーメン食べた'], 'direct_message,direct_mention,mention','ambient' function (bot, message) {
//     // 「◯◯って呼んで」の、◯◯の部分を取り出します。
//     // message.match[1] には、hearsの正規表現にマッチした単語が入っています。

//     const name_from_msg = message.match[1];


//     // まず、controller.storage.users.getで、ユーザーデータを取得します。

//     // message.userには、ユーザーIDが入っています。
//     // ユーザーデータは、ユーザーIDと紐付けていますので、第一引数には、必ずmessage.userを入れます。

//     controller.storage.users.get(message.user, function (err, user_info) {

//         // ▼ データ取得後の処理 ▼

//         // ユーザーデータが存在しているかどうか調べる
//         // ※第二引数で指定した変数(ここでは'user_info')に、ユーザーデータが入っています。
//         if (!user_info) {

//             // ▼ ユーザーデータがなかった場合の処理 ▼

//             // ユーザーidとユーザー名 のオブジェクトを、user_infoとして作成します。
//             user_info = {
//                 id: message.user,
//                 name: name_from_msg
//             };

//         }

//         // user_infoを保存します。
//         controller.storage.users.save(user_info, function (err, id) {

//             // ▼ 保存完了後の処理▼

//             bot.reply(message, 'あなたのお名前は *' + user_info.name + '* さんですね！覚えました！');

//         });

//     });

// });
