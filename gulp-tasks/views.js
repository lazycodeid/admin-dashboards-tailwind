"use strict";

import { paths, prod } from "../gulpfile.babel";
import gulp from "gulp";
import include from "gulp-file-include";
import gulpif from "gulp-if";
import replace from "gulp-replace";
import browsersync from "browser-sync";
import yargs from "yargs";
import prettify from "gulp-prettify";

const argv = yargs.argv,
    production = !!argv.production;

gulp.task("views", () => {
    return gulp.src(paths.views.src)
        .pipe(include({
            prefix: "@@",
            basepath: "@file"
        }))
        .pipe(replace('<!-- stack: styles -->', function handleReplace() {
            let string = this.file.contents.toString().match(/<!-- push-start: styles -->([\s\S]*?)<!-- push-end: styles -->/);
            if(string) return string[1].trimEnd();
            return;
        }))
        .pipe(replace('<!-- stack: scripts -->', function handleReplace() {
            let string = this.file.contents.toString().match(/<!-- push-start: scripts -->([\s\S]*?)<!-- push-end: scripts -->/);
            if(string) return string[1].trimEnd();
            return;
        }))
        .pipe(replace(/<!-- push-start: (.*) -->([\s\S]*?)<!-- push-end: (.*) -->/, ''))
        .pipe(gulpif(production, replace("/app.css", "/app.min.css")))
        .pipe(gulpif(production, replace("/app.css", "/app.min.css")))
        .pipe(gulpif(production, prettify()))
        .pipe(gulp.dest(paths.output(paths.views.output)))
        .pipe(browsersync.stream());
});