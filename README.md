
# klserver

#### 由kevin.l着手开发的一些微信功能和操作数据库的功能的api,基于`express`和`webot`框架写的后台应用
===

===



# <a name="index"/>目录
  * 微信功能
    * [jssdk的验证](#jssdk)
    * [获取用户基本信息](#userinfo)

======


## 微信功能


### <a name="jssdk"/>jssdk的验证
###### 已经实现了全局token的保存和读取
  * 后台代码：
```
//jssdk校验
router.get('/getconf', function(req, res, next) {
    console.log('进入jssdk');
    var Apiticket = require('./ticket.js');
    var apiticket = new Apiticket();
    var signurl = req.query.url;
    var signature = require('./signature.js');

    var ticket = '';
    var access_token = '';
    var ret = null;
    apiticket.gettoken(appid, secret, function(access_token) {
        if (access_token) {
            apiticket.getticket(access_token, function(ticket) {
                ret = new signature(ticket, appid, signurl);
                res.send(ret);
            });
        }
    });
});
```
  * 前端代码：
```
  $.ajax({
        url: 'http://www.wit-orange.com/wechat/getconf?url=' + location.href,
        success: function(config) {
            console.log(config.appid);
            console.log(config.timestamp);
            console.log(config.nonceStr);
            console.log(config.signature);
            console.log(config.jsApiList);
            wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: config.appid, // 必填，公众号的唯一标识
                timestamp: config.timestamp, // 必填，生成签名的时间戳
                nonceStr: config.nonceStr, // 必填，生成签名的随机串
                signature: config.signature, // 必填，签名，见附录1
                jsApiList: ['chooseImage', 'uploadImage', 'uploadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        }
    });
```

### <a name="userinfo"/>openid和用户基础信息的获取
##### 已经实现了全局token的保存和读取，同时也实现了把用户信息保存到数据库的功能
###### 通过访问http://ip/app?app=appname的形式访问微信应用，将用户的微信基本信息保存到appname_basewechats的collection中。




