export const user = {
  userLoginAction: 'user-user-login-action'
};

export const createUserLoginAction = (userName) => ({
    $type: user.userLoginAction,
    userName
});