//引入模块
var gulp = require('gulp'),		
	livereload = require('gulp-livereload'),	
	webserver = require('gulp-webserver'),
	sass = require('gulp-ruby-sass'),	//sass/scss编译
	uglify = require('gulp-uglify'),	//js文件压缩模块
	imagemin = require('gulp-imagemin'), // 图片压缩
	pngquant = require('imagemin-pngquant'), // 深度压缩
	rename = require('gulp-rename'); // 文件重命名

//定义一个任务，把源码目录的html文件输出到发布目录dist
gulp.task('html', () => {
  return gulp.src('src/**/*.html') // 指明源文件路径、并进行文件匹配
    .pipe(gulp.dest('dist')); // 输出路径
});

//注册任务，
gulp.task('webserver', () => {
	gulp.src('src').pipe(webserver({
		livereload:true,
		open:true
	}));	
});

gulp.task('sass', () => {
	//插件提供4种输出格式： 
	//nested：嵌套缩进的css代码，
	//它是默认值。 expanded：没有缩进的、扩展的css代码。 
	//compact：简洁格式的css代码。
	// compressed：压缩后的css代码。
	return sass('src/scss/*.scss', {style:'compact'})	//指示源文件路径、并进行文件匹配(style: 'compressed'表示输出格式)
		.on('error', (err) => {
			console.log('编译sass出错%s', err.message);
		})
		.pipe(gulp.dest('dist/css'));	//输出路径
});

//添加图片压缩任务
gulp.task('images', () => {
  	return gulp.src('src/img/**/*.{png,jpg,gif,svg}') // 指明源文件路径、并进行文件匹配
   	 .pipe(imagemin({
      progressive: true, // 无损压缩JPG图片
      svgoPlugins: [{removeViewBox: false}], // 不移除svg的viewbox属性
      use: [pngquant()] // 使用pngquant插件进行深度压缩
    }))
    .pipe(gulp.dest('dist/img')); // 输出路径
});

//添加任务js文件的压缩
gulp.task('ys', () =>{
	return gulp.src('src/js/**/*.js') // 指明源文件路径、并进行文件匹配
		//.pipe(rename({ suffix: '.min' })) // 重命名
		.pipe(uglify({ preserveComments:'some' })) // 使用uglify进行压缩，并保留部分注释
		.pipe(gulp.dest('dist/js'));
});

//监听任务
gulp.task('watch',function(){
    gulp.watch('*.html'); // 监听根目录下所有.html文件
});

//默认的任务
gulp.task('default',['sass','html','ys','images', 'webserver', 'watch']);
