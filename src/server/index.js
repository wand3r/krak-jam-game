import express from "express";
import {createServer} from 'http';
import Server from 'socket.io';
import {join} from 'path';
import {combineHandlers} from "../lefrex-js";

import {handlers} from "../domain/action-handlers";

const _app = new express();

const _server = createServer(_app);
const _io = Server(_server);

const _handlers = combineHandlers(handlers);
console.log(_handlers);

_io.on('connection', (sock) => {
    sock.on('action', (action) => {
        sock.emit('action-result', {
            ['$type']: action.$type,
            ['$id']: action.$id,
            ['$result']: _handlers[action.$type](action)
        });
    });
});

_app.get("/", function (req, res) {
    res.sendFile(join(__dirname, '/../../public/index.html'));
});

_app.server = _server;
_app.server.listen(8080);