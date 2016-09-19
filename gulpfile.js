var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default', () => gulp.
	src('excellentexport.js').
  pipe(uglify()).
	pipe(rename({
		suffix: ".min"
	})).
	pipe(gulp.dest(''))
);
