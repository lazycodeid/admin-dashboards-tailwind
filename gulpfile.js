const gulp  = require('gulp');
const browserSync = require("browser-sync").create();

const fileinclude = require('gulp-file-include');
const cache = require('gulp-cache');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const clean = require('gulp-clean');

const webpack = require('webpack-stream');

const cssnano = require("cssnano");
const tailwindcss = require('tailwindcss'); 
const autoprefixer = require('autoprefixer');

function previewReload(done){
    browserSync.reload();
    cache.clearAll(done);
    done();
}

gulp.task("livepreview", (done) => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        port: 8080,
        https: false,
        notify: false,
        open: false,
    });
    done();
});

// start task html +
gulp.task('dev-html', () => {
    return gulp.src('./src/views/*.html')
           .pipe(fileinclude({prefix: '@@'}))
           .pipe(gulp.dest("./dist"));
});

gulp.task('build-html', () => {
    return gulp.src('./src/views/*.html')
           .pipe(fileinclude({prefix: '@@'}))
           .pipe(gulp.dest("./build"));
});
// end task html -

// start task css +
gulp.task('dev-styles', ()=> {
    return gulp.src('./src/css/**/*.{scss,css,sass}')
        .pipe(sass().on('error', sass.logError))        
        .pipe(postcss([
            tailwindcss('./tailwind.config.js'),
            autoprefixer(),
        ]))
        .pipe(concat({ path: 'app.css'}))
        .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('build-styles', ()=> {
    return gulp.src('./src/css/**/*.{scss,css,sass}')
        .pipe(sass().on('error', sass.logError))        
        .pipe(postcss([
            tailwindcss('./tailwind.config.js'),
            autoprefixer(),
            cssnano()
        ]))
        .pipe(concat({ path: 'app.css'}))
        .pipe(gulp.dest('./build/assets/css'));
});
// end task css -

// start task js +
gulp.task('dev-script', ()=> {
    return gulp.src('./src/js/**/*.js')
        .pipe(webpack({
            mode: 'development',
            // mode: 'production',
            output: {
                filename: 'app.js'
            },
            watch: false,
        }))
        .pipe(concat({ path: 'app.js'}))
        .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('build-script', ()=> {
    return gulp.src('./src/js/**/*.js')
        .pipe(webpack({
            mode: 'production',
            output: {
                filename: 'app.js'
            },
            watch: false,
        }))
        .pipe(concat({ path: 'app.js'}))
        .pipe(gulp.dest('./build/assets/js'));
});
// end task js -

// start task third party +
gulp.task('dev-other', ()=> {
    return gulp.src('./src/other/**/*')
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build-other', ()=> {
    return gulp.src('./src/other/**/*')
        .pipe(gulp.dest('./build/'));
});
// end task third party -

// start task img +
gulp.task("dev-img", () => {
    return gulp.src("./src/img/**/*")
        .pipe(gulp.dest("./dist/assets/img"));
})
// end task img -

gulp.task("build-img", () => {
    return gulp.src("./src/img/**/*")
        .pipe(gulp.dest("./build/assets/img"));
})

// start task delete force +
gulp.task('clean:dist', ()=> {
    return gulp.src('./dist',  { read: false, allowEmpty: true })
        .pipe(clean({ force: true }));
});

gulp.task('clean:build', ()=> {
    return gulp.src('./build',  { read: false, allowEmpty: true })
        .pipe(clean({ force: true }));
});
// end task delete force -

gulp.task("dev", gulp.series('clean:dist', 'dev-html', 'dev-styles', 'dev-script', 'dev-img', 'dev-other'));

gulp.task('watch-changes', (done) => {
    
    gulp.watch("./src/**/*", gulp.series('dev', previewReload));

    gulp.watch("./tailwind.config.js", gulp.series('dev', previewReload));

    done();
});

exports.default = gulp.series(
    'dev',
    'watch-changes',
    'livepreview', 
);

exports.build = gulp.series('clean:build', 'build-html', 'build-styles', 'build-script', 'build-img', 'build-other')