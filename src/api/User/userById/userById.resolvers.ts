import { prisma } from "../../../../generated/prisma-client/index";
import { Resolvers } from '../../../types/resolvers';
import { UserByIdQueryArgs } from '../../../types/graph';

const resolvers: Resolvers = {
    Query: {
        userById: async (_, args: UserByIdQueryArgs) => {
            const { id } = args;
            return await prisma.user({ id });
        }
    }
};

export default resolvers;