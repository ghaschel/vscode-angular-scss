const gulp = require('gulp');
const merge = require('gulp-merge-json');
const json5 = require('gulp-json5-to-json');
const package = require('./package.json');
const homedir = require('os').homedir();
const prettier = require('gulp-prettier');
const prettierConfig = require('./.prettierrc.json');

function watch() {
  return gulp.watch('./src/**/*.json5', gulp.series(['compile-json']));
}

gulp.task('copy', async done => {
  gulp
    .src('./syntaxes/angular-scss.tmLanguage.json')
    .pipe(gulp.dest(homedir + '/.vscode/extensions/ghaschel.vscode-angular-scss-' + package.version + '/syntaxes'));

  gulp
    .src(`./package.json`)
    .pipe(gulp.dest(`${homedir}/.vscode/extensions/ghaschel.vscode-angular-scss-${package.version}`));

  done();
});

gulp.task('compile', () => {
  return gulp
    .src('./src/**/*.json5')
    .pipe(
      merge({
        fileName: 'angular-scss.tmLanguage.json',
        json5: true,
      }),
    )
    .pipe(
      json5({
        beautify: true,
      }),
    )
    .pipe(prettier({ ...prettierConfig, editorConfig: true }))
    .pipe(gulp.dest('./syntaxes'));
});

gulp.task('compile-json', gulp.series(['compile', 'copy']));

gulp.task('watch', () => {
  return watch();
});

gulp.task('default', () => {
  return watch();
});
