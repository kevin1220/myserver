var express = require('express');
var mongodb_ = require('./mongoose.js');
var tools = require('./tools.js');
var moment = require('moment');
var mongo_ = new mongodb_();
var router = express.Router();
var userinfoSchema = {
    _id: {
        type: String,
        unique: true
    },
    expired: {
        type: Boolean,
        default: false
    },
    tel: {
        type: String
    },
    name: String,
    verifyCode: String,
    check: {
        type: Boolean,
        default: false
    },
    createTime: String
}
var userinfoschema = mongo_.getSchema(userinfoSchema);
var userinfoModel = mongo_.getModel('hrth_userinfo', userinfoschema, 'hrth_userinfo');
router.post('/submit', function(req, res, next) {
    console.log('hrth');
    var _id = tools.guid();
    var tel = req.body.tel;
    var name = req.body.name;
    var createTime = new moment().format("YYYY-MM-DD HH:mm:ss");
    var verifyCode;
    verifyCode = tools.getVerifyCode();
    userinfoModel.find({ verifyCode: verifyCode }, function(err, user) {
        if (err) {
            res.send(500, { message: err });
        } else {
            if (user.length > 0) {
                verifyCode = tools.getVerifyCode();
            }
        };
    });
    var userinfo = {};
    userinfo._id = _id;
    userinfo.tel = tel;
    userinfo.name = name;
    userinfo.verifyCode = verifyCode;
    userinfo.createTime = createTime;
    var userinfoEntity = new userinfoModel(userinfo);
    userinfoModel.find({ tel: tel }, function(err, user) {
        if (err) {
            res.send(500, { message: err });
        } else {
            if (user.length > 0) {
                console.log("7878:" + user.check)
                if (user[0].check) {
                    console.log(89898989)
                    res.send(501, { message: "每个号码只能参加一次活动" })
                } else {
                    console.log(121212)
                    userinfoModel.update({ tel: tel }, { $set: { verifyCode: verifyCode, expired: false } }, function(err) {
                        if (err) {
                            res.send(500, { message: err });
                        } else {
                            res.send(verifyCode);
                        };
                    });
                }
            } else {
                userinfoEntity.save(function(err) {
                    if (err) {
                        res.send(500, { message: err })
                    } else {
                        res.send(verifyCode);
                    }
                });


            }
        };
    });

});
router.post('/check', function(req, res, next) {
    console.log('check');
    var verifyCode = req.body.verifyCode;
    userinfoModel.find({ expired: false, verifyCode: verifyCode, check: false }, function(err, result) {
        if (result.length > 0) {
            userinfoModel.update({ verifyCode: verifyCode, expired: false, check: false }, { $set: { expired: true, check: true } }, { multi: false }, function(err) {
                if (err) {
                    res.send(500, { message: err });
                } else {
                    res.send(200);
                };
            });
        } else {
            res.send(500, { message: err });
        }
    });
});


module.exports = router;
