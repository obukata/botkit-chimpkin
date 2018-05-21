//=========================================================
//
// まさに体内時計
//
//=========================================================
'use strict';
module.exports = controller => {

	let chimpkinDate = new Date()
	let chimpkinDateNow = chimpkinDate.getTime()
	let chimpkinDate_Y = chimpkinDate.getFullYear()
	let chimpkinDate_M = ('0'+ (parseInt(chimpkinDate.getMonth()) + 1)).slice(-2)
	let chimpkinDate_D = ('0'+ (chimpkinDate.getDate())).slice(-2)

}