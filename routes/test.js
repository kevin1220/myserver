// // var fs = require('fs');
// // // var  processor = require('processor');
// var async = require('async');
// // // console.log('当前执行的路径：'+processor.cwd());
// // function myaaa(users) {
// //     console.log(users);
// // }
// async.waterfall([
//     function(cb) { console.log('1.2.1: ', 'start'); cb(null, 3); },
//     function(n, cb) { console.log('1.2.2: ', n); t.inc(n, cb); },
//     function(n, cb) { console.log('1.2.3: ', n); t.err('myerr', cb); },
//     function(n, cb) { console.log('1.2.4: ', n); t.fire(n, cb); }
// ], function (err, result) {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(result);
//     }
//     // console.log('1.2 err: ', err);
//     // console.log('1.2 result: ', result);
// });
// // async.waterfall([
// //     function(cb) {
// //         fs.readdir(path, function(err, files) {
// //             var users = [];
// //             files.forEach(function(file, index) {
// //                 var user = {}
// //                 user.name = file.slice(0, -4);
// //                 user.index = index;
// //                 user.filename = file;
// //                 users.push(user);
// //             });
// //             console.log(users);
// //             cb(null,users);
// //         });
// //     },
// //     function(users,cb){
// //       // console.log(users);
// //     }
// // ], function(err, result) {
// //   if(err){
// //       console.log(err)
// //   }else{
// //       console.log(result);
// //   }
// // });
// // 
// // var a = 0;

// // async.waterfall([
// //     function getb(cb) {
// //         setTimeout(function() {
// //             if (a == 0) {
// //                 cb(a);
// //             } else {
// //                 var b = 1 / a;
// //                 console.log(new Date())
// //                 cb(null, b);
// //             }

// //         }, 1000);
// //     },
// //     function getc(b, cb) {
// //         setTimeout(function() {
// //             var c = b + 1;
// //             cb(null, c);
// //         }, 1000);
// //     }
// // ], function(err, result) {
// //     if (err) {
// //         console.log('a不能为0');
// //     } else {
// //         console.log('c:' + result)
// //     }
// // });





var async = require('async');
var a = 10;
async.waterfall([
    function(cb) {
        console.log("getb")
        setTimeout(function() {
            if (a == 0) {
                cb(new Error("a不能为0"));
            } else {
                var b = 1 / a;
                cb('finished', b); //在这里通过回调函数把b传给下一个函数，记得一定要加上null，才能调用数组中得下一个函数，否则，会直接调用最终的回调函数，然后结束函数，则后面的函数将不再执行
                //如果这里写成cb(b);
                //结果会变成：
                /**
                 *getb
                 *0.1
                 **/
            }
        }, 1000);
    },
    function(b, cb) {
        setTimeout(function() {
            console.log("getc")
            var c = b + 1;
            cb(null, c);
        }, 1000);
    }
], function(err, result) {
    if (err && err != 'finished') {
        console.log("err:" + err);
    } else {
        console.log('c:' + result)
    }
});


























// // var express = require('express');
// // var mongodb_ = require('./mongoose.js');
// // var mongo_ = new mongodb_();
// // var router = express.Router();
// // var userinfoSchema = {
// //     name: String,
// //     tel: {
// //         type: String,
// //         unique: true
// //     },
// //     nickname:String,
// //     openid:String
// // }
// // router.get('/getUsers', function(req, res, next) {
// //     var userinfoschema = mongo_.getSchema(userinfoSchema);
// //     var userinfoModel = mongo_.getModel('hbzl_basewechats', userinfoschema, 'hbzl_basewechats');
// //     userinfoModel.find(function(err, result) {
// //         if (err) { console.log(JSON.stringify(err)); }
// //         if (result.length > 0) {
// //             res.send(result);
// //             return;
// //         }
// //         console.log('没有获取到任何参与活动者的电话信息');
// //         res.sendStatus(500)
// //     });
// // });

// // module.exports = router;


// // var RedPackage = require('./redpackage.js')
// // var appid　 = "wx43233b4496331a8a";
// // var mch_id　 = "1312125901"; //微信支付分配的商户号//
// // var key　 = "aee648466232f15e8567bea94751ff42";
// // var client_ip = '192.168.31.1'; //提交端的IP
// // var openid = 'o0SZIv1ySL2EkrJ3_uXej-T1q644';

// // var send_name = '南沙湾一号'; //红包发送者名称
// // var total_amount = 19600; //付款金额，单位分
// // var total_num = 1; //红包发放总人数 类型是int......
// // var wishing = '恭喜你领取红包成功'; //红包祝福语
// // var act_name = '春节助力红包'; //  活动名称
// // var remark = '提取现金'; //备注信息

// // var redPackage = new RedPackage(key, mch_id, appid, send_name, openid, mch_id, total_amount, total_num, wishing, client_ip, act_name, remark);
// // console.log(new Date());
// // redPackage.sendRedPackage();


// // var schedule = require('node-schedule');
// // var j = schedule.scheduleJob('* * * * *', function() {
// //     console.log(new Date());
// //     redPackage.sendRedPackage();
// // });




// // var MongoDB = require('./mongoose.js');
// // var mongodb = new MongoDB();
// // var conn = mongodb.getConnection('localhost', 'test');
// // var personscheme = mongodb.getSchema(personScheme);
// // var personModel = mongodb.getModel(conn, 'info', personscheme, 'info');
// // var personEntity = mongodb.getEntity(personModel, doc);
// // var personScheme = {
// //     name: String,
// //     age: String
// // }
// // var doc = {
// //     name: 'chong',
// //     age: '27'
// // }
// // conn.on('error', console.error.bind(console, '连接错误:'));
// // conn.once('open', function() {
// //     //一次打开记录

// //     personEntity.save(function(err) {
// //         if (err) {
// //             console.log(err);
// //         }
// //         console.log('保存成功');
// //     });
// // });

// // function guid() {
// //     function S4() {
// //         return (((1 + Math.random()) * 10001) | 0).toString(16).substring(1);
// //     }
// //     return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
// // }
// // function guid2(){
// //   return (((1 + Math.random()) * 0x10000000) | 0).toString(8).substring(3);
// // }
// // var geGUID = setInterval(function(){
// //   var uuid = guid2();
// //   console.log(guid2());
// //   if(uuid.length!=7){
// //       clearInterval(geGUID);
// //   }

// // }, 30)

// // function diyreverse(str,jinzhi){
// //   var resource ;
// //   if(str.toString().indexOf('0x')==0){
// //       resource = 16;
// //   }else if(str.indexOf('0')==0){
// //       resource = 8;
// //   }else{
// //       resource = 10;
// //   }
// //   console.log(resource+"转"+jinzhi+"的结果是:"+parseInt(str, resource).toString(jinzhi));
// //   return str.toString(jinzhi);
// // }
// // diyreverse('0x13',10);
