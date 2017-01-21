import {room as roomActions} from "../../shared/actions/room";
import {rooms} from "../../data/rooms";
import {createRoomCreatedEvent} from "../../shared/events/room";

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

export default [
    createRoomActionHandler
]