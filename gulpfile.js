const notify = require("gulp-notify");
const { task, src, dest, watch, parallel, series } = require("gulp");
const plumber = require("gulp-plumber")
const fileInclude = require("gulp-file-include");
const fs = require("fs");
const clean = require("gulp-clean");
const server = require("gulp-server-livereload");

// ---------------- gulp scss imported ----------------
const sass = require("gulp-sass")(require("sass"));
var sassGlob = require('gulp-sass-glob');
const sourceMaps = require("gulp-sourcemaps");
const groupMedia = require("gulp-group-css-media-queries");
const browserSync = require('browser-sync').create();
const csso = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');

// ------------- gulp fonts imported -----------------
const fonter = require('gulp-fonter');
const newer = require('gulp-newer');
const shorthand = require('gulp-shorthand');
const ttf2woff2 = require('gulp-ttf2woff2');

// ------------ gulp images webp imported --------------
const webp = require('gulp-webp');
const webpCss = require('gulp-webp-css');
webpHTML = require('gulp-webp-html');

// ------------- webpack config imported ----------------
const webpack = require("webpack-stream");
const config = require("./webpack.config");
const babel = require("gulp-babel");

const fileIncludeSettings = {
    prefix: '@@',
    basepath: "@file"
};

const plumberNotify = (title) => {
    return {
        errorHandler: notify.onError({
            title: title,
            message: "Error <%= error.message %>",
            sound: false
        })
    }
}

// ---------------- gulp clean ---------------------
task("clean", (done) => {
    if (fs.existsSync("./dist/")) {
        return src("./dist/", { read: false })
            .pipe(clean({ force: true }))
    }
    done();
});

// ------------------ gulp html -----------------------
task("html", () => {
    return src("./src/*.html")
        .pipe(plumber(plumberNotify("HTML")))
        .pipe(fileInclude(fileIncludeSettings))
        .pipe(webpHTML())
        .pipe(dest("./dist/"))
})

// ------------------- gulp scss -----------------------
task("sass", () => {
    return src("./src/scss/*.scss")
        .pipe(plumber(plumberNotify("SCSS")))
        .pipe(sourceMaps.init())
        .pipe(sass())
        .pipe(sassGlob())
        .pipe(autoprefixer())
        .pipe(webpCss())
        .pipe(groupMedia())
        .pipe(sourceMaps.write())
        .pipe(dest("./dist/css/"))
});

// ------------------- gulp csso -----------------------
task('development', function () {
    return src('./dist/css/main.css')
        .pipe(csso({
            restructure: false,
            sourceMap: true,
            debug: true
        }))
        .pipe(shorthand())
        .pipe(webpCss())
        .pipe(dest('./output'));
});

// -------------------- gulp js ------------------------
task("js", () => {
    return src("./src/js/*.js")
        .pipe(plumber(plumberNotify("JS")))
        .pipe(babel())
        .pipe(webpack(config))
        .pipe(dest("./dist/js"))
})

// --------------------- gulp images ----------------------
task("images", function () {
    return src("./src/images/**/*")
        .pipe(newer("./dist/images"))
        .pipe(webp())
        .pipe(dest("./dist/images/"))
});

// ---------------------- gulp fonter ----------------------
task('fonts', () => {
    return src('./src/fonts/*')
        .pipe(fonter({
            subset: [66, 67, 68, 69, 70, 71],
            formats: ['woff', 'ttf']
        }))
        .pipe(dest('./dist'));
});

// -------------------- gulp ttf2woff2 ---------------------
task('ttf2woff2', function () {
    return src(['./src/fonts/*.ttf'])
        .pipe(ttf2woff2())
        .pipe(dest('./dist/fonts/'));
});

// ---------------------- live server ----------------------
const serverOptions = {
    livereload: true,
    open: true
};
task("server", () => {
    return src("./dist/")
        .pipe(server(serverOptions))
});

// ----------------------- gulp watch ------------------------
task("watch", () => {
    watch("./src/**/*.html", parallel("html"));
    watch("./src/scss/**/*.scss", parallel("sass"));
    watch("./src/js/**/*.js", parallel("js"));
    watch("./src/images/**/*", parallel("images"));
    watch('./src/fonts/*.ttf', parallel("ttf2woff2"));
    watch('./src/fonts/**/*', parallel("fonts"));
});


// ----------------------- browser-sync ------------------------
task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
});

// ------------------------ gulp default -------------------------
task("default", series(
    "clean",
    parallel("html", "sass", "js", "images", "fonts", "ttf2woff2", "browser-sync"),
    parallel("server", "watch")
));