var express = require('express');
var mongodb_ = require('./mongoose.js');
var mongo_ = new mongodb_();
var router = express.Router();
var userinfoSchema = {
    name: String,
    companyName: String,
    tel: {
        type: String,
        unique: true
    }
}
router.post('/submit', function(req, res, next) {
    console.log('wlgs');
    var name = req.body.name;
    var tel = req.body.tel;
    var companyName = req.body.companyName;
    var userinfo = {};
    userinfo.name = name;
    userinfo.companyName = companyName;
    userinfo.tel = tel;
    var userinfoschema = mongo_.getSchema(userinfoSchema);
    var userinfoModel = mongo_.getModel('wlgs_userinfo', userinfoschema, 'wlgs_userinfo');
    var userinfoEntity = new userinfoModel(userinfo);
    userinfoEntity.save(function(err) {
        if (err) {
            res.send(500, { message: err });
        } else {
            res.sendStatus(200);
        }

    });
});

router.get('/getUsers', function(req, res, next) {
    var userinfoschema = mongo_.getSchema(userinfoSchema);
    var userinfoModel = mongo_.getModel('wlgs_userinfo', userinfoschema, 'wlgs_userinfo');
    userinfoModel.find(function(err, result) {
        if (err) { res.send(500, { message: err }) }
        if (result.length > 0) {
            res.send(result);
            return;
        }
        res.send(500, { message: "没有获取到任何参与活动者的电话信息" })
    });
});

module.exports = router;
