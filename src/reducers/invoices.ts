import { AllActions } from "../actions";
import {
  DELETE_INVOICE,
  GET_INVOICES_FAILURE,
  GET_INVOICES_REQUEST,
  GET_INVOICES_SUCCESS,
  PATCH_INVOICES_FAILURE,
  PATCH_INVOICES_REQUEST,
  PATCH_INVOICES_SUCCESS
} from "../actions/invoices";
import { ICustomer, IInvoice } from "../utils/serverTypes";

export interface IInvoicesState {
  list: IInvoice[];
  loading: boolean;
  loaded: boolean;
  error: Error | null;
  meta: object;
}

const initialState: IInvoicesState = {
  list: [],
  loading: false,
  loaded: false,
  error: null,
  meta: {}
};

export default function invoicesReducer(
  state = initialState,
  action: AllActions
): IInvoicesState {
  switch (action.type) {
    case GET_INVOICES_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_INVOICES_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        list: action.response
      };
    }
    case GET_INVOICES_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    }
    case PATCH_INVOICES_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case PATCH_INVOICES_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true
      };
    }
    case PATCH_INVOICES_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    }
    case DELETE_INVOICE: {
      return {
        ...state,
        list: state.list.filter(invoice => invoice.id !== action.id)
      };
    }
    default:
      return state;
  }
}
