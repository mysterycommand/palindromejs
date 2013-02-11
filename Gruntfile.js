/** ====================================================================================================== **/
/**
 * @fileOverview
 * The Gruntfile controls the build and server processes.
 * @see <a href="https://github.com/gruntjs/grunt/wiki">Grunt Wiki</a>
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ====================================================================================================== **/

module.exports = function( grunt ) {
    'use strict';
    //
    // Grunt configuration:
    //
    // https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
    //
    grunt.initConfig({

        // Project configuration
        // ---------------------

        // Coffee to JS compilation
        coffee: {
            compile: {
                files: {
                    'temp/js/*.js': 'app/cs/**/*.coffee'
                },
                options: {
                    basePath: 'app/cs'
                }
            }
        },

        // compile .scss/.sass to .css using Compass
        compass: {
            dist: {
                // http://compass-style.org/help/tutorials/configuration-reference/#configuration-properties
                options: {
                    css_dir: 'temp/css',
                    sass_dir: 'app/scss',
                    images_dir: 'app/img',
                    javascripts_dir: 'temp/js',
                    relative_assets: true,
                    force: true
                }
            }
        },

        // generate application cache manifest
        manifest:{
            dest: ''
        },

        // headless testing through PhantomJS
        mocha: {
            all: ['test/**/*.html']
        },

        // default watch configuration
        watch: {
            coffee: {
                files: 'app/cs/**/*.coffee',
                tasks: 'coffee reload'
            },
            compass: {
                files: [
                    'app/scss/**/*.{scss,sass}'
                ],
                tasks: 'compass reload'
            },
            reload: {
                files: [
                    'app/*.html',
                    'app/css/**/*.css',
                    'app/js/**/*.js',
                    'app/img/**/*'
                ],
                tasks: 'reload'
            }
        },

        // default lint configuration, change this to match your setup:
        // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#lint-built-in-task
        lint: {
            options: {
                // specifying JSHint options and globals
                options: {
                    curly: true,
                    eqeqeq: true,
                    immed: true,
                    latedef: true,
                    newcap: true,
                    noarg: true,
                    sub: true,
                    undef: true,
                    boss: true,
                    eqnull: true,
                    browser: true
                },
                globals: {
                    jQuery: true
                }
            },
            files: [
                'Gruntfile.js',
                'app/js/**/*.js',
                'test/js/**/*.js'
            ]
        },

        // Build configuration
        // -------------------

        // the staging directory used during the process
        staging: 'temp',
        // final build output
        output: 'dist',

        mkdirs: {
            staging: 'app/'
        },

        // Below, all paths are relative to the staging directory, which is a copy
        // of the app/ directory. Any .gitignore, .ignore and .buildignore file
        // that might appear in the app/ tree are used to ignore these values
        // during the copy process.

        // concat css/**/*.css files, inline @import, output a single minified css
        css: {
            'css/index.css': ['css/**/*.css']
        },

        // renames JS/CSS to prepend a hash of their contents for easier
        // versioning
        rev: {
            js: 'js/**/*.js',
            css: 'css/**/*.css',
            img: 'img/**'
        },

        // usemin handler should point to the file containing
        // the usemin blocks to be parsed
        'usemin-handler': {
            html: 'index.html'
        },

        // update references in HTML/CSS to revved files
        usemin: {
            html: ['**/*.html'],
            css: ['**/*.css']
        },

        // HTML minification
        html: {
            files: ['**/*.html']
        },

        // Optimizes JPGs and PNGs (with jpegtran & optipng)
        img: {
            dist: '<config:rev.img>'
        },

        // rjs configuration. You don't necessarily need to specify the typical
        // `path` configuration, the rjs task will parse these values from your
        // main module, using http://requirejs.org/docs/optimization.html#mainConfigFile
        //
        // name / out / mainConfig file should be used. You can let it blank if
        // you're using usemin-handler to parse rjs config from markup (default
        // setup)
        rjs: {
            // no minification, is done by the min task
            optimize: 'none',
            baseUrl: './js',
            wrap: true,
            name: 'config'
        },
    });

    // Alias the `test` task to run the `mocha` task instead
    grunt.registerTask('test', 'mocha');

};
