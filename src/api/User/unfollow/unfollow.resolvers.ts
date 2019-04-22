import { Resolvers } from "../../../types/resolvers";
import { UnfollowMutationArgs, unfollowResponse } from "../../../types/graph";

const resolvers: Resolvers = {
    Mutation: {
        unfollow: async(_, args: UnfollowMutationArgs, {request, isAuthenticated, prisma}): Promise<unfollowResponse> => {
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