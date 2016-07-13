var express = require('express');
var mongodb_ = require('./mongoose.js');
var mongo_ = new mongodb_();
var router = express.Router();
var userinfoSchema = {
    name: String,
    tel: {
        type: String,
        unique: true
    }
}
router.post('/submit', function(req, res, next) {
    console.log('zmkxj');
    var name = req.body.name;
    var tel = req.body.tel;
    var userinfo = {};
    userinfo.name = name;
    userinfo.tel = tel;
    console.log('name:' + name);
    console.log('tel:' + tel);
    var userinfoschema = mongo_.getSchema(userinfoSchema);
    var userinfoModel = mongo_.getModel('zmkxj_userinfo', userinfoschema, 'zmkxj_userinfo');
    var userinfoEntity = new userinfoModel(userinfo);
    userinfoEntity.save(function(err) {
        if (err) { console.log(JSON.stringify(err)); }
        console.log('保存用户信息成功');
        res.sendStatus(200)
    });
});

router.get('/getUsers', function(req, res, next) {
    var userinfoschema = mongo_.getSchema(userinfoSchema);
    var userinfoModel = mongo_.getModel('zmkxj_userinfo', userinfoschema, 'zmkxj_userinfo');
    userinfoModel.find(function(err, result) {
        if (err) { console.log(JSON.stringify(err)); }
        if (result.length > 0) {
            res.send(result);
            return;
        }
        console.log('没有获取到任何参与活动者的电话信息');
        res.sendStatus(500)
    });
});

module.exports = router;
