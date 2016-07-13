/*
 *@param:arr轮播页面的对象
 *
 *
 *
 .myswipe({
				events: 'swipeup',
				vdistance: '30',
				eventhandle: function() {
					id = arr[(i+1)].attr('id');
					console.log('id:'+id);
					$.mobile.changePage('#two');
					if (typeof(callback_) === 'function') {
						callback_.call(this);
					}
				}
			});
 *
 *
 *
 *
 *回调函数callback_
 *
 *
 *
 */


function pslider(jqe, callback_) {
	jqe.onslide(function(sco) {}, function(sco) {}, function(sco) {
		$.mobile.defaultPageTransition=null;
		if (sco.y - sco.starty < 0 && Math.abs(sco.y - sco.starty) > 30) {
			id = $(this).next().attr('id');
			if (id === undefined) {
				id = jqe.first().attr('id');
			}
			$.mobile.changePage('#' + id, {transition:"slideup"});
			if (typeof(callback_) === 'function') {
				callback_.call(this);
			}
		}
		if (sco.y - sco.starty > 30) {
			id = $(this).prev().attr('id');
			if (id === undefined) {
				id = jqe.last().attr('id');
			}
			$.mobile.changePage('#' + id, {transition:"slidedown"});
			if (typeof(callback_) === 'function') {
				callback_.call(this);
			}
		}
	});

}