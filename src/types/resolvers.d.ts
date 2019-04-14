export type Resolver = (parent, args, context, info) => any;

export interface Resolvers {
    [key: string]: {
        [key:string]: Resolver
    }
}