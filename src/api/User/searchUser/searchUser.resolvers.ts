import { Resolvers } from "../../../types/resolvers";
import { isAuthenticated } from "../../../utils/privateAuth";
import { prisma } from "../../../../generated/prisma-client";
import { SearchUserQueryArgs } from "../../../types/graph";

const resolvers: Resolvers = {
    Query: {
        searchUser: async (_, args: SearchUserQueryArgs , { request }) => {
            isAuthenticated(request);
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
        }
    }
};

export default resolvers;