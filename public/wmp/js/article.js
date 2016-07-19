var mySwiper = new Swiper('#swiper-container1', {
    direction: 'horizontal',
    loop: true,
    followFinger: false,
    // 如果需要分页器
    pagination: '.swiper-pagination',
})
$(function() {
    jssdk("智讯互动",location.href,null);
    getarticles(1);
    //通过Ajax获取后台返回来的文章信息
    function getarticles(page) {
        var page = page;
        $.ajax({
            url: '/wmp/article/getarticles?page=' + page,
            type: 'GET',
            success: function(data) {
                // console.log("服务端返回的数据：" + data);
                if (data.length < 20) {
                    vue1.seemore = false;
                }else{
                    vue1.seemore = true;
                }
                render(data);
            },
            error: function(err) {
                console.log(err);
            }
        });
    }
    //渲染文章内容部分
    var vue1 = new Vue({
        el: '#articles',
        data: {
            articles: [],
            page: 1,
            seemore: false,
        },
        methods: {
            getmore: function() {
                this.page++;
                getarticles(this.page);
            },
            gotosource: function(addr) {
                window.open(addr, "_self");
            }
        }
    });

    function render(newarticles) {
        vue1.articles = vue1.articles.concat(newarticles);
        console.log(vue1.articles);
    }

});
