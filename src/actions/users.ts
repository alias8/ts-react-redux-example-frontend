import { Action } from "redux";
import { IAccount, IUser } from "../utils/serverTypes";
import { IDelete, IFetchFailure, IFetchRequest, IFetchSuccess } from "./index";

export const GET_USERS_REQUEST = "GET_USERS_REQUEST";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILURE = "GET_USERS_FAILURE";

export type IGetUsersRequest = IFetchRequest<typeof GET_USERS_REQUEST>;
export type IGetUsersSuccess = IFetchSuccess<typeof GET_USERS_SUCCESS, IUser[]>;

export type IGetUsersFailure = IFetchFailure<typeof GET_USERS_FAILURE>;

export function getUsersRequest(): IGetUsersRequest {
  return {
    type: GET_USERS_REQUEST
  };
}

export function getUsersSuccess(data: IUser[]): IGetUsersSuccess {
  return {
    type: GET_USERS_SUCCESS,
    response: data
  };
}

export function getUsersFailure(error: any): IGetUsersFailure {
  return {
    type: GET_USERS_FAILURE,
    error
  };
}

export type IUserActions =
  | IGetUsersRequest
  | IGetUsersSuccess
  | IGetUsersFailure;
