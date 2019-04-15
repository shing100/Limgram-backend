import { Resolvers } from "../../../types/resolvers";
import { ConfirmSecretMutationArgs, confirmSecretResponse } from "../../../types/graph";
import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils/utils";


const resolvers: Resolvers = {
    Mutation: {
        confirmSecret: async (_, args: ConfirmSecretMutationArgs): Promise<confirmSecretResponse> => {
            try {
                const { email, secret } = args;
                const user = await prisma.user({ email })
                if(user){
                    if(user.loginSecret === secret){
                        // JWT
                        const token = generateToken(user.id);
                        return {
                            ok: true,
                            error: null,
                            token: token
                        }
                    }else {
                        return {
                            ok: false,
                            error: "wrong secret word!",
                            token: null
                        }
                    }
                }else {
                    return {
                        ok: false,
                        error: "user not found",
                        token: null
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                }
            }
        }
    }
}

export default resolvers
