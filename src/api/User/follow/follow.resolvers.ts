import { Resolvers } from "../../../types/resolvers";
import { FollowMutationArgs, followResponse } from "../../../types/graph";
import privateResolver from "../../../utils/privateAuth";

const resolvers: Resolvers = {
    Mutation: {
        follow: privateResolver(async(_, args: FollowMutationArgs, {request, prisma}): Promise<followResponse> => {
            const id : string = args.id;
            const { user } = request;
            try {
                await prisma.updateUser({
                    where: {
                        id: user.id
                    },
                    data: {
                        following: {
                            connect: {
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