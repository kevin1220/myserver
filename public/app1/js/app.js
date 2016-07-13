var app = angular.module('wxApp', []);
app.controller('wxCtrl', ['$scope', '$http', '$window',
    function($scope, $http, $window) {
        //jssdk校验
        $scope.jssdk = function() {
            $scope.url = 'http://www.wit-orange.com/wechat';
            $scope.jssdkurl = "http://www.wit-orange.com/wechat/getconf?url=" + $window.location.href;
            // jssdk校验
            $http.get($scope.jssdkurl).
            success(function(config) {
                wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: config.appid, // 必填，公众号的唯一标识
                    timestamp: config.timestamp, // 必填，生成签名的时间戳
                    nonceStr: config.nonceStr, // 必填，生成签名的随机串
                    signature: config.signature, // 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline', 'chooseWXPay', 'chooseImage', 'uploadImage', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log(data);
            });
        }
        $scope.jssdk();
        $scope.name = 'kevin';
        //选择上传照片
        $scope.chooseImage = function() {
            wx.chooseImage({
                count: 2, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function(res) {
                    $scope.localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                }
            });
        };
        $scope.uploadImage = function() {
            var url = './posters.html';
            var serverIds = [];
            $scope.syncupload(url, $scope.localIds, serverIds);
        }
        $scope.syncupload = function(url, localIds, serverIds) {
            console.log(localIds.length);
            if (localIds.length === 0) {
                return;
            }
            var localId = localIds.pop();
            wx.uploadImage({
                localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function(res) {
                    // $scope.serverIds[i] = res.serverId; // 返回图片的服务器端ID
                    serverIds.push(res.serverId);
                    if (localIds.length > 0) {
                        $scope.syncupload(url, localIds, serverIds);
                        return;
                    }
                    $window.location.href = url + '?serverId=' + serverIds;
                }
            });
        }
        $scope.startRecord = function() {
            alert('录制开始');
            wx.startRecord();
            wx.onVoiceRecordEnd({
                // 录音时间超过一分钟没有停止的时候会执行 complete 回调
                complete: function(res) {
                    $scope.localId = res.localId;
                    alert('录制完成');
                    $scope.uploadVoice();
                    return;
                }
            });
        }
        $scope.stopRecord = function() {
            wx.stopRecord({
                success: function(res) {
                    $scope.localId = res.localId;
                    alert('录制停止');
                    $scope.uploadVoice();
                    return;
                }
            });
        }
        $scope.playVoice = function() {
            alert('播放开始');
            wx.playVoice({
                localId: $scope.localId // 需要播放的音频的本地ID，由stopRecord接口获得
            });
            wx.onVoicePlayEnd({
                success: function(res) {
                    $scope.localId = res.localId; // 返回音频的本地ID
                    alert('播放停止');
                }
            });
        }
        $scope.pauseVoice = function() {
            wx.pauseVoice({
                localId: $scope.localId // 需要暂停的音频的本地ID，由stopRecord接口获得
            });
        }
        $scope.stopVoice = function() {
            wx.stopVoice({
                localId: $scope.localId // 需要停止的音频的本地ID，由stopRecord接口获得
            });
        }
        $scope.uploadVoice = function() {
            wx.uploadVoice({
                localId: $scope.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function(res) {
                    var serverId = res.serverId; // 返回音频的服务器端ID
                    alert(serverId);
                    $http.get($scope.url + '/saveVoice?serverId=' + serverId).success(function(data) {
                        console.log(data);
                    });
                }
            });
        }
    }
]);

app.controller('sliderCtrl', ['$scope', function($scope) {
    //slider
    $scope.slider = function() {
        var swiperEle = document.getElementById('swiper-container1');
        setSize(swiperEle);
        var mySwiper = new Swiper('#swiper-container1', {
            direction: 'vertical',
            loop: true,

            // 如果需要分页器
            // pagination: '.swiper-pagination',

            // 如果需要前进后退按钮
            // nextButton: '.swiper-button-next',
            // prevButton: '.swiper-button-prev',

            // 如果需要滚动条
            // scrollbar: '.swiper-scrollbar',
        })
    }
    $scope.slider();
    $scope.users = [
        { name: 'chong', age: '27' },
        { name: 'weiqian', age: '26' },
        { name: 'kevin', age: '28' },
    ];
    $scope.name = 'chong';
}]);
app.controller('testCtrl', ['$scope', function ($scope) {
    
}])
