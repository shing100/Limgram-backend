export const typeDefs = ["type SayHelloResponse {\n  ok: Boolean!\n  error: String\n  text: String!\n}\n\ntype Query {\n  SayHello(name: String!): SayHelloResponse!\n}\n"];
/* tslint:disable */

export interface Query {
  SayHello: SayHelloResponse;
}

export interface SayHelloQueryArgs {
  name: string;
}

export interface SayHelloResponse {
  ok: boolean;
  error: string | null;
  text: string;
}
