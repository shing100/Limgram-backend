import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateAuth";

const DELETE = "DELETE";
const EDIT = "EDIT"

const resolvers: Resolvers = {
    Mutation: {
        editPost: privateResolver(async(_, args, { request, prisma }) => {
            const { user } = request;
            const { id, caption, location, action } = args;
            try {
                 const post = await prisma.$exists.post({ id, user: { id: user.id }});
                if(post){
                    if(action === EDIT){
                        const updatePost = await prisma.updatePost({
                            data: { caption, location },
                            where: { id }
                        })
                        return {
                            ok: true,
                            error: null,
                            post: updatePost
                        }
                    } else if (action === DELETE){
                        await prisma.deletePost({ id });
                        return {
                            ok: true,
                            error: null,
                            post: null
                        }
                    } else {
                        return {
                            ok: false,
                            error: "need to action",
                            post: null
                        }
                    }
                }else {
                    return {
                        ok: false,
                        error: "post not found or not your images",
                        post: null
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    post: null
                }
            }
        })
    }
}

export default resolvers;