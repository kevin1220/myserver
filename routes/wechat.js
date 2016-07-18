var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var wechatFuncs = require('../model/wechat.js');
var ticket = require('./ticket.js');
var paySign = require('./paySign.js')
var OAuth = require('wechat-oauth');
var fs = require('fs');
var async = require('async');
var voice = require('../model/voice.js');
var request = require('request');


/*****************************应用信息的配置******************************/

var appid = 'wx00a1c8d384eff1f3';
var secret = '2e1add79b87b207bd4ea9cc25d1ccf51';
// var appid = 'wx43233b4496331a8a';
// var secret = 'c61c11c4c6170e4eaa554d9d147969b9';
var token = 'mymp';
var encodingAESKey = 'QglgjwQiCEAhvhrd7Y7pou5DSQOwE6upNP3c2dguOYy';
var domainName = 'http://www.wit-orange.com';
var appname = 'wechat';
var paykey = 'aee648466232f15e8567bea94751ff42';

/*****************************应用信息的配置******************************/

var config = {
    token: token,
    appid: appid,
    encodingAESKey: encodingAESKey
};

// var client = new OAuth(appid, secret);
var client = new OAuth(appid, secret, function(openid, callback) {
    // 传入一个根据openid获取对应的全局token的方法
    // 在getUser时会通过该方法来获取token
    fs.readFile('public/data/' + openid + ':access_token.txt', 'utf8', function(err, txt) {
        if (err) {
            return callback(err);
        }
        callback(null, JSON.parse(txt));
    });
}, function(openid, token, callback) {
    // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
    // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
    // 持久化时请注意，每个openid都对应一个唯一的token!
    fs.writeFile('public/data/' + openid + ':access_token.txt', JSON.stringify(token), callback);
});
var shareOpenid;
var appflag;
var bymp;
//处理微信的语音
router.post('/voice/save', function(req, res, next) {
    var user = req.body;
    var voicepath = __dirname + "/../public/cityvoice/audio/";
    if (!fs.existsSync(voicepath)) {
        fs.mkdirSync(voicepath);
    }
    async.waterfall([
        function(cb) {
            ticket.gettoken(appid, secret, function(token) {
                cb(null, token);
            });
        },
        function(tk, cb) {
            //从微信服务器中根据serverid下载微信语音到指定的路径下
            var _url = 'https://api.weixin.qq.com/cgi-bin/media/get?access_token=' + tk + '&media_id=' + user.serverId;
            user.path = './audio/' + user.serverId + '.mp3';
            user.vote = 0;
            request.get(_url).on('err', function(err) {
                res.send(500, { message: err });
            }).pipe(fs.createWriteStream(voicepath + user.openid + ".mp3"));
            voice.update(user, function(err) {
                if (err) {
                    cb(new Error(err));
                } else {
                    cb(null);
                }
            });
        },
    ], function(err, result) {
        if (err) {
            console.log(err);
        } else {
            //do st.
            res.sendStatus(200);
        }
    });


});
router.get('voice/getTwinty');

router.get('/', function(req, res, next) {
    if (req.query.shareOpenid !== undefined && shareOpenid == undefined) {
        shareOpenid = req.query.shareOpenid;
    }
    if (req.query.app !== undefined && appflag == undefined) {
        appflag = req.query.app;
    }
    if (req.query.bymp !== undefined && bymp == undefined) {
        bymp = req.query.bymp;
    }
    var url = client.getAuthorizeURL(domainName, 'mystate', 'snsapi_userinfo');
    var code = req.query.code;
    console.log("code:" + code);
    if (code == undefined) {
        res.redirect(url);
    }
    async.waterfall([
        function(cb) {
            client.getAccessToken(code, function(err, result) {
                if (err) {
                    cb(new Error(err));
                } else {
                    cb(null, result);
                }
            })
        },
        function(result, cb) {
            var openid = result.data.openid;
            client.getUser(openid, function(err, user) {
                if (err) {
                    cb(new Error(err));
                } else {
                    console.log("获取到的用户信息：" + JSON.stringify(user));
                    cb(null, user);
                }
            });
        },
        function(user, cb) {
            ticket.gettoken(appid, secret, function(token) {
                cb(null, user, token);
            });
        },
        function(user, token, cb) {
            wechatFuncs.isSubscribed(token, user.openid, function(subscribe) {
                console.log("获取到得subscribe：" + subscribe);
                cb(null, user, token, subscribe);
            });
        },
        function(user, token, subscribe, cb) {
            user.subscribe = subscribe;
            user.docName = 'wechatinfo';
            console.log("保存到数据库的数据：" + JSON.stringify(user));
            wechatFuncs.save(user, appflag, function(err) {
                if (err) {
                    cb(new Error(err));
                } else {
                    cb(null, user);
                }

            });
        }
    ], function(err, result) {
        if (err) {
            if (typeof err === "object") {
                console.log("myerr:" + JSON.stringify(err));
            } else {
                console.log("myerr:" + err);
            }
        } else {
            console.log("shareOpenid:" + shareOpenid);
            console.log("bymp:" + bymp);
            result.shareOpenid = shareOpenid;
            result.bymp = bymp;
            res.render('index', { message: JSON.stringify(result), appflag: appflag });
        }
    });
});
//获取pay配置信息
router.get('/getpayconf', function(req, res, next) {
    var ret = new paySign(appid, paykey).getSign();
    res.send(ret);
});

//公众平台接入
router.get('/sign', wechat(config, function(req, res, next) {}));


//公众平台开发
router.post('/sign', wechat(config, function(req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    console.log(message);
    if (message.FromUserName === 'diaosi') {
        // 回复屌丝(普通回复)
        res.reply('hehe');
    } else if (message.FromUserName === 'text') {
        //你也可以这样回复text类型的信息
        res.reply({
            content: 'text object',
            type: 'text'
        });
    } else if (message.FromUserName === 'hehe') {
        // 回复一段音乐
        res.reply({
            type: "music",
            content: {
                title: "来段音乐吧",
                description: "一无所有",
                musicUrl: "http://mp3.com/xx.mp3",
                hqMusicUrl: "http://mp3.com/xx.mp3",
                thumbMediaId: "thisThumbMediaId"
            }
        });
    } else {
        // 回复高富帅(图文回复)
        res.reply([{
            title: '你来我家接我吧',
            description: '这是女神与高富帅之间的对话',
            picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
            url: 'http://nodeapi.cloudfoundry.com/'
        }]);
    }
}));



//jssdk校验
var that = this;
router.get('/getconf', function(req, res, next) {
    console.log('进入jssdk');
    var signurl = req.query.url;
    console.log('signurl+' + signurl)
    var signature = require('./signature.js');
    var ret = null;
    ticket.gettoken(appid, secret, function(access_token) {
        if (access_token) {
            console.log('token:' + access_token);
            ticket.getticket(access_token, function(ticket) {
                ret = new signature(ticket, appid, signurl);
                res.send(ret);
            });
        }
    });
});

module.exports = router;
