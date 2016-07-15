var request = require('request');
var tools = require('../utils/tools.js');
var mongo = require('../routes/mongoosenew.js');
var async = require('async');
var voiceschame = {
    nickname: {
        type: String,
        required: true
    },
    openid: {
        unique: true,
        type: String,
        required: true
    },
    serverID: String,
    path: String,
    vote: Number
};
var voiceModel = new mongo('wechat_voice', voiceschame, 'wechat_voice').model;
module.exports.update = function(user, cb) {
    //通过媒体下载接口获取到保存在微信上的语音
    voiceModel.update({ openid: user.openid }, { $set: user }, {
        upsert: true
    }, function(err) {
        tools.execCB(cb, err);
    });
};
module.exports.find = function(cb) {
    var query = voiceModel.find().sort({ vote: -1 }).limit(20);
    query.exec(function(err, result) {
        tools.execCB(cb, err, result);
    });
};
module.exports.findByOpenid = function(openid, cb) {
    voiceModel.find({ openid: openid }, function(err, result) {
        tools.execCB(cb, err, result);
    })
};
module.exports.updateVoteByOpenid = function(openid, cb) {
    voiceModel.update({ openid: openid }, { $inc: { vote: 1 } }, function(err) {
        tools.execCB(cb, err);
    });
}
