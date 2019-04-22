import { Resolvers } from "../../../types/resolvers";
import { meResponse } from "../../../types/graph";
import { user } from "../User";
import privateResolver from "../../../utils/privateAuth";

const resolvers: Resolvers = {
    Query: {
        me: privateResolver(async (_, __, { request, prisma }): Promise<meResponse> => {
            const { user } = request;
            try {
                const userProfile = await prisma.user({id: user.id});
                if (userProfile) {
                    return {
                        ok: true,
                        error: null,
                        user: userProfile
                    }
                }else {
                    return {
                        ok: false,
                        error: "user not found",
                        user: null
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    user: null
                }
            }
        })
    },
    ...user
}

export default resolvers;