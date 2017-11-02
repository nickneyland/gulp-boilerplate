// Gulpfile
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect');

//sass
gulp.task('sass', function () {
  gulp.src(['styles/*.scss'])
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('assets/'))
    .pipe(livereload());
});

//minify JS files
gulp.task('js', function() {
  gulp.src('scripts/*.js')
  .pipe(uglify())
  .pipe(concat('script.js'))
  .pipe(gulp.dest('assets'))
});

//live reload
gulp.task('html', function() {
    return gulp.src('*.html')
    .pipe(gulp.dest('assets'))
    .pipe(livereload('http://localhost:8080'))
    });

//gulp watch
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('scripts/*.js', ['js']);
  gulp.watch('styles/*.scss', ['sass']);
  gulp.watch('*.html', ['html']);
});

//load gulp connect
gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  })
});

//tasks
gulp.task('default', ['html', 'js', 'sass', 'connect', 'watch']);