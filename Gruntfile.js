'use strict';

var browsers = [
    'last 2 versions',
    'ie 9',
    'ie 10',
    'Firefox ESR',
    'Opera 12.1'
];

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        meta: {
            banner: '\n/*!\n * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("dd.mm.yyyy") %>\n' +
                ' * <%= pkg.homepage %>\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>, <%= _.pluck(pkg.contributors, "name").join(", ") %>\n' +
                ' * Licensed under the <%= pkg.license %> license\n' +
                ' * MODIFIED for i12 GmbH by Patrick Schaper December 2015\n */\n\n'
        },

        browserify: {
            options: {
                browserifyOptions: {
                    fullPaths: false
                },
                banner: '<%= meta.banner %>'
            },
            dist_min: {
                options: {
                    transform: [
                        ['uglifyify', { global: true } ],
                    ]
                },
                src: 'src/js/shariff.js',
                dest: 'build/shariff.min.js'
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: [
                'src/js/*.js',
                'src/js/services/*.js'
            ]
        },

        less: {
            options: {
                banner: '<%= meta.banner %>',
                paths: [
                    'node_modules/shariff/src/style'
                ],
                plugins: [
                    new (require('less-plugin-autoprefix'))({browsers: browsers}),
                    new (require('less-plugin-clean-css'))({keepSpecialComments: 1})
                ],
                strictMath: true
            },
            dist_min: {
                src: 'src/style/shariff.less',
                dest: 'build/shariff.min.css'
            }
        },
        file_append: {
            default_options: {
                files: [
                    {
                        prepend: '(function($) { \n\t$(document).ready(function() {\n',
                        append: '\n\t});\n})(cms_jQuery);',
                        input: 'build/shariff.min.js',
                        output: 'build/shariff.min.js'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-file-append');

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('build', ['test', 'less:dist_min', 'browserify:dist_min', 'file_append']);
};
