import { IReduxState } from "../reducers";
import { IAccount, ICustomerID, IInvoiceID } from "../utils/serverTypes";

export function accountsOfCurrentUser(state: IReduxState): IAccount[] {
  return state.accounts.list.filter(
    account => account.ownedBy === state.auth.id
  );
}

export function getCustomersOfCurrentUser(state: IReduxState): ICustomerID[] {
  const accounts = accountsOfCurrentUser(state);
  return accounts.reduce(
    (prev, curr) => [...prev, ...curr.customerIDs],
    [] as ICustomerID[]
  );
}

export function getRevenueOfAccount(
  account: IAccount,
  state: IReduxState
): number {
  const customerIDsInAccount = new Set(account.customerIDs);
  const customersOfAccount = state.customers.list.filter(c =>
    customerIDsInAccount.has(c.id)
  );
  const invoiceIDsOfAccount = new Set(
    customersOfAccount.reduce(
      (prev, curr) => [...prev, ...curr.invoiceIDs],
      [] as IInvoiceID[]
    )
  );
  return state.invoices.list
    .filter(invoice => invoiceIDsOfAccount.has(invoice.id))
    .reduce((prev, curr) => prev + curr.purchasedPrice, 0);
}
