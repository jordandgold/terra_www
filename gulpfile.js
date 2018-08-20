'use strict';

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var nano = require('gulp-cssnano');
var DEST = 'build/';
var concat = require('gulp-concat');

gulp.task('sass', function () {
  var processors = [
      autoprefixer({browsers: ['last 1 version']}),
  ];
  return gulp.src('./public/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:dist', function () {
  var processors = [
      autoprefixer({browsers: ['last 1 version']}),
  ];
  return gulp.src('./public/terra/scss/terra.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('css', ['sass'], function () {
    var processors = [
        autoprefixer({browsers: ['last 1 version']}),
    ];
    return gulp.src('./public/css/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./public/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./public/scss/**/*.scss', ['sass']);
});

gulp.task('build', ['sass', 'css']);

gulp.task('scripts', function() {
  return gulp.src('./public/terra/js/*.js')
    .pipe(concat('terra.js'))
    .pipe(gulp.dest('./dist/'));
});