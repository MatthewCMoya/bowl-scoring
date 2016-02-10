var jshint = require('gulp-jshint'),
    gulp   = require('gulp'),
    watch = require('gulp-watch'),
    jasmine = require('gulp-jasmine');

gulp.task('lint', function() {
  return gulp.src([
    './app/*.js', 
    './spec/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('jasmine', function () {
	return gulp.src('spec/**/*.js')
		// gulp-jasmine works on filepaths so you can't have any plugins before it 
		.pipe(jasmine());
});

gulp.task('default', function() {
  gulp.watch(["app/**/*.js","spec/**/*.js"], ["lint", "jasmine"]);
});
