import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateAuth";

const resovlers: Resolvers = {
  Query: {
    seeFeed: privateResolver(async (_, __, { request, prisma }) => {
        const { user } = request;
        try {
            const following = await prisma.user({ id: user.id }).following();
            const posts = await prisma.posts({
                            where: {
                                user: {
                                    id_in: [...following.map(user => user.id), user.id]
                                }
                            },
                            orderBy: "createdAt_DESC"
                        });
            return {
                ok: true,
                error: null,
                posts
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message,
                posts: null
            }
        }
        
    })
  }
};

export default resovlers;