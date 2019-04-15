import cors from "cors";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import passport from "passport";
import "./utils/passport";

class App {
    public app: GraphQLServer;
    constructor() {
      this.app = new GraphQLServer({
        schema
      })
      this.middlewares();
    }

    private middlewares = () : void => {
        this.app.express.use(cors());
        this.app.express.use(logger("dev"));
        this.app.express.use(helmet());
        this.app.express.use(passport.authenticate("jwt"));
    }
}


export default new App().app