var gulp        = require('gulp');
var deploy      = require("gulp-gh-pages");
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('autoprefixer');
var cp          = require('child_process');
var postcss     = require('gulp-postcss');
var csswring    = require('csswring');
var cssnano     = require('cssnano');
var del         = require('del');

var env = process.env.NODE_ENV || 'prod';
var jekyll   = process.platrm === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    if(env === 'prod') {
        return cp.spawn( jekyll, ['build'], {stdio: 'inherit'})
        .on('close', done);
    } else {
        return cp.spawn( jekyll, ['build','--config', '_config.yml,_config.dev.yml'], {stdio: 'inherit'})
        .on('close', done);
    }
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Compile files from _sass into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    var processors = [
            prefix({ browsers: ['> 5%', 'last 3 versions'] }),
            csswring,
            cssnano,
          ];
    return gulp.src('_sass/main.sass')
        .pipe(sass({
            includePaths: ['sass', 'scss'],
            onError: browserSync.notify
        }))
        .pipe(postcss(processors))
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/css'));
});

/**
 * Watch sass files for changes & recompile
 * Watch html/md/js/image/json files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('_sass/*.sass', ['sass']);
    gulp.watch(['./**/*.html', '_data/*.json', 'assets/scripts/*.js', 'assets/images/*.*', 'assets/fonts/*.*', './**/*.md'], ['jekyll-rebuild']);
});

/**
 * Delete .publish directory
 */
gulp.task('clean', function () {
    return del('.publish/**/*');
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 * To run locally:
 * $ NODE_ENV=dev gulp
 */
gulp.task('default', ['browser-sync', 'watch']);

/**
 * Deploy to GitHub Pages
 */
gulp.task("deploy", ["jekyll-build"], function () {
    return gulp.src("./_site/**/*")
        .pipe(deploy());
});
