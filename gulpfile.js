var gulp = require('gulp');
var args = require('yargs').argv;
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});
var port = process.env.PORT || config.defaultPort;

gulp.task('vet', function() {
    log('Analyzing source with JSHint and JSCS');

    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('styles', function() {
    log('Compiling Sass --> CSS');
     console.log(sass);
    return gulp
        .src(config.sass)
        .pipe($.plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.temp))
        .pipe(browserSync.stream());
});

gulp.task('clean-styles', function(done) {
    var files = config.client + '/*.css';
    clean(files, done);
});

gulp.task('sass-watcher', function() {
    gulp.watch([config.sass], ['styles']);
});
gulp.task('serve', ['styles'], function() {

    browserSync.init({
        server: "./index.html"
    });


    gulp.watch("config.client/*.scss", ['styles']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});



////////////

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
