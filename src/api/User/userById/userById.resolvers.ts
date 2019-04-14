import { prisma } from "../../../../generated/prisma-client/index";
import { Resolvers } from '../../../types/resolvers';

const resolvers: Resolvers = {
    Query: {
        userById: async (_, args, context) => {
            const { id } = args;
            return await prisma.user({ id });
        }
    }
};

export default resolvers;