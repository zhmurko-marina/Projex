var gulp = require('gulp');
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var babel = require('gulp-babel');

var paths = {
    styles: {
        src: 'assets/less',
        files: 'assets/less/*.less',
        dest: 'assets/css'
    }
};

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: ''
        }
    })
});

gulp.task('less',function (){
    gulp.src(paths.styles.files)
        .pipe(less())
        .pipe(prefix(
            'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
        ))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('babel', () => {
    return gulp.src('assets/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('assets/js/dist'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('default', ['browserSync','less'], function() {
    gulp.watch(paths.styles.files, ['less']);
    gulp.watch('**/*.html', browserSync.reload);
    gulp.watch('assets/js/**/*.js', ['babel']);
});
