//=========================================================
//
// まさに体内時計
//
//=========================================================
'use strict'
module.exports = controller => {

	global.chimpkinDate = new Date()
	global.chimpkinDateNow = chimpkinDate.getTime()
	global.chimpkinDate_Y = chimpkinDate.getFullYear()
	global.chimpkinDate_M = ('0'+ (parseInt(chimpkinDate.getMonth()) + 1)).slice(-2)
	global.chimpkinDate_D = ('0'+ (chimpkinDate.getDate())).slice(-2)

}