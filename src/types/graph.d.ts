export const typeDefs = ["type addCommentResponse {\n  ok: Boolean!\n  error: String\n  comment: Comment\n}\n\ntype Mutation {\n  addComment(text: String!, postId: String!): addCommentResponse!\n  toggleLike(postId: String!): toggleLikeResponse!\n  confirmSecret(secret: String!, email: String!): confirmSecretResponse!\n  createAccount(username: String!, email: String!, firstName: String, lastName: String, bio: String): createAccountResponse!\n  requestSecret(email: String): requestSecretRespone!\n}\n\ntype toggleLikeResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype User {\n  id: ID!\n  username: String!\n  email: String!\n  firstName: String\n  lastName: String\n  bio: String\n  following: [User!]!\n  followers: [User!]!\n  posts: [Post!]!\n  likes: [Like!]!\n  comments: [Comment!]!\n  rooms: [Room!]!\n}\n\ntype Post {\n  id: ID!\n  location: String\n  caption: String!\n  user: User!\n  files: [File!]!\n  likes: [Like!]!\n  comments: [Comment!]!\n}\n\ntype Like {\n  id: ID!\n  user: User!\n  post: Post!\n}\n\ntype Comment {\n  id: ID!\n  text: String!\n  user: User!\n  post: Post!\n}\n\ntype File {\n  id: ID!\n  url: String!\n  post: Post!\n}\n\ntype Room {\n  id: ID!\n  participants: [User!]!\n  messages: [Message!]!\n}\n\ntype Message {\n  id: ID!\n  text: String!\n  from: User!\n  to: User!\n  room: Room!\n}\n\ntype confirmSecretResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype createAccountResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype Query {\n  something: String!\n}\n\ntype requestSecretRespone {\n  ok: Boolean!\n  error: String\n}\n"];
/* tslint:disable */

export interface Query {
  something: string;
}

export interface Mutation {
  addComment: addCommentResponse;
  toggleLike: toggleLikeResponse;
  confirmSecret: confirmSecretResponse;
  createAccount: createAccountResponse;
  requestSecret: requestSecretRespone;
}

export interface AddCommentMutationArgs {
  text: string;
  postId: string;
}

export interface ToggleLikeMutationArgs {
  postId: string;
}

export interface ConfirmSecretMutationArgs {
  secret: string;
  email: string;
}

export interface CreateAccountMutationArgs {
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
}

export interface RequestSecretMutationArgs {
  email: string | null;
}

export interface addCommentResponse {
  ok: boolean;
  error: string | null;
  comment: Comment | null;
}

export interface Comment {
  id: string;
  text: string;
  user: User;
  post: Post;
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

export interface toggleLikeResponse {
  ok: boolean;
  error: string | null;
}

export interface confirmSecretResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface createAccountResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface requestSecretRespone {
  ok: boolean;
  error: string | null;
}
