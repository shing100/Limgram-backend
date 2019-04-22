import { Resolvers } from "../../../types/resolvers";
import { AddCommentMutationArgs, addCommentResponse } from "../../../types/graph";
import { comment } from "../Comment"; 

const resolvers : Resolvers = {
    Mutation: {
        addComment: async (_, args: AddCommentMutationArgs, {request, isAuthenticated, prisma}): Promise<addCommentResponse> => {
            isAuthenticated(request);
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
        }
    },
    ...comment
}

export default resolvers;