export const isAuthenticated = (request) => {
    if(!request.user) {
        new Error("You need to login")
    }
    return;
}