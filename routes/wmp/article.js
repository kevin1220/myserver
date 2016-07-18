var express = require('express');
var router = express.Router();
var request = require('request');
var ticket = require('../ticket.js');
var async = require('async');


var appid = 'wx00a1c8d384eff1f3';
var secret = '2e1add79b87b207bd4ea9cc25d1ccf51';
/* GET home page. */
router.get('/getarticles', function(req, res, next) {
    var page = req.query.page;
    async.waterfall([
        function(cb) {
            ticket.gettoken(appid, secret, function(token) {
                cb(null, token);
            });
        },
        function(tk, cb) {
            var _url = "https://api.weixin.qq.com/cgi-bin/material/get_materialcount?access_token=" + tk;
            request.get(_url, { json: true }, function(err, response, body) {
                cb(null, tk, body.news_count);
            });
        },
        function(tk, sum, cb) {
            var offset = 0;
            var count = 20;
            var condition = sum - page * 20;
            if (condition >= 0) {
                offset = (page - 1) * 20;
                count = 20;
            } else {
                offset = (page - 1) * 20;
                count = condition + 20;
            }
            var _url = "https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=" + tk;
            request({
                method: 'POST',
                url: _url,
                json: true,
                body: {
                    "type": "news",
                    "offset": offset,
                    "count": count
                },
            }, function(err, response, body) {
                if (err) {
                    cb(new Error(err));
                } else {
                    cb(null, body);
                }
            });
        },
    ], function(err, result) {
        console.log(result);
        if (err) {
            res.send(500, { message: err });
        } else {
            // do st.
            res.send(result);
        }
    });
});

module.exports = router;
