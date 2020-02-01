import { Action } from "redux";
import { IAccountActions } from "./accounts";
import { IAuthActions } from "./auth";
import { ICustomerActions } from "./customers";
import { IInvoicesActions } from "./invoices";
import { IUserActions } from "./users";

export type IFetchRequest<Type, O extends object = {}> = Action<Type> & O;

export type IFetchSuccess<Type, Response, O extends object = {}> = Action<
  Type
> & {
  response: Response;
} & O;

export type IFetchFailure<Type, O extends object = {}> = Action<Type> & {
  error: Error;
} & O;

export type IDelete<Type, O extends object = {}> = Action<Type> & {
  id: string;
} & O;

export type AllActions =
  | IAccountActions
  | ICustomerActions
  | IAuthActions
  | IInvoicesActions
  | IUserActions;
