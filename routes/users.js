var USER = {
    request: require('request'),
    tools: require('./tools.js'),
    getUserInfo: function(req, callback_) {
        var openid = req.query.openid;
        var appflag = req.query.appflag;
        var tk = req.query.access_token;
        var urlinfo = 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=' + tk + '&openid=' + openid + '&lang=zh_CN';
        var that = this;
        var mongodb = require('./mongoose.js');
        that.request.get(urlinfo, function(req, res, data) {
            var data = JSON.parse(data);
            if (data === undefined) {
                return;
            }

            data.docName = 'wechatinfo';
            // 保存到数据库
            new mongodb({
                docName: {
                    type: String,
                    required: true /*非空*/
                },

                openid: {
                    type: String,
                    unique: true
                },
                nickname: String,
                language: String,
                city: String,
                province: String,
                country: String,
                headimgurl: String,
                subscribe_time: Number,
                remark: String,
                groupid: Number,
            }, appflag + '_basewechat').save(data, function() {
                console.log('用户信息保存成功！！！');
            });



            if (typeof(callback_) === 'function') {
                callback_.call(this, data);
            }
        });
    },
    getUserList: function(token, openid, callback_) {
        var u = this;
        var _url = 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=' + token + '&openid=' + openid + '&lang=zh_CN';
        u.request({
            url: _url
        }, function(e, r, body) {
            if (e) {
                console.log(e);
                return;
            }
            console.log('获取用户的基本信息：' + body);
            u.tools.execCallBack(callback_, body);
        });
    }
}
module.exports = USER;
