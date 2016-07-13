function qqcao(uin) {
    var type = undefined;
    var param = "";
    var sid = 2;
    var rawuin = uin ;
    var qsig = "undefined";
    var QQApi = {
        openURL: function(url) {
            var i = document.createElement('iframe');
            i.style.display = 'none';
            i.onload = function() { i.parentNode.removeChild(i); };
            i.src = url;
            document.body.appendChild(i);

            var returnValue = QQApi.__RETURN_VALUE;
            QQApi.__RETURN_VALUE = undefined;
            return returnValue;
        },
        isAppInstalled: function(scheme) {
            var parameters = { 'scheme': scheme };
            var r = QQApi.openURL('jsbridge://app/isInstalled_?p=' + encodeURIComponent(JSON.stringify(parameters)));
            return r ? r.result : null;
        },
        isQQWebView: function() {
            return QQApi.isAppInstalled('mqq') == true;
        },
        __RETURN_VALUE: undefined
    };
    var usa = navigator.userAgent;
    var p;
    var mobile_q_jump = {
        android: "https://play.google.com/store/apps/details?id=com.tencent.mobileqq",
        ios: "itms-apps://itunes.apple.com/cn/app/qq-2011/id444934666?mt=8",
        winphone: "http://www.windowsphone.com/zh-cn/store/app/qq/b45f0a5f-13d8-422b-9be5-c750af531762",
        pc: "http://mobile.qq.com/index.html"
    };
    var isMQ = 0;
    if (typeof type == "undefined") type = 1;
    if (usa.indexOf("Android") > -1) {
        p = "android";
    } else if (usa.indexOf("iPhone") > -1 || usa.indexOf("iPad") > -1 || usa.indexOf("iPod") > -1) {
        p = "ios";
    } else if (usa.indexOf("Windows Phone") > -1 || usa.indexOf("WPDesktop") > -1) {
        p = "winphone";
    } else {
        p = "pc";
    }
    if (p == "ios") {
        //防止循环
        if (history.pushState)
            history.pushState({}, "t", "#");
        isMQ = QQApi.isQQWebView();
        if (!isMQ) {
            var sc = document.createElement("script");
            sc.src = "http://__.qq.com/api/qqapi.js";
            sc.onload = function() {
                if (window['iOSQQApi']) {
                    isMQ = iOSQQApi.device.isMobileQQ();
                }
            };
            document.body.appendChild(sc);
        }
    } else if (p == "pc" && qsig != "undefined") {
        window.open(qsig, "_self");
    }
    if (type == 1) { //手Q
        var isSuccess = true;
        var f = document.createElement("iframe");
        f.style.display = "none";
        document.body.appendChild(f);
        f.onload = function() {
            isSuccess = false;
        };
        if (p == "ios" && sid == 1) {
            f.src = "mqqapi://card/show_pslcard?src_type=internal&version=1&uin=" + rawuin + "&card_type=person&source=qrcode";
        }
        if (p == "ios" && sid == 2) { //ios并且为群名片
            f.src = "mqqapi://card/show_pslcard?src_type=internal&version=1&uin=" + rawuin + "&card_type=person&source=qrcode";
        } else if (p != "pc") {
            var url = window.location.href.split("&");
            f.src = "mqqopensdkapi://bizAgent/qm/qr?url=" + encodeURIComponent(url[0]);
        }
        if (p == "android" && sid == 1) {
            f.src = "mqqapi://card/show_pslcard?src_type=internal&version=1&uin=" + rawuin + "&card_type=person&source=qrcode";
        }
        if (p == "android" && sid == 2) { //ios并且为群名片
            f.src = "mqqapi://card/show_pslcard?src_type=internal&version=1&uin=" + rawuin + "&card_type=person&source=qrcode";
        }
        var now = Date.now();
        setTimeout(function() {
            if ((p == "ios" && !isMQ && Date.now() - now < 2000) || (p == "android" && !isSuccess) || ((p == "winphone" && Date.now() - now < 2000))) {
                var jumpUrl = mobile_q_jump[p];
                if (jumpUrl) window.open(jumpUrl, "_self");
            }
        }, 1500);

    }
}
