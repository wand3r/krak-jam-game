import {rooms as roomsActions} from "../../shared/actions/rooms";
import {rooms} from "../../data/rooms";

const getRoomsActionHandler = {
    $type: roomsActions.getRoomsAction,
    handle: (action) => {
        return {
            $events: [],
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
    getRoomsActionHandler
]