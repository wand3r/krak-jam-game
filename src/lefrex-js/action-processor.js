import v4 from 'uuid/v4';
import {resultTypes} from "./result-types";

let _connection = undefined;
const _awaitedActions = {};

export const initialize = (connection) => {
    _connection = connection;
    _connection.on('action-result', ({$id, $result, $resultType}) => {
        const _awaitedAction = _awaitedActions[$id];
        delete _awaitedActions[$id];
        if ($resultType === resultTypes.success)
            _awaitedAction.success($result);
        else
            _awaitedAction.failure($result);
    });
};

export const processAction = (action) => {
    const $id = v4();
    return new Promise((res, rej) => {
        if (_connection == undefined || !_connection.connected) rej();
        _awaitedActions[$id] = {success: res, failure: rej};
        _connection.emit(`action`, {$id, ...action});
    });
};