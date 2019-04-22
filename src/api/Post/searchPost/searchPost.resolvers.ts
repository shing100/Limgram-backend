import { Resolvers } from "../../../types/resolvers";
import { SearchPostQueryArgs, searchPostResponse } from "../../../types/graph";
import privateResolver from "../../../utils/privateAuth";

const resolvers: Resolvers = {
    Query: {
        searchPost: privateResolver(async (_, args: SearchPostQueryArgs, {request, prisma}): Promise<searchPostResponse> => {
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
        })
    }
}

export default resolvers;