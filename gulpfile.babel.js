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
    files: ['./src/js/timepicker.js', './src/js/index.js'],
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

gulp.task('clean:js', () => del(`${jsOpts.outPath}/*`));
gulp.task('clean:sass', () => del(`${sassOpts.outPath}/*`));
gulp.task('clean:test', () => del(`${testOpts.outPath}/*`));
gulp.task('clean', ['clean:js', 'clean:sass', 'clean:test']);

gulp.task('watch', () => {
    global.watch = true;

    tasks.compileJS(jsOpts);
    tasks.testJS(testOpts);

    gulp.watch(sassOpts.watch, ['compile:sass']);
    gulp.watch(jsOpts.lintPath, ['lint:js']);
    gulp.watch(jsOpts.watch, ['test:js']);
});

gulp.task('default', () => runSequence('clean', 'compile'));
