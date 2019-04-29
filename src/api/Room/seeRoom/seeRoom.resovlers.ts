import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateAuth';
import { room } from '../Room';

const resolvers: Resolvers = {
    Query: {
        seeRoom: privateResolver(async (_, args, { request, prisma }) => {
            const { id } = args;
            const { user } = request;
            try {
                const canSee = await prisma.$exists.room({
                    participants_some: {
                        id: user.id
                    }
                });
                if (canSee) {
                    const room = await prisma.room({ id })
                    return {
                        ok: false,
                        error: null,
                        room
                    }
                } else {
                    return {
                        ok: false,
                        error: "You can't see this",
                        room: null
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    room: null
                }
            }
           
        })
    },
    ...room
}

export default resolvers;

