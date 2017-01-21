import {room as roomActions} from "../../shared/actions/room";
import {rooms} from "../../data/rooms";
import {createRoomCreatedEvent} from "../../shared/events/room";

const createRoomActionHandler = {
    $type: roomActions.createRoomAction,
    handle: (action) => {
        const _newRoom = {};

        rooms.push(_newRoom);
        return {
            $events: [
                createRoomCreatedEvent(_newRoom)
            ],
            $result: rooms.map(r => ({
                id: r.id,
                name: r.name,
                desc: r.desc,
                teams: r.teams.map(team => team.reduce((sum, t) => (sum + 1), 0))
            }))
        }
    }
};

export default [
    createRoomActionHandler
]