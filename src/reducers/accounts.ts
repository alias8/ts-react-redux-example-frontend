import { AllActions } from "../actions";
import {
  GET_ACCOUNTS_FAILURE,
  GET_ACCOUNTS_REQUEST,
  GET_ACCOUNTS_SUCCESS,
  PATCH_ACCOUNTS_FAILURE,
  PATCH_ACCOUNTS_REQUEST,
  PATCH_ACCOUNTS_SUCCESS
} from "../actions/accounts";
import { IAccount } from "../utils/serverTypes";

export interface IAccountsState {
  list: IAccount[];
  loading: boolean;
  loaded: boolean;
  error: Error | null;
  meta: object;
}

const initialState: IAccountsState = {
  list: [],
  loading: false,
  loaded: false,
  error: null,
  meta: {}
};

export default function accountsReducer(
  state = initialState,
  action: AllActions
): IAccountsState {
  switch (action.type) {
    case GET_ACCOUNTS_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_ACCOUNTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        list: action.response
      };
    }
    case GET_ACCOUNTS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    }
    case PATCH_ACCOUNTS_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case PATCH_ACCOUNTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true
      };
    }
    case PATCH_ACCOUNTS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    }
    default:
      return state;
  }
}
