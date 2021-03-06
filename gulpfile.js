const { src, dest, watch, parallel, series } = require("gulp");

let folder = "app";

const scss          = require("gulp-sass");
const concat        = require("gulp-concat");
const browserSync   = require("browser-sync").create();
const uglify        = require("gulp-uglify-es").default;
const autoprefixer  = require("gulp-autoprefixer");
const imagemin      = require("gulp-imagemin");
const del           = require("del");
const plumber       = require('gulp-plumber');
const webpack       = require("webpack");
const webpackStream = require("webpack-stream");


function cleanDist() {
    return del("dist")
}

function scripts() {
    return src([
         "app/js/different/menu_burger.js",
        "app/js/script.js"
    ])
    .pipe(plumber())
    .pipe(webpackStream({
       output: {
          filename: "script.js"
       },
       module: {
         rules: [
           {
             test: /\.m?js$/,
             exclude: /node_modules/,
             use: {
               loader: 'babel-loader',
               options: {
                 presets: [
                   ['@babel/preset-env', { targets: "defaults" }]
                 ]
               }
             }
           }
         ]
       }
    }))
    .pipe(concat("script.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream())
}

function images() {
    return src("app/images/**/*")
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]
    ))
    .pipe(dest("dist/images"))
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

function styles() {
    return src("app/scss/style.scss")
    .pipe(plumber())
    .pipe(scss({outputStyle: "compressed"}))
    .pipe(concat("style.min.css"))
    .pipe(autoprefixer({
        overrideBrowserslist: ["last 10 version"],
        grid: true
    }))
    .pipe(dest("app/css"))
    .pipe(browserSync.stream())
}

function build() {
    return src([
        "app/css/style.min.css",
        "app/fonts/**/*",
        "app/js/script.min.js",
        "app/*.html"
    ], {base: "app"})
    .pipe(dest("dist"))
}

function watching() {
    watch(["app/scss/**/*.scss"], styles)
    watch(["app/js/**/*.js" ,"!app/js/script.min.js"], scripts)
    watch(["app/*.html"]).on("change", browserSync.reload)
}

exports.styles = styles;
exports.watching = watching;
exports.browserSync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;


exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, scripts ,browsersync, watching);