import { Resolvers } from "../../../types/resolvers";
import { SeeUserQueryArgs, seeUserResponse } from "../../../types/graph";
import privateResolver from "../../../utils/privateAuth";


const resolvers: Resolvers = {
    Query: {
        seeUser: privateResolver(async(_, args: SeeUserQueryArgs, {prisma}): Promise<seeUserResponse> => {
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
        })
    }
}

export default resolvers;