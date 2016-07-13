var express = require('express');
var mongodb_ = require('./mongoose.js');
var mongo_ = new mongodb_();
var router = express.Router();
var userinfoSchema = {
    fathername: String,
    childname:String,
    childage:String,
    peaplenumber:Number,
    date: String,
    tel: {
        type: String,
        unique: true
    }
}
router.post('/submit', function(req, res, next) {
    console.log('jffatherday');
    var fathername = req.body.fathername;
    var childname = req.body.childname;
    var childage = req.body.childage;
    var peaplenumber = req.body.peaplenumber;
    var date = req.body.date;
    var tel = req.body.tel;

    var userinfo = {};
    userinfo.fathername = fathername;
    userinfo.childname = childname;
    userinfo.childage = childage;
    userinfo.peaplenumber = peaplenumber;
    userinfo.date = date;
    userinfo.tel = tel;
    var userinfoschema = mongo_.getSchema(userinfoSchema);
    var userinfoModel = mongo_.getModel('jffatherday_userinfo', userinfoschema, 'jffatherday_userinfo');
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
    var userinfoModel = mongo_.getModel('jffatherday_userinfo', userinfoschema, 'jffatherday_userinfo');
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
