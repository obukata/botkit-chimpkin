//=========================================================
//
// 汎用的メソッド
//
//=========================================================

// 配列をランダムで返す。 返答パターンなどに使用。
function getRandom(array) {
	if(!array) {
		return
	} else {
		return array[Math.floor(Math.random() * array.length)]
	}
}
