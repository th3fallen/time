import gulp from 'gulp';
import clean from 'gulp-clean';
import * as tasks from 'gulp-modern-tasks';

const sassOpts = {
    source: './src/sass/main.scss',
    outFile: 'timepicker.css',
    outPath: './build/css',
    watch: './src/sass/**/*.scss',
};

const jsOpts = {
    entries: ['./src/js/timepicker.js'],
    outFile: 'timepicker.js',
    outPath: './build/js',

    testOpts: {
        entries: ['./test/src/tests.js'],
        outFile: 'tests.js',
        outPath: './test/build',
        runner: './test/runner.html',
    },
};

gulp.task('compile:sass', () => tasks.compileSASS(sassOpts));
gulp.task('compile:js', () => tasks.compileJS(jsOpts));
gulp.task('test:js', () => tasks.testJS(jsOpts.testOpts));
gulp.task('lint:js', () => tasks.lintJS('./src/js/*.js'));
gulp.task('default', ['lint:js', 'test:js', 'compile:js']);

gulp.task('dist', ['compile:sass', 'compile:js'], () => {
    gulp.src('./build/js/timepicker.js').pipe(gulp.dest('./dist'));
    gulp.src('./build/css/timepicker.css').pipe(gulp.dest('./dist'));
});

gulp.task('watch', () => {
    global.watch = true;
    tasks.compileJS(jsOpts);
    tasks.testJS(jsOpts.testOpts);
    gulp.watch(sassOpts.watch, ['compile:sass']);
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

