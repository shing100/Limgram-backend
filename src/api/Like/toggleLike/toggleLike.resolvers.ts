import { Resolvers } from "../../../types/resolvers";
import { ToggleLikeMutationArgs, toggleLikeResponse } from "../../../types/graph";
import { like } from "../Like";

const resovlers: Resolvers = {
    Mutation: {
        toggleLike: async (_, args: ToggleLikeMutationArgs, { request, isAuthenticated, prisma }): Promise<toggleLikeResponse> => {
            isAuthenticated(request);
            const { postId } = args;
            const { user } = request;
            const filterOptions = {
                AND: [
                    {
                        user: {
                            id: user.id
                        },
                    },
                    {
                        post: {
                            id: postId
                        }
                    }
                ]
            }
            try {
                const existingLike = await prisma.$exists.like(filterOptions);
                if(existingLike) {
                    await prisma.deleteManyLikes(filterOptions);
                } else {
                    await prisma.createLike({
                        user: {
                            connect: {
                                id: user.id
                            }
                        },
                        post: {
                            connect: {
                                id: postId
                            }
                        }
                    })
                }
                return {
                    ok: true,
                    error: null
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                }
            }
        }
    },
    ...like
}

export default resovlers;