export const room = {
    createRoomAction: 'room-create-room-action',
    joinRoomAction: 'room-join-room-action'
};

export const createCreateRoomAction = (userId, name, desc) => ({
    $type: room.createRoomAction,
    userId,
    name,
    desc
});

export const createJoinRoomAction = (userId, roomId) => ({
    $type: room.joinRoomAction,
    userId,
    roomId
});