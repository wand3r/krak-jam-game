import {getConnection} from "./connection-provider";
import v4 from 'uuid/v4';

const _connection = getConnection();
const _awaitedActions = {};

_connection.on('action-result', (result) => {
    _awaitedActions[result.$id](result);
    delete _awaitedActions[result.$id];
});

export const processAction = (action) => {
    const $id = v4();
    return new Promise((res, rej) => {
        if (!_connection.connected) rej();
        _awaitedActions[$id] = res;
        _connection.emit(`action`, {$id, ...action});
    });
};