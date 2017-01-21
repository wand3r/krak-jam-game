import {room} from './room/action-handlers';
import {user} from './user/action-handlers'

export const handlers = [
    ...room,
    ...user
];