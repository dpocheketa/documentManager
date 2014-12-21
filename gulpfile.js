var
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    del = require('del'),
    cssMinify = require('gulp-cssmin'),
    durandal = require('gulp-durandal'),
    browserSync = require('browser-sync')
;

gulp.task('clean', function () {
    return del(['build']);
});

gulp.task('durandal', ['js', 'css'], function () {

    gulp
        .src('./index.html')
        .pipe(gulp.dest('build'))

    return durandal({
        baseDir: 'app',   //same as default, so not really required.
        main: 'main.js',  //same as default, so not really required.
        output: 'main.js', //same as default, so not really required.
        minify: false,
        almond: true
    }).pipe(gulp.dest('build/app'));


});

gulp.task('css', function(){
    var styles = [
            "lib/bootstrap/css/bootstrap.min.css",
            "lib/font-awesome/css/font-awesome.min.css",
            "css/ie10mobile.css",
            "lib/durandal/css/durandal.css",
            "css/starterkit.css",
            "css/custom.css"
        ];  
    gulp
        .src(styles)
        .pipe(concat("all.css"))
        .pipe(cssMinify())
        .pipe(gulp.dest('build/css'))

    gulp.src("lib/font-awesome/fonts/*.*")
        .pipe(gulp.dest("build/fonts"));
    
});

gulp.task('js', function(){
    gulp
        .src('./lib/require/require.js')
        .pipe(gulp.dest('build/js'))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./build/"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('watch', ['browser-sync'], function(){
    gulp.watch("app/**/*", ["durandal", "bs-reload"]);
    gulp.watch("css/**/*", ["css", "bs-reload"]);
    gulp.watch("*.html", ['durandal', "bs-reload"]);
});

gulp.task("default", ["durandal", "watch"]);