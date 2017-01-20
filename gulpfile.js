// NOTE: I previously suggested doing this through Grunt, but had plenty of problems with
// my set up. Grunt did some weird things with scope, and I ended up using nodemon. This
// setup is now using Gulp. It works exactly how I expect it to and is WAY more concise.
var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    exec = require('child_process').exec,
    node;

var runSequence = require('run-sequence');

process.env.BABEL_ENV = 'server';

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('server', function () {
    if (node) node.kill();
    node = spawn('node', ['build/server/index.js'], {stdio: 'inherit'});
    node.on('close', function (code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task('build', function(cb){
    exec('node ./node_modules/.bin/babel src --out-dir build --ignore src/client', function (err) {
        cb(err);
    });
});

gulp.task('watch', function (cb) {
    gulp.watch('./src/server/**', function(){
        runSequence('build', 'server');
    });
});

/**
 * $ gulp
 * description: start the development environment
 */
gulp.task('default', function(){
    runSequence('build', 'server', 'watch');
});

// clean up if an error goes unhandled.
process.on('exit', function () {
    if (node) node.kill();
});