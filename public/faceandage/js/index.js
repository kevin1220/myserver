function getAgeByImg(imgurl) {
	console.log("44:"+imgurl)
    var api_key = "1339857ebc6097c5f3a97e1fa6576992";
    var api_secret = "6zbyGt6G_AUcwp42t914diu18SrN2-P4";
    var url = imgurl
    var attribute = "age";
    var finalURL = "http://apicn.faceplusplus.com/v2/detection/detect?api_key=" + api_key + "&api_secret=" + api_secret +"&url="+url+"&attribute=" + attribute;
    $.ajax({
    	url:finalURL,
    	type:"GET",
    	success:function(data){
    		console.log("111:"+JSON.stringify(data));
    		return JSON.stringify(data);
    	},
    	error:function(data){
    		console.log("222:"+JSON.stringify(data));
    	}
    });
}
