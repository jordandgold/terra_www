'use strict';

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var nano = require('gulp-cssnano');
var DEST = 'build/';
var concat = require('gulp-concat');

gulp.task('prod:sass', function () {
  var processors = [
      autoprefixer({browsers: ['last 1 version']}),
  ];
  return gulp.src('./public/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./public/css'));
});
 
gulp.task('dev:watch', function () {
  gulp.watch('./public/**/scss/**/*.scss', ['prod:sass', ['sass:dist']]);
  gulp.watch('./public/**/js/**/*.js', ['scripts:dist']);
});

gulp.task('sass:dist', function () {
  var processors = [
      autoprefixer({browsers: ['last 1 version']}),
  ];
  return gulp.src('./public/terra/scss/terra.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('scripts:dist', function() {
  return gulp.src('./public/terra/js/*.js')
    .pipe(concat('terra.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('terra:build', ['sass:dist', 'scripts:dist']);