var audio = document.querySelector('#bgmusic');
var musicbtn = document.querySelector('#musicbtn>img');
console.log(musicbtn)
var played = true;
musicbtn.addEventListener('click', function() {
    controller(this);
}, false)

function controller(ele) {
    if (played) {
        audio.pause();
        played = false;
        removeClass(ele)
    } else {
        audio.play();
        played = true;
        addClass(ele);
    }
}

function addClass(ele) {
    console.log(ele.className)
    ele.className = 'spin';
}

function removeClass(ele) {
    ele.className='';
}
