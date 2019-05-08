export const typeDefs = ["type addCommentResponse {\n  ok: Boolean!\n  error: String\n  comment: Comment\n}\n\ntype Mutation {\n  addComment(text: String!, postId: String!): addCommentResponse!\n  toggleLike(postId: String!): toggleLikeResponse!\n  sendMessage(roomId: String, message: String!, toId: String): sendMessageResponse!\n  editPost(id: String!, caption: String, location: String, action: ACTIONS!): editPostResponse!\n  upload(caption: String!, files: [String!]!): uploadResponse!\n  confirmSecret(secret: String!, email: String!): confirmSecretResponse!\n  createAccount(username: String!, email: String!, firstName: String, lastName: String, bio: String, avatar: String): createAccountResponse!\n  editUser(username: String, email: String, firstName: String, lastName: String, bio: String, avatar: String): editUserResponse!\n  follow(id: String!): followResponse!\n  requestSecret(email: String): requestSecretRespone!\n  unfollow(id: String!): unfollowResponse!\n}\n\ntype toggleLikeResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype sendMessageResponse {\n  ok: Boolean\n  error: String\n  message: Message\n}\n\ntype User {\n  id: ID!\n  avatar: String\n  username: String!\n  email: String!\n  firstName: String\n  lastName: String\n  fullName: String\n  isFollowing: Boolean!\n  isSelf: Boolean!\n  bio: String\n  following: [User!]!\n  followingCount: Int!\n  followers: [User!]!\n  followersCount: Int!\n  posts: [Post!]!\n  likes: [Like!]!\n  comments: [Comment!]!\n  rooms: [Room!]!\n  loginSecret: String\n}\n\ntype Post {\n  id: ID!\n  location: String\n  caption: String!\n  user: User!\n  files: [File!]!\n  likes: [Like!]!\n  likeCount: Int!\n  isLiked: Boolean!\n  comments: [Comment!]!\n  commentCount: Int!\n}\n\ntype Like {\n  id: ID!\n  user: User!\n  post: Post!\n}\n\ntype Comment {\n  id: ID!\n  text: String!\n  user: User!\n  post: Post!\n}\n\ntype File {\n  id: ID!\n  url: String!\n  post: Post!\n}\n\ntype Room {\n  id: ID!\n  participants: [User!]!\n  messages: [Message!]!\n}\n\ntype Message {\n  id: ID!\n  text: String!\n  from: User!\n  to: User!\n  room: Room!\n}\n\nenum ACTIONS {\n  EDIT\n  DELETE\n}\n\ntype editPostResponse {\n  ok: Boolean!\n  error: String\n  post: Post\n}\n\ntype searchPostResponse {\n  ok: Boolean\n  error: String\n  post: [Post]\n}\n\ntype Query {\n  searchPost(term: String!): searchPostResponse!\n  seeFeed: seeFeedResponse!\n  seeFullPost(id: String!): seeFullPostResponse!\n  seeRoom(id: String!): seeRoomResponse!\n  seeRooms: seeRoomsResponse!\n  me: meResponse!\n  searchUser(term: String!): searchUserResponse!\n  seeUser(id: String!): seeUserResponse!\n}\n\ntype seeFeedResponse {\n  ok: Boolean\n  error: String\n  posts: [Post!]\n}\n\ntype seeFullPostResponse {\n  ok: Boolean!\n  error: String\n  post: Post\n}\n\ntype uploadResponse {\n  ok: Boolean!\n  error: String\n  post: Post\n}\n\ntype seeRoomResponse {\n  ok: Boolean!\n  error: String\n  room: Room\n}\n\ntype seeRoomsResponse {\n  ok: Boolean!\n  error: String\n  rooms: [Room!]\n}\n\ntype confirmSecretResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype createAccountResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype editUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype followResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype meResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype requestSecretRespone {\n  ok: Boolean!\n  error: String\n}\n\ntype searchUserResponse {\n  ok: Boolean\n  error: String\n  user: [User]\n}\n\ntype seeUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype unfollowResponse {\n  ok: Boolean!\n  error: String\n}\n"];
/* tslint:disable */

export interface Query {
  searchPost: searchPostResponse;
  seeFeed: seeFeedResponse;
  seeFullPost: seeFullPostResponse;
  seeRoom: seeRoomResponse;
  seeRooms: seeRoomsResponse;
  me: meResponse;
  searchUser: searchUserResponse;
  seeUser: seeUserResponse;
}

export interface SearchPostQueryArgs {
  term: string;
}

export interface SeeFullPostQueryArgs {
  id: string;
}

export interface SeeRoomQueryArgs {
  id: string;
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
  likeCount: number;
  isLiked: boolean;
  comments: Array<Comment>;
  commentCount: number;
}

export interface User {
  id: string;
  avatar: string | null;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  isFollowing: boolean;
  isSelf: boolean;
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

export interface seeFeedResponse {
  ok: boolean | null;
  error: string | null;
  posts: Array<Post>;
}

export interface seeFullPostResponse {
  ok: boolean;
  error: string | null;
  post: Post | null;
}

export interface seeRoomResponse {
  ok: boolean;
  error: string | null;
  room: Room | null;
}

export interface seeRoomsResponse {
  ok: boolean;
  error: string | null;
  rooms: Array<Room>;
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
  sendMessage: sendMessageResponse;
  editPost: editPostResponse;
  upload: uploadResponse;
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

export interface SendMessageMutationArgs {
  roomId: string | null;
  message: string;
  toId: string | null;
}

export interface EditPostMutationArgs {
  id: string;
  caption: string | null;
  location: string | null;
  action: ACTIONS;
}

export interface UploadMutationArgs {
  caption: string;
  files: Array<string>;
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
  avatar: string | null;
}

export interface EditUserMutationArgs {
  username: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  avatar: string | null;
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

export interface sendMessageResponse {
  ok: boolean | null;
  error: string | null;
  message: Message | null;
}

export type ACTIONS = "EDIT" | "DELETE";

export interface editPostResponse {
  ok: boolean;
  error: string | null;
  post: Post | null;
}

export interface uploadResponse {
  ok: boolean;
  error: string | null;
  post: Post | null;
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
