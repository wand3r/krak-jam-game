import {user as userActions} from "./actions";
import {users} from "../../data/users";
import {resultTypes} from "../../lefrex-js/result-types";

const userLoginActionHandler = {
    $type: userActions.userLoginAction,
    handle: (action) => {

        const _newUser = {
            id: users.length,
            name: action.userName
        };

        users.push(_newUser);

        return {
            $events: [],
            $result: {},
            $resultType: resultTypes.success
        };
    }
};

export const user = [
    userLoginActionHandler
];