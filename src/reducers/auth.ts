import { AllActions } from "../actions";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../actions/auth";
import { IUserID } from "../utils/serverTypes";

export interface IAuthState {
  id: IUserID | null;
  loggedIn: boolean;
  username: string | null;
  error: Error | null;
  meta: object;
}

const initialState: IAuthState = {
  id: null,
  loggedIn: false,
  username: null,
  error: null,
  meta: {}
};

export default function authReducer(
  state = initialState,
  action: AllActions
): IAuthState {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        username: action.response.username,
        id: action.response.id
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        loggedIn: false,
        username: null
      };
    }
    default:
      return state;
  }
}
