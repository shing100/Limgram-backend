import { prisma } from "../../../../generated/prisma-client";
import { Resolvers } from "../../../types/resolvers";
import { CreateAccountMutationArgs } from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArgs";

const resovlers: Resolvers = {
    Mutation: {
        createAccount: async (_, args: CreateAccountMutationArgs) => {
            try {
                const existUser = await prisma.user({email: args.email, username: args.username});
                if(!existUser){
                    const notNull = cleanNullArgs(args);
                    console.log(notNull)
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

export default resovlers;