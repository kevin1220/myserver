var async = require("async");
var tools = require("../utils/tools.js");
var tokenpath = __dirname + '/../public/data/access_token.json';
var ticketpath = __dirname + '/../public/data/apiticket.json';
var Ticket = function() {
    var request = require('request');
    var fs = require('fs');
    this.gettoken = function(appid, secret, callback_) {
        async.waterfall([
            function(cb) {
                fs.readFile(tokenpath, 'utf8', function(err, text) {
                    if (err) {
                        console.log(JSON.stringify(err));
                        cb(null,'');
                    } else {
                        cb(null, text);
                    }
                });
            },
            function(text, cb) {
                console.log('获取到文件中得token信息：' + text)
                if (text == '') {
                    var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret;
                    request.put(url, function(err, response, body) {
                        if (err) {
                            cb(new Error(err));
                        } else {
                            cb(null, body);
                        }
                    });
                } else {
                    cb('finished', text);
                }
            },
            function(body, cb) {
                console.log('通过api请求到的token信息：' + body)
                fs.writeFile('public/data/access_token.json', body, {
                    encoding: 'utf-8',
                    flag: 'w'
                }, function(err) {
                    if (err) {
                        cb(new Error(err));
                    } else {
                        console.log('save success1');
                        cb(null, body);
                    }
                });
            },
        ], function(err, result) {
            console.log('最终获得的token为：' + result)
            if (err && err != 'finished') {
                console.log(err)
            } else {
                tools.execCB(callback_, JSON.parse(result).access_token);
            }
        });
    };

    this.getticket = function(tk, callback_) {
        var url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + tk + '&type=jsapi';
        request.put(url, function(err, response, body) {
            if (err) {
                console.log(err);
                return;
            }
            fs.writeFile(ticketpath, body, {
                encoding: 'utf-8',
                flag: 'w'
            }, function(err) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('save success2');
                if (typeof(callback_) === 'function') {
                    callback_.call(this, JSON.parse(body).ticket);
                }
            });;
        });

    };


}
module.exports = new Ticket();
