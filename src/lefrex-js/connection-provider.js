import {connect} from 'socket.io-client';

let _connection = undefined;

export const initializeConnection = ({ host = 'localhost', port = 8080 } = { host: 'localhost', port: 8080 }) => {
    if (_connection) throw new Error("Connection already initialized")
    _connection = connect(`http://${host}:${port}`);
    return new Promise((res, rej) => {
        if (_connection.connected) res()
        _connection.on("connect", res)
    })
};

export const getConnection = () =>  _connection;