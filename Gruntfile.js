 module.exports = function(grunt) {
  //配置参数
  grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),
     concat: {
         options: {
             separator: ';',
             stripBanners: true
         },
         dist: {
             src: [
                 "modules-dist/move.js",
                 "modules-dist/showHide.js",
                 "modules-dist/utils.js",
                 "demos-dist/carousel/carousel.js",
                 "demos-dist/tab/tab.js",
                 "demos-dist/dropdown/dropdown.js",
             ],
             dest: "src/myUI.js"
         }
     },
     uglify: {
         options: {
         },
         dist: {
             files: {
                 'src/myUI.min.js': 'src/myUI.js'
             }
         }
     },
     cssmin: {
         options: {
             keepSpecialComments: 0
         },
         compress: {
             files: {
                 'src/myUI.css': [
                     "demos/carousel/carousel.css",
                     "demos/tab/tab.css",
                 ]
             }
         }
     }
  });
 
  //载入concat和uglify插件，分别对于合并和压缩
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
 
  //注册任务
  grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
}