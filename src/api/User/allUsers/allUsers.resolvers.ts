import { prisma } from "../../../../generated/prisma-client/index";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Query: {
        allUsers: async (_, __, context)=> {
            return await prisma.users();
        }
    }
};

export default resolvers;