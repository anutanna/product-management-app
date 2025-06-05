
import * as types from '../actionTypes';
import axios from 'axios';
import { toast } from 'react-toastify';

const API = 'http://localhost:5000/api/products'; 

export const readProducts = () => async (dispatch) => {
  dispatch({ type: types.READ_PRODUCTS_REQUEST });
  try {
    const res = await axios.get(API);
    dispatch({ type: types.READ_PRODUCTS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: types.READ_PRODUCTS_FAILURE, payload: err.message });
    toast.error("Failed to load products");
  }
};

export const createProduct = (product) => async (dispatch) => {
  dispatch({ type: types.CREATE_PRODUCT_REQUEST });
  try {
    const res = await axios.post(API, product);
    dispatch({ type: types.CREATE_PRODUCT_SUCCESS, payload: res.data });
    toast.success("Product created");
  } catch (err) {
    dispatch({ type: types.CREATE_PRODUCT_FAILURE, payload: err.message });
    toast.error("Create failed");
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_PRODUCT_REQUEST });
  try {
    await axios.delete(`${API}/${id}`);
    dispatch({ type: types.DELETE_PRODUCT_SUCCESS, payload: id });
    toast.success("Product deleted");
  } catch (err) {
    dispatch({ type: types.DELETE_PRODUCT_FAILURE, payload: err.message });
    toast.error("Delete failed");
  }
};


