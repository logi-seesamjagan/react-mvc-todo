import { User } from "../types";

import mockService from "./__mock/mock-service";

export function apiLogin(user: User): Promise<User> {
  return mockService.login(user);
}

export function apiLogout(user: User): Promise<boolean> {
  return mockService.logout(user);
}

export function apiRegister(user: User): Promise<User> {
  return mockService.register(user);
}
