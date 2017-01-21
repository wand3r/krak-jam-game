let _connection = undefined;
const _subscriptions = {};

export const initialize = (connection) => {
    _connection = connection;
    _connection.on('push-events', (events) => {
        events.forEach(event => {
            const _handlers = _subscriptions[event.$event] || [];
            _handlers.forEach(handler => handler(event.$payload));
        });
    });
};

export const subscribeToEvent = (event, handler) => {
    const _currentEventHandlers = _subscriptions[event] || [];
    _subscriptions[event] = [..._currentEventHandlers, handler];
    return () => {
        const _subs = _subscriptions[event];
        const handlerIndex = _subscriptions[event].indexOf(handler);
        _subscriptions[event] = [..._subs.slice(0, handlerIndex), _subs.slice(handlerIndex + 1, _subs.length)];
    }
};