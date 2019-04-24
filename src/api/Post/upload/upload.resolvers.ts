import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateAuth";


const resovlers: Resolvers = {
    Mutation: {
        upload: privateResolver(async(_, args, { request, prisma }) => {
            const { user } = request;
            const { caption , files } = args;
            try {
                const post = await prisma.createPost({
                    caption,
                    user: { connect: { id: user.id } }
                });
                files.forEach(async file => {
                    await prisma.createFile({
                        url: file,
                        post: {
                            connect: {
                                id: post.id
                            }
                        }
                    })
                })
                return {
                    ok: true,
                    error: null,
                    post
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

export default resovlers;