import { prisma } from "../../../generated/prisma-client";

export const room = {
    Room: {
        messages: ({ id }) => prisma.room({ id }).messages(),
        participants: ({ id }) => prisma.room({ id }).participants()
    }
};