import { prisma } from "../../../generated/prisma-client";

export const user = {
    User: {
        posts: ({ id }) => prisma.user({ id }).posts(),
        following: ({ id }) => prisma.user({ id }).following(),
        followers: ({ id }) => prisma.user({ id }).followers(),
        likes: ({ id }) => prisma.user({ id }).likes(),
        comments: ({ id }) => prisma.user({ id }).comments(),
        fullName: parent => {
            return `${parent.firstName} ${parent.lastName}`;
        }
    }
};