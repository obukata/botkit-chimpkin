//=========================================================
//
// まさに体内時計
//
//=========================================================

const chimpkinDate = new Date()
const chimpkinDateNow = chimpkinDate.getTime()
const chimpkinDate_Y = chimpkinDate.getFullYear()
const chimpkinDate_M = ('0'+ (parseInt(chimpkinDate.getMonth()) + 1)).slice(-2)
const chimpkinDate_D = ('0'+ (chimpkinDate.getDate())).slice(-2)
