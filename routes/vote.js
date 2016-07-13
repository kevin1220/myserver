var express = require('express');
var Mongo = require('./mongoosenew.js');
var async = require('async');
var fs = require('fs');
var router = express.Router();
var userinfoSchema = {
    name: String,
    votes: {
        type: Number,
        default: 0
    },
    index: Number,
    filename: String
}
var userModel = Mongo('vote_userinfo', userinfoSchema, 'vote_userinfo').model;
router.post('/submit', function(req, res, next) {
    var index = req.body.index*1+1;
    userModel.update({ index: index },{
        $inc:{votes:1}
    }, function(err) {
        if (err) {
            res.send(500, { message: err });
        } else {
            res.sendStatus(200);
        }
    });
});

router.get('/config', function(req, res, next) {
    // console.log('vote config')
    var path = __dirname + '/../public/vote/images';
    //读取图片文件夹中的图片，并根据图片文件的文件名给对应的user赋相应的值
    async.waterfall([
        function(cb) {
            fs.readdir(path, function(err, files) {
                if (err) {
                    cb(err);
                } else {
                    var users = new Array();
                    files.forEach(function(file, index) {
                        var user = {};
                        user.name = file.slice(0, -4);
                        user.filename = file;
                        user.votes = 0;
                        user.index = index+1;
                        users.push(user);
                    });
                    cb(null, users);
                }
            });
        },
        function(users, cb) {
            if (users.length <= 0) {
                cb(new Error("没有任何成员的相关信息"));
            } else {
                userModel.create(users, function(err) {
                    if (err) {
                        cb(err);
                    } else {
                        cb("信息保存成功！")
                    }
                });
            }
        }
    ], function(err, result) {
        if (err) {
            res.send(500, { message: err });
        } else {
            res.sendStatus(200);
        }
    });
});

router.get('/getUsers', function(req, res, next) {
    userModel.find(function(err, result) {
        if (err) {
            res.send(500, { message: err });
        } else {
            res.send(result);
        }
    });

});

module.exports = router;
