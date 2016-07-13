/**
 * @param  {jquery hammer}
 * @param  {jquery holes}
 * @param  {json options}
 * @return {[type]}
 */
var Game = function(hammer, hole, options) {
    this.hammer = hammer;
    this.timmer;
    this.hole = hole;
    this.counter = 0;
    this.score = 10;
    this.time = 30;
}

Game.prototype.config = function(options) {
    
}
Game.prototype.start = function() {
    var that = this;

    //游戏开始 随机出现金块
    clearInterval(that.timmer);
    that.timmer = setInterval(function() {
        var goldholes = that.hole.random();
        if (!goldholes.hasClass('showgold')) {
            goldholes.addClass('showgold');
        }
        var timeout1 = setTimeout(function() {
            goldholes.removeClass('showgold');
        }, 800);
        if ($('.showgold').length > 0) {
            $('.showgold').each(function() {
                $(this).on('click', function() {
                    that.counter += that.score;
                    $(this).off('click');
                    $('.score').text(that.counter);
                    $(this).removeClass('showgold');
                    $(this).addClass('death');
                    var showgold = this;
                    setTimeout(function() {
                        $(showgold).removeClass('death');
                    }, 300);
                });
            });
        }
    }, 300);


}
Game.prototype.stop = function() {
    var that = this;
    clearInterval(that.timmer);
    that.hole.each(function() {
        $(this).off('click');
        if ($(this).hasClass('showgold')) {
            $(this).removeClass('showgold');
        }
        if ($(this).hasClass('death')) {
            $(this).removeClass('death');
        }
    });

}


$.fn.random = function() {
    var index = Math.ceil(Math.random() * $(this).length - 1);
    return $(this).eq(index);
}
