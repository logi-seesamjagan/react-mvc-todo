import { LoginUser, User, RegisterUser } from "../types";

import mockService from "./__mock/mock-service";

export function apiLogin(user: LoginUser): Promise<User> {
  return mockService.login(user);
}

export function apiLogout(user: User): Promise<boolean> {
  return mockService.logout(user);
}

export function apiRegister(user: RegisterUser): Promise<User> {
  return mockService.register(user);
}
