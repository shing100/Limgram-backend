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
        },
        amIFollowing: async (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            try {
                const exists = await prisma.$exists.user({
                    AND : [{
                        id: parentId
                    },
                    {
                        followers_some: user.id
                    }]
                });
                //console.log(exists);
                if (exists) {
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                //console.log(error);
                return false;
            }
        },
        itsMe: (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            return user.id === parentId;
        }
    }
};