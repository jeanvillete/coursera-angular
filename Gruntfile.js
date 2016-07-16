'use strict';

module.exports = function( grunt ) {
    // time how long tasks take, can help when optimizing build times
    require( 'time-grunt' )( grunt );

    // automatically load required grunt tasks
    require( 'jit-grunt' )( grunt, {
        useminPrepare : 'grunt-usemin'
    });

    // define the configuration for all tasks
    grunt.initConfig({
        pkg : grunt.file.readJSON( 'package.json' ),

        // make sure code styles are up to par and there are no obvious mistakes
        jshint : {
            options : {
                jshintrc : '.jshintrc',
                reporter : require( 'jshint-stylish' )
            },
            all : {
                src : [
                    'Gruntfile.js',
                    'app/scripts/{,*/}*.js'
                ]
            }
        },
        copy : {
            dist : {
                cwd : 'app',
                src : [ '**', '!styles/**/*.css', '!scripts/**/*.js' ],
                dest : 'dist',
                expand : true
            },
            fonts : {
                files : [
                    {
                        // for bootstrap fonts
                        expand : true,
                        dot : true,
                        cwd : 'bower_components/bootstrap/dist',
                        src : [ 'fonts/*.*' ],
                        dest : 'dist'
                    }, {
                        // for font-awesome
                        expand : true,
                        dot : true,
                        cwd : 'bower_components/font-awesome',
                        src : [ 'fonts/*.*' ],
                        dest : 'dist'
                    }
                ]
            }
        },
        clean : {
            build : {
                src : [ 'dist/' ]
            }
        },
        useminPrepare : {
            html : 'app/menu.html',
            options : {
                dest : 'dist'
            }
        },
        concat : {
            options : {
                separator : ';'
            },
            dist : {}
        },
        uglify : {
            dist : {}
        },
        cssmin : {
            dist : {}
        },
        filerev : {
            options : {
                encoding : 'utf8',
                algorithm : 'md5',
                length : 20
            },
            release : {
                files : [
                    {
                        src : [
                            'dist/scripts/*.js',
                            'dist/styles/*.css'
                        ]
                    }
                ]
            }
        },
        usemin : {
            html : [ 'dist/*.html' ],
            css : [ 'dist/styles/*.css' ],
            options : {
                assetsDirs : [ 'dist', 'dist/styles' ]
            }
        }
    });

    grunt.registerTask( 'build', [
        'clean', 'jshint', 'copy', 'useminPrepare', 'concat', 'cssmin', 'uglify', 'copy', 'filerev', 'usemin'
    ]);

    grunt.registerTask( 'default', [ 'build' ]);
};