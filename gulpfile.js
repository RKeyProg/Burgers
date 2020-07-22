const {
    src,
    dest,
    task,
    series,
    watch
} = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sourcemaps = require('gulp-sourcemaps');

sass.compiler = require('node-sass');

task('clean', () => {
    return src('dist/**/*', {
            read: false
        })
        .pipe(rm())
})

task('copy:html', () => {
    return src('src/*.html')
        .pipe(dest('dist'))
        .pipe(reload({
            stream: true
        }));
})

task('copy:svg', () => {
    return src('src/img/**/*.svg')
        .pipe(dest('dist/img'))
        .pipe(reload({
            stream: true
        }));
})

task('copy:png', () => {
    return src('src/img/*.png')
        .pipe(dest('dist/img'))
        .pipe(reload({
            stream: true
        }));
})

task('copy:jpg', () => {
    return src('src/img/*.jpg')
        .pipe(dest('dist/img'))
        .pipe(reload({
            stream: true
        }));
})

task('copy:fonts', () => {
    return src('src/fonts/*')
        .pipe(dest('dist/fonts'))
        .pipe(reload({
            stream: true
        }));
})

const styles = [
    'node_modules/normalize.css/normalize.css',
    'src/styles/main.scss'
];

task('styles', () => {
    return src(styles)
        .pipe(sourcemaps.init())
        .pipe(concat('main.scss'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(dest('dist'));
});

task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });
});

watch('./src/styles/**/*.scss', series('styles'));
watch('./src/*.html', series('copy:html'));
watch('./src/img/*', series('copy:jpg', 'copy:png'));

task('default', series('clean', 'copy:html', 'copy:fonts', 'copy:png', 'copy:jpg', 'copy:svg', 'styles', 'server'));