#!/bin/bash

# TODO: try to use configuration from tsconfig.json
BABEL_ENV=server ./node_modules/.bin/babel src/server --out-dir build/server --ignore test.js
BABEL_ENV=server ./node_modules/.bin/babel src/server --out-dir build/server --ignore test.js --watch &
# starting ts compiler in background with configuration from src/server/tsconfig.json
# tsc &
# starting pm2 process with configuration from process.json
pm2 start pm2-server.config.js 
# enable printing logs to output from pm2 process as background task
pm2 logs &
# kill all background task and pm2 when script exits. From http://stackoverflow.com/a/360275
trap 'kill $(jobs -p) && pm2 kill' EXIT
# waiting for all background tasks to finish
wait