//=========================================================
//
// まさに体内時計
//
//=========================================================

chimpkinDate = new Date()
chimpkinDateNow = chimpkinDate.getTime()
chimpkinDate_Y = chimpkinDate.getFullYear()
chimpkinDate_M = ('0'+ (parseInt(chimpkinDate.getMonth()) + 1)).slice(-2)
chimpkinDate_D = ('0'+ (chimpkinDate.getDate())).slice(-2)
