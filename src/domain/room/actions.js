export const room = {
    createRoomAction: 'room-create-room-action',
    joinRoomAction: 'room-join-room-action',
    getRoomsAction: 'room-get-rooms-action',
    getRoomDetailsAction: 'room-get-room-details-action',
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

export const createGetRoomsAction = () => ({
    $type: room.getRoomsAction
});
export const createGetRoomDetailsAction = (roomId) => ({
    $type: room.getRoomDetailsAction,
    roomId,
})
