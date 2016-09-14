import gulp from 'gulp';
import runSequence from 'run-sequence';
import del from 'del';
import * as tasks from 'gulp-modern-tasks';

const sassOpts = {
    pathGlob: './src/sass/main.scss',
    outPath: './build/css',
    watch: './src/sass/**/*.scss',
};

const jsOpts = {
    files: ['./src/js/timepicker.js'],
    outPath: './build/js',
    lintPath: './src/js/**/*.js',
};

const testOpts = {
    files: ['./test/src/tests.js'],
    outPath: './test/build',
    runner: './test/runner.html',
};

gulp.task('compile:sass', () => tasks.compileSASS(sassOpts));
gulp.task('compile:js', ['lint:js', 'test:js'], () => tasks.compileJS(jsOpts));
gulp.task('compile', ['compile:sass', 'compile:js']);

gulp.task('test:js', () => tasks.testJS(testOpts));
gulp.task('lint:js', () => tasks.lintJS(jsOpts.lintPath));

gulp.task('clean:ghpages', () => del(['./ghpages/scripts/*', './ghpages/stylesheets/*']));
gulp.task('clean:js', () => del(`${jsOpts.outPath}/*`));
gulp.task('clean:sass', () => del(`${sassOpts.outPath}/*`));
gulp.task('clean:test', () => del(`${testOpts.outPath}/*`));
gulp.task('clean', ['clean:js', 'clean:sass', 'clean:test', 'clean:ghpages']);

gulp.task('dist:app', ['compile:sass', 'compile:js'], () => {
    gulp.src('./build/js/timepicker.js').pipe(gulp.dest('./dist'));
    gulp.src('./build/css/timepicker.css').pipe(gulp.dest('./dist'));
});
gulp.task('dist:ghpages', ['clean:ghpages'], () => {
    gulp.src('./node_modules/mocha/mocha.css').pipe(gulp.dest('./ghpages/stylesheets'));
    gulp.src('./build/css/timepicker.css').pipe(gulp.dest('./ghpages/stylesheets'));

    gulp.src('./node_modules/mocha/mocha.js').pipe(gulp.dest('./ghpages/scripts'));
    gulp.src('./node_modules/chai/chai.js').pipe(gulp.dest('./ghpages/scripts'));
    gulp.src('./node_modules/sinon/pkg/sinon.js').pipe(gulp.dest('./ghpages/scripts'));
    gulp.src('./build/js/timepicker.js').pipe(gulp.dest('./ghpages/scripts'));
    gulp.src('./test/build/tests.js').pipe(gulp.dest('./ghpages/scripts'));
});

gulp.task('watch', () => {
    global.watch = true;

    tasks.compileJS(jsOpts);
    tasks.testJS(testOpts);

    gulp.watch(sassOpts.watch, ['compile:sass']);
    gulp.watch(jsOpts.lintPath, ['lint:js']);
    gulp.watch(jsOpts.watch, ['test:js']);
});

gulp.task('default', () => runSequence('clean', 'compile'));
