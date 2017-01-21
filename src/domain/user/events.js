export const user = {
    userLoggedInEvent: 'user-user-logged-in-event'
};

export const createUserLoggedInEvent = (loggedInUser) => ({
    $event: user.userLoggedInEvent,
    $payload: loggedInUser
});