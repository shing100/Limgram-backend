import { prisma } from "../../../generated/prisma-client";

export const message = {
    Message: {
        from: ({ id }) => prisma.message({ id }).from(),
        to: ({ id }) => prisma.message({ id }).to(),
        room: ({ id }) => prisma.message({ id }).room()
    }
};