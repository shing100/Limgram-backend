import { SayHelloQueryArgs, SayHelloResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';

const resolvers: Resolvers = {
    Query: {
        SayHello: (_, args: SayHelloQueryArgs): SayHelloResponse  => {
            return {
                ok: true,
                text: `hello ${args.name}`,
                error: null
            }
        }
    }
}

export default resolvers;