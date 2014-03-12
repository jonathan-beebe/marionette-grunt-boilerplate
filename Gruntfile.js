module.exports = function (grunt) {

  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    app: {
      src: 'src',
      build: 'build'
    },

    clean: ['<%= app.build %>'],

    watch: {
      css: {
        files: ['<%= app.src %>/styles/*.less'],
        tasks: ['less'],
        options: {
          spawn: false
        }
      },
      templates: {
        files: ['<%= app.src %>/templates/**/*.tpl', '<%= app.src %>/scripts/**/*.tpl'],
        tasks: ['jst:compile'],
        options: {
          spawn: false
        }
      }
    },

//    concat: {
//      dist: {
//        src: [
//          '<%= app.src %>/scripts/**/*.js' // All our custom js
//        ],
//        dest: '<%= app.build %>/scripts/production.js'
//      }
//    },

    uglify: {
      build: {
        src: '<%= app.build %>/scripts/production.js',
        dest: '<%= app.build %>/scripts/production.min.js'
      }
    },

    less: {
      development: {
        files: {
          "<%= app.src %>/styles/styles.css": "<%= app.src %>/styles/styles.less"
        }
      },
      build: {
        options: {
          paths: ['<%= app.build %>/styles/'],
          yuicompress: true
        },
        files: {
          "<%= app.build %>/styles/styles.css": "<%= app.src %>/styles/styles.less"
        }
      }
    },

    requirejs: {
      compile: {
        options: {
          name: "../bower_components/almond/almond", // Path to almond requirejs production runner for built js
          baseUrl: "<%= app.src %>/scripts",
          mainConfigFile: "src/scripts/main.js",
          include: ['main'], // Include the main module defined
          wrap: true, // Wrap everything up in a closure
          //generateSourceMaps: true, // Experimental
          preserveLicenseComments: false, // Needs turned off for generateSourceMaps
          optimize: "none", // Supports generateSourceMaps
          out: "<%= app.build %>/scripts/main.js"
        }
      }
    },

    copy: {
      main: {
        src: '<%= app.src %>/index.html',
        dest: '<%= app.build %>/index.html',
        options: {
          process: function (content, srcpath) {
            var regexp = new RegExp('<script data-main="scripts/main"[^<]+></script>', 'g');
            return content.replace(regexp, '<script src="scripts/main.js"></script>');
          }
        }
      },
      templates: {
        src: '<%= app.src %>/scripts/templates.js',
        dest: '<%= app.build %>/scripts/templates.js'
      }
    },

    jst: {
      compile: {
        options: {
          // templateSettings: {
            //interpolate : /\{\{(.+?)\}\}/g
          // },
          //namespace: "anotherNameThanJST",      //Default: 'JST'
          prettify: false,                        //Default: false|true
          amdWrapper: false,                      //Default: false|true
          processName: function (filename) {
            var key = 'templates/';
            return filename.slice(filename.indexOf(key) + key.length, filename.lastIndexOf('.'));
          }
        },
        files: {
          "<%= app.src %>/scripts/templates.js": ["<%= app.src %>/**/*.tpl"]
        }
      }
    },

    connect: {
      options: {
        port: 8000,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: ['.tmp', '<%= app.src %>']
        }
      },
      test: {
        options: {
          port: 8000
          //base: ['.tmp', 'test', '<%= app.src %>']
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= app.build %>',
          livereload: false
        }
      }
    },

    react: {
      files: {
        expand: true,
        cwd: '<%= app.src %>/scripts/components/react/jsx',
        src: ['**/*.jsx'],
        dest: '<%= app.src %>/scripts/components/react/js',
        ext: '.js'
      }
    },

    jasmine: {
      taskName: {
        src: '<%= app.src %>/scripts/**/*.js',
        options: {
          specs: 'spec/*Spec.js',
          //helpers: 'spec/*Helper.js',
          host: 'http://127.0.0.1:8000/',
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfigFile: '<%= app.src %>/scripts/main.js',
            requireConfig: {
              baseUrl: "<%= app.src %>/scripts"
            }
          }
        }
      }
    },

    docco: {
      debug: {
        src: ['<%= app.src %>/sripts/**/*.js'],
        options: {
          output: '<%= app.build %>/docs'
        }
      }
    },

    eslint: {
      options: {
        config: '.eslintrc/eslint.json',
        //rulesdir: '.eslintrc/rules'
      },
      target: [
        '<%= app.src %>/scripts/**/*.js',
        '!<%= app.src %>/scripts/templates.js'
      ]
    }

  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['default', 'connect:dist:keepalive']);
    }
    grunt.task.run(['connect:livereload']);
  });

  grunt.registerTask('test', ['connect:test', 'jasmine']);

  // grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('default', ['clean', 'less', 'jst', 'requirejs', 'copy']);

  // grunt connect:livereload:keepalive
  // grunt connect:dist:keepalive

};
