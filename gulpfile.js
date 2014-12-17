var
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    del = require('del'),
    cssMinify = require('gulp-cssmin'),
    durandal = require('gulp-durandal')
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
        minify: true,
        almond: true
    }).pipe(gulp.dest('build/app'));


});

gulp.task('css', function(){
    var styles = [
            "lib/bootstrap/css/bootstrap.min.css",
            "lib/font-awesome/css/font-awesome.min.css",
            "css/ie10mobile.css",
            "lib/durandal/css/durandal.css",
            "css/starterkit.css"
        ];  
    gulp
        .src(styles)
        .pipe(concat("all.css"))
        .pipe(cssMinify())
        .pipe(gulp.dest('build/css'))
    
});

gulp.task('js', function(){
    gulp
        .src('./lib/require/require.js')
        .pipe(gulp.dest('build/js'))
});

gulp.task("default", ["durandal"])