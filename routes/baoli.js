var express = require('express');
var mongodb_ = require('./mongoose.js');
var mongo_ = new mongodb_();
var router = express.Router();
var userinfoSchema = {
    name: String,
    saying: String,
    tel: {
        type: String,
        unique: true
    }
}
router.post('/biaobai/submit', function(req, res, next) {
    console.log('baoli_biaobai');
    var name = req.body.name;
    var tel = req.body.tel;
    var saying = req.body.saying;
    var userinfo = {};
    userinfo.name = name;
    userinfo.tel = tel;
    userinfo.saying = saying;
    var userinfoschema = mongo_.getSchema(userinfoSchema);
    var userinfoModel = mongo_.getModel('baoli_biaobai_userinfo', userinfoschema, 'baoli_biaobai_userinfo');
    var userinfoEntity = new userinfoModel(userinfo);
    userinfoEntity.save(function(err) {
        if (err) {
            res.send(500, { message: err });
        } else {
            res.sendStatus(200);
        }

    });
});

router.get('/biaobai/getUsers', function(req, res, next) {
    var userinfoschema = mongo_.getSchema(userinfoSchema);
    var userinfoModel = mongo_.getModel('baoli_biaobai_userinfo', userinfoschema, 'baoli_biaobai_userinfo');
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
