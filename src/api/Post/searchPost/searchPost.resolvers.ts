import { Resolvers } from "../../../types/resolvers";
import { isAuthenticated } from "../../../utils/privateAuth";
import { SearchPostQueryArgs } from "../../../types/graph";
import { prisma } from "../../../../generated/prisma-client";


const resolvers: Resolvers = {
    Query: {
        searchPost: async (_, args: SearchPostQueryArgs, {request}) => {
            isAuthenticated(request)
            prisma.posts({
                where: {
                    OR: [
                        { location_starts_with: args.term },
                        { caption_starts_with: args.term }
                    ]
                }
            })
        }
    }
}

export default resolvers;