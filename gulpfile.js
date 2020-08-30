const { src, dest, series, parallel, watch } = require("gulp");
const source = require("vinyl-source-stream");
const del = require("del");
const browserify = require("browserify");
const uglify = require("gulp-uglify");
const buffer = require("vinyl-buffer");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const browserSync = require("browser-sync");

const origin = "src";
const destination = "build";

function clean(done) {
    del.sync("build/**", "!build");
    done();
}

function html(done) {
    src(`${origin}/index.html`).pipe(dest(`${destination}/`));
    done();
}

function js(done) {
    browserify(`${origin}/scripts/app.js`)
        .transform("babelify", {
            presets: ["@babel/preset-env", "@babel/preset-react"],
        })
        .bundle()
        .pipe(source("index.min.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(dest(`${destination}/js`));

    done();
}

function css(done) {
    src(`${origin}/styles/**/*.scss`)
        .pipe(plumber())
        .pipe(
            sass({
                style: "compressed",
            })
        )
        .pipe(
            rename({
                basename: "index",
                suffix: ".min",
            })
        )
        .pipe(dest(`${destination}/css/`));
    done();
}

function watcher(done) {
    watch(`${origin}/**/*.html`).on("change", series(html, browserSync.reload));
    watch(`${origin}/**/*.js`).on("change", series(js, browserSync.reload));
    watch(`${origin}/**/*.css`).on("change", series(css, browserSync.reload));
    done();
}

function server(done) {
    browserSync.init({
        server: {
            baseDir: `${destination}`,
        },
        notify: false,
    });
    done();
}

exports.default = series(clean, parallel(html, js, css), server, watcher);