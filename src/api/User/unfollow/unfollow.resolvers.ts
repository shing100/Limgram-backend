import { Resolvers } from "../../../types/resolvers";
import { UnfollowMutationArgs, unfollowResponse } from "../../../types/graph";
import privateResolver from "../../../utils/privateAuth";

const resolvers: Resolvers = {
    Mutation: {
        unfollow: privateResolver(async(_, args: UnfollowMutationArgs, {request, prisma}): Promise<unfollowResponse> => {
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
        })
    }
}

export default resolvers;