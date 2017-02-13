module.exports = function(grunt) {

  source = '_src';
  dev = '_dev';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

     copy: { //migrating assets from bower to src
  
      bower:{
        
        files: [

     /*  {
          nonull: true,
          expand: true,
          flatten: true,
          filter: 'isFile',
          cwd: 'bower_components/jquery-easing/',
          src: 'jquery.easing.js', 
          dest: '<%= source %>/js/', 
        },
        */

/*        {
          nonull: true,
          expand: true,
          flatten: true,
          filter: 'isFile',
          cwd: 'bower_components/fullpage.js/dist/',
          src: 'jquery.fullpage.js', 
          dest: '<%= source %>/js/', 
        },*/

     /*   {
          nonull: true,
          expand: true,
          flatten: true,
          filter: 'isFile',
          cwd: 'bower_components/bootstrap/dist/js',
          src: 'bootstrap.js', 
          dest: '<%= source %>/js/', 
        },*/

         {
          nonull: true,
          expand: true,
          flatten: true,
          filter: 'isFile',
          cwd: 'bower_components/jquery/dist/',
          src: 'jquery.js', 
          dest: '<%= source %>/js/', 
        },
        
     /*   {
          nonull: true,
          expand: true,
          flatten: true,
          filter: 'isFile',
         cwd: 'bower_components/bootstrap/dist/css/', 
         src: 'bootstrap.css',
         dest: '<%= source %>/css/' 
        },*/
        {
          nonull: true,
          expand: true,
          flatten: true,
          filter: 'isFile',
         cwd: 'bower_components/font-awesome/css/', 
         src: 'font-awesome.css',
         dest: '<%= source %>/css/' 
        },

         {
          nonull: true,
          expand: true,
          flatten: true,
          filter: 'isFile',
         cwd: 'bower_components/font-awesome/fonts/', 
         src: '**',
         dest: '<%= source %>/fonts/' 
        },
     /*      {
          nonull: true,
          expand: true,
          flatten: true,
          filter: 'isFile',
         cwd: 'bower_components/fullpage.js/dist/', 
         src: 'jquery.fullpage.css',
         dest: '<%= source %>/css/' 
        },*/

      /*  {
          nonull: true,
          expand: true,
          flatten: true,
          filter: 'isFile',
         cwd: 'bower_components/animate.css/', 
         src: 'animate.css',
         dest: '<%= source %>/css/' 
        },*/

        
      
       ]},
     fonts: {
      files: [{
          nonull: true,
          expand: true,
          flatten: true,
          filter: 'isFile',
         cwd: '<%= source %>/fonts/',  
         src: '**',
         dest: '<%= dev %>/fonts/' 
       }]
      }

    },
   

    sass: {
        dist: {
            options: {
                style: 'nested' //no need for config.rb
            },
            files: {
                '<%= source %>/css/main.css': '<%= source %>/scss/main.scss'
            }
        }
    }, 

    cssmin : {
       combine: {
          options: {
                keepSpecialComments: 0
            },
        files: {
          '<%= dev %>/css/main.min.css': ['<%= source %>/css/*.css']
        }  
      }    
    },

     uglify: {
      build: {
          files: {
              '<%= dev %>/js/main.min.js': ['<%= source %>/js/jquery.js', '<%= source %>/js/*.js'],
          }
      }
   },

    htmlmin: { 

      indexBuild: {
        options: {                                 
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true,
          /*minifyCSS: true*/  //critical already minifying
        },
       /* files: [{                                  
          '<%= dev %>/html/index.html':'<%= source %>/index.html'
        }]*/
        files: [{
            expand: true, 
            cwd: '<%= dev %>/html/', 
            src: 'index.html', 
            dest: '<%= dev %>/', 
            ext: '.html',
            extDot: 'first' 
          }]
      },
      otherBuild: {
        options: {                                 
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true,
          /*minifyCSS: true*/  //critical already minifying
        },
       /* files: [{                                  
          '<%= dev %>/html/index.html':'<%= source %>/index.html'
        }]*/
        files: [{
            expand: true, 
            cwd: '<%= source %>/', 
            src: ['*.html', '!index.html'], 
            dest: '<%= dev %>/', 
            ext: '.html',
            extDot: 'first' 
          }]
      },

  },

  critical: {
    test: {
        options: {
            base: './',
            css: [
                '<%= dev %>/css/main.min.css',
                
            ],
            width: 1200,
            height: 900,
            minify: true
        },
          files: [{
          expand: true,                  
          cwd: '<%= source %>/',                    
          src: 'index.html',   
          dest: '<%= dev %>/html/'                  
        }]
    }
  },

  imagemin: {                          
    dynamic: {
       options: {                       
        optimizationLevel: 7,
      },                         
      files: [{
        expand: true,                  
        cwd: '<%= source %>/img/',                    
        src: ['**'],   
        dest: '<%= dev %>/img/'                  
      }]
    }
  },

  browserSync: {
        dev: {
            bsFiles: {
                src: ['<%= dev %>/**', '<%= dev %>/css/*.css']
            },
            options: {
                server: {
                    baseDir: "<%= dev %>/"
                },
                ghostMode: false,
                open: false,
                watchTask: true
            }
        }
    },


  watch: {
      scripts: {
        files: ['<%= source %>/js/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false,
        }
      },

      css: {
        files: ['<%= source %>/scss/partials/*.scss'],
        tasks: ['sass','cssmin','critical','htmlmin','sass','cssmin'],
        /*tasks: ['sass','cssmin'],*/
        options: {
          spawn: false,
        },
      },

      indexHtml: {
        files: ['<%= source %>/index.html'],
        tasks: ['critical','htmlmin:indexBuild'],
        options: {
          spawn: false,
        },
      },

      otherHtml: {
        files: ['<%= source %>/*.html'],
        tasks: ['htmlmin:otherBuild'],
        options: {
          spawn: false,
        },
      }
  
  }


  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-critical');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');


  //update front-end dependencies, after a "bower update" command in console
  grunt.registerTask('bower-update', ['copy']);

  //img update
  grunt.registerTask('img-update', ['newer:imagemin']);

  // Build task(s).
  grunt.registerTask('build', ['sass', 'cssmin', 'uglify','critical','htmlmin:indexBuild', 'htmlmin:otherBuild', 'newer:imagemin']);

  // Default task(s).
  grunt.registerTask('default', ['browserSync','watch']);



};