"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import gulpif from "gulp-if";
import rename from "gulp-rename";
import gulpsass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import plumber from "gulp-plumber";
import debug from "gulp-debug";
import postcss from "gulp-postcss";

import browsersync from "browser-sync";
import dartsass from "sass";
import yargs from "yargs";
import cssnano from "cssnano";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
const sass = gulpsass(dartsass);
const argv = yargs.argv,
production = !!argv.production;

gulp.task("styles", () => {
    return gulp.src(paths.styles.src)
        .pipe(gulpif(!production, sourcemaps.init()))
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulpif(
            production,
            postcss([
                tailwindcss('./tailwind.config.js'), 
                autoprefixer(),
                cssnano()
            ]),
            postcss([
                tailwindcss('./tailwind.config.js'), 
                autoprefixer(),
            ])
        ))
        .pipe(gulpif(production, rename({
            suffix: ".min"
        })))
        .pipe(plumber.stop())
        .pipe(gulpif(!production, sourcemaps.write("./maps/")))
        .pipe(gulp.dest(paths.output(paths.styles.output)))
        .pipe(debug({
            "title": "CSS files"
        }))
        .on("end", browsersync.reload);
});