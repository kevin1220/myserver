// 加 md5
fis.match('*.{js,css,png}', {
    useHash: true
});

// 启用 fis-spriter-csssprites 插件
fis.match('::package', {
    spriter: fis.plugin('csssprites')
})

// 对 CSS 进行图片合并
fis.match('*.css', {
    // 给匹配到的文件分配属性 `useSprite`
    useSprite: true
});

fis.match('*.js', {
    // fis-optimizer-uglify-js 插件进行压缩，已内置
    optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
    // fis-optimizer-clean-css 插件进行压缩，已内置
    optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
    // fis-optimizer-png-compressor 插件进行压缩，已内置
    optimizer: fis.plugin('png-compressor')
});

fis.match('::package', {
    postpackager: fis.plugin('loader', {
        allInOne: true
    })
});


// 所有的文件产出到 static/ 目录下
// fis.match('*', {
//     release: '/static/$0'
// });

// 所有模板放到 tempalte 目录下
var appname = "myapp"
fis.match('/**/*.html', {
    release: appname+'/template/$0'
});

fis.match('/index.html', {
    release: appname+'$0'
});
fis.match('*.js', {
    release: appname+'/static/$0'
});
fis.match('*.css', {
    release: appname+'/static/$0'
});
fis.match('*.png', {
    release: appname+'/static/$0'
});
fis.match('*.jpg', {
    release: appname+'/static/$0'
});
fis.match('*.git', {
    release: appname+'/static/$0'
});
fis.match('/.*/', {
    release: false
});
// widget源码目录下的资源被标注为组件
// fis.match('/widget/**/*', {
//     isMod: true
// });

// widget下的 js 调用 jswrapper 进行自动化组件化封装
// fis.match('/widget/**/*.js', {
//     postprocessor: fis.plugin('jswrapper', {
//         type: 'commonjs'
//     })
// });

// test 目录下的原封不动产出到 test 目录下
// fis.match('/test/**/*', {
//     release: '$0'
// });

//发布到远程服务器
fis.config.merge({
    deploy: {
        remote: {
            receiver: 'http://115.28.247.204:8999/receiver',
            from: './myapp',
            //远端目录
            to: '/home/tczx/gitproject/myserver/public/myapp'
        }
    }
});