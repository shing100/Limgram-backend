import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateAuth';

const resolvers: Resolvers = {
    Query: {
        seeRooms: privateResolver(async (_, __, { request, prisma }) => {
            const { user } = request;
            try {
                const rooms = prisma.rooms({
                    where: {
                        participants_some: {
                            id: user.id
                        }
                    }
                });
                if(rooms) {
                    return {
                        ok: true,
                        error: null,
                        rooms
                    }
                }else {
                    return {
                        ok: false,
                        error: "rooms not found",
                        rooms: null
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    rooms: null
                }
            }
        })
    }
}

export default resolvers;