import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  loading: false,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return { ...state, token: action.payload.token, user: action.payload.user, error: null };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return { ...state, token: null, user: null, error: action.payload };
    case LOGOUT:
      return { ...state, token: null, user: null, error: null };
    default:
      return state;
  }
}
