import express from "express";
import {createServer} from 'http';
import Server from 'socket.io';
import {join} from 'path';

const _app = new express();

const _server = createServer(_app);
const _io = Server(_server);

_io.on('connection', (sock) => {
    console.log('client connected');
});

_app.get("/", function(req, res) {
    res.sendFile(join(__dirname, '/../../public/index.html'));
});

_app.server = _server;
_app.server.listen(8080);