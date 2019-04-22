import { Resolvers } from "../../../types/resolvers";
import { SearchPostQueryArgs, searchPostResponse } from "../../../types/graph";

const resolvers: Resolvers = {
    Query: {
        searchPost: async (_, args: SearchPostQueryArgs, {request, isAuthenticated, prisma}): Promise<searchPostResponse> => {
            isAuthenticated(request)
            try {
                const post = await prisma.posts({
                    where: {
                        OR: [
                            { location_starts_with: args.term },
                            { caption_starts_with: args.term }
                        ]
                    }
                })
                if (post) {
                    return {
                        ok: true,
                        error: null,
                        post
                    }
                } else {
                    return {
                        ok: false,
                        error: "post not found",
                        post: null
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    post: null
                }
            }
        }
    }
}

export default resolvers;