const { src, dest, parallel, series } = require("gulp");
const browserSync = require("browser-sync");
const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const rimraf = require("rimraf");
const prefix = require("gulp-autoprefixer");
const browserServer = browserSync.create();

const _path = {
	sass: {
		watchFile: "./dist/css",
		source: "./dev/scss/**/*.scss",
	},
	js: {
		watchFile: "./dist/js",
		source: "./dev/js/**/*.js",
	},
	fonts: {
		watchFile: "./dist/fonts/",
		source: "./dev/fonts/**/*",
	},
	libs: {
		watchFile: "./dist/libs/",
		source: "./dev/libs/**/*",
	},
	images: {
		watchFile: "./dist/images/",
		source: "./dev/images/**/*",
	},
	build: {
		destBuildFolder: "./dist/",
	},
};

function reloadBrowserServer(done) {
	browserServer.reload();
	done();
}

function syncBrowserServer(done) {
	browserServer.init({
		server: {
			baseDir: _path.build.destBuildFolder,
		},
		port: 3000,
	});
	done();
}

function clearCss(done) {
	rimraf(_path.build.destBuildFolder + "css/", done);
}

function clearJavascripts(done) {
	rimraf(_path.build.destBuildFolder + "js/", done);
}

function clearFonts(done) {
	rimraf(_path.build.destBuildFolder + "fonts/", done);
}

function clearImages(done) {
	rimraf(_path.build.destBuildFolder + "images/", done);
}

function clearLibraries(done) {
	rimraf(_path.build.destBuildFolder + "libs/", done);
}

function libs() {
	return gulp.src(_path.libs.source).pipe(gulp.dest(_path.libs.watchFile));
}

function images() {
	return gulp
		.src(_path.images.source + ".+(png|jpg|gif|svg)")
		.pipe(gulp.dest(_path.images.watchFile));
}

function css() {
	return gulp
		.src([_path.sass.source])
		.pipe(sass())
		.on("error", sass.logError)
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(
			prefix(["last 15 versions", "> 1%", "ie 8", "ie 7", "ie 11"]),
			{ cascade: false }
		)
		.pipe(browserServer.reload({ stream: true }))
		.pipe(gulp.dest(_path.sass.watchFile));
}

function fonts() {
	return gulp.src(_path.fonts.source).pipe(gulp.dest(_path.fonts.watchFile));
}

function js() {
	return gulp
		.src([_path.js.source])
		.pipe(babel({ presets: ["@babel/env"] }))
		.pipe(browserServer.reload({ stream: true }))
		.pipe(gulp.dest(_path.js.watchFile));
}

function watchFiles() {
	gulp.watch(_path.build.destBuildFolder, reloadBrowserServer);
	gulp.watch(_path.sass.source).on("all", gulp.series(clearCss, css));
	gulp.watch(_path.js.source).on("all", gulp.series(clearJavascripts, js));
	gulp.watch(_path.libs.source).on("all", gulp.series(clearLibraries, libs));
	gulp.watch(_path.fonts.source).on("all", gulp.series(clearFonts, fonts));
	gulp.watch(_path.images.source).on("all", gulp.series(clearImages, images));
}

exports.css = css;
exports.js = js;
exports.watch = parallel(watchFiles, syncBrowserServer);
exports.default = parallel(css, js);
