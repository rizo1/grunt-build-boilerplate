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
      
       }
    },


    sass: {
      dist: {
        files: {
         '<%= source %>/css/main.css' : '<%= source %>/sass/main.css'
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
      build: {
        options: {                                 
        removeComments: true,
        collapseWhitespace: true
        },
        files: [{                                  
          '<%= dev %>/index.html':'<%= source %>/index.html'
        }]
      }                                                                       
  },

  imagemin: {                          
    dynamic: {
       options: {                       
        optimizationLevel: 5,
      },                         
      files: [{
        expand: true,                  
        cwd: '<%= source %>/img/',                    
        src: ['*.{png,jpg,gif}'],   
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
  sass: {
     files: ['<%= source %>/sass/*.scss'],
    tasks: ['sass'],
    options: {
      spawn: false,
    },
  }
  css: {
    files: ['<%= source %>/css/*.css'],
    tasks: ['cssmin'],
    options: {
      spawn: false,
    },
  },
  html: {
    files: ['<%= source %>/index.html'],
    tasks: ['htmlmin'],
    options: {
      spawn: false,
    },
  },
 /* grunt: {
        files: ['gruntfile.js']
    }*/
},





  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');



  grunt.registerTask('update-assets', ['copy']);
  grunt.registerTask('update-img', ['imagemin']);
  grunt.registerTask('default', ['uglify:build','cssmin:combine', 'purifycss', 'htmlmin', 'cssmin']);

};