import {User} from "./TestNamespace/User";

const _constantUser = new User();
let _letUser = new User();

const _mapWithArrow = [_constantUser, _letUser].map((user, id) => ({id, ...user}));

console.log(_mapWithArrow);