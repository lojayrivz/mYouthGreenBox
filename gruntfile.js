'use strict';
module.exports = function(grunt){
	grunt.initConfig({
		concat:{
			js:{
				src: ['src/components/**/*.js'],
				dest:'src/script/app-concat.js'
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('js', ['concat']);
};