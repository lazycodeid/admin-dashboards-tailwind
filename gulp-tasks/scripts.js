"use strict";

import { paths } from "../gulpfile.babel";
import webpack from "webpack";
import webpackStream from "webpack-stream";
import gulp from "gulp";
import gulpif from "gulp-if";
import rename from "gulp-rename";
import browsersync from "browser-sync";
import debug from "gulp-debug";
import yargs from "yargs";

const argv = yargs.argv,
    production = !!argv.production;
    
gulp.task("scripts", () => {
    return gulp.src(paths.scripts.src)
        .pipe(webpackStream({
            mode: production ? "production" : "development",
            output: {
                filename: 'app.js'
            },
            devtool: production ? false : "source-map",
        }), webpack)
        .pipe(gulpif(production, rename({
            suffix: ".min"
        })))
        .pipe(gulp.dest(paths.output(paths.scripts.output)))
        .pipe(debug({
            "title": "JS files"
        }))
        .pipe(browsersync.stream());
});