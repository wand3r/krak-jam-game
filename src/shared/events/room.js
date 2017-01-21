export const room = {
    roomCreatedEvent: 'room-room-created-event'
};

export const createRoomCreatedEvent = (source) => ({
    $event: room.roomCreatedEvent,
    $payload: source
});