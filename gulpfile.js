const gulp = require('gulp');
const deploy = require('gulp-gh-pages');

gulp.task('deploy', function() {
  return gulp.src(['./dist/**/*', '.gitignore'])
    .pipe(ghPages());
});
