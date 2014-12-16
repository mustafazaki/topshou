locale = "_en";
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig(
        {
            pkg: grunt.file.readJSON('package.json'),


            watch: {
                files: ['**/*.css', '**/*.js', '**/*.html', '**/*.scss'],
                tasks: ['sass'],
			options: {
					livereload: true
				}
            },
            sass: {
                options: {
                    sourceMap: true
                },
                dist: {
                    files: {
                        'Common/css/style.css': 'Common/css/style.scss',
                        'Common/css/style_ar.css': 'Common/css/style_ar.scss'
                    }
                }
            }

        });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.registerTask('default', ['grunt-contrib-watch']);
};