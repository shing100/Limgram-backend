import { Resolvers } from "../../../types/resolvers";
import { AddCommentMutationArgs } from "../../../types/graph";
import { isAuthenticated } from "../../../utils/privateAuth";
import { prisma } from "../../../../generated/prisma-client";


const resolvers : Resolvers = {
    Mutation: {
        addComment: async (_, args: AddCommentMutationArgs, {request}) => {
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
    }
}

export default resolvers;