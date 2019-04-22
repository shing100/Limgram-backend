import { Resolvers } from "../../../types/resolvers";
import { CreateAccountMutationArgs, createAccountResponse } from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArgs";

const resolvers: Resolvers = {
    Mutation: {
        createAccount: async (_, args: CreateAccountMutationArgs, {prisma}): Promise<createAccountResponse> => {
            try {
                const existUser = await prisma.user({email: args.email, username: args.username});
                if(!existUser){
                    const notNull = cleanNullArgs(args);
                    const user = await prisma.createUser({
                        ...notNull
                    });
                    return {
                        ok: true,
                        error: null,
                        user
                    }
                }else{
                    return {
                        ok: false,
                        error: "이미 존재하는 유저입니다.",
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
};

export default resolvers;