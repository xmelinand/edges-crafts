export default function userToken(userToken = '', action) {
    if (action.type === "addUserToken") {
        console.log('added token', action.userToken);

    return action.userToken;
    } else {
    return userToken;
    }
}
