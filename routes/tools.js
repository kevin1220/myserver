var MyTools = {
    fs: require('fs'),
    /**
     * 传入一个回调函数名,和参数，判断是否是函数，如果是，则回调
     * @param  {String} a 函数名
     * @param  {字符串,也可以是json字符串} b 回调函数的参数
     * @return {[type]}   [description]
     */
    execCallBack: function(a, b) {
        var params = b || {};
        if (MyTools.isfun(a)) {
            a.call(this, params);
        }
    },
    isfun: function(a) {
        if (typeof a === 'function') {
            return true;
        }
    },
    /**
     * 获取UUID
     * 测试：
     * // var a = 1 + Math.random();
    	// // var b = (a * 0x10000) | 0;
    	// var b = Math.floor(a* 0x10000);
    	// var c = b.toString(8);
    	// var d = c.substring(1);
    	// console.log(a);
    	// console.log(b);
    	// console.log(c);
    	// console.log(d);
    	// console.log(guid3());
     * @return {[type]} [description]
     */
    guid: function() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
    },
    getVerifyCode: function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(8).substring(2);
    },
    writetoFile: function(path, content, callback_) {
        MyTools.fs.writeFile(path, content, {
            encoding: 'utf-8',
            flag: 'w'
        }, function(err) {
            if (err) {
                console.log(err);
                return;
            }
            MyTools.execCallBack(callback_);
        });
    },
    readFile: function(path, callback_) {
        MyTools.fs.readFile(path, {
            encoding: 'utf-8',
            flag: 'w'
        }, function(err, data) {
            if (err) {
                console.log(err);
                return;
            }
            MyTools.execCallBack(callback_, data);
        });

    },

}

module.exports = MyTools;
