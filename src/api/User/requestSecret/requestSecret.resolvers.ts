import { Resolvers } from "../../../types/resolvers";
import { RequestSecretMutationArgs, requestSecretRespone } from "../../../types/graph";
import { generateSecret, sendSecretMail } from "../../../utils/utils";

const resolvers: Resolvers = {
    Mutation: {
        requestSecret: async (_, args: RequestSecretMutationArgs, { prisma }): Promise<requestSecretRespone> => {
            const { email } = args;
            const loginSecret: string = generateSecret();
            console.log(loginSecret);
            try {
                if(email && loginSecret){
                    await sendSecretMail(email, loginSecret);
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