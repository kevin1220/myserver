/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        // grunt.config("pkg.title") 
        banner: '/*! <%= grunt.config("pkg.title") || grunt.config("pkg.name") %> - v<%= grunt.config("pkg.version") %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= grunt.config("pkg.homepage") ? "* " + grunt.config("pkg.homepage") + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= grunt.config("pkg.author.name") %>;' +
            ' Licensed <%= _.pluck(grunt.config("pkg.licenses"), "type").join(", ") %> */\n',
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            js: {
                src: ['src/**/*.js'],
                dest: 'dist/<%= grunt.config("pkg.name") %>.js'
            },
            css: {
                src: ['src/**/*.css'],
                dest: 'dist/<%= grunt.config("pkg.name") %>.css'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            js: {
                src: '<%= concat.js.dest %>',
                dest: 'dist/<%= grunt.config("pkg.name") %>.min.js'
            },
            diy: {
                src: 'dist/zepto/zepto.js',
                dest: 'dist/zepto/zepto.min.js'
            }
        },
        jshint: {
            options: {
                curly: true,
                // eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                // undef: true,
                // unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                devel: true,
                globals: {},
                asi: true
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            js: {
                src: ['src/**/*.js', 'test/**/*.js']
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            js: {
                files: '<%= jshint.js.src %>',
                tasks: ['jshint', 'concat:js', 'uglify:js']
            },
            less: {
                files: 'src/css/less/*.less',
                tasks: ['less:production', 'concat:css', 'cssmin:target']
            },
            // html: {
            //  files: '<%= qunit.files %>',
            //  tasks: ['qunit']
            // }
        },
        // bower: {
        //     install: {
        //         options: {
        //             targetDir: "dist",
        //             layout: "byComponent",
        //             install: true,
        //             verbose: false,
        //             cleanTargetDir: false
        //         }
        //     }
        // },
        csslint: {
            strict: {
                options: {
                    import: 2
                },
                src: ['src/**/*.css']
            },
            lax: {
                options: {
                    import: false
                },
                src: ['src/**/*.css']
            }
        },
        less: {
            development: {
                options: {
                    paths: ["assets/css"]
                },
                files: {
                    "path/to/result.css": "path/to/source.less"
                }
            },
            production: {
                options: {
                    paths: ["assets/css"],
                    plugins: [
                        // new(require('less-plugin-autoprefix'))({
                        //  browsers: ["last 2 versions"]
                        // })
                        // new(require('less-plugin-clean-css'))(cleanCssOptions)
                    ],
                    modifyVars: {
                        imgPath: '"http://mycdn.com/path/to/images"',
                        bgColor: 'red'
                    }
                },
                files: {
                    "src/css/widget.css": "src/css/less/widget.less",
                    // "src/css/b.css": "src/css/less/b.less"
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/<%= grunt.config("pkg.name") %>.min.css': 'src/css/*.css'
                }
            }
        },
        jasmine: {
            src: 'src/**/*.js',
            options: {
                specs: 'test/**/*.js',
                keepRunner: true
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    // grunt.loadNpmTasks('grunt-contrib-csslint');
    // 打印grunt日志
    // grunt.log.writeln("chong:"+grunt.config("pkg.name"));

    // Default task.
    grunt.registerTask('default', ['watch']);

};
