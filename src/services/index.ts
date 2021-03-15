import authService from "./auth";
import usersService from "./users";
import messagingService from "./messaging";
import notificationsService from "./notifications";

const service = {
  ...authService,
  ...usersService,
  ...messagingService,
  ...notificationsService,
};

export default service;
