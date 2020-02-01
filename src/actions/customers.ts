import { Action } from "redux";
import { IAccount, ICustomer } from "../utils/serverTypes";
import { IDelete, IFetchFailure, IFetchRequest, IFetchSuccess } from "./index";

export const GET_CUSTOMERS_REQUEST = "GET_CUSTOMERS_REQUEST";
export const GET_CUSTOMERS_SUCCESS = "GET_CUSTOMERS_SUCCESS";
export const GET_CUSTOMERS_FAILURE = "GET_CUSTOMERS_FAILURE";
export const DELETE_CUSTOMER = "DELETE_CUSTOMER";

export type IGetCustomersRequest = IFetchRequest<typeof GET_CUSTOMERS_REQUEST>;
export type IGetCustomersSuccess = IFetchSuccess<
  typeof GET_CUSTOMERS_SUCCESS,
  ICustomer[]
>;

export type IGetCustomersFailure = IFetchFailure<typeof GET_CUSTOMERS_FAILURE>;
export type IDeleteCustomer = IDelete<typeof DELETE_CUSTOMER>;

export function getCustomersRequest(): IGetCustomersRequest {
  return {
    type: GET_CUSTOMERS_REQUEST
  };
}

export function getCustomersSuccess(data: ICustomer[]): IGetCustomersSuccess {
  return {
    type: GET_CUSTOMERS_SUCCESS,
    response: data
  };
}

export function getCustomersFailure(error: any): IGetCustomersFailure {
  return {
    type: GET_CUSTOMERS_FAILURE,
    error
  };
}

export function deleteCustomer(id: string): IDeleteCustomer {
  return {
    type: DELETE_CUSTOMER,
    id
  };
}

export type ICustomerActions =
  | IGetCustomersRequest
  | IGetCustomersSuccess
  | IGetCustomersFailure
  | IDeleteCustomer;
