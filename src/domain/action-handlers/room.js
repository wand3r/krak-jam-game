import {room as roomActions} from "../../shared/actions/room";
import {rooms} from "../../data/rooms";
import {createRoomCreatedEvent, createPlayerJoinedEvent} from "../../shared/events/room";
import {users} from "../../data/users";

const createRoomActionHandler = {
    $type: roomActions.createRoomAction,
    handle: (action) => {
        const _newRoom = {
            id: rooms.length,
            name: action.name,
            players: [action.userId],
            teams: [[], []]
        };

        rooms.push(_newRoom);

        return {
            $events: [
                createRoomCreatedEvent(_newRoom)
            ],
            $result: { }
        }
    }
};

const joinRoomActionHandler = {
    $type: roomActions.joinRoomAction,
    handle: (action) => {
        const _roomToJoin = rooms.find(room => room.id === action.roomId);
        const _user = users.find(user => user.id === action.userId);

        _roomToJoin.players = [..._roomToJoin.players, _user.id];
        return {
            $events: [
                createPlayerJoinedEvent({id: _user.id, name: _user.name})
            ],
            $result: {}
        }
    }
};

export default [
    createRoomActionHandler,
    joinRoomActionHandler
]