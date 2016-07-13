var app = angular.module('app', ['ui.router', 'textAngular',
    'akoenig.deckgrid'
]);
app.controller('homeCtrl', ['$rootScope', '$scope', '$http', '$window', function($rootScope, $scope, $http, $window) {
    $scope.url = 'http://www.wit-orange.com/wechat';
    $scope.jssdkurl = "http://www.wit-orange.com/wechat/getconf?url=" + $window.location.href;
    // jssdk校验
    $http.get($scope.jssdkurl).
    success(function(config) {
        // alert(config.appid);
        // alert(config.timestamp);
        // alert(config.nonceStr);
        // alert(config.signature);
        // alert(config.jsApiList);
        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: config.appid, // 必填，公众号的唯一标识
            timestamp: config.timestamp, // 必填，生成签名的时间戳
            nonceStr: config.nonceStr, // 必填，生成签名的随机串
            signature: config.signature, // 必填，签名，见附录1
            jsApiList: ['chooseImage', 'uploadImage', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    }).
    error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(data);
    });
}])
app.controller('sliderCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.name = 'kevin';
    $scope.url = 'http://www.wit-orange.com/wechat';
    $scope.jssdkurl = "http://www.wit-orange.com/wechat/getconf?url=" + $window.location.href;
    // jssdk校验
    $http.get($scope.jssdkurl).
    success(function(config) {
        // alert(config.appid);
        // alert(config.timestamp);
        // alert(config.nonceStr);
        // alert(config.signature);
        // alert(config.jsApiList);
        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: config.appid, // 必填，公众号的唯一标识
            timestamp: config.timestamp, // 必填，生成签名的时间戳
            nonceStr: config.nonceStr, // 必填，生成签名的随机串
            signature: config.signature, // 必填，签名，见附录1
            jsApiList: ['chooseImage', 'uploadImage', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    }).
    error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(data);
    });
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
}])

app.controller('deckgridCtrl', ['$scope', function($scope) {
    $scope.photos = [{
        id: 'p1',
        'title': 'A nice day!',
        src: "../../images/1.jpg"
    }, {
        id: 'p2',
        'title': 'Puh!',
        src: "../../images/2.png"
    }, {
        id: 'p3',
        'title': 'What a club!',
        src: "../../images/3.png"
    }, {
        id: 'p3',
        'title': 'What a club!',
        src: "../../images/4.jpg"
    }, {
        id: 'p1',
        'title': 'A nice day!',
        src: "../../images/1.jpg"
    }, {
        id: 'p2',
        'title': 'Puh!',
        src: "../../images/2.png"
    }, {
        id: 'p3',
        'title': 'What a club!',
        src: "../../images/3.png"
    }, {
        id: 'p3',
        'title': 'What a club!',
        src: "../../images/4.jpg"
    }, {
        id: 'p1',
        'title': 'A nice day!',
        src: "../../images/1.jpg"
    }, {
        id: 'p2',
        'title': 'Puh!',
        src: "../../images/2.png"
    }, {
        id: 'p3',
        'title': 'What a club!',
        src: "../../images/3.png"
    }, {
        id: 'p3',
        'title': 'What a club!',
        src: "../../images/4.jpg"
    }];
}])
app.controller('textAngularCtrl', ['$scope', function($scope) {

}])
app.config(function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
    .state('home',{
        url:'/',
        templateUrl:'templates/pluginlist.html',

    })
    .state('slider',{
        url:'/slider',
        templateUrl:'templates/slider.html',
        // template:'<span ng-bind="chong"></span>',
        controller:'sliderCtrl'
    })
});
