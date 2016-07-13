/**
 * 传入一个字符串判断是否是函数，如果是函数则返回true
 * @param  {[type]} a [description]
 * @return {[type]}   [description]
 */
function isfun(a) {
    if (typeof a === 'function') {
        return true;
    }
}
/**
 * 传入一个回调函数名,和参数，判断是否是函数，如果是，则回调
 * @param  {String} a 函数名
 * @param  {字符串,也可以是json字符串} b 回调函数的参数
 * @return {[type]}   [description]
 */
function execCallBack(a, b) {
    var params = b || {};
    if (isfun(a)) {
        a.call(this, params);
    }

}
/**
 * 如果传入的参数大于1，则获取两个指定的数
 * 之间的随机数，包括上下限，
 * 如果传入的参数等于1，则获取0到指定下限之
 * 间的随机数，包括0和指定下限。
 * @param  {int} under 下限
 * @param  {int} over  上限
 * @return {int}      获取到的随机数 
 */
function fRandomBy(under, over) {
    switch (arguments.length) {
        case 1:
            return Math.round((Math.random() * under));
        case 2:
            return Math.round((Math.random() * (over - under) + under));
        default:
            return 0;
    }
}
/**
 * 重写的事件监听函数
 * @param  {function} a 回调函数
 * @param  {String} b 事件类型
 * @param  {int} c 事件监听的延迟时间，单位是ms
 * @return {[type]}   [description]
 */
// $.fn.myOn = function(a, b, c) {
//     this.a = a;
//     this.b = b;
//     this.c = c || 0;
//     var that = this;
//     that.on(that.a, function(e) {
//         execCallBack(b, e);
//         that.off(that.a);
//     });
//     setInterval(function() {
//         that.on(that.a, function(e) {
//             execCallBack(b, e);
//             that.off(that.a);
//         });
//     }, c);
// };
/*
 *@function：聚焦的时候清除对象中的文字
 *@params：jqe需要清除文字的对象
 *@params: attr需要清除文字的对象的属性
 *@description：当聚焦对象的时候，对象的对应属性的文字被清楚，失去焦点的时候，对象的对应属性的文字回显
 */
function cleartext(jqe, attr) {

    jqe.each(function() {
        var oldattr = $(this).attr(attr);
        $(this).on({
            'focus': function() {
                $(this).attr(attr, '');
            },
            'blur': function() {
                $(this).attr(attr, oldattr);
            }
        });
    });
}



/*@function:判断输入框的输入内容是否合法
*@param 输入框控件,如
b{
    username:'tip_name',
    password:'tip_pwd'
}

*/
function valify(b) {
    if (b.name === 'username') {}
}

/**
 * 初始化页面
 */
// $(function() {
//     console.log($('.input-child>input'));
//     cleartext($('.input-child>input'), 'placeholder');
// });


/***************监听触屏*************
*@function:监听触屏
*@param start:touchstart时出发的函数
*@param move:touchmove时出发的函数
*@param end:touchend时出发的函数
/***************监听触屏*************/
// $.fn.slider = function(start, move, end) {
//         var scope = {
//             start: {
//                 x: '',
//                 y: '',
//                 time: null
//             },
//             targetTouches: null
//         };

//         if (typeof(start) === 'function') {
//             this.on('touchstart', function(event) {
//                 console.log(event.changedTouches);
//                 event.preventDefault();
//                 scope.targetTouches = event.targetTouches;
//                 if (this.ontouchstart === undefined) {
//                     return false;
//                 }
//                 start.call(this, scope, start);
//                 /* Act on the event */
//             });
//         }
//         if (typeof(move) === 'function') {
//             $(this).on('touchmove', function(event) {
//                 event.preventDefault();
//                 scope.targetTouches = event.targetTouches;
//                 move.call(this, scope, move);
//                 /* Act on the event */
//             });
//         }
//         if (typeof(end) === 'function') {
//             $(this).on('touchend', function(event) {
//                 event.preventDefault();
//                 scope.targetTouches = event.targetTouches;
//                 end.call(this, scope, end);
//                 /* Act on the event */
//             });
//             $(this).on('touchcancel', function(event) {
//                 event.preventDefault();
//                 scope.targetTouches = event.targetTouches;
//                 end.call(this, scope, end);
//                 /* Act on the event */
//             });
//         }
//     }
/*************调用触屏的例子*************/
var swiper = {
        init: function(jqe) {
            var that = this;
            console.log(jqe);
            jqe.slider(that.start, that.move, that.end);
        },
        start: function(scope) {
            var current = scope.start.x;
            console.log('current:' + current);
        },
        move: function(scope) {},
        end: function(scope) {},
    }
    /***************调用触屏的例子*************/

