'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    rename = require('gulp-rename');

gulp.task('sass:build', function() {
    var stream = gulp.src('./src/sass/main.scss');

    return stream.pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer({browsers: ['last 5 versions']})]))
        .pipe(rename('timepicker.css'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass:watch', function() {
    gulp.watch('./src/sass/**/*.scss', ['sass:build']);
});
