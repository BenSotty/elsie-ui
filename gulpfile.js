var gulp = require("gulp"),
    sass = require("gulp-sass"),
    includeHtml = require("gulp-include-html"),
    prefix = require('gulp-autoprefixer'),
    minify = require("gulp-clean-css"),
    plumber = require("gulp-plumber"),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

// Source and distribution folder
var source = "src/",
    dest = "dist/";

// Bootstrap-sass path
var  bootstrapSassPath = "./node_modules/bootstrap/";

var fonts = {
  in: source + "fonts/*.*",
  out: dest + "fonts/"
};

var images = {
  in: source + "images/**/*",
  out: dest+ "images/"
}

var scss = {
  in: source + "scss/app.scss",
  out: dest + "css/",
  watch: source + "scss/**/*",
  sassOpts: {
      outputStyle: "nested",
      precison: 3,
      errLogToConsole: true,
      includePaths: [
        bootstrapSassPath + "/scss",
        "./node_modules/sass-rem"
      ]
  }
};

var html = {
  in: source + "html/pages/**/*.html",
  watch: source + "html/**/*.html",
  out: dest,
  buildOpts: {
    baseDir: source + "html/_includes"
  }
};

var js = {
  in: [
    source + "js/vendor/jquery-3.2.1.slim.min.js",
    source + "js/vendor/popper.min.js",
    source + "js/vendor/bootstrap.min.js",
    source + "js/components/**/*.js",
    source + "js/app.js"
  ],
  name: "app.js",
  out: dest + "/js"
};

// Copy fonts to from Bootstrap-sass and src/fonts to dist/fonts
gulp.task("fonts", function () {
  return gulp
    .src(fonts.in)
    .pipe(gulp.dest(fonts.out));
});

gulp.task("images", function () {
  return gulp
    .src(images.in)
    .pipe(gulp.dest(images.out));
});

// Concat components into app.js
gulp.task("js", function () {
  return gulp
    .src(js.in)
    .pipe(concat(js.name))
    .pipe(gulp.dest(js.out))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(js.out));
});

// compile scss
gulp.task('sass', function(){
  return gulp
    .src(scss.in)
    .pipe(sass(scss.sassOpts))
    .pipe(prefix('last 2 versions'))
    .pipe(gulp.dest(scss.out))
    .pipe(minify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(scss.out))
    .pipe(plumber({
      errorHandler: function onError(err) {
          console.log(err);
      }
    }))
});

// compile html
gulp.task("html" , function(){
  return gulp
    .src(html.in)
    .pipe(includeHtml(html.buildOpts))
    .pipe(gulp.dest(html.out));
});

gulp.task("watch", function () {
  gulp.watch(fonts.in, ["fonts"]);
  gulp.watch(images.in, ["images"]);
  gulp.watch(js.in, ["js"]);
  gulp.watch(scss.watch, ["sass"]);
  gulp.watch(html.watch, ["html"]);
});

gulp.task("default",["fonts", "images", "js", "sass", "html"], function () {});
