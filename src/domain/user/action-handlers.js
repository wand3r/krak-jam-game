import {user as userActions} from "./actions";
import {users} from "../../data/users";
import {resultTypes} from "../../lefrex-js/result-types";

const userLoginActionHandler = {
    $type: userActions.userLoginAction,
    handle: (action) => {

        if (users.find(u => u.name === action.userName)) {
            return {
                $events: [],
                $result: { message: 'User with that name already exists.' },
                $resultType: resultTypes.failure
            };
        }

        if (!action.userName || action.userName.length < 5) {
            return {
                $events: [],
                $result: { message: 'Your user name is not valid. User name must be longer than 5 characters.' },
                $resultType: resultTypes.failure
            };
        }

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