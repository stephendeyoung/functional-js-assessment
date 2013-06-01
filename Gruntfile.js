
module.exports = function(grunt) {
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 4444,
                    base: '.'
                }
            }
        },
        watch: {
            main: {
                files: ['index.html']
            }
        }
    });
    grunt.loadNpmTasks( 'grunt-contrib-connect' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.registerTask('server', ['connect', 'watch']);
};