import { AllActions } from "../actions";
import {
  DELETE_CUSTOMER,
  GET_CUSTOMERS_FAILURE,
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_SUCCESS
} from "../actions/customers";
import { ICustomer } from "../utils/serverTypes";

export interface ICustomersState {
  list: ICustomer[];
  loading: boolean;
  loaded: boolean;
  error: Error | null;
  meta: object;
}

const initialState: ICustomersState = {
  list: [],
  loading: false,
  loaded: false,
  error: null,
  meta: {}
};

export default function customersReducer(
  state = initialState,
  action: AllActions
): ICustomersState {
  switch (action.type) {
    case GET_CUSTOMERS_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_CUSTOMERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        list: action.response
      };
    }
    case GET_CUSTOMERS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    }
    case DELETE_CUSTOMER: {
      return {
        ...state,
        list: state.list.filter(customer => customer.id !== action.id)
      };
    }
    default:
      return state;
  }
}
