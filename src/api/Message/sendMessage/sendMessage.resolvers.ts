import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateAuth";
import { SendMessageMutationArgs } from '../../../types/graph';
import { message } from "../Message";

const resolvers: Resolvers = {
    Mutation: {
        sendMessage: privateResolver(async (_, args: SendMessageMutationArgs, { request, prisma }) => {
            const { user } = request;
            const { roomId, message, toId } = args;
            let room;
            if(!roomId){
                try {
                    if (user.id !== toId) {
                        room = await prisma.createRoom({
                          participants: {
                            connect: [
                              {
                                id: toId
                              },
                              {
                                id: user.id
                              }
                            ]
                          }
                        });
                    }else {
                        return {
                            ok: false,
                            error: "it's me",
                            message: null
                        }
                    }
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        message: null
                    }
                }
            } else {
                room = await prisma.room({ id: roomId });
            }
            if (!room) {
                return {
                    ok: false,
                    error: "Room not found",
                    message: null
                };
            }else {
                const getTo = room.participants.filter(
                    participant => participant.id !== user.id
                )[0];
                const sendMessage = await prisma.createMessage({
                    text: message,
                    from: {
                        connect: { id: user.request }
                    },
                    to: {
                        connect: { id: roomId ? getTo.id : toId }
                    },
                    room: {
                        connect: {
                            id: room.id
                        }
                    }
                });
                return {
                    ok: true,
                    error: null,
                    message: sendMessage
                }
            }
        })
    },
    ...message
}

export default resolvers;