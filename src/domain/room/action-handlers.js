import {rooms} from "../../data/rooms";
import {users} from "../../data/users";
import {room as roomActions} from "./actions";
import {createRoomCreatedEvent, createPlayerJoinedEvent} from "./events";
import {resultTypes} from "../../lefrex-js/result-types";

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
            $result: { },
            $resultType: resultTypes.success
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
            $result: {},
            $resultType: resultTypes.success
        }
    }
};

const getRoomsActionHandler = {
    $type: roomActions.getRoomsAction,
    handle: (action) => {
        return {
            $events: [],
            $result: rooms.map(r => ({
                id: r.id,
                name: r.name,
                desc: r.desc,
                teams: r.teams.map(team => team.reduce((sum, t) => (sum + 1), 0))
            })),
            $resultType: resultTypes.success
        }
    }
};

export const room = [
    createRoomActionHandler,
    joinRoomActionHandler,
    getRoomsActionHandler
];