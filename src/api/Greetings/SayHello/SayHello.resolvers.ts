import { SayHelloQueryArgs, SayHelloResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { prisma } from '../../../../generated/prisma-client';

const resolvers: Resolvers = {
    Query: {
        SayHello: async (_, args: SayHelloQueryArgs): Promise<SayHelloResponse> => {
            console.log(await prisma.users())
            return {
                ok: true,
                text: `hello ${args.name}`,
                error: null
            }
        }
    }
}

export default resolvers;