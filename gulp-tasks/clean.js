"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import del from "del";
    
gulp.task("clean", () => {
    return del([paths.output("/*")]);
});