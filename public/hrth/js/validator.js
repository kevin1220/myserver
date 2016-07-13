function istel(str){
	return /[1][3,5,8][0-9]{9}/.test(str);
}
function isName(str){
	return /[a-zA-Z\u4e00-\u9fa5]+/.test(str);
}
function isverifyCode(str){
	return /[0-9]{4}/.test(str);
}