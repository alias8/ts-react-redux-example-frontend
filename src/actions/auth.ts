import { Action } from "redux";
import { IAccount, IUser } from "../utils/serverTypes";
import { IFetchFailure, IFetchRequest, IFetchSuccess } from "./index";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export type ILoginSuccess = IFetchSuccess<typeof LOGIN_SUCCESS, IUser>;

export type ILogoutSuccess = IFetchSuccess<typeof LOGOUT_SUCCESS, undefined>;

export function loginSuccess(data: IUser): ILoginSuccess {
  return {
    type: LOGIN_SUCCESS,
    response: data
  };
}

export function logoutSuccess(): ILogoutSuccess {
  return {
    type: LOGOUT_SUCCESS,
    response: undefined
  };
}

export type IAuthActions = ILoginSuccess | ILogoutSuccess;
