module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['src/main/*.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '/**\n' +
						'* <%= pkg.name %> v<%= pkg.version %> (<%= grunt.template.today("dd-mm-yyyy") %>) \n*\n'+
						'* Copyright (c) <%= grunt.template.today("yyyy") %> Bharat Sinha. All rights reserved. \n*\n'+
						'* Licensed under MIT \n*\n' +
                        '**/\n\n'
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>'],
                    'dist/geolocation/vanillax.geolocation.min.js': ['dist/geolocation/vanillax.geolocation.js']
				}
			}
		},
        copy: {
		    main: {
		        expand: true,
                cwd: 'src/',
                src: 'geolocation/*.js',
                dest: 'dist/'
            }
        }
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default',['concat','copy','uglify']);
};