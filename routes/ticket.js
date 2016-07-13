var apiticket = function() {
    var request = require('request');
    var fs = require('fs');
    this.gettoken = function(appid, secret, callback_) {
        fs.readFile('public/data/access_token.json', 'utf8', function(err, txt) {
            if (err || txt == '') {
                var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret;
                request.put(url, function(err, response, body) {
                    if (err || body === undefined) {
                        console.log(err);
                        return;
                    }
                    fs.writeFile('public/data/access_token.json', body, {
                        encoding: 'utf-8',
                        flag: 'w'
                    }, function(err) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log('save success1');
                        if (typeof(callback_) === 'function') {
                            callback_.call(this, JSON.parse(body).access_token);
                        }
                    });
                });
                return;
            }
            if (typeof(callback_) === 'function') {
                callback_.call(this, JSON.parse(txt).access_token);
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
            fs.writeFile('public/data/apiticket.json', body, {
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
module.exports = apiticket;
