import { Resolvers } from "../../../types/resolvers";
import { RequestSecretMutationArgs } from "../../../types/graph";
import { generateSecret } from "../../../utils/generateSecret";
import { prisma } from "../../../../generated/prisma-client";

const resolvers: Resolvers = {
    Mutation: {
        requestSecret: async (_, args: RequestSecretMutationArgs ) => {
            const { email } = args;
            const loginSecret: string = generateSecret();
            console.log(loginSecret);
            try {
                if(email && loginSecret){
                    await prisma.updateUser({
                        data: { loginSecret },
                        where: { email }
                    });
                    return {
                        ok: true,
                        error: null,
                    }
                }else {
                    return {
                        ok: false,
                        error: "email and login Secret not found"
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                }
            }
        }
    }
}

export default resolvers;