'use strict';

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Code syntax highlighting.
  var hljs = require('highlight.js');
  hljs.configure({ classPrefix: 'hljs-' });

  grunt.initConfig({

    // define variables for Gruntfile
    config: {
      src: 'src',
      dist: 'dist'
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
        marked: {
          breaks: false,
          gfm: true,
          highlight: function (code, lang) {
            return hljs.highlight(lang, code).value;
          },
          langPrefix: '',
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
      guidelines: {
        options: {
          layout: 'guideline.hbs'
        },
        files: {
          '<%= config.dist %>/guidelines/': ['<%= config.src %>/assemble/guidelines/{,*/}*.hbs']
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
    }

  });

  // load assemble manually because it doesn't match the grunt-* pattern
  grunt.loadNpmTasks('assemble');

  // set default grunt task
  grunt.registerTask('default', [
    'assemble'
  ]);
};
