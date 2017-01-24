/*var mozjpeg = require('imagemin-mozjpeg');*/

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    source: '_src',
    dev: '_dev',


    copy: { //migrating assets from bower to src
  
      bower:{
        
        files: [

       {
          nonull: true,
          expand: true,
          flatten: true,
          filter: 'isFile',
          cwd: 'bower_components/jquery-easing/',
          src: 'jquery.easing.js', 
          dest: '<%= source %>/js/', 
        },
        

        {
          nonull: true,
          expand: true,
          flatten: true,
          filter: 'isFile',
          cwd: 'bower_components/fullpage.js/dist/',
          src: 'jquery.fullpage.js', 
          dest: '<%= source %>/js/', 
        },

        {
          nonull: true,
          expand: true,
          flatten: true,
          filter: 'isFile',
          cwd: 'bower_components/bootstrap/dist/js',
          src: 'bootstrap.js', 
          dest: '<%= source %>/js/', 
        },

         {
          nonull: true,
          expand: true,
          flatten: true,
          filter: 'isFile',
          cwd: 'bower_components/jquery/dist/',
          src: 'jquery.js', 
          dest: '<%= source %>/js/', 
        },
        
        {
          nonull: true,
          expand: true,
          flatten: true,
          filter: 'isFile',
         cwd: 'bower_components/bootstrap/dist/css/', 
         src: 'bootstrap.css',
         dest: '<%= source %>/css/' 
        },
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
         cwd: 'bower_components/fullpage.js/dist/', 
         src: 'jquery.fullpage.css',
         dest: '<%= source %>/css/' 
        },

        {
          nonull: true,
          expand: true,
          flatten: true,
          filter: 'isFile',
         cwd: 'bower_components/animate.css/', 
         src: 'animate.css',
         dest: '<%= source %>/css/' 
        },

      

        ]
      
       },

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
                '<%= source %>/css/main.css': '<%= source %>/sass/main.scss'
            }
        }
    }, //end of sass

    browserSync: {
        dev: {
            bsFiles: {
                src: ['<%= dev %>/**', '<%= source %>/!.sass-cache']
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
          src: ['*.html'],   
          dest: '<%= dev %>/html/'                  
        }]
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

      build: {
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
            src: ['*.html'], 
            dest: '<%= dev %>/', 
            ext: '.html',
            extDot: 'first' 
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


  

watch: {
    scripts: {
      files: ['<%= source %>/js/*.js'],
      tasks: ['uglify'],
      options: {
        spawn: false,
      }
    },

    css: {
      files: ['<%= source %>/sass/*.scss'],
      tasks: ['sass','cssmin'],
      options: {
        spawn: false,
      },
    },

    html: {
      files: ['<%= source %>/*.html'],
      tasks: ['critical','htmlmin'],
      options: {
        spawn: false,
      },
    },

   
}


  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-critical');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-newer');

  //set up npm-critical - for above the fold content



  // default for development: type grunt
  grunt.registerTask('default', ['browserSync', 'newer:imagemin', 'watch']);

  //critical test
   grunt.registerTask('critical-test', ['critical']);

  //htmlmin test
   grunt.registerTask('htmlmin-test', ['htmlmin']);

  //Update images
  grunt.registerTask('image-update', ['newer:imagemin']);

  //update fonts
  grunt.registerTask('font-update', ['copy:fonts']);

  //pull in bower dependencies (for use after "bower update")
  grunt.registerTask('update-bower', ['copy:bower']);






}