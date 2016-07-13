var express = require('express');
var mongodb_ = require('./mongoose.js');
var tools = require('./tools.js');
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
    addr: String,
    servername: String,
    verifyCode: String,
    check: {
        type: Boolean,
        default: false
    }
}
var userinfoschema = mongo_.getSchema(userinfoSchema);
var userinfoModel = mongo_.getModel('xktfw_userinfo', userinfoschema, 'xktfw_userinfo');
router.post('/submit', function(req, res, next) {
    console.log('xktfw');
    var _id = tools.guid();
    var tel = req.body.tel;
    var name = req.body.name;
    // var addr = req.body.addr;
    var servername = req.body.servername;
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
    // userinfo.addr = addr;
    userinfo.servername = servername;
    userinfo.verifyCode = verifyCode;
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
