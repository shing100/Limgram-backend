import { prisma } from "../../../generated/prisma-client";

export default {
    Like: {
        user: ({ id }) => prisma.comment({ id }).user(),
        post: ({ id }) => prisma.comment({ id }).post()
    }
}