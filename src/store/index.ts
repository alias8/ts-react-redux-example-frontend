import { createStore as reduxCreateStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { AllActions } from "../actions";
import reducer, { IReduxState } from "../reducers";

export type IReduxStore = Store<IReduxState, AllActions>;

export function createStore(
  initialState: Partial<IReduxState> = {}
): IReduxStore {
  return reduxCreateStore(reducer, initialState, composeWithDevTools());
}
