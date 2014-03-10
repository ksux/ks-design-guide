// Generated using generator-propeller 0.5.6
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Code syntax highlighting.
  var hljs = require('highlight.js');
  hljs.configure({ classPrefix: '' });

  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },

    // define variables for Gruntfile
    config: {
      src:              'src',
      dist:             'dist',
      appFolder:        'app',
      componentsFolder: 'app/bower_components',
      jsFolder:         'app/scripts',
      cssFolder:        'app/styles',
      imgFolder:        'app/img',
      dataFolder:       'app/data',
      fontsFolder:      'app/fonts',
      cssMainFile:      'main',
      jsMainFile:       'scripts'
    },

    // watch for file changes and run tasks in response
    watch: {
      js: {
        files: ['<%= config.src %>/<%= config.jsFolder %>/{,*/}*.js'],
        tasks: ['newer:jshint', 'newer:copy:dist'],
        options: {
          livereload: true
        }
      },
      less: {
        files: [
          '<%= config.src %>/<%= config.cssFolder %>/**/*.{css,less}',
          '<%= config.src %>/assemble/patterns/**/*.{css,less}'
        ],
        tasks: ['less', 'autoprefixer', 'newer:assemble']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      pages: {
        files: ['<%= config.src %>/assemble/{pages,patterns}/{,*/}*.hbs'],
        tasks: ['newer:assemble']
      },
      assemble: {
        files: ['<%= config.src %>/assemble/{helpers,layouts,partials}/{,*/}*.{hbs,yml,json,js}'],
        tasks: ['assemble']
      },
      data: {
        files: ['<%= config.src %>/<%= config.dataFolder %>/{,*/}*.csv'],
        tasks: ['newer:convert', 'newer:assemble', 'newer:copy:dist']
      },
      img: {
        files: ['<%= config.src %>/<%= config.imgFolder %>/{,*/}*'],
        tasks: ['newer:copy:dist']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/<%= config.cssFolder %>/{,*/}*.css',
          '<%= config.dist %>/<%= config.jsFolder %>/{,*/}*.js',
          '<%= config.dist %>/<%= config.fontsFolder %>/{,*/}*',
          '<%= config.dist %>/<%= config.dataFolder %>/{,*/}*.csv',
          '<%= config.dist %>/<%= config.imgFolder %>/{,*/}*'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
        force: true
      },
      all: [
        'Gruntfile.js',
        '<%= config.src %>/<%= config.jsFolder %>/{,*/}*.js'
      ],
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= yeoman.dist %>/.git*',
            '<%= config.src %>/assemble/<%= config.dataFolder %>/*.json'
          ]
        }]
      },
      server: '.tmp'
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= config.src %>',
            dest: '<%= config.dist %>',
            src: [
              '*.{ico,png,txt,xml}',
              '.htaccess',
              '*.html',
              'views/{,*/}*.html',
              '<%= config.componentsFolder %>/**/*',
              '<%= config.imgFolder %>/{,*/}*',
              '<%= config.fontsFolder %>/{,*/}*',
              '<%= config.dataFolder %>/{,*/}*',
              '<%= config.imgFolder %>/{,*/}*',
              '<%= config.jsFolder %>/{,*/}*.js'
            ]
          }
        ]
      }
    },

    // Run some tasks in parallel to speed up the build process
    // concurrent: {
    //   server: [
    //     'copy:styles'
    //   ],
    //   test: [
    //     'copy:styles'
    //   ],
    //   dist: [
    //     'copy:styles',
    //     'imagemin',
    //     'svgmin'
    //   ]
    // },

    // concat all javascripts into a single file
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['<%= config.src %>/<%= config.jsFolder %>/{,*/}*.js'],
        dest: '<%= config.dist %>/<%= config.jsFolder %>/<%= config.jsMainFile %>.js'
      }
    },

    // compress concatenated javascripts
    uglify: {
      options: {
        banner: '/*! <%= config.jsMainFile %>.js (generated <%= grunt.template.today("dd-mm-yyyy") %>) */\n'
      },
      dist: {
        files: {
          '<%= config.dist %>/<%= config.jsFolder %>/<%= config.jsMainFile %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    // compile all non-partial LESS files into CSS
    // and copy all CSS files into their appropriate location as well
    less: {
      production: {
        options: {
          compress: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>/<%= config.cssFolder %>/',
            src: ['**/*.{less,css}', '!**/_*.{less,css}'],
            dest: '<%= config.dist %>/<%= config.cssFolder %>/',
            ext: '.min.css'
          }
        ]
      },
      patterns: {
        options: {
          compress: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>/assemble/patterns/',
            src: ['**/*.{less,css}', '!**/*{_,.style}.{less,css}'],
            dest: '<%= config.dist %>/<%= config.cssFolder %>/',
            ext: '.min.css'
          }
        ]
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>/<%= config.cssFolder %>/',
          src: '{,*/}*.css',
          dest: '<%= config.dist %>/<%= config.cssFolder %>/'
        }]
      }
    },

    // Use Assemble to generate all HTML pages
    assemble: {
      options: {
        plugins: [
          'assemble-contrib-permalinks',
          'assemble-contrib-anchors',
          'assemble-contrib-toc'
        ],
        helpers: ['<%= config.src %>/assemble/helpers/{,*/}*.js'],
        layout: 'default.hbs',
        layoutdir: '<%= config.src %>/assemble/layouts',
        partials: '<%= config.src %>/assemble/partials/{,*/}*.hbs',
        data: '<%= config.src %>/assemble/data/{,*/}*.{json,yml}',
        flatten: true,
        //permalinks: {
        //  preset: 'pretty'
        //}
        // postprocess: require('pretty')
        marked: {
          breaks: false,
          gfm: true,
          highlight: function (code, lang) {
            return hljs.highlight(lang, code).value;
          },
          langPrefix: 'language-',
          pedantic: false,
          sanitize: false,
          silent: false,
          smartLists: true,
          smartypants: true,
          tables: true
        },
        toc: {
          modifier: 'ksdg-Toc-list'
        }
      },
      pages: {
        options: {
          layout: 'pattern.hbs',
          partials: '<%= config.src %>/app/styles/core/ks/*.less'
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/assemble/pages/{,*/}*.hbs']
        }
      },
      patterns: {
        options: {
          layout: 'pattern.hbs',
          partials: '<%= config.src %>/assemble/patterns/*{.less,.pattern.hbs}'
        },
        files: {
          '<%= config.dist %>/patterns/': [
            '<%= config.src %>/assemble/patterns/{,*/}*.hbs',
            '!<%= config.src %>/assemble/patterns/{,*/}*pattern.hbs'
          ]
        }
      }
    },

    // convert all CSV files into JSON files for Assemble
    convert: {
      csvs: {
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>/<%= config.dataFolder %>/',
            src: ['**/*.csv'],
            dest: '<%= config.src %>/assemble/data/',
            ext: '.json'
          }
        ]
      }
    }
  });

  // load assemble manually because it doesn't match the grunt-* pattern
  grunt.loadNpmTasks('assemble');

  // create server task
  grunt.registerTask('serve', [
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('build', [
    'clean',
    'convert',
    'less',
    'autoprefixer',
    'jshint',
    'copy',
    'assemble'
  ]);

  // set default grunt task
  grunt.registerTask('default', [
    'build'
  ]);
};
