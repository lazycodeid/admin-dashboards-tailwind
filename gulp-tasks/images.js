"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import newer from "gulp-newer";
import debug from "gulp-debug";
import browsersync from "browser-sync";
import yargs from "yargs";

const argv = yargs.argv,
    production = !!argv.production;

gulp.task("images", () => {
    return gulp.src(paths.images.src)
        .pipe(newer(paths.output(paths.images.output)))
        .pipe(gulp.dest(paths.output(paths.images.output)))
        .pipe(debug({
            "title": "Images"
        }))
        .pipe(browsersync.stream());
});