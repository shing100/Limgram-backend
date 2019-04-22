import { prisma } from "../../../generated/prisma-client";

export const like = {
    Like: {
        user: ({ id }) => prisma.comment({ id }).user(),
        post: ({ id }) => prisma.comment({ id }).post()
    }
}