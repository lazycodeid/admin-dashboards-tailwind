"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import include from "gulp-file-include";
import gulpif from "gulp-if";
import replace from "gulp-replace";
import browsersync from "browser-sync";
import yargs from "yargs";

const argv = yargs.argv,
    production = !!argv.production;

gulp.task("views", () => {
    return gulp.src(paths.views.src)
        .pipe(include({
            prefix: "@@",
            basepath: "@file"
        }))
        .pipe(gulpif(production, replace("/app.css", "/app.min.css")))
        .pipe(gulpif(production, replace("/app.js", "/app.min.js")))
        .pipe(gulp.dest(paths.output(paths.views.output)))
        .pipe(browsersync.stream());
});