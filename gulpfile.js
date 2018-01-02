import gulp from "gulp";
import del from "del";
import gulpLoadPlugins from "gulp-load-plugins";
import seq from "run-sequence";

import cssnext from "postcss-cssnext";
import cssnano from "cssnano";

const $ = gulpLoadPlugins();

const src = "src";
const dist = "dist";




//Main task
gulp.task("default",()=>seq(
    "clean",
    "html",
    "style",
    "images"
));






//Cleaner
gulp.task("clean",()=>del([dist],{dot:true}));








//Index page
gulp.task("html",()=>
    gulp
        .src(`${src}/index.html`)
        .pipe($.htmlmin())
        .pipe(gulp.dest(dist))
);







//Styling
gulp.task("style",()=>
    gulp
        .src(`${src}/style/template.scss`)
        .pipe($.sass().on("error",$.sass.logError))
        .pipe($.postcss([
            cssnext({ browsers: ["> 1%", "last 2 versions", "ie >= 9"] }),
            cssnano({ autoprefixer: false, zindex: false }),
        ]))
        .pipe($.rename("style.css"))
        .pipe(gulp.dest(dist))
);







//Images
gulp.task("images", ()=>
    gulp
        .src(`${src}/img/**`)
        .pipe($.cache($.imagemin()))
        .pipe(gulp.dest(dist+"/img"))
);
