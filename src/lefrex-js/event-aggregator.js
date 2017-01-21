import {getConnection} from "./connection-provider";

const _connection = getConnection();
const _subscriptions = {};

_connection.on('event', (events) => {
    // _awaitedActions[$id]($result);
    // delete _awaitedActions[$id];
});

export const subscribeToEvent = (event, handler) => {

};