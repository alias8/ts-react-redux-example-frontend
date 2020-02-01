import { Action } from "redux";
import { IAccount, ICustomer, IInvoice } from "../utils/serverTypes";
import { DELETE_CUSTOMER, IDeleteCustomer } from "./customers";
import { IDelete, IFetchFailure, IFetchRequest, IFetchSuccess } from "./index";

export const GET_INVOICES_REQUEST = "GET_INVOICES_REQUEST";
export const GET_INVOICES_SUCCESS = "GET_INVOICES_SUCCESS";
export const GET_INVOICES_FAILURE = "GET_INVOICES_FAILURE";
export const PATCH_INVOICES_REQUEST = "PATCH_INVOICES_REQUEST";
export const PATCH_INVOICES_SUCCESS = "PATCH_INVOICES_SUCCESS";
export const PATCH_INVOICES_FAILURE = "PATCH_INVOICES_FAILURE";
export const DELETE_INVOICE = "DELETE_INVOICE";

export type IGetInvoicesRequest = IFetchRequest<typeof GET_INVOICES_REQUEST>;
export type IGetInvoicesSuccess = IFetchSuccess<
  typeof GET_INVOICES_SUCCESS,
  IInvoice[]
>;
export type IGetInvoicesFailure = IFetchFailure<typeof GET_INVOICES_FAILURE>;

export type IPatchInvoicesRequest = IFetchRequest<
  typeof PATCH_INVOICES_REQUEST
>;
export type IPatchInvoicesSuccess = IFetchSuccess<
  typeof PATCH_INVOICES_SUCCESS,
  IInvoice
>;
export type IPatchInvoicesFailure = IFetchFailure<
  typeof PATCH_INVOICES_FAILURE
>;

export type IDeleteInvoice = IDelete<typeof DELETE_INVOICE>;

export function getInvoicesRequest(): IGetInvoicesRequest {
  return {
    type: GET_INVOICES_REQUEST
  };
}
export function getInvoicesSuccess(data: IInvoice[]): IGetInvoicesSuccess {
  return {
    type: GET_INVOICES_SUCCESS,
    response: data
  };
}
export function getInvoicesFailure(error: any): IGetInvoicesFailure {
  return {
    type: GET_INVOICES_FAILURE,
    error
  };
}

export function patchInvoicesRequest(): IPatchInvoicesRequest {
  return {
    type: PATCH_INVOICES_REQUEST
  };
}
export function patchInvoicesSuccess(data: IInvoice): IPatchInvoicesSuccess {
  return {
    type: PATCH_INVOICES_SUCCESS,
    response: data
  };
}
export function patchInvoicesFailure(error: any): IPatchInvoicesFailure {
  return {
    type: PATCH_INVOICES_FAILURE,
    error
  };
}

export function deleteInvoice(id: string): IDeleteInvoice {
  return {
    type: DELETE_INVOICE,
    id
  };
}

export type IInvoicesActions =
  | IGetInvoicesRequest
  | IGetInvoicesSuccess
  | IGetInvoicesFailure
  | IPatchInvoicesRequest
  | IPatchInvoicesSuccess
  | IPatchInvoicesFailure
  | IDeleteInvoice;
