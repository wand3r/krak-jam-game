import {connect} from 'socket.io-client';

let _connection = undefined;

export const initializeConnection = ({ host = 'localhost', port = 8080 } = { host: 'localhost', port: 8080 }) => {
    _connection = _connection || connect(`http://${host}:${port}`);
};

export const getConnection = () => {
    if (!_connection) initializeConnection();
    return _connection;
};