var express = require('express');
var mongodb_ = require('./mongoose.js');
var tools = require('./tools.js')
var moment = require('moment')
var mongo = new mongodb_();
var router = express.Router();
var signSchema = {
    _id: {
        type: String,
        unique: true
    },
    openid: {
        type: String,
        unique: true
    },
    signTime: String,
    interrupt: {
        type: Boolean,
        default: false
    }
}
var rewardSchema = {
    _id: {
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    rewardTime: String,
    reward: String
}
var signschema = mongo.getSchema(signSchema);
var signModel = mongo.getModel('qiandao_info', signSchema, 'qiandao_info');
router.get('/sign', function(req, res, next) {

    var signInfo = {};
    signInfo.openid = req.query.openid;
    signInfo.signTime = moment().format("YYYY-MM-DD HH:mm:ss");
    signInfo._id = tools.guid();
    signModel.find({ openid: signInfo.openid }, function(err, result) {
        if (err) {
            res.send(500, { message: err })
        } else {
            if (result.length > 0) {
                var lastTime = moment(result[result.length - 1].signTime);
                var currentSign = moment();
                if (currentSign.get('year') !== lastTime.get('year')) {
                    signInfo.interrupt = true;
                } else if (currentSign.get('month') !== lastTime.get('month')) {
                    signInfo.interrupt = true;
                } else if (currentSign.get('date') - lastTime.get('date') < 1) {
                    res.send(500, { message: "每天只能签到一次" });
                } else if (currentSign.get('date') - lastTime.get('date') > 1) {
                    signInfo.interrupt = true;
                } else {
                    signInfo.interrupt = false;
                }
            } else {
                signModel.create(signInfo, function(err) {
                    if (err) {
                        res.send(500, { message: err })
                    } else {
                        res.sendStatus(200)
                    }
                })
            }
        }
    });

});
router.get('/getSignNumber', function(req, res, next) {
    var openid = req.query.openid;
    var signNumber = 0;
    // 连续签到阈值
    var signThreshold = 2;
    signModel.find({ openid: openid, interrupt: true }, function(err, result) {
        if (err) {
            res.send(500, { message: err })
        } else if (result.length > 0) {
            var start = moment(result[result.length - 1].signTime);
            var dayStamp = (moment().unix() - start.unix()) / 60 / 60 / 24 - 1;
            console.log("天数：" + dayStamp);
            if (dayStamp > 7) {
                dayStamp = 1;
            }
            signNumber = dayStamp;
            res.send(200, { signNumber: signNumber });
        } else {
            signModel.find({ openid: openid, interrupt: false }, function(err, result) {
                if (err) {
                    res.send(500, { message: err })
                } else {
                    if (result.length > 0) {
                        res.send(200, { signNumber: result.length })
                    } else {
                        res.send(500, { message: "没有任何签到的记录" })
                    }
                }
            });
        }
    })
});
var rewardschema = mongo.getSchema(rewardSchema);
var rewardModel = mongo.getModel('qiandao_reward', rewardSchema, 'qiandao_reward');
router.get('/reward', function(req, res, next) {
    var rewardInfo = {}
    rewardInfo.reward = req.query.reward;
    rewardInfo.name = req.query.name;
    rewardInfo._id = tools.guid();
    rewardInfo.rewardTime = moment().format("YYYY-MM-DD HH:mm:ss");
    rewardModel.create(rewardInfo, function(err) {
        if (err) {
            res.send(500, { message: err })
        } else {
            res.send(200)
        }
    })
});


module.exports = router;
