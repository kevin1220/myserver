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
    console.log("page:" + page);
    async.waterfall([
        function(cb) {
            ticket.gettoken(appid, secret, function(token) {
                cb(null, token);
            });
        },
        function(tk, cb) {
            var _url = "https://api.weixin.qq.com/cgi-bin/material/get_materialcount?access_token=" + tk;
            request.get(_url, function(err, resp) {
                cb(null, tk, resp.news_count);
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
            request.post({
                url: _url,
                form: {
                    type: 'news',
                    offset: offset,
                    count: count
                },
            }, function(err, httpResponse, body) {
                if (err) {
                    cb(new Error(err));
                } else {
                    cb(null, body);
                }
            });
        },
    ], function(err, result) {
        if (err) {
            console.log(err);
        } else {
            // do st.
            res.send(result);
        }
    });
});

module.exports = router;
