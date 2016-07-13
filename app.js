var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var wechat = require('./routes/wechat.js');
var zmkxj = require('./routes/zmkxj.js');
var wlgs = require('./routes/wlgs.js');
var vote = require('./routes/vote.js');
var rchbsj = require('./routes/rchbsj.js');
var tongueart = require('./routes/tongueart.js');
var jffatherday = require('./routes/jffatherday.js');
var baoli = require('./routes/baoli.js');
var hrth = require('./routes/hrth.js');
var xktfw = require('./routes/xktfw.js');
var qiandao = require('./routes/qiandao.js');
var mongoose = require('mongoose');

/***********************************链接到数据库*********************************************/
var uri = 'mongodb://127.0.0.1/myserver';
mongoose.connect(uri, {
    server: {
        poolSize: 10
    },
    auth: {
        user: "tczx",
        pass: "123456Wj"
    }
});
mongoose.connection.on('error', console.error.bind(console, '连接错误:'));

/***********************************链接到数据库*********************************************/
var app = express();

function clearData() {
    console.log(new Date());
    var exec = require('child_process').exec,
        child;
    child = exec('rm -f /home/tczx/gitproject/myserver/public/data/*', function(err, out) {
        if (err) {
            console.log(err);
        } else {
            console.log(out);
        }
    });
}

// 定时任务
clearData();
var schedule = require('node-schedule');
var j = schedule.scheduleJob('0 */2 * * *', function() {
    clearData();
});



//设置跨域访问
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });





app.get('/auth/:id/:password', function(req, res) {
    res.send({
        id: req.params.id,
        name: req.params.password
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.query());
app.use('/', wechat);
app.use('/wechat', wechat);
app.use('/zmkxj', zmkxj);
app.use('/wlgs', wlgs);
app.use('/vote', vote);
app.use('/rchbsj', rchbsj);
app.use('/tongueart', tongueart);
app.use('/jffatherday', jffatherday);
app.use('/baoli', baoli);
app.use('/hrth', hrth);
app.use('/xktfw', xktfw);
app.use('/qiandao', qiandao);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
