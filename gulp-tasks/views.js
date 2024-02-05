"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import include from "gulp-file-include";
import gulpif from "gulp-if";
import replace from "gulp-replace";
import browsersync from "browser-sync";
import yargs from "yargs";
import prettify from "gulp-prettify";
import nunjucksRender from "gulp-nunjucks-render";

const argv = yargs.argv,
    production = !!argv.production;

gulp.task("views", () => {
    return gulp.src(paths.views.src)
        .pipe(nunjucksRender({
            path: 'src/views',
        }))
        .pipe(include({
            prefix: "@@",
            basepath: "@file"
        }))
        .pipe(gulpif(production, replace("/app.css", "/app.min.css")))
        .pipe(gulpif(production, replace("/app.css", "/app.min.css")))
        .pipe(gulpif(production, prettify()))
        .pipe(gulp.dest(paths.output(paths.views.output)))
        .pipe(browsersync.stream());
});