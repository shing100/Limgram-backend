const privateResolver = (resolverFunction) => async (prarent, args, context, info) => {
    //console.log(context.req.user)
    if(!context.request.user) {
        throw new Error("No JWT. You neet to login!")
    }
    const resolved = await resolverFunction(prarent, args, context, info);
    return resolved
}

export default privateResolver