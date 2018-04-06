var gulp = require("gulp"),
    sass = require("gulp-sass"),
    includeHtml = require("gulp-include-html"),
    cleanCSS = require("gulp-clean-css");
    rename = require('gulp-rename');

// Source and distribution folder
var source = "src/",
    dest = "dist/";

// Bootstrap-sass path
var  bootstrapSassPath = "./node_modules/bootstrap-sass/";

var fonts = {
  in: [
    source + "fonts/*.*",
    bootstrapSassPath + "assets/fonts/**/*"
  ],
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
      includePaths: [bootstrapSassPath + "assets/stylesheets"]
  }
};

var css = {
  in: dest + "css/app.css",
  out: dest + "css",
  cleanCSSOpts: {}
}

var html = {
  in: source + "html/pages/**/*.html",
  watch: source + "html/**/*.html",
  out: dest,
  buildOpts: {
    baseDir: source + "html/_includes"
  }
};

var js = {
  in: source + "js/**/*.js",
  out: dest + "/js",
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

gulp.task("js", function () {
  return gulp
    .src(js.in)
    .pipe(gulp.dest(js.out));
});

// compile scss
gulp.task("sass", function () {
  return gulp
    .src(scss.in)
    .pipe(sass(scss.sassOpts))
    .pipe(gulp.dest(scss.out));
});

gulp.task("css", ["sass"], function () {
  return gulp
    .src(css.in)
    .pipe(cleanCSS(css.cleanCSSOpts))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(css.out));
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
  gulp.watch(scss.watch, ["css"]);
  gulp.watch(html.watch, ["html"]);
});

gulp.task("default",["fonts", "images", "js", "css", "html"], function () {});
