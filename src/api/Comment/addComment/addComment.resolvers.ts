import { Resolvers } from "../../../types/resolvers";
import { AddCommentMutationArgs, addCommentResponse } from "../../../types/graph";
import { comment } from "../Comment"; 
import privateResolver from "../../../utils/privateAuth";

const resolvers : Resolvers = {
    Mutation: {
        addComment: privateResolver(async (_, args: AddCommentMutationArgs, {request, prisma}): Promise<addCommentResponse> => {
            const { text, postId } = args;
            const { user } = request;
            try {
                const comment = await prisma.createComment({
                    user: {
                        connect: {
                            id: user.id
                        }
                    },
                    post: {
                        connect: {
                            id: postId
                        }
                    },
                    text
                });
                return {
                    ok: true,
                    error: null,
                    comment
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    comment: null
                }
            }
        })
    },
    ...comment
}

export default resolvers;