import privateResolver from "../../../utils/privateAuth";
import { NewMessageSubscriptionArgs } from "../../../types/graph";

const resolvers = {
    Subscription: {
        newMessage: {
            subscribe: privateResolver(async (_, args: NewMessageSubscriptionArgs, { prisma }) => {
                    const { roomId } = args;
                    try {
                        const message = await prisma.$subscribe.message({
                            AND: [
                                { mutation_in: "CREATED" },
                                {
                                    node: { room: { id: roomId } }
                                }
                            ]
                        }).node();
                        return {
                            ok: true,
                            error: null,
                            message
                        }
                    } catch (error) {
                        return {
                            ok: false,
                            error: error.message,
                            message: null
                        }
                    }
            })
        }
    }
}

export default resolvers;