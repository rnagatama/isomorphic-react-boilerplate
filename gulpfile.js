/* eslint-env node */

'use strict';

var gulp = require('gulp');
//var bg = require('gulp-bg');
var nodemon = require('gulp-nodemon');
var eslint = require('gulp-eslint');
var jest = require('jest-cli');
var makeWebpackConfig = require('./webpack/makeconfig');
var webpackBuild = require('./webpack/build');
var webpackDevServer = require('./webpack/devserver');
var yargs = require('yargs');

var args = yargs
  .alias('p', 'production')
  .argv;

gulp.task('env', function() {
  process.env.NODE_ENV = args.production ? 'production' : 'development';
});

gulp.task('eslint', function() {
  return gulp.src([
      'gulpfile.js',
      './src/**/*.js',
      'webpack/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('jest', function(done) {
  var rootDir = './src';
  jest.runCLI({config: {
    'rootDir': rootDir,
    'scriptPreprocessor': '../node_modules/babel-jest',
    'testFileExtensions': ['es6', 'js'],
    'moduleFileExtensions': ['js', 'json', 'es6']
  }}, rootDir, function(success) {
    /* eslint no-process-exit:0 */
    done(success ? null : 'jest failed');
    process.on('exit', function() {
      process.exit(success ? 0 : 1);
    });
  });
});

gulp.task('build-webpack-production', webpackBuild(makeWebpackConfig(false)));
gulp.task('build-webpack-dev', webpackDevServer(makeWebpackConfig(true)));
gulp.task('build-webpack', [args.production ? 'build-webpack-production' : 'build-webpack-dev']);
gulp.task('build', ['build-webpack']);
//gulp.task('server', ['env', 'build'], bg('node', 'src/index'));
gulp.task('server', ['env', 'build'], function() {
  nodemon({
    script: 'src/index.js',
    ext: 'js jsx'
  });
});

gulp.task('default', ['server']);
