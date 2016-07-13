function uuid1() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

function guid1() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function guid2() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function uuid2(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [],
        i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}

function guid3() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
}
// var a = 1 + Math.random();
// // var b = (a * 0x10000) | 0;
// var b = Math.floor(a* 0x10000);
// var c = b.toString(8);
// var d = c.substring(1);
// console.log(a);
// console.log(b);
// console.log(c);
// console.log(d);
// console.log(guid3());
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
 * json字符串转json对象
 * 测试：
	var info = '[{"name":"chong","age":26}]';
    console.log(JSON.parse(info)[0].name);
 */
function toJSON(jsonstr) {
    return JSON.parse(jsonstr);
}


/**
 * 数字查重的方法
 * @return {[type]} [description]
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

function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

//正则表达式的测试
// function re(){
//     var seach = 'width=100&height=200&color=red';
//     var reg =new RegExp('(^|&)([^=]*)=([^&]*)','gm');
//     var r = seach.match(reg);
//     console.log(r);
    
// }
// re();