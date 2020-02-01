import { AllActions } from "../actions";
import {
  GET_USERS_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS
} from "../actions/users";
import { IUser } from "../utils/serverTypes";

export interface IUsersState {
  list: IUser[];
  loading: boolean;
  loaded: boolean;
  error: Error | null;
  meta: object;
}

const initialState: IUsersState = {
  list: [],
  loading: false,
  loaded: false,
  error: null,
  meta: {}
};

export default function usersReducer(
  state = initialState,
  action: AllActions
): IUsersState {
  switch (action.type) {
    case GET_USERS_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        list: action.response
      };
    }
    case GET_USERS_FAILURE: {
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
