// Order of require matters
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');

// Create new .task called 'styles'
gulp.task('styles', () => {
    return gulp.src('sass/**/*.sass') // .src creates a stream for reading all SCSS filess
        .pipe(sass().on('error', sass.logError)) // pipe passes the streamed data to the sass compiler and catches errors
        .pipe(gulp.dest('./css/')); //gulp.dest takes in compiled data, tells gulp where to put compiled sass (into './css')
});

// Task that deletes the generated css file
gulp.task('clean', () => {
    return del([
        'css/main.css',
    ]);
});

// Tasks that automatically watches for changes (Watch uses alot of resources to run)
gulp.task('watch', () => {
    gulp.watch('sass/**/*.sass', (done) => {
        gulp.series(['clean', 'styles'])(done);
    });
});

// Default task that runs if no task name is specified, it runs the clean and styles tasks in sequential order
// This generates the css files
gulp.task('default', gulp.series(['clean', 'styles']));