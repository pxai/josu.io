const { src, dest, parallel, series, watch } = require('gulp');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const del = require('del');
const browsersync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const mocha = require('gulp-mocha');

function html() {
  return src(['src/**/index.html','src/favicon.ico'])
    .pipe(dest('public'))
}

function icons() {
  return src('src/icons/*.svg')
    .pipe(dest('public/icons'))
}

function css() {
  return src('src/**/css/*.css')
    .pipe(minifyCSS())
    .pipe(dest('public'))
}

function js() {
  return (browserify({entries: [`./src/js/init.js`]})
    .on('error', showError)
    .transform("babelify", {presets: ["@babel/preset-env"]})
    .on('error', showError)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./maps'))
    .pipe(dest(`./public/js`)));
}

function showError(error) {
  console.log(error);
  this.emit("end");
}

function clean () {
    return del(["public"]);
}

function lint () {
  return src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function test () {
  return src("./test/**/*.spec.js", {read: false})
      .pipe(mocha({reporter: 'nyan'}));
}


function browserSync(done) {
    browsersync.init({
      server: {
        baseDir: "public"
      },
      port: 3000
    });
    done();
  }


function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function watchFiles() {
  watch("./Gulpfile.js", series(build, browserSyncReload ));
  watch("./src/**/js/*", series(build, browserSyncReload ));
  watch("./src/index.html", series(html, browserSyncReload ));
  watch("./src/icons/*", series(icons, browserSyncReload ));
  watch("./src/**/css/*", series(css, browserSyncReload ));
  watch("./test/**/*.spec.js", test)
}

exports.css = css;
exports.html = html;

const build = series(clean, parallel(html, icons, css, js));
exports.default = series( build, parallel(watchFiles, browserSync));
exports.build = build;
