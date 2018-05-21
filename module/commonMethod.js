//=========================================================
//
// 汎用的メソッド
//
//=========================================================
'use strict';
module.exports = controller => {

	// 配列をランダムで返す。 返答パターンなどに使用。
	let getRandom = function(array) {
		if(!array) {
			return
		} else {
			return array[Math.floor(Math.random() * array.length)]
		}
	}

}