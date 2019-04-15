import cors from "cors";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import { authenticateJwt } from "./utils/passport";

class App {
    public app: GraphQLServer;
    constructor() {
      this.app = new GraphQLServer({
        schema,
        context: ({ request }) => ({ request })
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