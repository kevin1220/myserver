var RedPackage = function(key, mch_id, wxappid, send_name, re_openid, mch_id, total_amount, total_num, wishing, client_ip, act_name, remark) {
    var s = this;
    var tools = require('./tools.js');
    var request = require('request');
    var fs = require('fs');
    var path = require('path');
    var xml2js = require('xml2js');
    var builder = new xml2js.Builder({
        rootName: 'xml'
    }); // JSON->xml
    var md5 = require('md5');
    var mch_id = mch_id;
    var wxappid = wxappid;
    var send_name = send_name;
    var re_openid = re_openid;
    var total_amount = total_amount;
    var total_num = total_num;
    var wishing = wishing;
    var client_ip = client_ip;
    var act_name = act_name;
    var remark = remark;
    s.key = key;

    s.sendRedPackage = function() {
        var _url = 'https://api.mch.weixin.qq.com/mmpaymkttransfers/sendredpack';
        var ret = {};
        var params = {
            wxappid: wxappid,
            send_name: send_name,
            re_openid: re_openid,
            mch_id: mch_id,
            total_amount: total_amount,
            total_num: total_num,
            wishing: wishing,
            client_ip: client_ip,
            act_name: act_name,
            remark: remark
        }
        params.nonce_str = getnonceStr();
        params.mch_billno = gettimeStamp() + getnonceStr().slice(17);
        params.sign = getSign(params);
        var xmlparams = builder.buildObject(params);
        console.log('xml:' + xmlparams);
        var certFile = fs.readFileSync('ssl/apiclient_cert.pem');
        var keyFile = fs.readFileSync('ssl/apiclient_key.pem');
        var caFile = fs.readFileSync('ssl/rootca.pem');
        request({
            url: _url,
            method: 'POST',
            body: xmlparams,
            cert: certFile,
            key: keyFile,
            ca: caFile
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
        var stringA = '';
        var stringSignTemp;
        for (i in ret) {
            if (i != 'sign' || ret[i] != '') {
                arr.push(i);
            }
        }
        arr = arr.sort();
        for (var i = 0; i < arr.length; i++) {
            var key = arr[i];
            stringA += '&' + key + '=' + ret[key];
        }
        stringSignTemp = stringA.slice(1) + '&key=' + s.key;
        var sign = md5(stringSignTemp).toUpperCase();
        return sign;
    }
}

module.exports = RedPackage;
