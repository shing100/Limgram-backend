import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateAuth";
import { post } from "../Post";

const resolvers: Resolvers = {
    Query: {
        seeFullPost: privateResolver(async (_, args, { prisma }) => {
            const { id } = args;
            try {
                const post = await prisma.post({ id });
                if(post){
                    return {
                        ok: true,
                        error: null,
                        post
                    };
                }else {
                    return {
                        ok: false,
                        error: "post not found",
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
    },
    ...post
}

export default resolvers;