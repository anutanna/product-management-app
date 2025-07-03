import api from "../api";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, REGISTER_SUCCESS, REGISTER_FAIL } from "../actionTypes";

export const login = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/auth/login", formData);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    localStorage.setItem("token", res.data.token);
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response?.data?.message || error.message });
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/auth/register", formData);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response?.data?.message || error.message });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};
