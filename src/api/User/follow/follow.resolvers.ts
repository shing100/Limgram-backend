import { Resolvers } from "src/types/resolvers";
import { FollowMutationArgs, followResponse } from "src/types/graph";
import { isAuthenticated } from "src/utils/privateAuth";
import { prisma } from "generated/prisma-client";


const resolvers: Resolvers = {
    Mutation: {
        follow: async(_, args: FollowMutationArgs, {request}): Promise<followResponse> => {
            isAuthenticated(request);
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
        }
    }
}

export default resolvers;