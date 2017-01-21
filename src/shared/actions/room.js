export const room = {
    createRoomAction: 'room-create-room-action'
};

export const createCreateRoomAction = (userId, name) => ({
    $type: room.createRoomAction,
    userId,
    name,
});