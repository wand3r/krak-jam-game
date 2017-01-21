export const room = {
    roomCreatedEvent: 'room-room-created-event',
    playerJoinedEvent: 'room-player-joined-event'
};

export const createRoomCreatedEvent = (source) => ({
    $event: room.roomCreatedEvent,
    $payload: source
});

export const createPlayerJoinedEvent = (player) => ({
    $event: room.playerJoinedEvent,
    $payload: player
});