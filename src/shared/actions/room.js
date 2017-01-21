export const room = {
    createRoomAction: 'room-create-room-action'
};

export const createCreateRoomAction = (userId, name, desc) => ({
    $type: room.createRoomAction,
    userId,
    name,
    desc
});