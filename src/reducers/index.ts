import { combineReducers } from "redux";
import accounts, { IAccountsState } from "./accounts";
import auth, { IAuthState } from "./auth";
import customers, { ICustomersState } from "./customers";
import invoices, { IInvoicesState } from "./invoices";
import users, { IUsersState } from "./users";

export interface IReduxState {
  accounts: IAccountsState;
  customers: ICustomersState;
  auth: IAuthState;
  invoices: IInvoicesState;
  users: IUsersState;
}

export default combineReducers<IReduxState>({
  accounts,
  customers,
  auth,
  invoices,
  users
});
