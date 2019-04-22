import { Resolvers } from "../../../types/resolvers";
import { EditUserMutationArgs, editUserResponse } from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArgs";

const resolvers: Resolvers = {
    Mutation: {
        editUser: async(_, args: EditUserMutationArgs, {request, isAuthenticated, prisma}): Promise<editUserResponse> => {
            isAuthenticated(request);
            const notNull = cleanNullArgs(args);
            const { user } = request;
            try {
                const updateUser = await prisma.updateUser({
                    where: { id: user.id },
                    data: { ...notNull }
                })
                if (updateUser) {
                    request.user = updateUser;
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
        }
    }
}

export default resolvers;