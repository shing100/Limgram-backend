import { Resolvers } from "../../../types/resolvers";
import { EditUserMutationArgs, editUserResponse } from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArgs";
import privateResolver from "../../../utils/privateAuth";

const resolvers: Resolvers = {
    Mutation: {
        editUser: privateResolver(async(_, args: EditUserMutationArgs, {request, prisma}): Promise<editUserResponse> => {
            const notNull = cleanNullArgs(args);
            const { user } = request;
            try {
                const updateUser = await prisma.updateUser({
                    where: { id: user.id },
                    data: { ...notNull }
                })
                if (updateUser) {
                    //request.user = updateUser;
                    return {
                        ok: true,
                        error: null,
                        user: updateUser
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