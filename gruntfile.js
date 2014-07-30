module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: [
        'www-deploy/',
      ]
    },
    recess: {
      dist: {
        options: {
          compile: true,
          compress: true
        },
        files: {
          'app/assets/css/main.css': [
            'app/assets/less/main.less'
          ]
        }
      }
    },
    watch: {
      less: {
        files: [
          'app/assets/less/*.less',
           'app/assets/less/*/**.less'
        ],
        tasks: ['recess']
      }
    },
    wiredep: {
      target: {
        src: 'app/index.html'
      }
    },
    uglify: {
      my_target: {
        files: {
          'app/assets/js/main.min.js': [
            'app/assets/js/modules/*.js'
          ]
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'app/assets/css/main.min.css': [
            'app/assets/css/main.css', 
            'app/assets/css/animate.css',
            'app/assets/css/bootstrap-theme.css',
            'app/assets/css/bootstrap.css'
          ]
        }
      }
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-wiredep');
  
  grunt.registerTask('dev', [
    'watch' 
  ]);
  grunt.registerTask('ugger', [
    'uglify', 'cssmin'
  ]);

};