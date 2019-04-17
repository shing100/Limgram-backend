import { Resolvers } from "../../../types/resolvers";
import { isAuthenticated } from "../../../utils/privateAuth";
import { SearchPostQueryArgs } from "../../../types/graph";
import { prisma } from "../../../../generated/prisma-client";

const resolvers: Resolvers = {
    Query: {
        searchUser: async (_, args: SearchPostQueryArgs, { request }) => {
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