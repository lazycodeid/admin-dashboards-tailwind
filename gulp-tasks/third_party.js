"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import browsersync from "browser-sync";
import debug from "gulp-debug";
    
gulp.task("third_party", () => {
    return gulp.src(paths.third_party.src)
        .pipe(gulp.dest(paths.output(paths.third_party.output)))
        .pipe(debug({
            "title": "Third_party files"
        }))
        .pipe(browsersync.stream());
});