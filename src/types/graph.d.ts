export const typeDefs = ["type addCommentResponse {\n  ok: Boolean!\n  error: String\n  comment: Comment\n}\n\ntype Mutation {\n  addComment(text: String!, postId: String!): addCommentResponse!\n  toggleLike(postId: String!): toggleLikeResponse!\n  confirmSecret(secret: String!, email: String!): confirmSecretResponse!\n  createAccount(username: String!, email: String!, firstName: String, lastName: String, bio: String): createAccountResponse!\n  editUser(username: String, email: String, firstName: String, lastName: String, bio: String): editUserResponse!\n  follow(id: String!): followResponse!\n  requestSecret(email: String): requestSecretRespone!\n  unfollow(id: String!): unfollowResponse!\n}\n\ntype toggleLikeResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype User {\n  id: ID!\n  username: String!\n  email: String!\n  firstName: String\n  lastName: String\n  fullName: String\n  bio: String\n  following: [User!]!\n  followingCount: Int!\n  followers: [User!]!\n  followersCount: Int!\n  posts: [Post!]!\n  likes: [Like!]!\n  comments: [Comment!]!\n  rooms: [Room!]!\n  loginSecret: String\n}\n\ntype Post {\n  id: ID!\n  location: String\n  caption: String!\n  user: User!\n  files: [File!]!\n  likes: [Like!]!\n  comments: [Comment!]!\n  isliked: Boolean!\n}\n\ntype Like {\n  id: ID!\n  user: User!\n  post: Post!\n}\n\ntype Comment {\n  id: ID!\n  text: String!\n  user: User!\n  post: Post!\n}\n\ntype File {\n  id: ID!\n  url: String!\n  post: Post!\n}\n\ntype Room {\n  id: ID!\n  participants: [User!]!\n  messages: [Message!]!\n}\n\ntype Message {\n  id: ID!\n  text: String!\n  from: User!\n  to: User!\n  room: Room!\n}\n\ntype searchPostResponse {\n  ok: Boolean\n  error: String\n  post: [Post]\n}\n\ntype Query {\n  searchPost(term: String!): searchPostResponse!\n  seeFullPost: seeFullPostResponse!\n  me: meResponse!\n  searchUser(term: String!): searchUserResponse!\n  seeUser(id: String!): seeUserResponse!\n}\n\ntype seeFullPostResponse {\n  ok: Boolean!\n  error: String\n  post: Post\n}\n\ntype confirmSecretResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype createAccountResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype editUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype followResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype meResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype requestSecretRespone {\n  ok: Boolean!\n  error: String\n}\n\ntype searchUserResponse {\n  ok: Boolean\n  error: String\n  user: [User]\n}\n\ntype seeUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype unfollowResponse {\n  ok: Boolean!\n  error: String\n}\n"];
/* tslint:disable */

export interface Query {
  searchPost: searchPostResponse;
  seeFullPost: seeFullPostResponse;
  me: meResponse;
  searchUser: searchUserResponse;
  seeUser: seeUserResponse;
}

export interface SearchPostQueryArgs {
  term: string;
}

export interface SearchUserQueryArgs {
  term: string;
}

export interface SeeUserQueryArgs {
  id: string;
}

export interface searchPostResponse {
  ok: boolean | null;
  error: string | null;
  post: Array<Post> | null;
}

export interface Post {
  id: string;
  location: string | null;
  caption: string;
  user: User;
  files: Array<File>;
  likes: Array<Like>;
  comments: Array<Comment>;
  isliked: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  bio: string | null;
  following: Array<User>;
  followingCount: number;
  followers: Array<User>;
  followersCount: number;
  posts: Array<Post>;
  likes: Array<Like>;
  comments: Array<Comment>;
  rooms: Array<Room>;
  loginSecret: string | null;
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

export interface File {
  id: string;
  url: string;
  post: Post;
}

export interface seeFullPostResponse {
  ok: boolean;
  error: string | null;
  post: Post | null;
}

export interface meResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface searchUserResponse {
  ok: boolean | null;
  error: string | null;
  user: Array<User> | null;
}

export interface seeUserResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface Mutation {
  addComment: addCommentResponse;
  toggleLike: toggleLikeResponse;
  confirmSecret: confirmSecretResponse;
  createAccount: createAccountResponse;
  editUser: editUserResponse;
  follow: followResponse;
  requestSecret: requestSecretRespone;
  unfollow: unfollowResponse;
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

export interface EditUserMutationArgs {
  username: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
}

export interface FollowMutationArgs {
  id: string;
}

export interface RequestSecretMutationArgs {
  email: string | null;
}

export interface UnfollowMutationArgs {
  id: string;
}

export interface addCommentResponse {
  ok: boolean;
  error: string | null;
  comment: Comment | null;
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

export interface editUserResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface followResponse {
  ok: boolean;
  error: string | null;
}

export interface requestSecretRespone {
  ok: boolean;
  error: string | null;
}

export interface unfollowResponse {
  ok: boolean;
  error: string | null;
}
