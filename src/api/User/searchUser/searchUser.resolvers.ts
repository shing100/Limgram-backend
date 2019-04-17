import { Resolvers } from "../../../types/resolvers";
import { isAuthenticated } from "../../../utils/privateAuth";
import { prisma } from "../../../../generated/prisma-client";
import { SearchUserQueryArgs } from "src/types/graph";

const resolvers: Resolvers = {
    Query: {
        searchUser: async (_, args: SearchUserQueryArgs , { request }) => {
            isAuthenticated(request);
            prisma.users({
                where: {
                    OR: [
                        { username_contains: args.term },
                        { firstName_contains: args.term },
                        { lastName_contains: args.term }
                    ]
                }
            });
        }
    }
};

export default resolvers;