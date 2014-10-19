locale = "_en";
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig(
        {
            pkg: grunt.file.readJSON('package.json'),


            watch: {
                files: ['**/*.css','**/*.js', '**/*.html'],
			options: {
					livereload: true

				}
            }

        });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['grunt-contrib-watch']);
};