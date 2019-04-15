export const typeDefs = ["type User {\n  id: ID!\n  username: String!\n  email: String!\n  firstName: String\n  lastName: String\n  bio: String\n  following: [User!]!\n  followers: [User!]!\n  posts: [Post!]!\n  likes: [Like!]!\n  comments: [Comment!]!\n  rooms: [Room!]!\n  loginSecret: String!\n}\n\ntype Post {\n  id: ID!\n  location: String\n  caption: String!\n  user: User!\n  files: [File!]!\n  likes: [Like!]!\n  comments: [Comment!]!\n}\n\ntype Like {\n  id: ID!\n  user: User!\n  post: Post!\n}\n\ntype Comment {\n  id: ID!\n  text: String!\n  user: User!\n  post: Post!\n}\n\ntype File {\n  id: ID!\n  url: String!\n  post: Post!\n}\n\ntype Room {\n  id: ID!\n  participants: [User!]!\n  messages: [Message!]!\n}\n\ntype Message {\n  id: ID!\n  text: String!\n  from: User!\n  to: User!\n  room: Room!\n}\n\ntype Query {\n  allUsers: [User!]!\n  userById(id: String!): User!\n}\n"];
/* tslint:disable */

export interface Query {
  allUsers: Array<User>;
  userById: User;
}

export interface UserByIdQueryArgs {
  id: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  following: Array<User>;
  followers: Array<User>;
  posts: Array<Post>;
  likes: Array<Like>;
  comments: Array<Comment>;
  rooms: Array<Room>;
  loginSecret: string;
}

export interface Post {
  id: string;
  location: string | null;
  caption: string;
  user: User;
  files: Array<File>;
  likes: Array<Like>;
  comments: Array<Comment>;
}

export interface File {
  id: string;
  url: string;
  post: Post;
}

export interface Like {
  id: string;
  user: User;
  post: Post;
}

export interface Comment {
  id: string;
  text: string;
  user: User;
  post: Post;
}

export interface Room {
  id: string;
  participants: Array<User>;
  messages: Array<Message>;
}

export interface Message {
  id: string;
  text: string;
  from: User;
  to: User;
  room: Room;
}
