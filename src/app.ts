import cors from "cors";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import { authenticateJwt } from "./utils/passport";
import { isAuthenticated } from "./utils/privateAuth";
import { prisma } from "../generated/prisma-client";

class App {
    public app: GraphQLServer;
    constructor() {
      this.app = new GraphQLServer({
        schema,
        context: ({ request }) => ({ request, isAuthenticated, prisma })
      })
      this.middlewares();
    }

    private middlewares = () : void => {
        this.app.express.use(cors());
        this.app.express.use(logger("dev"));
        this.app.express.use(helmet());
        this.app.express.use(authenticateJwt);
    }
}


export default new App().app