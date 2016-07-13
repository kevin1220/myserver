/**
 * 定义浏览器的一些属性
 */
var Brower = function() {
	/**
	 * 判断是否是PC端
	 */
	this.IsPC = function() {
		var userAgentInfo = navigator.userAgent;
		var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
		var flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	};
	/**
	 * 兼容移动端和PC端
	 * @type {Object}
	 */
	this.events = {
		touchstart: this.IsPC() ? 'mousedown' : 'touchstart',
		touchmove: this.IsPC() ? 'mousemove' : 'touchmove',
		touchend: this.IsPC() ? 'mouseup' : 'touchend',
	};
};
/**
 * 烟火类
 * @param {json对象} params 包括以下几项：
 * spark_color:烟火的颜色
 * spark_ele：烟火对应的canvas对象
 * trigger:触发生成烟火的事件
 */
var Spark = function(params) {
	this.jqe = params.spark_ele;
	this.brower = new Brower();
	this.point = {};
	this.spark_color = "#fff";
	this.trigger = params.trigger;
	var that = this;

	/**
	 * 框架初始化
	 */
	this.init = function() {

		that.getPoint(this.createSpark);

	}


	/**
	 * 使用canvas生成烟火的效果
	 * @return {[type]} [description]
	 */
	this.createSpark = function() {
		var count = fRandomBy(300, 400);
		var can_width = fRandomBy(1, 1);
		var can_height = fRandomBy(1, 1);
		for (var i = 0; i < count; i++) {
			var canvas = that.jqe[0];
			var context = canvas.getContext("2d");
			context.fillStyle = that.spark_color;
			context.fillRect(that.point.startX, that.point.startY, can_width, can_height);
			that.updateSpark(context);
		}

	};
	this.updateSpark = function(c) {
		var speedX = fRandomBy(-50, 50);
		var speedY = fRandomBy(-50, 50);
		var circle = fRandomBy(500);
		setTimeout(function() {
			c.clearRect(0, 0, 500, 500);
			c.fillStyle = that.spark_color;
			c.fillRect(that.point.startX + speedX, that.point.startY + speedY, 10, 10);
			setTimeout(function() {
				c.clearRect(0, 0, 500, 500);
			}, circle);
		}, circle);
	};
	/**
	 * 获取鼠标或者触屏的点坐标，同时在该点生成烟火
	 * @return {[type]} [description]
	 */
	this.getPoint = function(callback_) {
		//判断是PC还是mobile
		var ispc = this.brower.IsPC();



		if (ispc) {
			if (that.trigger.indexOf('down') > -1) {
				that.jqe.myOn(that.brower.events.touchstart, function(e) {
					e.preventDefault();
					that.point.startX = e.pageX;
					that.point.startY = e.pageY;
					execCallBack(callback_);
					that.jqe.off(that.brower.events.touchstart);
				}, 800);
			}
			if (that.trigger.indexOf('move') > -1) {
				that.jqe.myOn(that.brower.events.touchmove, function(e) {
					e.preventDefault();
					that.point.moveX = e.pageX;
					that.point.moveY = e.pageY;
					execCallBack(callback_);
					that.jqe.off(that.brower.events.touchmove);
				}, 800);
			}


		} else {
			if (that.trigger.indexOf('down') > -1) {
				that.jqe.myOn(that.brower.events.touchstart, function(e) {
					e.preventDefault();
					console.log('滑动开始');
				}, 800);
			}
			if (that.trigger.indexOf('move') > -1) {
				that.jqe.myOn(that.brower.events.touchmove, function(e) {
					e.preventDefault();
					console.log('滑动移动');
				}, 800);
			}


			// that.jqe.on(that.brower.events.touchend, function(e) {
			// 	e.preventDefault();
			// 	console.log('滑动结束');
			// });
		}
	};
};