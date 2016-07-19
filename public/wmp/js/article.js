$(function() {
    getarticles(1);
    //通过Ajax获取后台返回来的文章信息
    function getarticles(page) {
        var page = page;
        $.ajax({
            url: '/wmp/article/getarticles?page=' + page,
            type: 'GET',
            success: function(data) {
                if (data.item.length < 20) {
                    vue1.seemore = false;
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
            seemore: true
        },
        methods: {
            getmore: function() {
                this.page++;
                getarticles(this.page);
            }
        }
    });
    function render(newarticles) {
        vue1.articles = vue1.articles.concat(newarticles.item)
    }

});
