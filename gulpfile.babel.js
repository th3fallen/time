import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import gutil from 'gulp-util';
import clean from 'gulp-clean';
import rename from 'gulp-rename';
import eslint from 'gulp-eslint';
import mochaPhantomJS from 'gulp-mocha-phantomjs';
import source from 'vinyl-source-stream';
import autoprefixer from 'autoprefixer';
import browserify from 'browserify';

gulp.task('sass', () => {
    return gulp.src('./src/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({browsers: ['last 5 versions']})]))
    .pipe(rename('timepicker.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', ['lint', 'test'], () => {
    return browserify('./src/js/timepicker.js', {debug: true})
    .bundle().on('error', gutil.log)
    .pipe(source('timepicker.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('test', () => {
    return browserify('./test/src/tests.js')
    .bundle().on('error', gutil.log)
    .pipe(source('tests.js'))
    .pipe(gulp.dest('./test/build'))
    .on('end', () => {
        gulp.src('./test/runner.html')
        .pipe(mochaPhantomJS({reporter: 'dot'}))
        /* eslint-disable */
        .on('error', function(error) {
            gutil.log(error);
            this.end();
        });
        /* eslint-enable */
    });
});

gulp.task('lint', () => {
    return gulp.src('./src/js/timepicker.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('ghpages', () => {
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

gulp.task('default', ['lint', 'test', 'js']);

gulp.task('watch', () => {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch(['./src/js/**/*.js', './src/html/**/*.html'], ['js']);
    gulp.watch('./test/src/**/*.js', ['test']);
});
