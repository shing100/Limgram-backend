import { Resolvers } from "src/types/resolvers";
import { UnfollowMutationArgs, unfollowResponse } from "src/types/graph";
import { isAuthenticated } from "src/utils/privateAuth";
import { prisma } from "generated/prisma-client";


const resolvers: Resolvers = {
    Mutation: {
        unfollow: async(_, args: UnfollowMutationArgs, {request}): Promise<unfollowResponse> => {
            isAuthenticated(request);
            const id: string = args.id;
            const { user } = request;
            try {
                await prisma.updateUser({
                    where: { 
                        id: user.id
                    },
                    data: {
                        following: {
                            disconnect: {
                                id
                            }
                        }
                    }
                })
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
    }
}

export default resolvers;