import { API } from "aws-amplify";
import { ListResponse } from "./common";

export interface User {}

export interface GetUsersRequest {
  query: string;
}

export interface GetUserRequest {
  userId: string;
}

export interface UserService {
  getUsers(req: GetUsersRequest): Promise<ListResponse<User>>;
  getUser(req: GetUserRequest): Promise<{ user: User }>;
}

const userService: UserService = {
  getUsers: (req) => {
    return API.get(
      "suteuorest",
      "/users?q=" + encodeURIComponent(req.query || ""),
      {}
    );
  },
  getUser: (req) => {
    return API.get("suteuorest", "/users/" + req.userId, {});
  },
};

export default userService;
