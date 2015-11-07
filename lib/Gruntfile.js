module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['../javascripts/**/*.js']
    },
    sass: {
      dist: {
        files: {
          '../styles/css/main.css': '../styles/sass/main.scss'
        }
      }
    },
    watch: {
      javascripts: {
        files: ['../javascripts/**/*.js'],
        tasks: ['jshint']
      },
      sassy: {
        files: ['../styles/sass/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass', 'watch']);
};







