/* eslint-disable */
'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    rename = require('gulp-rename'),
    eslint = require('gulp-eslint');

gulp.task('sass', function() {
    var stream = gulp.src('./src/sass/main.scss');

    return stream.pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer({browsers: ['last 5 versions']})]))
        .pipe(rename('timepicker.css'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', ['lint'], function() {
    return browserify('./src/js/timepicker.js', {debug: true})
        .bundle()
        .on('error', function(error) {
            gutil.log(error);
            this.emit('end');
        })
        .pipe(source('timepicker.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('lint', function() {
    var stream = gulp.src('./src/js/timepicker.js');

    return stream.pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('watch', function() {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch(['./src/js/**/*.js', './src/html/**/*.html'], ['js']);
});
