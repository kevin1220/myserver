var express = require('express');
var mongodb_ = require('./mongoose.js');
var mongo_ = new mongodb_();
var router = express.Router();
var accessSchema = {
    access: {
        type: Number,
        default: 0
    },
    accesstime:Date,
    appname:String
}
router.get('/submit', function(req, res, next) {
    console.log('访问量统计');
    var accessinfo = {};
    accessinfo.accesstime = new Date();
    accessinfo.appname = req.query.appname;
    var accessschema = mongo_.getSchema(accessSchema);
    var accessModel = mongo_.getModel('rchbsj_access', accessschema, 'rchbsj_access');
    accessModel.update({}, { $inc: { access: 1 },$set:accessinfo }, { multi: true,upsert: true },function(err) {
        if (err) {
            res.send(500, { message: err });
        } else {
            res.sendStatus(200);
        }
    })
});

router.get('/getUsers', function(req, res, next) {
    var accessschema = mongo_.getSchema(accessSchema);
    var accessModel = mongo_.getModel('tchbsj_access', accessschema, 'tchbsj_access');
    accessModel.find(function(err, result) {
        if (err) { res.send(500, { message: err }) }
        if (result.length > 0) {
            res.send(result);
            return;
        }
        res.send(500, { message: "没有获取到任何参与活动者的电话信息" })
    });
});

module.exports = router;
