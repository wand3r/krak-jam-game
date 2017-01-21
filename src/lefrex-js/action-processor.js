import v4 from 'uuid/v4';

let _connection = undefined
const _awaitedActions = {};

export const initialize = (connection) => {
    _connection = connection
    _connection.on('action-result', ({$id, $result}) => {
        _awaitedActions[$id]($result);
        delete _awaitedActions[$id];
    });
}

export const processAction = (action) => {
    const $id = v4();
    return new Promise((res, rej) => {
        if (_connection == undefined || !_connection.connected) rej();
        _awaitedActions[$id] = res;
        _connection.emit(`action`, {$id, ...action});
    });
};