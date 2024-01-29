"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import browsersync from "browser-sync";

gulp.task("serve", () => {
    browsersync.init({
        server: "./dist/",
        port: 8080,
        notify: true,
        https: false,
        notify: false,
        open: false,
    });

    gulp.watch(paths.views.watch, gulp.parallel("views", "styles"));
    gulp.watch(paths.styles.watch, gulp.parallel("styles"));
    gulp.watch(paths.scripts.watch, gulp.parallel("scripts", "styles"));

    gulp.watch(paths.images.watch, gulp.parallel("images"));
    gulp.watch(paths.third_party.watch, gulp.parallel("third_party"));
});