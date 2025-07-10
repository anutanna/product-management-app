import * as types from '../actionTypes';
import axios from 'axios';
import { toast } from 'react-toastify';

const API = 'https://product-management-app-ejwr.onrender.com/api/products';

// READ PRODUCTS
export const readProducts = ({ page = 1, limit = 10, sort, keyword } = {}) => async (dispatch) => {
  dispatch({ type: types.READ_PRODUCTS_REQUEST });
  try {
    const token = localStorage.getItem('token');

    const query = new URLSearchParams({ page, limit, sort, keyword }).toString();

    const res = await axios.get(`${API}?${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: types.READ_PRODUCTS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: types.READ_PRODUCTS_FAILURE, payload: err.message });
    toast.error("Failed to load products");
  }
};

// CREATE PRODUCT
export const createProduct = (product) => async (dispatch) => {
  dispatch({ type: types.CREATE_PRODUCT_REQUEST });
  try {
    const token = localStorage.getItem('token');

    const res = await axios.post(API, product, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: types.CREATE_PRODUCT_SUCCESS, payload: res.data });
    toast.success("Product created");
  } catch (err) {
    dispatch({ type: types.CREATE_PRODUCT_FAILURE, payload: err.message });
    toast.error("Create failed");
  }
};

// UPDATE PRODUCT
export const updateProduct = (id, productData) => async (dispatch) => {
  dispatch({ type: types.UPDATE_PRODUCT_REQUEST });
  try {
    const token = localStorage.getItem('token');

    const res = await axios.put(`${API}/${id}`, productData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: types.UPDATE_PRODUCT_SUCCESS, payload: res.data });
    toast.success("Product updated!");
  } catch (err) {
    dispatch({
      type: types.UPDATE_PRODUCT_FAILURE,
      payload: err.response?.data?.message || err.message,
    });
    toast.error("Update failed");
  }
};

// DELETE PRODUCT
export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_PRODUCT_REQUEST });
  try {
    const token = localStorage.getItem('token');

    await axios.delete(`${API}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: types.DELETE_PRODUCT_SUCCESS, payload: id });
    toast.success("Product deleted");
  } catch (err) {
    dispatch({ type: types.DELETE_PRODUCT_FAILURE, payload: err.message });
    toast.error("Delete failed");
  }
};
