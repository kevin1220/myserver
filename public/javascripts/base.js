$.fn.onslide = function(firstfun, fun, endfun) {
	var scope = {
		startx: null,
		starty: null,
		x: null,
		y: null,
		run: 1
	};
	var ts = this;

	if (ts[0].ontouchstart === undefined) {
		return false;
	}

	ts.each(function(i, dm) {
		dm.addEventListener("touchstart",
		function(e) {
			e.preventDefault();
			var x = e.touches[0].clientX,
			y = e.touches[0].clientY;
			scope.startx = x,
			scope.starty = y;
			if (firstfun) {
				firstfun.call(this, scope);
			}
		});

		dm.addEventListener("touchmove",
		function(e) {
			e.preventDefault();
			if (scope.run === 0) {
				return;
			}
			e.preventDefault();
			var x = e.touches[0].clientX,
			y = e.touches[0].clientY;
			scope.x = x,
			scope.y = y;
			fun.call(this, scope);
			// if(pre===true){}
		},
		false);

		dm.addEventListener("touchend",
		function(e) {
			e.preventDefault();
			if (scope.run === 0) {
				return;
			}
			if ("changedTouches" in e) {
				scope.x = e.changedTouches[0].clientX;
				scope.y = e.changedTouches[0].clientY;
			} else {
				scope.x = e.touches[0].clientX;
				scope.y = e.touches[0].clientY;
			}
			endfun.call(this, scope);
		},
		false);
		dm.addEventListener("touchcancel",
		function(e) {
			e.preventDefault();
			if (scope.run === 0) {
				return;
			}
			if ("changedTouches" in e) {
				scope.x = e.changedTouches[0].clientX;
				scope.y = e.changedTouches[0].clientY;
			} else {
				scope.x = e.touches[0].clientX;
				scope.y = e.touches[0].clientY;
			}
			endfun.call(this, scope);
		},
		false);
	});
}
/********************jquery插件模式********************/

// $.fn.slider = function(start, move, end) {
// 	var scope = {
// 		start: {
// 			x: '',
// 			y: '',
// 			time: null
// 		},
// 		move: {
// 			x: '',
// 			y: '',
// 			time: null
// 		},
// 		end: {
// 			x: '',
// 			y: '',
// 			time: null
// 		}

// 	};

// 	if (typeof(start) === 'function') {
// 		$(this).on('touchstart', function(e) {
// 			e.preventDefault();
// 			var touches = e.originalEvent.targetTouches[0];
// 			scope.start.x = touches.pageX;
// 			scope.start.y = touches.pageY;
// 			scope.start.time = new Date();
// 			if (this.ontouchstart === undefined) {
// 				return false;
// 			}
// 			start.call(this, scope, start);
// 			/* Act on the event */
// 		});

// 	}
// 	if (typeof(move) === 'function') {
// 		$(this).on('touchmove', function(e) {
// 			e.preventDefault();
// 			var touches = e.originalEvent.targetTouches[0];
// 			scope.move.x = touches.pageX;
// 			scope.move.y = touches.pageY;
// 			scope.move.time = new Date();
// 			move.call(this, scope, move);
// 			/* Act on the event */
// 		});
// 	}
// 	if (typeof(end) === 'function') {
// 		$(this).on('touchend', function(e) {
// 			e.preventDefault();
// 			var touches = e.originalEvent.targetTouches[0];
// 			// $(this).off('touchmove');
// 			scope.end.time = new Date();
// 			$(this).off('touchstart');
// 			end.call(this, scope, end);
// 			/* Act on the event */
// 		});
// 		$(this).on('touchcancel', function(e) {
// 			e.preventDefault();
// 			end.call(this, scope, end);
// 			/* Act on the event */
// 		});
// 	}

// }

// var Swiper = function() {
// 	this.init = function(jqe) {
// 		var that = this;
// 		console.log(jqe);
// 		jqe.slider(that.start, that.move, that.end);
// 	};
// 	this.start = function(scope) {};
// 	this.move = function(scope) {
// 		var x = scope.move.x - scope.start.x;
// 		var y = scope.move.y - scope.start.y;
// 		var time = scope.end.time - scope.start.time;
// 		console.log('time:'+time);
// 		if (time > 50) {

// 			$(this).css({
// 				top: y + 'px',
// 				left: x + 'px'
// 			});
// 		}

// 	};
// 	this.end = function(scope) {};
// }

/********************my jquery swipe 插件********************/
/*
 *events:监听的事件,包括 swipeup,swipedown,swipeleft,swiperight
 *hdistance:水平滑动距离
 *vdistance:竖直滑动距离
 *eventhandle：回调函数
 
 */
// $.fn.myswipe = function(params) {
// 	this.hdistance = params.hdistance || 5000;
// 	this.vdistance = params.vdistance || 5000;
// 	this.events = params.events;
// 	this.eventhandle = params.eventhandle;
// 	var that = this;
// 	this.scope = {
// 			start: {
// 				x: '',
// 				y: '',
// 				time: null
// 			},
// 			end: {
// 				x: '',
// 				y: '',
// 				time: null
// 			}
// 		}
// 		//监听触摸事件
// 	this.on('touchstart', function(e) {
// 		console.log(111);
// 		e.preventDefault();
// 		var touch = e.originalEvent.targetTouches[0];
// 		that.scope.start.x = touch.pageX;
// 		that.scope.start.y = touch.pageY;
// 	});
// 	this.on('touchmove', function(e) {
// 		e.preventDefault();


// 	});
// 	this.on('touchend', function(e) {
// 		e.preventDefault();
// 		var touch = e.originalEvent.targetTouches[0];
// 		that.scope.end.x = touch.pageX;
// 		that.scope.end.y = touch.pageY;
// 		// console.log('pagex:'+touch.pageX);
// 		// console.log('pageY:'+touch.pageY);
// 		if (typeof(that.eventhandle) === 'function') {
// 			var y = that.scope.end.y - that.scope.start.y;
// 			var x = that.scope.end.x - that.scope.start.x;
// 			// console.log('x='+that.scope.end.y+'-'+that.scope.start.y+'='+x);
// 			// console.log('y='+that.scope.end.x+'-'+that.scope.start.x+'='+y);
// 			// alert('y='+that.scope.end.y+'-'+that.scope.start.y+'='+y);
// 			//向上
// 			if (that.events == 'swipeup' && y < 0 && Math.abs(y) > that.vdistance) {
// 				that.eventhandle.call(this);
// 			}

// 			//向下
// 			if (that.events == 'swipedown' && y > that.vdistance) {
// 				that.eventhandle.call(this);
// 			}
// 			//向左
// 			if (that.events == 'swipeleft' && x < 0 && Math.abs(x) > that.hdistance) {
// 				that.eventhandle.call(this);
// 			}
// 			//向右
// 			if (that.events == 'swiperight' && x > that.hdistance) {
// 				that.eventhandle.call(this);
// 			}
// 		}

// 		that.off('touchmove');
// 		return;
// 	});


// }


/********************jquery mobile********************/


/*
 *@param:arr轮播页面id的数组
 *
 *
 *
 *
 *
 *
 *
 *回调函数callback_
 *
 *
 *
 */
