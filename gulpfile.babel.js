"use strict";

import gulp from "gulp";
import requireDir from "require-dir";
import yargs from "yargs";
import path from "path";

const paths = {
    output: (dir) => {
        return path.join(yargs.argv.production ? `./build` : `./dist`, dir);
    },
    views: {
        src: [
            "./src/views/*.html"
        ],
        output: "/",
        watch: [
            "./src/views/**/*.html"
        ]
    },
    styles: {
        src: "./src/styles/app.{scss,sass}",
        output: "assets/css/",
        watch: [
            "./src/styles/**/*.{scss,sass}"
        ]
    },
    scripts: {
        src: [
            "./src/js/**/*.js",
            "!./src/js/pages/**/*"
        ],
        srcPages: "./src/js/pages/**/*.js",
        output: "assets/js/",
        outputPages: "assets/js/pages",
        watch: [
            "./src/js/**/*.js"
        ]
    },
    images: {
        src: [
            "./src/img/**/*.webp",
        ],
        output: "assets/img/",
        watch: "./src/img/**/*"
    },
    third_party: {
        src: [
            "./src/third_party/**/*",
        ],
        output: "/",
        watch: "./src/third_party/**/*"
    },
};

requireDir("./gulp-tasks/");

export { paths };

export const development = gulp.series("clean",
    gulp.parallel(["views", "styles", "scripts", "scripts-pages", "images", "third_party"]),
    gulp.parallel("serve"));
    
export const prod = gulp.series("clean",
    gulp.parallel(["views", "styles", "scripts", "scripts-pages", "images", "third_party"]));

export default development;