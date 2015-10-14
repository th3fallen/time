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
    eslint = require('gulp-eslint'),
    mochaPhantomJS = require('gulp-mocha-phantomjs'),
    clean = require('gulp-clean');

gulp.task('sass', function() {
    return gulp.src('./src/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({browsers: ['last 5 versions']})]))
    .pipe(rename('timepicker.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', ['lint', 'test'], function() {
    return browserify('./src/js/timepicker.js', {debug: true})
    .bundle().on('error', gutil.log)
    .pipe(source('timepicker.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('test', function() {
    return browserify('./test/src/tests.js')
    .bundle().on('error', gutil.log)
    .pipe(source('tests.js'))
    .pipe(gulp.dest('./test/build'))
    .on('end', function() {
        gulp.src('./test/runner.html')
        .pipe(mochaPhantomJS({reporter: 'dot'}))
        .on('error', function(error) {
            gutil.log(error);
            this.end();
        });
    });
});

gulp.task('lint', function() {
    return gulp.src('./src/js/timepicker.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('ghpages', function() {
    gulp.src('./ghpages/scripts/*.css', {read: false}).pipe(clean());
    gulp.src('./ghpages/stylesheets/*.js', {read: false}).pipe(clean());

    gulp.src('./test/build/tests.js').pipe(gulp.dest('./ghpages/scripts'));
    gulp.src('./node_modules/mocha/mocha.js').pipe(gulp.dest('./ghpages/scripts'));
    gulp.src('./node_modules/mocha/mocha.css').pipe(gulp.dest('./ghpages/stylesheets'));
    gulp.src('./node_modules/chai/chai.js').pipe(gulp.dest('./ghpages/scripts'));
    gulp.src('./node_modules/sinon/pkg/sinon.js').pipe(gulp.dest('./ghpages/scripts'));
    gulp.src('./dist/js/timepicker.js').pipe(gulp.dest('./ghpages/stylesheets'));
    gulp.src('./dist/css/timepicker.css').pipe(gulp.dest('./ghpages/stylesheets'));
});

gulp.task('default', ['lint', 'test:unit', 'test:behavior', 'js']);

gulp.task('watch', function() {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch(['./src/js/**/*.js', './src/html/**/*.html'], ['js']);
    gulp.watch('./test/src/**/*.js', ['test']);
});
