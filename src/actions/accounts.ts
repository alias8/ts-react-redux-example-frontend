import { Action } from "redux";
import { IAccount } from "../utils/serverTypes";
import { IFetchFailure, IFetchRequest, IFetchSuccess } from "./index";

export const GET_ACCOUNTS_REQUEST = "GET_ACCOUNTS_REQUEST";
export const GET_ACCOUNTS_SUCCESS = "GET_ACCOUNTS_SUCCESS";
export const GET_ACCOUNTS_FAILURE = "GET_ACCOUNTS_FAILURE";

export const PATCH_ACCOUNTS_REQUEST = "PATCH_ACCOUNTS_REQUEST";
export const PATCH_ACCOUNTS_SUCCESS = "PATCH_ACCOUNTS_SUCCESS";
export const PATCH_ACCOUNTS_FAILURE = "PATCH_ACCOUNTS_FAILURE";

export type IGetAccountsRequest = IFetchRequest<typeof GET_ACCOUNTS_REQUEST>;
export type IGetAccountsSuccess = IFetchSuccess<
  typeof GET_ACCOUNTS_SUCCESS,
  IAccount[]
>;
export type IGetAccountsFailure = IFetchFailure<typeof GET_ACCOUNTS_FAILURE>;

export type IPatchAccountsRequest = IFetchRequest<
  typeof PATCH_ACCOUNTS_REQUEST
>;
export type IPatchAccountsSuccess = IFetchSuccess<
  typeof PATCH_ACCOUNTS_SUCCESS,
  IAccount
>;
export type IPatchAccountsFailure = IFetchFailure<
  typeof PATCH_ACCOUNTS_FAILURE
>;

export function getAccountsRequest(): IGetAccountsRequest {
  return {
    type: GET_ACCOUNTS_REQUEST
  };
}
export function getAccountsSuccess(data: IAccount[]): IGetAccountsSuccess {
  return {
    type: GET_ACCOUNTS_SUCCESS,
    response: data
  };
}
export function getAccountsFailure(error: any): IGetAccountsFailure {
  return {
    type: GET_ACCOUNTS_FAILURE,
    error
  };
}

export function patchAccountsRequest(): IPatchAccountsRequest {
  return {
    type: PATCH_ACCOUNTS_REQUEST
  };
}
export function patchAccountsSuccess(data: IAccount): IPatchAccountsSuccess {
  return {
    type: PATCH_ACCOUNTS_SUCCESS,
    response: data
  };
}
export function patchAccountsFailure(error: any): IPatchAccountsFailure {
  return {
    type: PATCH_ACCOUNTS_FAILURE,
    error
  };
}

export type IAccountActions =
  | IGetAccountsRequest
  | IGetAccountsSuccess
  | IGetAccountsFailure
  | IPatchAccountsRequest
  | IPatchAccountsSuccess
  | IPatchAccountsFailure;
