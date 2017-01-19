const gulp = require('gulp');
const deploy = require('gulp-deploy-git');

gulp.task('deploy', function() {
  return gulp.src(['build/**/*', '.gitignore'], { read: false })
    .pipe(deploy({
      repository: 'https://github.com/zhevron/gulp-deploy-git.git'
    }));
});
