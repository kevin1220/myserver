var tools = require('../utils/tools.js');
var request = require('request');
var mongo = require('../routes/mongoosenew.js');
var async = require('async');
var userschema = {
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
    subscribe: Number
};

exports.save = function(user, appflag, _callback) {
    var usersModel = mongo(appflag + '_wechat', userschema, appflag + '_wechat').model;
    var userEntity = new usersModel(user);
    async.waterfall([
        function(cb) {
            usersModel.find({ "openid": user.openid }, function(err, result) {
                if (err) {
                    cb(new Error(err));
                } else {
                    cb(null, result);
                }
            });
        },
        function(result, cb) {
            if (result.length > 0) {
                usersModel.update({ "openid": user.openid }, { $set: user }, function(err) {
                    if (err) {
                        cb(new Error(err));
                    } else {
                        cb();
                    }
                });
            } else {
                userEntity.save(function(err) {
                    if (err) {
                        cb(new Error(err));
                    } else {
                        cb();
                    }
                });
            }
        },
    ], function(err, result) {
        tools.execCallBack(_callback, { err: err, message: result });

    });
}

exports.isSubscribed = function(token, openid, _callback) {
    var _url = "https://api.weixin.qq.com/cgi-bin/user/get?access_token=" + token;
    var openids;
    var subscribe;
    request({
        url: _url
    }, function(err, res, body) {
        if (err) {
            tools.execCallBack(_callback, err);
        } else {
            openids = JSON.parse(body).data.openid;
            if (openids.indexOf(openid) == -1) {
                subscribe = 0;
            } else {
                subscribe = 1;
            }
            tools.execCallBack(_callback, subscribe);
        }
    });
}