/*
 *@function:计算点击的时间长
 *@param:传输被点击的对象
 */
function taptime(jqe) {
    var starttime;
    var endtime;
    var time;
    jqe.on('touchstart', function(e) {
        e.preventDefault();
        starttime = new Date();
    });
    jqe.on('touchend', function(e) {
        e.preventDefault();
        endtime = new Date();
        time = endtime - starttime;
        console.log(time / 1000);
    });
}

/*
 *@function：聚焦的时候清除对象中的文字
 *@params：jqe需要清除文字的对象
 *@params: attr需要清除文字的对象的属性
 *@description：当聚焦对象的时候，对象的对应属性的文字被清楚，失去焦点的时候，对象的对应属性的文字回显
 */
function cleartext(jqe, attr) {
    var oldattr = jqe.attr(attr);
    jqe.each(function() {
        $(this).on({
            'focus': function() {
                $(this).attr(attr, '');
            },
            'blur': function() {
                $(this).attr(attr, oldattr);
            }
        });
    });
}

//显示遮罩层
function showMask() {
    console.log("进入遮罩层插件");
    var temp = $("<div id='mask'></div>");
    $("body").append(temp);
    // 设置遮罩层的样式
    $("#mask").css({
        // "position":"absolute",
        // "top":"0",
        // "left":"0",
        // "opacity":"0.85",
        // "backgroundColor":"#000",
        "height": $(document).height(),
        "width": $(document).width(),
        // "zIndex":"-88"
    });
    $("#mask").show();
}
//隐藏遮罩层  
function hideMask() {
    $("#mask").hide();
}

/**
 * 获取指定格式的年月日
 * 如：console.log(getDate('yyyy/mm/dd'));
 * @param  {[type]} format [description]
 * @return {[type]}        [description]
 */
function getDate(format) {
    console.log(format);
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    console.log(month);
    return format.replace('yyyy', year).replace('mm', month).replace('dd', day);
}

/**
 * 数字查重的方法
 * @return {[type]} [description]
 * 测试：
var lgc = [1, 2, 3, 2, 3, 1];
console.log(lgc.distinct());
 */
Array.prototype.distinct = function() {
    var self = this;
    var _a = this.concat().sort();
    _a.sort(function(a, b) {
        if (a == b) {
            var n = self.indexOf(a);
            self.splice(n, 1);
        }
    });
    return self;
};
/**
 * 两个方框之间来回的拖拽
 * @param  {element} drag     两个方框之一
 * @param  {element} drop     两个方框之一
 * @param  {element} dragable 被拖拽的对象
 * @return {[type]}          [description]
 */
function diydrag(drag, drop, dragable) {
    var drag = drag.contains(dragable) ? drag : drop;
    var drop = drag.contains(dragable) ? drop : drag;
    var dragable = dragable;
    dragable.addEventListener('dragstart', function(ev) {
        ev.dataTransfer.setData('Text', ev.target.id);
    })

    drop.addEventListener('dragover', function(ev) {
        ev.preventDefault();
    })
    drop.addEventListener('drop', function(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData('Text');
        this.appendChild(document.querySelector('#' + data));
        diydrag(drop, drag, dragable);

    })
}
/**
 * 根据name获取url中的参数值
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

function setSize(parent, width, height) {
    var parent = parent;
    var height = height || window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var width = width || window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    parent.style.height = height + 'px';
    parent.style.width = width + 'px';
}

function showp(e){
    for(p in e){
        console.log(p+":"+e[p]);
        // document.write('<div style="font-size:24px;">'+p+':'+e[p]+'</div>');
    }
}