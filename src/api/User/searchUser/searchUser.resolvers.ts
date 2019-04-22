import { Resolvers } from "../../../types/resolvers";
import { SearchUserQueryArgs, searchUserResponse } from "../../../types/graph";
import privateResolver from "../../../utils/privateAuth";

const resolvers: Resolvers = {
    Query: {
        searchUser: privateResolver(async (_, args: SearchUserQueryArgs , { prisma }): Promise<searchUserResponse> => {
            try {
                const user = await prisma.users({
                    where: {
                        OR: [
                            { username_contains: args.term },
                            { firstName_contains: args.term },
                            { lastName_contains: args.term }
                        ]
                    }
                });
                if(user){
                    return {
                        ok: true,
                        error: null,
                        user
                    }
                }else {
                    return {
                        ok: false,
                        error: "user not found ",
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
    }
};

export default resolvers;