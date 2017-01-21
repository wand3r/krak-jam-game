export const room = {
    createRoomAction: 'room-create-room-action',
    joinRoomAction: 'room-join-room-action'
};

export const createCreateRoomAction = (userId, name) => ({
    $type: room.createRoomAction,
    userId,
    name
});

export const createJoinRoomAction = (userId, roomId) => ({
    $type: room.joinRoomAction,
    userId,
    roomId
});