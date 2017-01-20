import rooms from "../../shared/actions/rooms";

const _staticRooms = [
    { id: "1", name: "Room 1", desc: "Cześć", teams: { red: 1, blue: 2 }},
    { id: "2", name: "Room 1", desc: "Cześć", teams: { red: 1, blue: 2 }},
    { id: "3", name: "Room 1", desc: "Cześć", teams: { red: 1, blue: 2 }},
    { id: "4", name: "Room 2", desc: "Nie wchodzić", teams: { red: 4, blue: 2 }},
    { id: "5", name: "Room 3", desc: "Elo, luz jak w hip-hopie", teams: { red: 3, blue: 8 }},
    { id: "6", name: "Room 3", desc: "Elo, luz jak w hip-hopie", teams: { red: 3, blue: 8 }},
    { id: "7", name: "Room 3", desc: "Elo, luz jak w hip-hopie", teams: { red: 3, blue: 8 }},
    { id: "8", name: "Room 3", desc: "Elo, luz jak w hip-hopie", teams: { red: 3, blue: 8 }},
];

const roomsGetActionHandler = {
    $type: rooms.get,
    handle: (action) => {
        return _staticRooms;
    }
};

export default [
    roomsGetActionHandler
]