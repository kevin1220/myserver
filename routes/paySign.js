var Sign = function(appid, mch_id, desc, key, spbill_create_ip, total_fee, notify_url, openid) {
    var s = this;
    var tools = require('./tools.js');
    var request = require('request');
    var xml2js = require('xml2js');
    var builder = new xml2js.Builder({
        rootName: 'xml'
    }); // JSON->xml
    var md5 = require('md5');
    var appid = appid;
    var mch_id = mch_id;
    var desc = desc;
    var key = key;
    var spbill_create_ip = spbill_create_ip;
    var total_fee = total_fee;
    var notify_url = notify_url;
    var openid = openid;



    s.getpaySign = function() {
        console.log(appid)
        console.log(mch_id)
        console.log(desc)
        console.log(total_fee)
        console.log(spbill_create_ip)
        var _url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
        var ret = {};
        var params = {
            appid: appid,
            mch_id: mch_id,
            body: desc, //商品或支付单简要描述
            total_fee: total_fee, //订单总金额，单位为分
            spbill_create_ip: spbill_create_ip, //提交端的IP
            notify_url: notify_url, //接收微信支付异步通知回调地址
            trade_type: 'JSAPI',
            openid: openid
        }
        params.nonce_str = getnonceStr();
        params.out_trade_no = gettimeStamp() + getnonceStr().slice(16);
        console.log(params.out_trade_no.length);
        params.sign = getSign(params);
        console.log(params);
        var xmlparams = builder.buildObject(params);
        console.log('xml:' + (typeof xmlparams));

        request({
            url: _url,
            method: 'POST',
            body: xmlparams
        }, function(error, response, body) {
            console.log(body)
        });



    }

    function gettimeStamp() {
        return Date.parse(new Date());
    }

    function getnonceStr() {
        return tools.guid();
    }

    function getSign(ret) {
        var arr = new Array();
        var stringA;
        var stringSignTemp;
        for (i in ret) {
            if (i != 'sign') {
                arr.push(ret[i]);
            }
        }
        stringA = arr.sort();
        stringSignTemp = stringA + '&key=' + key;
        var sign = md5(stringSignTemp).toUpperCase();
        return sign;
    }


}

module.exports = Sign;
