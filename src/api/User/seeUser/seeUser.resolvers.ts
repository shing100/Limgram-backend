import { Resolvers } from "src/types/resolvers";
import { SeeUserQueryArgs, seeUserResponse } from "src/types/graph";


const resolvers: Resolvers = {
    Query: {
        seeUser: async(_, args: SeeUserQueryArgs, {request, isAuthenticated, prisma}): Promise<seeUserResponse> => {
            isAuthenticated(request);
            const id: string = args.id;
            try {
                const user = await prisma.user({ id });
                if(user){
                    return {
                        ok: true,
                        error: null,
                        user
                    } 
                }else {
                    return {
                        ok: false,
                        error: "user not found",
                        user: null
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    user: null
                }
            }
        }
    }
}

export default resolvers;